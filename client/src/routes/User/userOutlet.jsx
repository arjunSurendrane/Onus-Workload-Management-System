import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

function UserOutlet() {
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookies.userJwt) {
      return <Navigate to="/login" />;
    }
  }, []);
  if (cookies.userJwt) {
    console.log("userOutlet");
    return <Outlet />;
  }
}

export default UserOutlet;
