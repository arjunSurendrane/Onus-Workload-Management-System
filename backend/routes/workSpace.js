import express from "express";
import { createProject, projects } from "../controller/projectController.js";
import {
  allTasks,
  createTask,
  getAllTask,
  streamAttachedFile,
} from "../controller/taskController.js";
import {
  addDepartment,
  addMembers,
  createWorkspace,
  getWorkspace,
} from "../controller/workspaceController.js";
import multer from 'multer'
const upload = multer({ dest: './assets/files' })
const router = express.Router();

// router.use(isUser)
router.post("/create", createWorkspace);
router.patch("/addMember/:id", addMembers);
router.patch("/addDepartment/:id", addDepartment);
router.post("/createProject", createProject);
router.get("/getData", getWorkspace);
router.get("/tasks/:id", getAllTask);
router.post("/createTask", upload.single('attachedFile'), createTask);
router.get("/projects/:id", projects);
router.get("/alltasks", allTasks);
router.get('/task/attachedFile/:key', streamAttachedFile)

export default router;
