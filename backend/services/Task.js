import mongoose from "mongoose";
import Task from "../models/taskModal.js";
import { deleteCache, getOrSetFunction, updateCacheMemory } from "../redis/redisFunction.js";

export const groupTasks = async (projectID) => {

  const data = await getOrSetFunction(`groupedTask-${projectID}`, () => {
    return Task.aggregate([
      {
        $match: {
          projectID: mongoose.Types.ObjectId(`${projectID}`),
        },
      },
      {
        $group: {
          _id: "$status",
          data: { $push: "$$ROOT" },
        },
      },
    ]);
  })
  console.log({ groupTask: data });
  return data;
};


export const getTask = async (id) => {
  const data = await getOrSetFunction(`task-${id}`, () => { return Task.findById(id) })
  return data
}

export const changeStatus = async (id, status) => {
  const data = await Task.findByIdAndUpdate(id, { status }, { new: true })
  deleteCache(`groupedTask-${data.projectID}`)
  updateCacheMemory(`task-${id}`, data)
  return data
}

export const changeTaskPriority = async (id, priority) => {
  const data = await Task.findByIdAndUpdate(id, { priority }, { new: true })
  deleteCache(`groupedTask-${data.projectID}`)
  updateCacheMemory(`task-${id}`, data)
  return data
}


export const deleteTaskUsingId = async (id) => {
  const data = await Task.findByIdAndDelete(id)
  deleteCache(`task-${id}`)
  console.log({ data })
  deleteCache(`groupedTask-${data.projectID}`)
  return data
}

