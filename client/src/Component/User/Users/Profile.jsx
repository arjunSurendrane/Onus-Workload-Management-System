import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { AiOutlineClose, AiOutlineUserAdd } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { LockClosedIcon } from "@heroicons/react/20/solid";
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
export default function ProfileView({ user }) {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="md:mx-14 mx-5 mt-10  md:w-[70vw] w-[87vw]  flex justify-between px-2 border border-t-4 border-t-[#7b68ee] shadow-lg rounded">
      <Tabs value="html" className="w-full">
        <div className="bg-white w-full ">
          <div className="w-full  shadow-lg ">
            <div className="w-full flex justify-arounnd py-8 px-8">
              <div>
                <Avatar sx={{ width: 64, height: 64 }}>
                  {user.name.split("")[0]}
                </Avatar>
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
                    <p className="text-green-600 font-bold text-xs">Online</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 pb-2 flex justify-between">
              <TabsHeader>
                <div>
                  <Tab key={"activity"} value={"activity"} className="mx-5">
                    <p className="font-medium">Activity</p>
                  </Tab>
                </div>
                <div>
                  <Tab key={"myWork"} value={"myWork"} className="mx-5">
                    <p className="font-medium">My Work</p>
                  </Tab>
                </div>
                <div>
                  <Tab key={"assigned"} value={"assigned"} className="mx-5">
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
                <div>
                  <Tab key={"edit"} value={"edit"} className="mx-5">
                    <p className="font-medium">Edit</p>
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
                              <div className="md:px-4 px-1 py-2 flex" key={key}>
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
                      <p className="text-xs font-medium text-gray-500 ">TODO</p>
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
                <TabPanel key={"edit"} value="edit">
                  <div>
                    <div>Edit</div>
                    <div>
                      <form
                        className="mt-8 space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="-space-y-px rounded-md shadow-sm">
                          <div>
                            <label htmlFor="email-address" className="sr-only">
                              Name
                            </label>
                            <input
                              id="Name"
                              name="Name"
                              type="text"
                              autoComplete="name"
                              className="relative mt-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              placeholder="Name"
                              {...register("name")}
                            />
                            <p className="text-red-500 text-sm font-medium"></p>
                          </div>
                          <div>
                            <label htmlFor="email-address" className="sr-only">
                              Email address
                            </label>
                            <input
                              id="email-address"
                              name="email"
                              type="email"
                              autoComplete="email"
                              className="relative mt-5 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              placeholder="Email address"
                              {...register("email")}
                            />
                            <p className="text-red-500 text-sm font-medium"></p>
                          </div>

                          <div>
                            <label htmlFor="Discription" className="sr-only">
                              Discription
                            </label>
                            <input
                              id="Discription"
                              name="Discription"
                              type="Discription"
                              autoComplete="current-Discription"
                              className="relative mt-5 block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              placeholder="Discription"
                              {...register("Discription")}
                            />
                            <p className="text-red-500 text-sm font-medium"></p>
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#75337D] py-2 px-4 text-sm font-medium text-white hover:bg-[#56245b] focus:outline-none focus:ring-2 focus:ring-[#56245b] focus:ring-offset-2"
                          >
                            Edit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </TabPanel>
              </TabsBody>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
