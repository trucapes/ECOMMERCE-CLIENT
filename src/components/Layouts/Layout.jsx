import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout/AdminLayout";
import UserLayout from "./UserLayout/UserLayout";

const Layout = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRoute = () => {
      // Function to check if the current URL contains '/admin'
      setIsAdmin(window.location.pathname.includes("/admin"));
    };

    // Add event listener to check for changes in URL
    window.addEventListener("popstate", checkAdminRoute);
    checkAdminRoute(); // Check initially when component mounts

    return () => {
      // Clean up: Remove event listener when component unmounts
      window.removeEventListener("popstate", checkAdminRoute);
    };
  }, []); // Empty dependency array ensures useEffect runs only on mount and unmount

  return isAdmin ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <UserLayout>{children}</UserLayout>
  );
};

export default Layout;
