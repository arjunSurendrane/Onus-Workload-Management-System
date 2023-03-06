import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../Component/User/Sidebar/Sidebar";
import TaskView from "../../Pages/TaskView";
import Chat from "../../Pages/User/Chat/Chat";
import Home from "../../Pages/User/Home/Home";
import LeaderBoard from "../../Pages/User/Leaderboard/LeaderBoard";
import Notification from "../../Pages/User/Notification/Notification";
import Online from "../../Pages/User/Online/Online";
import Profile from "../../Pages/User/Profile/Profile";
import DepartmentList from "../../Pages/User/Task/DepartmentList";
import TaskBoard from "../../Pages/User/Task/TaskBoard";
import Subscribe from "../../Pages/User/Upgrade/Subscribe";
import CreateDepartment from "../../Pages/User/Workspace/createDepartment";
import CreateWorkspace from "../../Pages/User/Workspace/createWorkspace";
import CreateTaskFromLogin from "../../Pages/User/Workspace/createTaskFromLogin";
import AddDepartmentPage from "../../Pages/User/Workspace/Add/addDepartmentPage";
import AddProjectPage from "../../Pages/User/Workspace/Add/addProjectPage";
import UserLogin from "../../Pages/User/Login/userLogin";
import UserSignup from "../../Pages/User/Signup/userSignup";
import OtpPage from "../../Pages/User/Login/OtpPage";
import ForgotPassword from "../../Pages/User/Login/forgotPasswordOtp";
import LandingPage from "../../Pages/User/LandingPage/LandingPage";
import UserOutlet from "./userOutlet";
import ErrorPage from "../../Pages/User/PageNotFound/errorPage.jsx";
import AddTask from "../../Component/User/Task/addTask";
import WorkspaceSettingsPage from "../../Pages/User/Workspace/SettingsPage/settings";

export default function UserRoutes() {
  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="notification" element={<Notification />} />
        <Route path="online" element={<Online />} />
        <Route path="chat" element={<Chat />} />
        <Route path="department/list" element={<DepartmentList />} />
        <Route path="department/board" element={<TaskBoard />} />
        <Route path="task" element={<TaskView />} />
        <Route path="leaderboard" element={<LeaderBoard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="subscribe" element={<Subscribe />} />

        <Route
          path="workspace/settings/:id"
          element={<WorkspaceSettingsPage />}
        />
        <Route path="addDepartment" element={<AddDepartmentPage />} />
        <Route path="addProject" element={<AddProjectPage />} />
        <Route path="addTask" element={<AddTask />} />
      </Routes>
    </div>
  );
}
