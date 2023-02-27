import express from "express";
import { createProject, projects } from "../controller/project.js";
import {
  allTasks,
  changePriority,
  changeTaskStatus,
  createTask,
  deleteTask,
  getAllTask,
  getOneTask,
  streamAttachedFile,
} from "../controller/task.js";
import {
  addDepartment,
  addMembers,
  createWorkspace,
  getWorkspace,
} from "../controller/workspace.js";
import multer from 'multer'
import { isUser } from "../middleware/userAuth.js";
const upload = multer({ dest: './assets/files' })
const router = express.Router();

// router.use(isUser)
router.get('/task/attachedFile/:key', streamAttachedFile)
router.use(isUser)
router.post("/create", createWorkspace);
router.post("/createTask", upload.single('attachedFile'), createTask);
router.post("/createProject", createProject);
router.patch("/addMember/:id", addMembers);
router.patch("/addDepartment/:id", addDepartment);
router.patch('/changetaskstatus/:id', changeTaskStatus)
router.patch('/changePriority/:id', changePriority)
router.delete('/deleteTask/:id', deleteTask)
router.get("/getData", getWorkspace);
router.get("/tasks/:id", getAllTask);
router.get("/task/:id", getOneTask)
router.get("/projects/:id", projects);
router.get("/alltasks", allTasks);

export default router;
