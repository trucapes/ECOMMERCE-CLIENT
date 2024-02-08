import React, { useState } from "react";
import { Box, Drawer } from "@mui/material";
import { MdMenu } from "react-icons/md";
import AdminSidebar from "../Sidebar/AdminSidebar";

function AdminScreen({ children }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full px-4 bg-slate-100">
          <div
            className="w-fit text-xl rounded-full bg-slate-100 cursor-pointer duration-300 hover:bg-slate-200 p-2"
            onClick={toggleDrawer(open, true)}
          >
            <MdMenu />
          </div>
        </div>
        <Box sx={{ width: "fit-content" }}>
          <Drawer anchor="left" open={open} onClose={toggleDrawer(open, false)}>
            <AdminSidebar />
          </Drawer>
        </Box>
        {children}
      </div>
    </>
  );
}

export default AdminScreen;
