import Workspace from "../models/workSpaceModal.js";
import { getOrSetFunction } from "../redis/redisFunction.js";


export const findWorkspace = async () => {
    try {
        console.log('compiler at findWorkspace')
        const data = await getOrSetFunction('workspaces', () => { return Workspace.find().populate('Lead').populate('members.memberId').populate('department.project.projectId') })
        console.log({ data })
        return data
    } catch (error) {
        console.log(error)
        return error

    }
}

export const updateWorkspace = async (id, data) => {
    return await Workspace.findByIdAndUpdate(id, data, { new: true }, { upsert: true });
}


export const addDepartmentIntoWorkspace = async (id, data) => {
    const res = await Workspace.findByIdAndUpdate(id, {
        $push: {
            department: { departmentName: data }
        }
    }, { new: true, upsert: true });
    console.log({ res })
    return res
}