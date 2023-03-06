import React, { useEffect, useState } from "react";
import { HiOutlineHome, HiStatusOnline } from "react-icons/hi";
import { AiOutlineNotification, AiFillSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { BiChat } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdWorkspacesOutline } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import { CgMoveTask } from "react-icons/cg";
import { GiUpgrade } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { MdSpaceDashboard, MdLeaderboard } from "react-icons/md";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { useCookies } from "react-cookie";
import CreateWorkspace from "../../workSpaceForm";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu } from "@mui/material";
import { Option, Select } from "@material-tailwind/react";
import AddDepartment from "../Workspace/Add/addDepartment";
import { useDispatch } from "react-redux";
import { createProjectId, addMembers } from "../../../features/users/Project";
import { userAuthorization } from "../../../api/apis";
import { FcVideoProjector } from "react-icons/fc";

export default function TrialSidebar() {
  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }
  const [cookies, setCookies, removeCookies] = useCookies();
  const [open, setOpen] = useState(0);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));
  const dispatch = useDispatch();
  const [showList, setShowList] = useState(false);
  const [showTask, setShowTask] = useState("-1");
  const [addDepartment, setAddDepartment] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [departmentID, setDepartmentID] = useState("");
  const [roleMember, setRoleMember] = useState(false);
  const [workspace, setWorkspace] = useState(user.memberOf[0]);
  useEffect(() => {
    const workspaceData = JSON.parse(localStorage.getItem("Workspace"));
    console.log({ useEffectData: workspaceData });
    if (workspaceData) {
      dispatch(addMembers(workspaceData.workspace.members));
      const data = user.memberOf.filter((el) => el._id == workspaceData._id);
      console.log({ workspaceData: data });
      setWorkspace(data[0]);
    }
    workspace.role == "Member" ? setRoleMember(true) : setRoleMember(false);
    localStorage.setItem("Workspace", JSON.stringify({ ...workspace }));
  }, [user]);

  console.log({ workspace: workspace });

  const history = useNavigate();
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const handleChange = (id) => {
    dispatch(createProjectId(id));
    const data = JSON.parse(localStorage.getItem("Workspace"));
    dispatch(addMembers(data.workspace.members));
    history("/department/list");
  };
  const handleChangeWorkspace = (key) => {
    setWorkspace(user.memberOf[key]);
    localStorage.setItem(
      "Workspace",
      JSON.stringify({ ...user.memberOf[key] })
    );
    console.log(user.memberOf[key].role);
    user.memberOf[key].role == "Member"
      ? setRoleMember(true)
      : setRoleMember(false);
    console.log({ roleMember });
  };
  return (
    <>
      <div className="md:visible invisible">
        <aside className="w-64" aria-label="Sidebar">
          <div className="overflow-y-auto absolute z-[-1] border-r-2 py-36 px-3  w-[17%]  h-[900px] max-h-full">
            <ul className="space-y-2 px-2">
              <li onClick={() => history("/home")}>
                <a
                  href="#"
                  className=" flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                >
                  <HiOutlineHome size={20} />

                  <span className="ml-3 font-medium text-sm">Home</span>
                </a>
              </li>
              <li onClick={() => history("/notification")}>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                >
                  <AiOutlineNotification size={20} />

                  <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                    Notification
                  </span>
                </a>
              </li>
              <li onClick={() => history("/online")}>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                >
                  <HiStatusOnline size={20} />
                  <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                    Online
                  </span>
                </a>
              </li>
              <li onClick={() => history("/chat")}>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                >
                  <BiChat size={20} />
                  <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                    Chat
                  </span>
                </a>
              </li>
              <hr />
              <li className="cursor-pointer" onClick={() => setShowTask("-1")}>
                <div className="flex justify-between text-sm ml-3 whitespace-nowrap text-[#332778] font-bold ">
                  <select
                    name="workspace"
                    id=""
                    className="focus:outline-none uppercase overflow-hidden w-[75%]"
                    onChange={(e) => handleChangeWorkspace(e.target.value)}
                  >
                    {user.memberOf.map((data, key) => (
                      <option value={key} className="py-5 px-5">
                        {data?.workspace?.Name}
                      </option>
                    ))}
                  </select>
                  <IoSettingsOutline
                    size={20}
                    className="w-[25%]"
                    onClick={() =>
                      history(
                        `/workspace/settings/${workspace?.workspace?._id}`
                      )
                    }
                  />
                </div>
              </li>
              {!roleMember && (
                <li className="bg-gray-200 rounded-lg overflow-hidden mt-2">
                  <a
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                    onClick={() => setAddDepartment(true)}
                  >
                    <GrFormAdd size={20} />
                    <span className="flex-1  px-2 whitespace-nowrap font-medium lg:text-xs text-[9px] text-gray-500 uppercase">
                      Add Department
                    </span>
                  </a>
                </li>
              )}

              {workspace &&
                workspace?.workspace?.department.map((data, i) => (
                  <li className=" rounded-lg overflow-hidden" key={i}>
                    <a
                      href="#"
                      className="flex items-center text-base font-normal text-gray-900 rounded-lg mt-2 hover:bg-gray-100 dark:hover:bg-gray-100"
                      onClick={() => {
                        setShowTask((showTask) =>
                          showTask == `${i}` ? "-1" : `${i}`
                        );
                      }}
                    >
                      <FcVideoProjector />
                      <span className="flex-1 text-sm ml-3 whitespace-nowrap font-bold capitalize text-gray-700 overflow-hidden">
                        {data?.departmentName}
                      </span>
                    </a>
                    {showTask == `${i}` ? (
                      <ul className="px-5 mt-3">
                        {!roleMember && (
                          <li>
                            <a
                              href="#"
                              className="flex items-center  p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                              onClick={() => {
                                setAddProject(true);
                                setDepartmentID(data._id);
                              }}
                            >
                              <GrFormAdd size={20} />
                              <span className="flex-1  px-2 whitespace-nowrap font-medium lg:text-xs text-[9px] text-gray-500 uppercase">
                                Add Project
                              </span>
                            </a>
                          </li>
                        )}

                        {data.project.map((data, j) => (
                          <>
                            <li key={j}>
                              <a
                                href="#"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                                onClick={() => {
                                  handleChange(data.projectId._id);
                                }}
                              >
                                <CgMoveTask size={20} />
                                <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium overflow-hidden">
                                  {data?.projectId?.projectName}
                                </span>
                              </a>
                            </li>
                          </>
                        ))}
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
              <hr />
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                  onClick={() => {
                    history("/leaderboard");
                  }}
                >
                  <MdLeaderboard size={20} />
                  <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                    Leader Board
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                  onClick={() => {
                    history("/profile");
                  }}
                >
                  <ImProfile size={20} />
                  <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                    Profile
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                  onClick={() => history("/subscribe")}
                >
                  <GiUpgrade size={20} />
                  <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                    Upgrade
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                >
                  <FiLogOut size={20} />
                  <span
                    className="flex-1 ml-3 text-sm whitespace-nowrap font-medium"
                    onClick={() => {
                      localStorage.clear();
                      history("/");
                    }}
                  >
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      {addDepartment && (
        <AddDepartment
          button={"Create"}
          nextLink={"department"}
          activeStep={"Create Department"}
          placeholder={"Enter Department Name"}
          close={() => {
            setUser(JSON.parse(localStorage.getItem("User")));
            setAddDepartment(false);
          }}
        />
      )}
      {addProject && (
        <AddDepartment
          button={"Create"}
          nextLink={"project"}
          activeStep={"Create Project"}
          placeholder={"Enter Project Name"}
          departmentID={departmentID}
          close={() => {
            setUser(JSON.parse(localStorage.getItem("User")));

            setAddProject(false);
          }}
        />
      )}
    </>
  );
}
