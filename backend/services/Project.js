import Project from "../models/taskModal.js";
import {
  deleteCache,
  getOrSetFunction,
  updateCacheMemory,
} from "../redis/redisFunction.js";
import mongoose from "mongoose";

/**
 * All Projects
 * @returns {Array} - return all projects in array format
 */
export const AllProjects = async () => {
  const data = await getOrSetFunction("tasks", () => {
    return Project.find();
  });
  return data;
};

/**
 * Get project
 * @param {String} id - Project _id
 * @returns {Object} - Project Data
 */
export const FindOneProject = async (id) => {
  const data = await getOrSetFunction(`project-${id}`, () => {
    return Project.findById(id);
  });
  return data;
};

/**
 * Update Project
 * @param {String} id - Project _id
 * @param {Object} data - Updated data
 * @returns {Object} - return project data
 */
export const UpdateProject = async (id, data) => {
  const res = await Project.findByIdAndUpdate(id, data, { new: true });
  updateCacheMemory(`project-${id}`, res);
  return res;
};

/**
 * Delete Project
 * @param {String} id  - Project _id
 * @returns {Object} - Deleted project data
 */
export const DeleteProject = async (id) => {
  updateCacheMemory(`project-${id}`, null);
  return await Project.findByIdAndDelete(id);
};

/**
 * Update TaskDate
 * @param {String} projectId
 * @param {Object} newTask
 * @returns {Object} - project data
 */
export const updateProjectWithTaskData = async (projectId, newTask) => {
  const data = await Project.findByIdAndUpdate(
    projectId,
    {
      $push: { task: { taskName: newTask._id } },
    },
    { new: true }
  );
  console.log({ data, projectId });
  deleteCache(`groupedTask-${projectId}`);
  updateCacheMemory(`project-${projectId}`, data);
  return data;
};

export const groupAllTask = async (id) => {
  return await Project.aggregate([
    [
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "task.taskName",
          foreignField: "_id",
          as: "taskData",
        },
      },
      {
        $group: {
          _id: "$taskData.status",
          data: { $push: "$$ROOT" },
        },
      },
    ],
  ]);
};
