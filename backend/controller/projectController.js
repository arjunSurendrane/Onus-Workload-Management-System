import mongoose from "mongoose";
import Project from "../models/projectModal.js";
import Workspace from "../models/workSpaceModal.js";

export const createProject = async (req, res) => {
  console.log(req.body);
  try {
    const { projectName, workspaceId, departmentID } = req.body;
    const id = req.params.id;
    const project = new Project({
      projectName,
    });
    const [workspace, projectSave] = await Promise.all([
      Workspace.findOneAndUpdate(
        { _id: workspaceId, "department._id": departmentID },
        { $push: { "department.$.project": { projectId: project._id } } },
        { new: true }
      ),
      project.save(),
    ]);
    console.log({ workspace });
    res.status(200).json({
      status: "success",
      project,
      workspace,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    });
  }
};

export const projects = async (req, res) => {
  const projectID = req.params.id;
  console.log(projectID);
  const projects = await Project.aggregate([
    [
      {
        $match: {
          _id: mongoose.Types.ObjectId("63ee28395da037558c752630"),
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
  res.json({
    projects,
  });
};
