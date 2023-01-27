import Workspace from "../models/workSpaceModal.js";


export const findWorkspace = async () => {
    return await Workspace.find().populate('Lead').populate('members.memberId')
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