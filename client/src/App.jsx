import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/User/LandingPage/LandingPage";
import ForgotPassword from "./Pages/User/Login/forgotPasswordOtp";
import OtpPage from "./Pages/User/Login/OtpPage";
import UserLogin from "./Pages/User/Login/userLogin";
import UserSignup from "./Pages/User/Signup/userSignup";
import AdminLoginPage from "./Pages/Admin/login";
import { useCookies } from "react-cookie";
import AdminRoutes from "./routes/User/adminRoutes";
import UserRoutes from "./routes/Admin/userRoutes";

function App() {
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
