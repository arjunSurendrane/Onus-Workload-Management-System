import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Component/User/Navbar/Navbar";
import Chart from "../../../Component/User/Online/Chart";
import UserCard from "../../../Component/User/Online/userCard";
import Sidebar from "../../../Component/User/Sidebar/Sidebar";

export default function Online() {
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
      <Navbar heading={"Online"} active={"h"} />
      <div className="md:mx-[18%] absolute items-center">
        <Chart />
        <UserCard />
      </div>
    </div>
  );
}
