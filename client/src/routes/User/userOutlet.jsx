import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UserOutlet() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.user.user);
  if (data.admin) {
    return <Outlet />;
  }
  return navigate("/");
}

export default UserOutlet;
