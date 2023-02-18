import mongoose from "mongoose";
import Task from "../models/taskModal.js";

export const groupTasks = async (projectID) => {
  const res = await Task.aggregate([
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
  console.log(res);
  return res;
};
