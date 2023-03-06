import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { fetchProductMembers } from "../../../features/users/Project";
import { useSelector } from "react-redux";
import { AssignTask } from "../../../api/apis";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";

export default function UserList({ close, taskId }) {
  const [members, setmembers] = useState(useSelector(fetchProductMembers));
  const [cookies, setCookies] = useCookies();
  console.log({ members });
  const handleSubmit = async (userId) => {
    const res = await AssignTask(taskId, userId, cookies.userJwt);
    console.log({ assignRes: res });
    if (res.status == 200) {
      close();
    }
  };
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black bg-opacity-60 focus:outline-none">
      <div className="relative  my-6 mx-auto max-w-3xl min-w-[40%] flex justify-center">
        <div
          className="border-0 rounded-lg shadow-lg relative   w-[60%] bg-white outline-none focus:outline-none p-10 text-center
        "
        >
          <div
            className="border-2 rounded-full w-7 cursor-pointer"
            onClick={() => close()}
          >
            X
          </div>
          <div className="overflow-y-scroll">
            {members.length != 0 ? (
              members.map((data) => (
                <>
                  <div
                    onClick={() => handleSubmit(data.memberId._id)}
                    className="flex py-3 cursor-pointer"
                  >
                    <div className="bg-red-500 w-10 h-10 rounded-full grid place-content-center text-white uppercase">
                      {data.memberId.email.split("")[0]}
                    </div>
                    <div className="mx-5 grid place-content-center overflow-hidden">
                      <p className="text-sm">{data.memberId.email}</p>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <div className="text-sm font-medium">No members</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
