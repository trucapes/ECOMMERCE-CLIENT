import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout/AdminLayout";
import UserLayout from "./UserLayout/UserLayout";

const Layout = ({ children, profile, isAuthenticated }) => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdminRoute = () => {
      // Function to check if the current URL contains '/admin'
      setIsAdmin(
        window.location.pathname.includes("/admin") &&
          profile &&
          profile.userRole === "admin"
      );
    };

    // Add event listener to check for changes in URL
    // window.addEventListener("popstate", checkAdminRoute);
    if (isAuthenticated !== null) checkAdminRoute(); // Check initially when component mounts
    // return () => {
    //   // Clean up: Remove event listener when component unmounts
    //   window.removeEventListener("popstate", checkAdminRoute);
    // };
  }, [profile]); // Empty dependency array ensures useEffect runs only on mount and unmount

  // console.log(isAdmin, profile);

  return (
    isAdmin !== null &&
    (isAdmin ? (
      <AdminLayout profile={profile}>{children}</AdminLayout>
    ) : (
      <UserLayout profile={profile} isAuthenticated={isAuthenticated}>
        {children}
      </UserLayout>
    ))
  );
};

export default Layout;
