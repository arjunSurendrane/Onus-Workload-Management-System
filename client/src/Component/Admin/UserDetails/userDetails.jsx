import { Alert, FormControlLabel, Snackbar, Switch } from "@mui/material";
import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

export default function UserManagementComponent({ usersList, blockUser }) {
  const [block, setBlock] = useState({});
  const [modal, setModal] = useState(false);
  const [data, setData] = useState();
  const handleChange = (e) => {
    e.target.checked ? setModal(true) : setModal(false);
    blockUser(e.target.name, e.target.checked);
  };
  const handleClose = () => {
    setModal(false);
  };

  return (
    <div>
      <div className="md:mx-14 mt-5   md:w-[72vw] w-[87vw]  flex justify-between  rounded">
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
        <table className="table-fixed w-full border-separate border-spacing-1 border border-slate-500 bg-gray-200 rounded">
          <thead>
            <tr className="text-center">
              <th className="border border-slate-600 py-2 bg-gray-500">No</th>
              <th className="border border-slate-600 bg-gray-500">Name</th>
              <th className="border border-slate-600 bg-gray-500">Email</th>
              <th className="border border-slate-600 bg-gray-500">
                Workspaces
              </th>
              <th className="border border-slate-600 bg-gray-500">Plan</th>
              <th className="border border-slate-600 bg-gray-500">Block</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((data, i) => (
              <tr
                key={i}
                className="text-center cursor-pointer"
                onClick={() => {
                  setModal(true);
                  setData(data);
                }}
              >
                <td className="border border-slate-700 font-medium text-sm">
                  {i + 1}
                </td>
                <td className="border border-slate-700 font-medium text-sm">
                  {data.name}
                </td>
                <td className="border border-slate-700 font-medium text-sm overflow-hidden">
                  {data.email}
                </td>
                <td className="border border-slate-700 font-medium text-sm">
                  {data.workspaces ? data.workspaces : "-"}
                </td>
                <td className="border border-slate-700 font-medium text-sm">
                  {data.Plan}
                </td>
                <td className="border border-slate-700 font-medium text-sm">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={data.block}
                        onChange={handleChange}
                        name={data.email}
                        color="error"
                      />
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Snackbar
        open={modal}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%", backgroundColor: "#bd4242", color: "white" }}
        >
          User Account Blocked
        </Alert>
      </Snackbar>
    </div>
  );
}
