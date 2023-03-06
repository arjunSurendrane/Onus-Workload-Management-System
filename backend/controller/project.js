import Project from "../models/projectModal.js";
import { groupAllTask } from "../services/Project.js";
import { updateProjectInWorkspace } from "../services/Workspace.js";
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
 * Create Project
 * POST /project
 * @param {*} req - req.body contain proejct name, workspace id, department id
 * @param {*} res - success message with project data
 */
export const createProject = catchAsync(async (req, res) => {
  console.log(req.body);
  const { projectName, workspaceId, departmentID } = req.body;
  const id = req.params.id;
  const project = new Project({
    projectName,
  });
  const [workspace, projectSave] = await Promise.all([
    updateProjectInWorkspace(workspaceId, departmentID, project._id),
    project.save(),
  ]);
  console.log({ workspace });
  res.status(200).json({
    status: "success",
    project,
    workspace,
  });
});

/**
 * Project Data
 * GET /projects/:id
 * @param {*} req
 * @param {*} res
 */
export const projects = catchAsync(async (req, res) => {
  const projectID = req.params.id;
  console.log(projectID);
  const projects = await groupAllTask(projectID);
  successresponse(res, 200, projects);
});
