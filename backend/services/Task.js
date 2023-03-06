import mongoose from "mongoose";
import Task from "../models/taskModal.js";
import {
  deleteCache,
  getOrSetFunction,
  updateCacheMemory,
} from "../redis/redisFunction.js";

/**
 * Group all task usign its status
 * @param {String} projectID - Project id
 * @returns {Object} - return object
 */
export const groupTasks = async (projectID) => {
  const data = await getOrSetFunction(`groupedTask-${projectID}`, () => {
    return Task.aggregate([
      {
        $match: {
          projectID: mongoose.Types.ObjectId(`${projectID}`),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "Assigned",
          foreignField: "_id",
          as: "AssignedTo",
        },
      },
      {
        $project: {
          "AssignedTo.password": 0,
        },
      },
      {
        $group: {
          _id: "$status",
          data: { $push: "$$ROOT" },
        },
      },
    ]);
  });
  console.log({ groupTask: data });
  return data;
};

/**
 * Get Task
 * @param {String} id - task id
 * @returns {Object} - task data
 */
export const getTask = async (id) => {
  const data = await getOrSetFunction(`task-${id}`, () => {
    return Task.findById(id).lean();
  });
  return data;
};

/**
 * Update Task
 * @param {String} id - task id
 * @param {Object} data - Updated data in object format
 * @returns {Object} - Task data get from mongodb
 */
export const updateTask = async (id, data, userid) => {
  const update = {
    updatedBy: userid,
    updateTime: new Date(Date.now()),
  };
  const task = await Task.findByIdAndUpdate(
    id,
    { ...data, update },
    { new: true, lean: true }
  );
  deleteCache(`groupedTask-${task.projectID}`);
  updateCacheMemory(`task-${id}`, task);
  return task;
};

/**
 * Delete Task
 * @param {String} id - Task id
 * @returns {Object} - deleted task
 */
export const deleteTaskUsingId = async (id) => {
  const data = await Task.findByIdAndDelete(id);
  deleteCache(`task-${id}`);
  console.log({ data });
  deleteCache(`groupedTask-${data.projectID}`);
  return data;
};
