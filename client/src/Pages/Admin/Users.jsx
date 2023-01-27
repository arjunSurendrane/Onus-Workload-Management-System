import axios from "../../api/index";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../Component/Admin/Sidebar/AdminSidebar";
import UserManagementComponent from "../../Component/Admin/UserDetails/userDetails";
import {
  fetchUser,
  selectAllUser,
  selectAllUserStatus,
} from "../../features/Admin/allUserSlice";

export default function UserManagement() {
  const dispatch = useDispatch();
  const userlistStatus = useSelector(selectAllUserStatus);
  const usersList = useSelector(selectAllUser);
  const [cookie, setCookie] = useCookies();
  const [block, setBlock] = useState(false);

  // useEffect
  useEffect(() => {
    const res = dispatch(fetchUser(cookie.adminJwt));
    console.log({ res });
  }, [block]);

  // blockUser function
  const blockUser = async (email, value) => {
    const res = await axios.post(
      "/admin/blockuser",
      { email, value },
      {
        headers: {
          authorization: `Bearer ${cookie.adminJwt}`,
        },
      }
    );
    setBlock((block) => !block);
    console.log({ block, res });
  };

  // return
  return (
    <div>
      <AdminSidebar />
      <div className="md:mx-[18%] absolute items-center">
        <UserManagementComponent
          usersList={usersList}
          blockUser={(email, value) => blockUser(email, value)}
        />
      </div>
    </div>
  );
}
