import Task from "../models/taskModal.js";
import {
  deleteTaskUsingId,
  getTask,
  groupTasks,
  updateTask,
} from "../services/Task.js";
import { updateProjectWithTaskData } from "../services/Project.js";
import { getFileStream, uploadFile } from "../config/s3.js";
import catchAsync from "../utils/catchAsync.js";
import { response } from "./response.js";

/**
 * Group Task
 * GET /tasks/:id/list
 * @description - It is used to group task with its status (todo,inprogress,completed)
 * @param {Object} req - req.params.id = project ID
 * @param {Object} res - send task data to client
 */
export const groupAllTaks = catchAsync(async (req, res) => {
  const projectID = req.params.id;
  const tasks = await groupTasks(projectID);
  res.status(200).json({
    status: "success",
    tasks,
  });
});

/**
 * Create Task
 * POST /task
 * @description - This is used to create task.
 * @param {Object} req
 * @param {Object} res
 */
export const createTask = catchAsync(async (req, res) => {
  const { projectId, taskName, description, dueDate } = req.body;
  let link;
  if (req.file) {
    const uploadResult = await uploadFile(req.file);
    console.log({ uploadResult });
    link = uploadResult.Key;
  }
  const newTask = new Task({
    taskName,
    description,
    dueDate,
    attachedfiles: [{ link }],
    createdBy: req.user._id,
    projectID: projectId,
  });
  const [project, task] = await Promise.all([
    updateProjectWithTaskData(projectId, newTask),
    newTask.save(),
  ]);
  res.status(200).json({
    status: "success",
    task,
    project,
  });
});

/**
 * Stream Attached File
 * GET /task/attachedFile/:key
 * @description It is used to send attached files from s3 to client
 */
export const streamAttachedFile = catchAsync(async (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

/**
 * Get All Task
 * GET /task
 * @description - It is used to retrieve all task form task collection
 */
export const allTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    tasks,
  });
});

/**
 * Get Task
 * GET /task/:id
 * @description - It is used to get one task data
 * @param {Object} req - the req params contain the task id
 */
export const getOneTask = catchAsync(async (req, res) => {
  const id = req.params.id;
  const task = await getTask(id);
  res.status(200).json({
    status: "success",
    task,
  });
});

/**
 * Change Task Status
 * PATCH /task/status/:id
 * @description - This function is used to change task status (todo/inprogress/completed)
 * @param {Object} req - req.body contain the status and params contain the task id
 * @param {object} res - send task and success message to client
 */
export const changeTaskStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  const id = req.params.id;
  const task = updateTask(id, { status }, req.user._id);
  res.json({ status: "success", task });
});

/**
 * Change Priority
 * PATCH /task/priority/:id
 * @description - Change the task priority
 * @param {Object} req - req.body => priority(string) req.params.id => taskId
 * @param {object} res - send task and success message to client
 */
export const changePriority = catchAsync(async (req, res) => {
  const { priority } = req.body;
  const id = req.params.id;
  const task = updateTask(id, { priority }, req.user._id);
  res.json({ status: "success", task });
});

/**
 * Delete Task
 * DELETE /task/:id
 * @description - Delete task used to its id
 * @param {Object} req - req.params.id => taskId
 */
export const deleteTask = catchAsync(async (req, res) => {
  const id = req.params.id;
  const task = deleteTaskUsingId(id);
  res.status(204).json({ status: "success" });
});

/**
 * Assign Task
 * PATCH /task/assign
 * @description - Assign task to members they are exist in the workspace
 * @param {Object} req - req.body => userID,taskId
 * @param {object} res - send task and success message to client
 */
export const assignTask = catchAsync(async (req, res) => {
  const { taskId, userId } = req.body;
  const task = await updateTask(taskId, { Assigned: userId }, req.user._id);
  res.status(200).json({ staus: "success", task });
});

/**
 * Update Task
 * POST /task/:id
 * @param {Object} req - req.body have task details and params have task id
 * @param {Object} res - send success messagea and task data
 */
export const TaskUpdate = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { taskName, description, dueDate } = req.body;
  const data = updateTask(id, { taskName, description, dueDate }, req.user._id);
  response(res, 200, { task: data });
});
