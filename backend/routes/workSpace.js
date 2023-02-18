import express from "express";
import { createProject, projects } from "../controller/projectController.js";
import {
  allTasks,
  createTask,
  getAllTask,
} from "../controller/taskController.js";
import {
  addDepartment,
  addMembers,
  createWorkspace,
  getWorkspace,
} from "../controller/workspaceController.js";
const router = express.Router();

// router.use(isUser)
router.post("/create", createWorkspace);
router.patch("/addMember/:id", addMembers);
router.patch("/addDepartment/:id", addDepartment);
router.post("/createProject", createProject);
router.get("/getData", getWorkspace);
router.get("/tasks/:id", getAllTask);
router.post("/createTask", createTask);
router.get("/projects/:id", projects);
router.get("/alltasks", allTasks);

export default router;
