import { Stack } from "@mui/material";
import React, { useState } from "react";
import InputBox from "../InputBox/InputBox";
import AlertMsg from "../Alert/AlertMsg";
import handleToggle from "../../helpers/VisibilityToggler";
import { handleForgotPassword } from "../../helpers/ForgotPassword";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [viewCnfPassword, setViewCnfPassword] = useState(false);

  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("This is an Error");
  return (
    <div className="forgot_password_container w-full h-full p-[8%]">
      <div className="w-full flex justify-center items-center">
        <Stack
          spacing={4}
          className="shadow-md rounded-md w-[95%] sm:w-[70%] p-4 sm:p-8"
        >
          <h1 className="font-roboto font-bold">Reset Password</h1>
          <div className="w-full flex gap-4 flex-col sm:flex-row">
            <InputBox
              label={"Enter Your Email"}
              required={true}
              type={"email"}
              name={"email"}
              setter={setEmail}
              placeholder={"e.g. - abc@def.com"}
              // setter={setEmail}
            />
          </div>
          <div className="w-full flex gap-4 flex-col sm:flex-row">
            <InputBox
              label={"Enter New Password"}
              className={"relative"}
              required={true}
              type={"password"}
              name={"password"}
              id={"Forgot"}
              placeholder={"New Password"}
              setter={setPassword}
            >
              <div
                onClick={(e) => {
                  handleToggle(
                    e,
                    viewPassword,
                    "Forgot-password",
                    setViewPassword
                  );
                }}
                className=" cursor-pointer w-fit h-fit absolute right-[5%] bottom-1/4 translate-y-1/4"
              >
                {viewPassword ? (
                  <i className="bi bi-eye-slash-fill"></i>
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </div>
            </InputBox>
          </div>
          <div className="w-full flex gap-4 flex-col sm:flex-row">
            <InputBox
              label={"Re-enter new password"}
              className={"relative"}
              required={true}
              type={"password"}
              name={"cnfPassword"}
              id={"Forgot"}
              placeholder={"Re-enter New Password"}
              setter={setCnfPassword}
            >
              <div
                onClick={(e) => {
                  handleToggle(
                    e,
                    viewCnfPassword,
                    "Forgot-cnfPassword",
                    setViewCnfPassword
                  );
                }}
                className=" cursor-pointer w-fit h-fit absolute right-[5%] bottom-1/4 translate-y-1/4"
              >
                {viewCnfPassword ? (
                  <i className="bi bi-eye-slash-fill"></i>
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </div>
            </InputBox>
          </div>
          <div className="w-full flex justify-center">
            {alert ? <AlertMsg message={msg} /> : null}
          </div>
          <div className="w-full flex justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleForgotPassword(
                  email,
                  password,
                  cnfPassword,
                  setAlert,
                  setMsg
                );
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
