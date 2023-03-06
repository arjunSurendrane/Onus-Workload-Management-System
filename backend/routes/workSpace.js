import express from "express";
import { createProject, projects } from "../controller/project.js";
import {
  allTasks,
  assignTask,
  changePriority,
  changeTaskStatus,
  createTask,
  deleteTask,
  groupAllTaks,
  getOneTask,
  streamAttachedFile,
  TaskUpdate,
} from "../controller/task.js";
import {
  addDepartment,
  addMembers,
  createWorkspace,
  getWorkspace,
  sendInvitation,
} from "../controller/workspace.js";
import multer from "multer";
import { isUser } from "../middleware/userAuth.js";
const upload = multer({ dest: "./assets/files" });
const router = express.Router();

// router.use(isUser)
router.get("/task/attachedFile/:key", streamAttachedFile);
router.patch("/member/:id", addMembers);
router.get("/task", allTasks);
router.use(isUser);
router.post("/", createWorkspace);
router.post("/task", upload.single("attachedFile"), createTask);
router.post("/project", createProject);
router.post("/invitation/:id", sendInvitation);
router.patch("/department/:id", addDepartment);
router.patch("/task/status/:id", changeTaskStatus);
router.patch("/task/priority/:id", changePriority);
router.patch("/task/:id", TaskUpdate);
router.patch("/task/assign", assignTask);
router.delete("/task/:id", deleteTask);
router.get("/", getWorkspace);
router.get("/tasks/:id/list", groupAllTaks);
router.get("/task/:id", getOneTask);
router.get("/projects/:id", projects);

export default router;
