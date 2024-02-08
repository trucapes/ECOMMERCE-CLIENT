import React from "react";
import { MdDashboard, MdProductionQuantityLimits } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import AdminSidebarBtn from "../Buttons/AdminSidebarBtn";
import { Divider } from "@mui/material";
import { FaUserLarge } from "react-icons/fa6";

function AdminSidebar() {
  return (
    <div className="sticky left-0 top-0 h-screen w-56 bg-white">
      <AdminSidebarBtn
        icon={<MdDashboard />}
        title={"Dashboard"}
        to={"/admin/order"}
      />
      <Divider sx={{ backgroundColor: "#000000" }} />
      <AdminSidebarBtn
        icon={<MdProductionQuantityLimits />}
        title={"Products"}
        to={"/admin/products"}
      />
      <Divider sx={{ backgroundColor: "#000000" }} />
      <AdminSidebarBtn
        icon={<FaUserLarge />}
        title={"User"}
        to={"/admin/users"}
      />
      <Divider sx={{ backgroundColor: "#000000" }} />
      <AdminSidebarBtn
        icon={<IoMdSettings />}
        title={"Settings"}
        to={"/admin/users"}
      />
    </div>
  );
}

export default AdminSidebar;
