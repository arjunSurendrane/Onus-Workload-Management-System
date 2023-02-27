import Project from "../models/taskModal.js";
import { deleteCache, getOrSetFunction, updateCacheMemory } from "../redis/redisFunction.js";

export const AllProjects = async () => {
  const data = await getOrSetFunction('tasks', () => { return Project.find(); })
  return data
};

export const FindOneProject = async (id) => {
  const data = await getOrSetFunction(`project-${id}`, () => { return Project.findById(id); })
  return data
};

export const UpdateProject = async (id, data) => {
  const res = await Project.findByIdAndUpdate(id, data, { new: true });
  updateCacheMemory(`project-${id}`, res)
  return res
};

export const DeleteProject = async (id) => {
  updateCacheMemory(`project-${id}`, null)
  return await Project.findByIdAndDelete(id);
};

export const updateProjectWithTaskData = async (projectId, newTask) => {
  const data = await Project.findByIdAndUpdate(
    projectId,
    {
      $push: { task: { taskName: newTask._id } },
    },
    { new: true }
  );
  deleteCache(`groupedTask-${projectId}`)
  updateCacheMemory(`project-${projectId}`, data)
  return data
};
