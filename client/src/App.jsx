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

function App() {
  const [cookies, setCookies] = useCookies();
  useEffect(() => {
    let res;
    if (cookies.userJwt) {
      res = userAuthorization(cookies.userJwt);
    }
    if (!res) {
      localStorage.removeItem("Workspace");
      localStorage.removeItem("User");
    }
  }, []);
  return (
    <div>
      <Routes>
        {/* ===========Admin============ */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        {/* ========User=========== */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/otpVerification" element={<OtpPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
