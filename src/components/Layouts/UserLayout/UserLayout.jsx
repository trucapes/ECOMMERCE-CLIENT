import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import { Container } from "@mui/material";

const UserLayout = ({ children, profile, isAuthenticated }) => {
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
      <Header profile={profile} isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="xl" sx={{mt: 5, mb: 5}}>
        <div className="page-wrapper">{children}</div>
      </Container>
      <Footer />
    </>
  );
};

export default UserLayout;
