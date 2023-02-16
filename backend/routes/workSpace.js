import express from "express";
import { createProject } from "../controller/projectController.js";
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

export default router;
