import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginCard.css";
import { Stack } from "@mui/material";
import InputBox from "../../InputBox/InputBox";
import AlertMsg from "../../Alert/AlertMsg";
import { handleLogIn } from "../../../helpers/Auth";
import handleToggle from "../../../helpers/VisibilityToggler";
import { ClipLoader } from "react-spinners";

const RegisterCard = () => {
  const [email, setEmail] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [loader, setLoader] = useState(false);

  return (
    <div className="register__card__container w-full flex justify-center items-center">
      <Stack
        spacing={4}
        className="shadow-md rounded-md w-full sm:w-[90%] md:w-[50%] p-4 sm:p-8"
      >
        <h4 className="font-roboto font-bold">Log In</h4>
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
        <div className="w-full flex gap-4 flex-col sm:flex-row">
          <InputBox
            label={"Enter Password"}
            className={"relative"}
            type={"password"}
            required={true}
            setter={setPassword}
            placeholder={"Enter Password"}
            id={"Login"}
            name={"password"}
          >
            <div
              onClick={(e) => {
                handleToggle(
                  e,
                  viewPassword,
                  "Login-password",
                  setViewPassword
                );
              }}
              className="cursor-pointer w-fit h-fit absolute right-[5%] bottom-1/4 translate-y-1/4"
            >
              {viewPassword ? (
                <i class="bi bi-eye-slash-fill"></i>
              ) : (
                <i class="bi bi-eye-fill"></i>
              )}
            </div>
          </InputBox>
        </div>
        <div className="text-sm w-full flex justify-end">
          <span>
            <Link
              className="text-blue-500 hover:underline cursor-pointer"
              to={"/account/forgot"}
            >
              Forgot Password?
            </Link>
          </span>
        </div>
        {alert && (
          <div className="w-full flex justify-center">
            <AlertMsg message={msg} />
          </div>
        )}
        <div className="w-full flex justify-center">
          {loader ? (
            <ClipLoader loading={loader} />
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLogIn(email, password, setAlert, setMsg,setLoader);
              }}
              type="submit"
              className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Log In
            </button>
          )}
        </div>
        <div className="text-sm">
          Don't have an account?{" "}
          <span>
            <Link
              className="text-blue-500 hover:underline cursor-pointer"
              to={"/account/register"}
            >
              Register
            </Link>
          </span>
        </div>
      </Stack>
    </div>
  );
};

export default RegisterCard;
