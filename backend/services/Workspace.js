import Workspace from "../models/workSpaceModal.js";
import { getOrSetFunction, updateCacheMemory } from "../redis/redisFunction.js";

export const findWorkspace = async () => {
  try {
    console.log("compiler at findWorkspace");
    const data = await getOrSetFunction("workspaces", () => {
      return Workspace.find()
        .populate("Lead")
        .populate("members.memberId")
        .populate("department.project.projectId");
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateWorkspace = async (id, data) => {
  const res = await Workspace.findByIdAndUpdate(
    id,
    data,
    { new: true },
    { upsert: true }
  );
  updateCacheMemory(`workspace-${res._id}`, res);
  return res;
};

export const addDepartmentIntoWorkspace = async (id, data) => {
  const res = await Workspace.findByIdAndUpdate(
    id,
    {
      $push: {
        department: { departmentName: data },
      },
    },
    { new: true, upsert: true }
  );
  updateCacheMemory(`workspace-${data._id}`, data);
  console.log({ res });
  return res;
};

export const addMemberIntoWorkspace = async (id, memberId, role) => {
  const res = await Workspace.findByIdAndUpdate(
    id,
    {
      $push: {
        members: { memberId, role },
      },
    },
    { new: true, upsert: true }
  );
  return res;
};

export const updateProjectInWorkspace = async (
  _id,
  departmentID,
  projectId
) => {
  return await Workspace.findOneAndUpdate(
    { _id, "department._id": departmentID },
    { $push: { "department.$.project": { projectId } } },
    { new: true }
  );
};
