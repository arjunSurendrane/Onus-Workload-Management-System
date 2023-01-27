import Project from '../models/taskModal';


export const AllProjects = async () => {
    return await Project.find();
}

export const FindOneProject = async (id) => {
    return await Project.findById(id);
}

export const UpdateProject = async (id, data) => {
    return await Project.findByIdAndUpdate(id, data, { new: true });
}


export const DeleteProject = async (id) => {
    return await Project.findByIdAndDelete(id);
}

