import React, { useEffect, useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import { AiOutlineUserAdd, AiOutlineCloudUpload } from "react-icons/ai";
import { CgFlagAlt } from "react-icons/cg";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FcDocument, FcImageFile } from "react-icons/fc";
import { TbSubtask, TbSend } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { Avatar } from "@mui/material";
import { useForm } from "react-hook-form";
import { Document, Page } from "react-pdf";
import useSWR from "swr";
import { useCookies } from "react-cookie";
import {
  changeStatus,
  changeTaskPrioriy,
  fetchTaskData,
} from "../../../api/apis";
import toast, { Toaster } from "react-hot-toast";
import { RiFlag2Fill } from "react-icons/ri";
import { url } from "../../../api";
import { sendRequest } from "../../../api/sampleapi";
import UserList from "../TaskList/userList";

export default function Task({ setShowModal, taskId, deleteTask }) {
  const { register, handleSubmit } = useForm();
  const [attachment, setAttachment] = useState([]);
  const [cookies, setCokkies] = useCookies();
  const [showUsers, setShowUsers] = useState(false);
  useEffect(() => {}, [attachment]);

  /**
   * fetch task data with the help of swr
   */
  const {
    isLoading,
    error,
    mutate,
    data: task,
  } = useSWR(
    {
      link: "getOneTask",
      id: taskId,
      cookies: cookies.userJwt,
      operation: "get",
    },
    sendRequest
  );

  /**
   * check response status
   */
  if (isLoading) {
    console.log("loading....");
  } else if (error) {
    console.log(error);
    return <div>Error...!</div>;
  } else {
    console.log({ taskDataINTaskPage: task });
    let taskData = task.data.task || {};
    const onSubmit = (data) => {
      const file = data.target.files[0];
      const key = file.name;
      console.log({ file });
      setAttachment([...attachment, { file }]);
      console.log(data);
      console.log(data.target.files[0]);
      console.log({ attachment });
    };
    const updatePriority = async (id, priority) => {
      const task = await changeTaskPrioriy(id, priority, cookies.userJwt);
      if (task.data.status == "success") {
        toast.success("update priority");
        mutate(task.data.task);
      }
    };
    const handleChangeStatus = async (id, statusData) => {
      const status =
        statusData == "ToDo"
          ? "InProgress"
          : statusData == "InProgress"
          ? "Completed"
          : null;
      if (status != null) {
        const res = await changeStatus(id, status, cookies.userJwt);
        if (res) {
          toast.success("Change Task Status");
          mutate(task.data.task);
        }
      }
    };
    return (
      <div>
        <div>
          <Toaster />
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black bg-opacity-60 focus:outline-none">
            <div className="relative mx-auto max-w-[90%] min-w-[90%]  ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center  justify-between p-2 border-b border-solid border-gray-300 rounded-t ">
                  <h1 className="font-bold text-lg">{"Department>Task"}</h1>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal()}
                  >
                    x
                  </button>
                </div>
                <div className="relative p-3 flex-auto mb-2 flex justify-between border-b-2">
                  <div id="header" className="w-[100%]">
                    <div id="" className="flex justify-between border-r-2 pr-2">
                      <div
                        id=""
                        className="flex justify-around w-[50%] border-r-2"
                      >
                        <div className="flex">
                          <div
                            id=""
                            className={` py-2 px-2 h-8 ${
                              taskData?.status == "ToDo"
                                ? "bg-gray-400"
                                : taskData?.status == "InProgress"
                                ? "bg-[#a875ff]"
                                : "bg-green-500"
                            } bg-gray-400 rounded-l`}
                          >
                            <p className="text-xs text-white">
                              {taskData?.status}
                            </p>
                          </div>
                          <div
                            id=""
                            className={`w-5 h-8  ${
                              taskData?.status == "ToDo"
                                ? "bg-gray-400"
                                : taskData?.status == "InProgress"
                                ? "bg-[#a875ff]"
                                : "bg-green-500"
                            } rounded-r mx-1 text-center text-white cursor-default
                            `}
                            onClick={() => {
                              handleChangeStatus(
                                taskData?._id,
                                taskData?.status
                              );
                              console.log("clicked");
                            }}
                          >
                            {">"}
                          </div>
                        </div>
                        <div
                          className="py-2 "
                          onClick={() => {
                            setShowUsers(true);
                          }}
                        >
                          {taskData?.Assigned ? (
                            <div className="bg-[#153e21] w-7 h-7 rounded-full grid place-content-center text-white uppercase">
                              {taskData?.Assigned?.email.split("")[0]}
                            </div>
                          ) : (
                            <AiOutlineUserAdd size={20} />
                          )}
                        </div>
                        {showUsers && (
                          <UserList
                            close={() => {
                              setShowUsers(false);
                              mutate(task);
                            }}
                            taskId={taskId}
                          />
                        )}
                        <div
                          className="py-2 "
                          onClick={() =>
                            updatePriority(taskData._id, !taskData.priority)
                          }
                        >
                          {taskData.priority ? (
                            <RiFlag2Fill size={20} />
                          ) : (
                            <CgFlagAlt size={20} />
                          )}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="py-2 mx-2 cursor-pointer">
                          <CiEdit size={20} color={"gray"} />
                        </div>
                        <div
                          className="py-2 mx-2 cursor-pointer"
                          onClick={() => deleteTask(taskData)}
                        >
                          <MdOutlineDeleteOutline size={20} color={"gray"} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[100%] flex justify-center">
                    <div className="border-r-2 px-4">
                      <div>
                        <p className="text-[10px] uppercase font-medium text-gray-500">
                          CREATED BY
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px]  font-medium text-gray-500">
                          Arjun
                        </p>
                      </div>
                    </div>
                    <div className="border-r-2 px-4">
                      <div>
                        <p className="text-[10px] uppercase font-medium text-gray-500">
                          start date
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px]  font-medium text-gray-500">
                          19/04/2023
                        </p>
                      </div>
                    </div>
                    <div className="border-r-2 px-4">
                      <div>
                        <p className="text-[10px] uppercase font-medium text-gray-500">
                          due date
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px]  font-medium text-gray-500">
                          {/* {taskData?.dueDate.split("T")[0]} */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between px-10  max-h-[600px] overflow-y-scroll overflow-x-clip">
                  <div className="w-[50%] border-r-2 px-3">
                    <h1 className="text-2xl">{taskData?.taskName}</h1>
                    <div className="mt-5">
                      <p>{taskData?.description}</p>
                    </div>
                    <div className="mt-5 w-full border-2 border-dotted rounded  text-center py-2 cursor-pointer">
                      <p className="text-sm">+ Add Subtask</p>
                    </div>
                    <div className="mt-5">
                      <ol>
                        <li className="text-sm mt-3">
                          <div className="flex justify-around">
                            <div className="flex">
                              <TbSubtask size={18} />
                              subtaskOne
                            </div>
                          </div>
                        </li>
                        <li className="text-sm mt-3">
                          <div className="flex justify-around">
                            <div className="flex">
                              <TbSubtask size={18} />
                              subtaskTwo
                            </div>
                          </div>
                        </li>
                      </ol>
                    </div>
                    <div className="mt-5">
                      <div>
                        <h1 className="font-medium">Attachments</h1>
                      </div>
                      <div className=" grid grid-cols-3 gap-4 mr-2 ">
                        {taskData?.attachedfiles?.map((data) =>
                          data.link ? (
                            <a
                              href={`${url}/workspace/task/attachedFile/${data.link}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {" "}
                              <div className="h-32 w-full  bg-gray-100 shadow-lg m-2 text-center overflow-hidden">
                                <FcDocument
                                  size={30}
                                  className="mt-10 mx-auto"
                                />
                                <p className="text-[9px] font-bold"></p>
                              </div>
                            </a>
                          ) : (
                            <p className="text-sm text-gray-400 font-medium">
                              No Attachment file
                            </p>
                          )
                        )}
                      </div>
                    </div>
                    <div className="mt-5">
                      {attachment[0] && (
                        <>
                          <div>
                            <h1 className="font-medium">Submition</h1>
                          </div>
                          <div className=" grid grid-cols-3 gap-4 mr-2 ">
                            {attachment.map((data, key) => (
                              <div
                                className="h-32 w-full  bg-gray-100 shadow-lg m-2 text-center overflow-hidden"
                                key={key}
                              >
                                <div
                                  className="p-1 absolute"
                                  onClick={() => {
                                    attachment.splice(key, key);
                                    console.log(attachment);
                                  }}
                                >
                                  <MdOutlineDeleteOutline color={"gray"} />
                                </div>
                                {data.file.name.split(".")[1] == "JPG" ? (
                                  <FcImageFile
                                    size={30}
                                    className="mt-10 mx-auto"
                                  />
                                ) : (
                                  <FcDocument
                                    size={30}
                                    className="mt-10 mx-auto"
                                  />
                                )}

                                <p className="text-[9px] font-bold">
                                  {data.file?.name}
                                </p>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="w-[50%] px-5 py-5 bg-[#fbfbfb]">
                    <div className="flex justify-between">
                      <div className="w-[10%]">
                        <Avatar>H</Avatar>
                      </div>
                      <div className="w-[90%] shadow-lg  border rounded-b-lg rounded-r-lg  px-5 py-2">
                        <div className="flex justify-between">
                          <div>username</div>
                          <div>time</div>
                        </div>
                        <div>
                          <p className="text-sm">comment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex py-5 border-t-2">
                  <div className="w-[50%] flex justify-center border-r-2">
                    {" "}
                    <label
                      htmlFor="dropzone-file"
                      className="cursor-pointer flex"
                    >
                      <div>
                        <AiOutlineCloudUpload size={20} />
                      </div>
                      <div className="mx-1">
                        <p className="text-sm">Drop files here to attach</p>{" "}
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          {...register("attachments")}
                          onChange={onSubmit}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="w-[50%] px-5 flex justify-between">
                    <div>
                      <input
                        type="text"
                        name="attachments"
                        placeholder="write comment"
                        className="focus:border-none hover:border-none"
                      />
                    </div>
                    <div>
                      <TbSend size={20} color={"gray"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
