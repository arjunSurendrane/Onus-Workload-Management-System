import Task from "../models/taskModal.js";
import { groupTasks } from "../services/Task.js";
import { updateProjectWithTaskData } from "../services/Project.js";
import { uploadFile } from '../utils/s3.js'



// group all task with its status
export const getAllTask = async (req, res) => {
  try {
    const projectID = req.params.id;
    const tasks = await groupTasks(projectID);
    res.status(200).json({
      status: "success",
      tasks,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: `${error}`,
    });
  }
};

// create task
export const createTask = async (req, res) => {
  try {
    const { projectId, taskName, description, dueDate } = req.body;
    const uploadResult = await uploadFile(req.file)
    console.log({ uploadResult })
    const link = uploadResult.Key;
    const newTask = new Task({
      taskName, description, dueDate, attachedfiles: [{ link }],
      createdBy: req.user._id, projectID: projectId,
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

  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "error",
      error: `${error}`,
    });
  }
};

// get allTask in an array
export const allTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    tasks,
  });
};
