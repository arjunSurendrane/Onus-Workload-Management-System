import Project from "../models/projectModal.js";
import Workspace from "../models/workSpaceModal.js";


export const createProject = async (req, res) => {
    console.log(req.body);
    try {
        const { projectName, workspaceId, department } = req.body
        const id = req.params.id;
        const project = new Project({
            projectName
        })
        const workspace = await Workspace.findOneAndUpdate({ _id: id, department }, { "department.project": project._id })
        console.log({ workspace })
        res.status(200).json({
            status: 'success',
            project
        })
        project.save()
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            error,
        })
    }
}

