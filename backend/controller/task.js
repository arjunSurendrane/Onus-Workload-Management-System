import Task from "../models/taskModal.js";
import { changeStatus, changeTaskPriority, deleteTaskUsingId, getTask, groupTasks } from "../services/Task.js";
import { updateProjectWithTaskData } from "../services/Project.js";
import { getFileStream, uploadFile } from '../utils/s3.js'



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
    console.log(error)
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
    let link
    if (req.file) {
      const uploadResult = await uploadFile(req.file)
      console.log({ uploadResult })
      link = uploadResult.Key;
    }
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


//get task file
export const streamAttachedFile = async (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res)
}

// get allTask in an array
export const allTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    tasks,
  });
};

export const getOneTask = async (req, res) => {
  const id = req.params.id
  const task = await getTask(id)
  res.status(200).json({
    status: 'success',
    task
  })
}

export const changeTaskStatus = async (req, res) => {
  const { status } = req.body;
  const id = req.params.id
  const task = changeStatus(id, status)
  res.json({ status: 'success', task })
}

export const changePriority = async (req, res) => {
  const { priority } = req.body;
  const id = req.params.id
  const task = changeTaskPriority(id, priority)
  res.json({ status: 'success', task })
}



export const deleteTask = async (req, res) => {
  const id = req.params.id
  const task = deleteTaskUsingId(id)
  res.status(204).json({ status: 'success' })
}
