import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";

const UserLayout = ({ children, profile }) => {
  useEffect(()=> {
    const handleValid = () => {
      if(window.location.pathname.includes("/admin")){
        window.location.href = "/"
      }
    }
    handleValid()
  }, [children])
  return (
    <>
      <Header profile={profile} />
      <div className="page-wrapper">{children}</div>
      <Footer />
    </>
  );
};

export default UserLayout;
