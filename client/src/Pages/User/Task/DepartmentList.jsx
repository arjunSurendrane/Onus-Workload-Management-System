import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import MenuButton from "../../../Component/User/TaskList/menuButton";
import Navbar from "../../../Component/User/Navbar/Navbar";
import Sidebar from "../../../Component/User/Sidebar/Sidebar";
import AddTask from "../../../Component/User/Task/addTask";
import List from "../../../Component/User/TaskList/List";

export default function DepartmentList() {
  const [cookies, setCookie] = useCookies();
  const history = useNavigate();
  useEffect(() => {
    if (!cookies.userJwt) {
      history("/");
    }
  });
  return (
    <div>
      <Sidebar />
      <Navbar
        heading={"List"}
        secHeading={"board"}
        thirdHeading={"calender"}
        active={"h"}
      />
      <div className="md:mx-[18%] absolute items-center">
        <List />
      </div>
      <MenuButton />
    </div>
  );
}
