import React from "react";
import { Link } from "react-router-dom";

function AdminSidebarBtn({ href, to, title, icon }) {
  return (
    <>
      {to ? (
        <Link to={to}>
          <div className="flex flex-row gap-1 m-2 justify-center rounded-md hover:text-[#ffe26e] bg-[#ffe26e] hover:bg-black cursor-pointer duration-300 py-3 px-4 items-center">
            {icon}
            <h1 className="text-base m-0">{title}</h1>
          </div>
        </Link>
      ) : (
        <a href={href}>
          <div className="flex flex-row gap-1 m-2 justify-center rounded-md hover:text-[#ffe26e] bg-[#ffe26e] hover:bg-black cursor-pointer duration-300 py-3 px-4 items-center">
            {icon}
            <h1 className="text-base m-0">{title}</h1>
          </div>
        </a>
      )}
    </>
  );
}

export default AdminSidebarBtn;
