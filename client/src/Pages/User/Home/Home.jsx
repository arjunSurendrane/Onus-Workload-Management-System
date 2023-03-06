import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LineUp from "../../../Component/User/Home/LineUp";
import MyWork from "../../../Component/User/Home/MyWork";
import Navbar from "../../../Component/User/Navbar/Navbar";
import Sidebar from "../../../Component/User/Sidebar/Sidebar";

export default function Home() {
  const [cookies, setCookie] = useCookies();
  const history = useNavigate();
  console.log({ User: localStorage.getItem("User") });
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("User"));
    if (data.memberOf.length == 0) {
      history("/createWorkspace");
    }
  });
  return (
    <div>
      <Navbar heading={"Home"} active={"h"} />
      <div className="md:mx-[18%] absolute">
        <LineUp />
        <MyWork />
      </div>
    </div>
  );
}
