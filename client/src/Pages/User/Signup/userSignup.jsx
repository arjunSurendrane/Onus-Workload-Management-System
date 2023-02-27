import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Signup from "../../../Component/User/Login and Signup/Signup";

export default function UserSignup() {
  const [cookies, setCookie] = useCookies();
  const history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("User")) {
      history("/workspace");
    }
  });
  return (
    <div>
      <Signup />
    </div>
  );
}
