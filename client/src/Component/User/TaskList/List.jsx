import React, { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CgFlagAlt } from "react-icons/cg";
import { BiMessageDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Task from "../Task/Task";

export default function List() {
  const history = useNavigate();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div>
        <div className="fmd:mx-14 mx-5 mt-10  md:w-[70vw] w-[87vw] px-2 ">
          {/* TODO */}
          <div className="flex justify-between ">
            <div className="bg-gray-200 rounded-t-lg px-3 py-1">
              <p className="text-xs font-medium text-gray-500 ">TODO</p>
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
          <div className="flex justify-between border shadow-sm py-2">
            <div
              className=" px-3 py-1 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <p className="text-sm">task name</p>
            </div>

            <div className="flex justify-around w-[50%]">
              <p className=" uppercase text-gray-700 font-bold ">
                <AiOutlineUserAdd size={20} />
              </p>
              <p className=" uppercase md:text-[10px] text-gray-700 text-[8px] font-bold ">
                12/02/2023
              </p>
              <p className=" uppercase text-gray-700 font-bold ">
                <CgFlagAlt size={20} />
              </p>
              <p className=" uppercase text-gray-700 font-bold ">
                <BiMessageDetail size={20} />
              </p>
            </div>
          </div>
          {/* IN PROGRESS */}
          <div className="flex justify-between  mt-10">
            <div className="bg-[#a875ff] rounded-t-lg px-3 py-1">
              <p className="text-xs font-medium text-white ">IN PROGRESS</p>
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
          <div className="flex justify-between border shadow-sm py-2">
            <div
              className=" px-3 py-1 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <p className="text-sm">task name</p>
            </div>

            <div className="flex justify-around w-[50%]">
              <p className=" uppercase text-gray-700 font-bold ">
                <AiOutlineUserAdd size={20} />
              </p>
              <p className=" uppercase md:text-[10px] text-gray-700 text-[8px] font-bold ">
                12/02/2023
              </p>
              <p className=" uppercase text-gray-700 font-bold ">
                <CgFlagAlt size={20} />
              </p>
              <p className=" uppercase text-gray-700 font-bold ">
                <BiMessageDetail size={20} />
              </p>
            </div>
          </div>
          {/* COMPLETED  */}
          <div className="flex justify-between  mt-10">
            <div className="bg-[#6bc950] rounded-t-lg px-3 py-1">
              <p className="text-xs font-medium text-white">COMPLETED</p>
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
          <div className="flex justify-between border shadow-sm py-2">
            <div
              className=" px-3 py-1 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <p className="text-sm">task name</p>
            </div>

            <div className="flex justify-around w-[50%]">
              <p className=" uppercase text-gray-700 font-bold ">
                <AiOutlineUserAdd size={20} />
              </p>
              <p className=" uppercase md:text-[10px] text-gray-700 text-[8px] font-bold ">
                12/02/2023
              </p>
              <p className=" uppercase text-gray-700 font-bold ">
                <CgFlagAlt size={20} />
              </p>
              <p className=" uppercase text-gray-700 font-bold ">
                <BiMessageDetail size={20} />
              </p>
            </div>
          </div>
        </div>
      </div>
      {showModal && <Task setShowModal={() => setShowModal(false)} />}
    </>
  );
}
