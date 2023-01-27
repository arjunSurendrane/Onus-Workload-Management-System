import { Avatar } from "@mui/material";
import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineUserAdd } from "react-icons/ai";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { CgFlagAlt } from "react-icons/cg";
import { BiMessageDetail } from "react-icons/bi";

const content = [
  {
    department: "marketing",
    task: "edit marketing video",
    notifications: [
      {
        profile: "url",
        name: "Arjun",
        content: "add comment",
        updatedData: "this is a good task",
      },
      {
        profile: "url",
        department: "marketing",
        task: "edit marketing video",
        name: "Arjun",
        content: "add comment",
        updatedData: "this is a good task",
      },
    ],
  },
  {
    department: "marketing",
    task: "edit marketing video",
    notifications: [
      {
        profile: "url",
        name: "Arjun",
        content: "add comment",
        updatedData: "this is a good task",
      },
      {
        profile: "url",
        department: "marketing",
        task: "edit marketing video",
        name: "Arjun",
        content: "add comment",
        updatedData: "this is a good task",
      },
    ],
  },
];

export default function UserProfile({ closeModal, user }) {
  const data = [
    {
      label: "HTML",
      value: "html",
      desc: `It really matters and then like it really doesn't matter.
          What matters is the people who are sparked by it. And the people 
          who are like offended by it, it doesn't matter.`,
    },
    {
      label: "React",
      value: "react",
      desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
    },

    {
      label: "Vue",
      value: "vue",
      desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're 
          constantly trying to express ourselves and actualize our dreams.`,
    },

    {
      label: "Angular",
      value: "angular",
      desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
    },

    {
      label: "Svelte",
      value: "svelte",
      desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're 
          constantly trying to express ourselves and actualize our dreams.`,
    },
  ];
  return (
    <div>
      <Tabs value="html">
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black bg-opacity-60 focus:outline-none">
          <div className="flex w-[100vw] h-[100vh]">
            <div className="w-[40%]  h-full bg-white bg-opacity-0"></div>
            <div className="w-[60%] h-full bg-white bg-opacity-0 flex">
              <div className="">
                <div
                  className="rounded-full bg-gray-200 px-2 py-2 m-5 shadow-xl cursor-pointer"
                  onClick={() => closeModal()}
                >
                  <AiOutlineClose size={20} />
                </div>
              </div>

              <div className="bg-white w-full border border-t-4 border-t-[#7b68ee] rounded-t-md">
                <div className="w-full  shadow-lg">
                  <div className="w-full flex justify-arounnd py-8 px-8">
                    <div>
                      <Avatar sx={{ width: 64, height: 64 }}>H</Avatar>
                    </div>
                    <div className=" w-full flex justify-between ml-5">
                      <div className="w-[50%]">
                        <div>
                          <h1 className="text-xl font-medium">{user.name}</h1>
                        </div>
                        <div className="w-full flex justify-between">
                          <div>
                            <input type="text" placeholder="add discription" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">
                              arjunrk907@gmail.com
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="bg-green-100 p-2 rounded">
                          {" "}
                          <p className="text-green-600 font-bold text-xs">
                            Online
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-8 pb-2 flex justify-between">
                    <TabsHeader>
                      <div>
                        <Tab
                          key={"activity"}
                          value={"activity"}
                          className="mx-5"
                        >
                          <p className="font-medium">Activity</p>
                        </Tab>
                      </div>
                      <div>
                        <Tab key={"myWork"} value={"myWork"} className="mx-5">
                          <p className="font-medium">My Work</p>
                        </Tab>
                      </div>
                      <div>
                        <Tab
                          key={"assigned"}
                          value={"assigned"}
                          className="mx-5"
                        >
                          <p className="font-medium">Assigned</p>
                        </Tab>
                      </div>
                      <div>
                        <Tab
                          key={"performance"}
                          value={"performance"}
                          className="mx-5"
                        >
                          <p className="font-medium">Perfomance</p>
                        </Tab>
                      </div>
                    </TabsHeader>
                  </div>
                </div>
                <div className="w-full">
                  <div>
                    <TabsBody>
                      <TabPanel key={"activity"} value={"activity"}>
                        <div>
                          <div>
                            <p>Activity</p>
                          </div>
                          {content.map((data, key) => (
                            <div className=" my-5  w-full flex justify-between px-2 border border-t-4 border-t-[#7b68ee] shadow-lg rounded">
                              <div className="w-full">
                                <div className="px-2 py-2">
                                  <h6 className="text-[11px] font-medium text-gray-500">
                                    {data.department}
                                    {">"}
                                    {data.task}
                                  </h6>
                                  <h2 className="font-medium">
                                    Click Here to Open the task
                                  </h2>
                                </div>
                                {data.notifications.map((data, key) => (
                                  <>
                                    <hr />
                                    <div
                                      className="md:px-4 px-1 py-2 flex"
                                      key={key}
                                    >
                                      <div className="w-7  bg-[#251f49] h-7 rounded-full items-center flex justify-center">
                                        <p className="text-white text-sm font-bold">
                                          AB
                                        </p>
                                      </div>
                                      <div className="ml-3">
                                        <p className="md:text-sm text-[10px]">
                                          {data.name}
                                        </p>
                                      </div>
                                      <div className="ml-3 bg-gray-200 rounded-2xl px-2 py-0 h-5">
                                        <p className="md:text-[11px] text-[8px] font-medium">
                                          {data.content}
                                        </p>
                                      </div>
                                      <div className="ml-3">
                                        <p className="md:text-sm text-[10px]">
                                          {data.updatedData}
                                        </p>
                                      </div>
                                    </div>
                                  </>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabPanel>
                      <TabPanel key={"myWork"} value={"myWork"}>
                        {/* TODO */}
                        <div className="flex justify-between ">
                          <div className="bg-gray-200 rounded-t-lg px-3 py-1">
                            <p className="text-xs font-medium text-gray-500 ">
                              TODO
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between border shadow-sm py-2">
                          <div className=" px-3 py-1 cursor-pointer">
                            <p className="text-sm">task name</p>
                          </div>
                        </div>
                        {/* IN PROGRESS */}
                        <div className="flex justify-between  mt-10">
                          <div className="bg-[#a875ff] rounded-t-lg px-3 py-1">
                            <p className="text-xs font-medium text-white ">
                              IN PROGRESS
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between border shadow-sm py-2">
                          <div className=" px-3 py-1 cursor-pointer">
                            <p className="text-sm">task name</p>
                          </div>
                        </div>
                        {/* COMPLETED  */}
                        <div className="flex justify-between  mt-10">
                          <div className="bg-[#6bc950] rounded-t-lg px-3 py-1">
                            <p className="text-xs font-medium text-white">
                              COMPLETED
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between border shadow-sm py-2">
                          <div className=" px-3 py-1 cursor-pointer">
                            <p className="text-sm">task name</p>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel key={"assigned"} value={"assigned"}>
                        <div>
                          <div>
                            <p>Task</p>
                          </div>
                          <div className=" my-5  w-full flex justify-between px-2 border border-t-4 border-t-[#7b68ee] shadow-lg rounded">
                            <div className="px-2 py-2 cursor-pointer">
                              <p className="text-[10px] font-bold text-gray-500 uppercase">
                                created by Arjun
                              </p>
                              <p className="font-medium">task name</p>
                            </div>
                            <div className="my-5">
                              <p className="text-sm font-bold text-gray-500">
                                oct 5 11:20 PM
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                    </TabsBody>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
