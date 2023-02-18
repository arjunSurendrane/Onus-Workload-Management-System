import React, { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CgFlagAlt } from "react-icons/cg";
import { BiMessageDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import addTaskImage from "../../../assets/undraw_add_files_re_v09g.svg";
import Task from "../Task/Task";
import AddTask from "../Task/addTask";

export default function List({ tasks }) {
  const history = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState({});
  const [openAddTask, setOpenAddTask] = useState(false);
  let inProgress, ToDo, Completed;

  if (tasks) {
    inProgress = tasks?.filter((data) => data._id == "InProgress");
    ToDo = tasks?.filter((data) => data._id == "ToDo");
    Completed = tasks?.filter((data) => data._id == "Completed");
  }
  const displayTasks = (data) => {
    setTask(data);
    setShowModal(true);
  };
  const taskList = (data) => {
    return (
      <div className="flex justify-between border shadow-sm py-2">
        <div
          className=" px-3 py-1 cursor-pointer"
          onClick={() => displayTasks(data)}
        >
          <p className="text-sm">{data?.taskName}</p>
        </div>

        <div className="flex justify-around w-[50%]">
          <p className=" uppercase text-gray-700 font-bold ">
            <AiOutlineUserAdd size={20} />
          </p>
          <p className=" uppercase md:text-[10px] text-gray-700 text-[8px] font-bold ">
            {data?.dueDate.split("T")[0]}
          </p>
          <p className=" uppercase text-gray-700 font-bold ">
            <CgFlagAlt size={20} />
          </p>
          <p className=" uppercase text-gray-700 font-bold ">
            <BiMessageDetail size={20} />
          </p>
        </div>
      </div>
    );
  };

  const TaskHeading = (data, color, text) => (
    <div className="flex justify-between mt-10">
      <div className={`bg-${color} rounded-t-lg px-3 py-1`}>
        <p className={`text-xs font-medium text-${text} `}>{data}</p>
      </div>

      <div className="flex justify-around w-[50%]">
        <p className=" uppercase md:text-[10px] text-[7px] font-bold text-gray-400 ">
          Assignee
        </p>
        <p className=" uppercase md:text-[10px] text-[7px] font-bold text-gray-400 ">
          due date
        </p>
        <p className=" uppercase md:text-[10px] text-[7px] font-bold text-gray-400 ">
          priority
        </p>
        <p className=" uppercase md:text-[10px] text-[7px] font-bold text-gray-400 ">
          comments
        </p>
      </div>
    </div>
  );

  console.log(ToDo, Completed, inProgress);
  console.log({
    todo: ToDo.data,
    Completed: Completed.data,
    inProgress: inProgress.data,
  });
  if (tasks.length) {
    return (
      <>
        <div>
          <div className="fmd:mx-14 mx-5 mt-10  md:w-[70vw] w-[87vw] px-2 ">
            {/* TODO */}
            {ToDo.length ? TaskHeading("TODO", "gray-200", "gray-500") : ""}
            {ToDo[0]?.data?.map((data) => taskList(data))}

            {/* IN PROGRESS */}
            {inProgress.length ? TaskHeading("TODO", "[#a875ff]", "white") : ""}
            {inProgress[0]?.data?.map((data) => taskList(data))}

            {/* COMPLETED  */}
            {Completed.length
              ? TaskHeading("COMPLETED", "[#6bc950]", "white")
              : ""}
            {Completed[0]?.data?.map((data) => taskList(data))}
          </div>
        </div>
        {showModal && (
          <Task setShowModal={() => setShowModal(false)} taskData={task} />
        )}
      </>
    );
  } else {
    return (
      <>
        <div className=" md:w-[70vw] w-[87vw] h-[80vh] grid place-items-center  text-center">
          <img
            src={addTaskImage}
            alt="add task"
            className="w-[200px] h-[200px] transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-200 mb-0 pb-0 cursor-pointer"
            onClick={() => setOpenAddTask(true)}
          />
        </div>
        {openAddTask && <AddTask setShowModal={() => setOpenAddTask(false)} />}
      </>
    );
  }
}
