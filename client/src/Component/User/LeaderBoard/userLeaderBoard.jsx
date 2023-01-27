import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import UserProfile from "../Users/UserProfile";
const leaderboard = [
  {
    name: "arjun",
    workload: 10,
    todo: 8,
    inProgress: 2,
    completed: 29,
    point: 98,
    grade: "Good",
  },
  {
    name: "abhinav",
    workload: 8,
    todo: 7,
    inProgress: 1,
    completed: 19,
    point: 23,
    grade: "Average",
  },
];
export default function UserLeaderBoard() {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState();
  return (
    <div>
      <div className="md:mx-14    md:w-[72vw] w-[87vw]  flex justify-between  rounded">
        <div className="flex">
          <div className="px-2 py-2 flex">
            {" "}
            <input
              type="text"
              placeholder="search"
              className="border border-1 px-2 focus:border-none bg-gray-200 rounded"
            />
            <BiSearchAlt
              color="gray"
              className="mt-1 cursor-pointer mx-2"
              size={20}
            />
          </div>
          <div className="px-2 py-2"></div>
        </div>
      </div>
      <div className="md:mx-14  mt-5 md:w-[72vw] w-[87vw]  flex justify-between  rounded">
        <table class="table-fixed w-full border-separate border-spacing-1 border border-slate-500 bg-[#7c68ee14] rounded">
          <thead>
            <tr className="text-center">
              <th className="border border-slate-600 py-2 bg-[#7c68ee53]">
                No
              </th>
              <th className="border border-slate-600 bg-[#7c68ee53]">Name</th>
              <th className="border border-slate-600 bg-[#7c68ee53]">
                WorkLoad
              </th>
              <th className="border border-slate-600 bg-[#7c68ee53]">Todo</th>
              <th className="border border-slate-600 bg-[#7c68ee53]">
                InProgress
              </th>
              <th className="border border-slate-600 bg-[#7c68ee53]">
                Completed
              </th>
              <th className="border border-slate-600 bg-[#7c68ee53]">Point</th>
              <th className="border border-slate-600 bg-[#7c68ee53]">Grade</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((data, i) => (
              <tr
                key={i}
                className="text-center cursor-pointer"
                onClick={() => {
                  setModal(true);
                  setData(data);
                }}
              >
                <td className="border border-slate-700">{i + 1}</td>
                <td className="border border-slate-700">{data.name}</td>

                <td className="border border-slate-700">{data.workload}</td>
                <td className="border border-slate-700">{data.todo}</td>
                <td className="border border-slate-700">{data.inProgress}</td>
                <td className="border border-slate-700">{data.completed}</td>
                <td className="border border-slate-700">{data.point}</td>
                <td className="border border-slate-700">{data.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && <UserProfile closeModal={() => setModal(false)} user={data} />}
    </div>
  );
}
