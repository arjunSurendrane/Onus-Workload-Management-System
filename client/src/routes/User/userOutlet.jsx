import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

function UserOutlet() {
  const data = localStorage.getItem("User");
  if (data) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}

export default UserOutlet;
