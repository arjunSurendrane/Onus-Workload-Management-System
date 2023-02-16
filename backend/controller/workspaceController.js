import Project from "../models/projectModal.js";
import Workspace from "../models/workSpaceModal.js";
import { addDepartmentIntoWorkspace, findWorkspace, updateWorkspace } from "../services/Workspace.js";

// create token and send response
const successresponse = async (res, statusCode, data) => {
    res.status(statusCode).json({
        status: 'success',
        data
    })
}

// send error response
const errorResponse = async (res, statusCode, error) => {
    res.status(statusCode).json({
        status: 'fail',
        error
    })
}

// Create WorkSpace 

export const createWorkspace = async (req, res) => {
    try {
        console.log(req.body)
        const { name, departmentName, projectName } = req.body
        const project = new Project({
            projectName
        })
        const workspace = new Workspace({
            Name: name,
            Lead: req.user._id,
            department: {
                departmentName,
                project: [{ projectId: project._id }]
            }
        })
        await Promise.all([project.save(), workspace.save()])
        console.log({ workspace, project })
        successresponse(res, 200, workspace);
    } catch (error) {
        console.log(error)
        errorResponse(res, 404, error)

    }
}

// Get WorkSpaceData
export const getWorkspace = async (req, res) => {
    try {
        const workspace = await findWorkspace();
        successresponse(res, 200, workspace)
    } catch (error) {
        errorResponse(res, 404, error)
    }
}


// Add Department into Workspace
export const addDepartment = async (req, res) => {
    try {
        console.log(req.body)
        const departmentName = req.body.name;
        const id = req.params.id
        console.log(departmentName, id)
        const workspace = await addDepartmentIntoWorkspace(id, departmentName)
        res.status(200).json({ status: 'success', workspace })
    } catch (error) {
        res.status(404).json({ status: 'error', error: `${error}` })
    }
}


// Add members into Workspace
export const addMembers = async (req, res) => {
    try {
        console.log(req.body)
        const { members } = req.body
        const newWorkSpace = await Workspace.findOneAndUpdate({ _id: req.params.id }, {
            $push: {
                members: { memberId: members }
            }
        }, { new: true, upsert: true })
        console.log(newWorkSpace)
        successresponse(res, 200, newWorkSpace)
    } catch (error) {
        errorResponse(res, 404, `error : ${error}`)
    }
}