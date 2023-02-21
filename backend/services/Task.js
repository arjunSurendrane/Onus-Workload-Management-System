import mongoose from "mongoose";
import Task from "../models/taskModal.js";
import { getOrSetFunction } from "../redis/redisFunction.js";

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
  console.log(data);
  return data;
};
