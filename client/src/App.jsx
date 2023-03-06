import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/User/LandingPage/LandingPage";
import ForgotPassword from "./Pages/User/Login/forgotPasswordOtp";
import OtpPage from "./Pages/User/Login/OtpPage";
import UserLogin from "./Pages/User/Login/userLogin";
import UserSignup from "./Pages/User/Signup/userSignup";
import AdminLoginPage from "./Pages/Admin/login";
import { useCookies } from "react-cookie";
import AdminRoutes from "./routes/Admin/adminRoutes";
import UserRoutes from "./routes/User/userRoutes";
import axios from "./api/index";
import { userAuthorization } from "./api/apis";
import ConfrimInvitation from "./Pages/User/InviteConfirmation/confrimInvitation";
import UserOutlet from "./routes/User/userOutlet";
import CreateWorkspace from "./Pages/User/Workspace/createWorkspace";
import CreateDepartment from "./Pages/User/Workspace/createDepartment";
import CreateTaskFromLogin from "./Pages/User/Workspace/createTaskFromLogin";

function App() {
  const [cookies, setCookies] = useCookies();
  useEffect(() => {
    let res;
    if (cookies.userJwt) {
      res = userAuthorization(cookies.userJwt);
    }
  }, []);
  return (
    <div>
      <Routes>
        {/* ===========Admin============ */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        {/* ========User=========== */}
        <Route path="/accept/:id" element={<ConfrimInvitation />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/otpVerification" element={<OtpPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/" element={<UserOutlet />}>
          <Route path="createWorkspace" element={<CreateWorkspace />} />
          <Route path="createDepartment" element={<CreateDepartment />} />
          <Route path="createProject" element={<CreateTaskFromLogin />} />
          <Route path="/*" element={<UserRoutes />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
