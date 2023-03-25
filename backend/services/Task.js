import mongoose from "mongoose";
import Task from "../models/taskModal.js";
import {
  deleteCache,
  getOrSetFunction,
  updateCacheMemory,
} from "../redis/redisFunction.js";
import asyncHandler from "express-async-handler";
import catchError from "../utils/serviceErrorHandler.js";

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
  return data;
};

/**
 * Aggregate Task data with 4 pipeline
 * used by user
 * @param {Object} param0
 * @returns {Object}
 */
export const taskAggregateWith4PipeLine = async ({
  matchData,
  lookupData,
  projectData,
  groupData,
}) => {
  return await Task.aggregate([
    {
      $match: matchData,
    },
    {
      $lookup: lookupData,
    },
    {
      $project: projectData,
    },
    {
      $group: groupData,
    },
  ]);
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
    {
      new: true,
      lean: true,
      upsert: true,
    }
  );
  deleteCache(`groupedTask-${task.projectID._id}`);
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
  deleteCache(`groupedTask-${data.projectID._id}`);
  return data;
};

/**
 * Get Grouped Task Data
 * used by user
 * @param {String} id - user id
 * @returns {Object} - return task data
 */
export const aggregateData = async ({ matchData, groupData }) => {
  return await Task.aggregate([
    {
      $match: matchData,
    },
    {
      $group: groupData,
    },
  ]);
};

/**
 * Find workspace total workload status
 * @param {String} workspaceId  - workspace id
 * @returns - return array
 * it return workspace workload with its status and count
 */
export const workspaceWorkloadData = async (workspaceId) => {
  return await Task.aggregate([
    {
      $match: {
        workspaceId: mongoose.Types.ObjectId(`${workspaceId}`),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
};

/**
 * it return workspace workload data with its assigned users and therir workload count
 */
export const workspaceWorkloadWithAssignedUsers = async (workspaceId) => {
  return await Task.aggregate([
    {
      $match: {
        workspaceId: mongoose.Types.ObjectId(`${workspaceId}`),
        status: { $ne: "Completed" },
        Assigned: { $ne: null },
      },
    },
    {
      $group: {
        _id: "$Assigned",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $project: {
        _id: 1,
        count: 1,
        "user.name": 1,
        "user.email": 1,
      },
    },
  ]);
};

/**
 * It give single user workload
 * @param {*} workspaceId - workspace id
 * @param {*} userId - user id
 * @returns  {array} - task data
 */
export const usersWorkload = async (workspaceId, userId) => {
  return await Task.aggregate([
    {
      $match: {
        Assigned: mongoose.Types.ObjectId(`${userId}`),
        workspaceId: mongoose.Types.ObjectId(`${workspaceId}`),
      },
    },
    {
      $group: {
        _id: "$status",
        data: { $push: "$$ROOT" },
      },
    },
  ]);
};
