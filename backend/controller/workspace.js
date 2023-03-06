import Project from "../models/projectModal.js";
import Workspace from "../models/workSpaceModal.js";
import { getCacheData, updateCacheMemory } from "../redis/redisFunction.js";
import { GenerateIvitationMail } from "../services/Nodemailer.js";
import {
  addWorkspaceInUser,
  addWorkspaceInUsercollection,
  findUserWithoutPassword,
} from "../services/User.js";
import {
  addDepartmentIntoWorkspace,
  addMemberIntoWorkspace,
  findWorkspace,
} from "../services/Workspace.js";
import catchAsync from "../utils/catchAsync.js";

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

/**
 * Create Workspace
 * POST '/'
 * @param {*} req - req.body contain name,department name, projectname
 * @param {*} res - send success message with workspace data
 */
export const createWorkspace = catchAsync(async (req, res, next) => {
  console.log(req.body);
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
    addWorkspaceInUsercollection(workspace),
  ]);
  successresponse(res, 200, user.memberOf);
});

/**
 * Get All Workspace
 * GET /
 * @param {*} req
 * @param {*} res
 */
export const getWorkspace = catchAsync(async (req, res, next) => {
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
  console.log(req.body);
  const departmentName = req.body.name;
  const id = req.params.id;
  console.log(departmentName, id);
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
  const { workspaceId, role } = await getCacheData(`invitation-${memberId}`);
  console.log({ workspaceId, role });
  const [user, newWorkSpace] = await Promise.all([
    addWorkspaceInUser(memberId, workspaceId, role),
    addMemberIntoWorkspace(workspaceId, memberId, role),
  ]);
  console.log(newWorkSpace);
  successresponse(res, 200, user);
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
  if (!user) return errorResponse(res, 410, `user not exist`);
  updateCacheMemory(`invitation-${user._id}`, {
    workspaceId,
    memberId: user._id,
    role,
  });
  GenerateIvitationMail(memberEmail, user.name, user._id);
  console.log(user._id);
  successresponse(res, 200, { email: user.email });
});
