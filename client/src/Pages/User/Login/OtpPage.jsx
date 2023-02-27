import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import OtpVerification from "../../../Component/User/Login and Signup/OtpVerification";

export default function OtpPage() {
  const [cookies, setCookie] = useCookies();
  const history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("User")) {
      history("/workspace");
    }
  });
  return (
    <div>
      <OtpVerification />
    </div>
  );
}
