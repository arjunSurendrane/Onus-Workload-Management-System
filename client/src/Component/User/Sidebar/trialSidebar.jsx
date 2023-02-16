import React, { useEffect, useState } from "react";
import { HiOutlineHome, HiStatusOnline } from "react-icons/hi";
import { AiOutlineNotification } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { BiChat } from "react-icons/bi";
import { MdWorkspacesOutline } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import { CgMoveTask } from "react-icons/cg";
import { GiUpgrade } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { MdSpaceDashboard, MdLeaderboard } from "react-icons/md";
import { useCookies } from "react-cookie";
import CreateWorkspace from "../../workSpaceForm";
import { useNavigate } from "react-router-dom";
import { Menu } from "@mui/material";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

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
  const [user, setUser] = useState();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const [showList, setShowList] = useState(false);
  const [showTask, setShowTask] = useState("0");
  const [workspace, setWorkspace] = useState(
    JSON.parse(localStorage.getItem("Workspace"))
  );
  const history = useNavigate();
  const [showModal, setShowModal] = useState(false);
  console.log({ workspace });
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
              {/* <li>
                <span className="flex-1 text-sm ml-3 whitespace-nowrap text-gray-500 font-bold">
                  Workspace
                </span>
              </li> */}
              <li className="cursor-pointer" onClick={() => setShowTask("-1")}>
                <span className="flex-1 text-sm ml-3 whitespace-nowrap text-gray-500 font-bold">
                  {workspace?.Name}
                </span>
              </li>
              <li className="bg-gray-200 rounded-lg overflow-hidden mt-2">
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                  onClick={() => history("/addDepartment")}
                >
                  <GrFormAdd size={20} />
                  <span className="flex-1  px-2 whitespace-nowrap font-medium lg:text-xs text-[9px] text-gray-500 uppercase">
                    Add Department
                  </span>
                </a>
              </li>

              {workspace.department.map((data, i) => (
                <li className=" rounded-lg overflow-hidden">
                  <a
                    href="#"
                    className="flex items-center text-base font-normal text-gray-900 rounded-lg mt-2 hover:bg-gray-100 dark:hover:bg-gray-100"
                    onClick={() => {
                      setShowTask((showTask) =>
                        showTask == `${i}` ? "-1" : `${i}`
                      );
                    }}
                  >
                    <div className="w-6  bg-[#251f49] h-6 rounded-full items-center flex justify-center">
                      <p className="text-white text-[9px] font-bold">{"D"}</p>
                    </div>
                    <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
                      {data?.departmentName}
                    </span>
                  </a>
                  {showTask == `${i}` ? (
                    <ul className="px-5 mt-3">
                      <li>
                        <a
                          href="#"
                          className="flex items-center  p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                          onClick={() => history("/addDepartment")}
                        >
                          <GrFormAdd size={20} />
                          <span className="flex-1  px-2 whitespace-nowrap font-medium lg:text-xs text-[9px] text-gray-500 uppercase">
                            Add Project
                          </span>
                        </a>
                      </li>
                      {data.project.map((data, j) => (
                        <>
                          <li>
                            <a
                              href="#"
                              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-100"
                              onClick={() => {
                                history("/profile");
                              }}
                            >
                              <CgMoveTask size={20} />
                              <span className="flex-1 text-sm ml-3 whitespace-nowrap font-medium">
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
                    onClick={() => removeCookies("userJwt")}
                  >
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      {showModal && <CreateWorkspace close={() => setShowModal(false)} />}
    </>
  );
}
