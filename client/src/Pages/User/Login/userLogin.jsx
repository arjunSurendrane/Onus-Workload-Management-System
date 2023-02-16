import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Login from "../../../Component/User/Login and Signup/Login";

export default function UserLogin() {
  const [cookies, setCookie] = useCookies();
  const history = useNavigate();
  useEffect(() => {
    if (cookies.userJwt) {
      history("/home");
    }
  });
  return (
    <div>
      <Login />
    </div>
  );
}
