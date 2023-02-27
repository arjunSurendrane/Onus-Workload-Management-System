import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { VscRocket } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import AddTask from "../Task/addTask";
const actions = [
  {
    name: "add Task",
    icon: "",
    url: "/home",
  },
];
export default function MenuButton() {
  const history = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="fixed bottom-5 right-5">
      {/* {openModal && <AddTask setShowModal={() => setOpenModal(false)} />} */}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        // sx={{
        //   position: "absolute",
        //   bottom: 16,
        //   right: 16,
        //   //   "& .MuiFab-primary": { backgroundColor: "#7b68ee", color: "#fff" },
        // }}
        icon={<VscRocket />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={<AiOutlineAppstoreAdd size={20} />}
            tooltipTitle={action.name}
            onClick={() => history("/addTask")}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
