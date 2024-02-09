import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";

const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="page-wrapper">{children}</div>
      <Footer />
    </>
  );
};

export default UserLayout;
