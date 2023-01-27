import express from 'express';
import { createProject } from '../controller/projectController.js';
import { addDepartment, addMembers, createWorkspace, getWorkspace } from '../controller/workspaceController.js';
const router = express.Router();

// router.use(isUser)
router.post('/create', createWorkspace)
router.get('/getData', getWorkspace)
router.patch('/addMember/:id', addMembers)
router.patch('/addDepartment/:id', addDepartment)
router.post('/createProject/:id', createProject)



export default router
