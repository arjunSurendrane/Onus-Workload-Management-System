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
