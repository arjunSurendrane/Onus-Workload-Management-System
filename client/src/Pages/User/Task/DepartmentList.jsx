import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import MenuButton from "../../../Component/User/TaskList/menuButton";
import Navbar from "../../../Component/User/Navbar/Navbar";
import AddTask from "../../../Component/User/Task/addTask";
import List from "../../../Component/User/TaskList/List";
import { useSelector } from "react-redux";
import { fetchProductId } from "../../../features/users/Project";
import { fetchTask } from "../../../api/apis";
import useSWR from "swr";

export default function DepartmentList() {
  const [cookies, setCookie] = useCookies();
  const history = useNavigate();
  const productID =
    useSelector(fetchProductId) || localStorage.getItem("ProjectId");
  useEffect(() => {
    if (!cookies.userJwt) {
      history("/");
    }
  });
  const {
    isLoading,
    error,
    data: tasks,
  } = useSWR({ id: productID, cookies: cookies.userJwt }, fetchTask);
  if (isLoading) {
    console.log("loading...");
  } else if (error) {
    console.log("error");
  } else {
    console.log("data");
    console.log({ tasks });
    return (
      <div>
        <Navbar
          heading={"List"}
          secHeading={"board"}
          thirdHeading={"calender"}
          active={"h"}
        />
        <div className="md:mx-[18%] absolute items-center">
          <List tasks={tasks} />
        </div>
        <MenuButton />
      </div>
    );
  }
}
