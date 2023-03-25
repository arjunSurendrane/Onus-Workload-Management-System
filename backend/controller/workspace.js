import Project from "../models/projectModal.js";
import Workspace from "../models/workSpaceModal.js";
import {
  deleteCache,
  getCacheData,
  updateCacheMemory,
} from "../redis/redisFunction.js";
import { GenerateIvitationMail } from "../services/Nodemailer.js";
import {
  usersWorkload,
  workspaceWorkloadData,
  workspaceWorkloadWithAssignedUsers,
} from "../services/Task.js";
import {
  findUserWithoutPassword,
  updateRoleInUser,
  updateUserDataWithId,
  userWorkspaces,
} from "../services/User.js";
import {
  addDepartmentIntoWorkspace,
  findWorkspace,
  getWorkspaceusingId,
  workspaceMember,
} from "../services/Workspace.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { sendNotificationToUser } from "./notification.js";
import { response } from "./response.js";

/**
 * Success response
 * @param {Object} res
 * @param {Number} statusCode - status code
 * @param {data} data
 */
const successresponse = async (res, statusCode, data) => {
  res.status(statusCode).json({
    status: "success",
    data,
  });
};

export const getWorkspaceWithId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const workspace = await getWorkspaceusingId(id);
  console.log(workspace);
  sendNotificationToUser(workspace._id);
  response(res, 200, { workspace });
});

/**
 * Create Workspace
 * POST '/'
 * @param {*} req - req.body contain name,department name, projectname
 * @param {*} res - send success message with workspace data
 */
export const createWorkspace = catchAsync(async (req, res, next) => {
  const { name, departmentName, projectName } = req.body;
  const project = new Project({
    projectName,
  });
  const workspace = new Workspace({
    Name: name,
    Lead: req.user._id,
    department: {
      departmentName,
      project: [{ projectId: project._id }],
    },
  });
  const [projectDB, workspaceDB, user] = await Promise.all([
    project.save(),
    workspace.save(),
    updateUserDataWithId(workspace.Lead, {
      $push: { memberOf: { workspace: workspace._id }, role: "owner" },
    }),
  ]);
  successresponse(res, 200, workspaceDB);
});

/**
 * Get All Workspace
 * GET /
 * @param {*} req
 * @param {*} res
 */
export const getWorkspace = catchAsync(async (req, res, next) => {
  console.log("here");
  const workspace = await findWorkspace();
  successresponse(res, 200, workspace);
});

/**
 * Add Department
 * PATCH /department/:id
 * @description - add department into workspace object
 * @param {*} req - req.body department name params have workspace id
 * @param {*} res
 */
export const addDepartment = catchAsync(async (req, res, next) => {
  const departmentName = req.body.name;
  const id = req.params.id;
  const workspace = await addDepartmentIntoWorkspace(id, departmentName);
  res.status(200).json({ status: "success", workspace });
});

/**
 * Add New Member
 * PATCH /member/:id
 * @description - Add a new member into workspace
 * @param {*} req - req.params.id = member id
 * @param {*} res - send success response with user data
 */
export const addMembers = catchAsync(async (req, res, next) => {
  const memberId = req.params.id;
  const data = await getCacheData(`invitation-${memberId}`);
  console.log(data);
  deleteCache(`invitation-${memberId}`);
  if (data) {
    const { workspaceId, role } = data;
    const [user] = await Promise.all([
      updateUserDataWithId(memberId, {
        $push: { memberOf: { workspace: workspaceId, role } },
      }),
    ]);
    return successresponse(res, 200, { user });
  }
  next("already exist");
});

/**
 * Send Invitation
 * POST /invitation/:id
 * @description send invitation for users
 * @param {*} req - req.params.id = workspace id
 * @param {*} res
 */
export const sendInvitation = catchAsync(async (req, res, next) => {
  const workspaceId = req.params.id;
  const { memberEmail, role } = req.body;
  const user = await findUserWithoutPassword(memberEmail);
  if (!user) return next(new AppError(`user not exist`, 410));
  updateCacheMemory(`invitation-${user._id}`, {
    workspaceId,
    memberId: user._id,
    role,
  });
  GenerateIvitationMail(memberEmail, user.name, user._id);
  successresponse(res, 200, { email: user.email });
});

/**
 * Delete Member
 * DELETE /workspace/member/:id/:memberId
 * params have workspace id and member document id
 */
export const deleteMember = catchAsync(async (req, res, next) => {
  const { id, memberId } = req.params;
  const user = await updateUserDataWithId(memberId, {
    $pull: { memberOf: { workspace: id } },
  });
  response(res, 204, user);
});

/**
 * Update Workspace
 * GET /workspace/member/:id
 * params have workspace id
 */
export const workspaceMembers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const users = await workspaceMember(id);
  response(res, 200, { users });
});

/**
 * Find Members in Workspace
 * GET /membres/:id
 * id => workspace id
 */
export const findMembers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const members = await userWorkspaces(id);
  console.log({ members });
  response(res, 200, { members });
});

/**
 * Workspace Dashboard
 */
export const membersWorkload = catchAsync(async (req, res, next) => {
  const { id, userId } = req.params;
  const userbasedWorkload = await usersWorkload(id, userId);
  res.json({
    userbasedWorkload,
  });
});

/**
 * Workspace Workload
 */
export const workspaceWorkload = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const [workload, usersWorkload] = await Promise.all([
    workspaceWorkloadData(id),
    workspaceWorkloadWithAssignedUsers(id),
  ]);
  response(res, 200, { workload, usersWorkload });
});

/**
 * Find All Workspace Members
 */
export const findAllMembers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const members = await userWorkspaces(id);
  response(res, 200, { members });
});

/**
 * Update Role
 */
export const updateRole = catchAsync(async (req, res) => {
  const { id, userId } = req.params;
  const { role } = req.body;
  const update = await updateRoleInUser(userId, id, role);
  response(res, 200, { update });
});
