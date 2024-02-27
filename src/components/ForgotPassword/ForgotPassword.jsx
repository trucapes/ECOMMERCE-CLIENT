import { Stack } from "@mui/material";
import React, { useState } from "react";
import InputBox from "../InputBox/InputBox";
import AlertMsg from "../Alert/AlertMsg";
import { handleForgotPassword } from "../../helpers/ForgotPassword";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("This is an Error");
  return (
    <div className="forgot_password_container w-full h-full p-[5%]">
      <div className="w-full flex justify-center items-center">
        <Stack
          spacing={4}
          className="shadow-md rounded-md w-[95%] sm:w-[50%] p-4 sm:p-8"
        >
          <h4 className="font-roboto font-bold">Reset Password</h4>
          <div className="w-full flex gap-2 flex-col sm:flex-row">
            <InputBox
              label={"Enter Your Email"}
              required={true}
              type={"email"}
              name={"email"}
              placeholder={"e.g. - abc@def.com"}
              setter={setEmail}
            />
          </div>
          {alert &&<div className="w-full flex justify-center">
             <AlertMsg message={msg} /> 
          </div>}
          <div className="w-full flex justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleForgotPassword(email, setAlert, setMsg);
              }}
              type="submit"
              className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Reset
            </button>
          </div>
        </Stack>
      </div>
    </div>
  );
}

export default ForgotPassword;
