import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginCard.css";
import { Stack } from "@mui/material";

const RegisterCard = () => {
  const [name, setName] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <div className="register__card__container w-full flex justify-center items-center">
      <Stack
        spacing={4}
        className="shadow-md rounded-md w-[95%] sm:w-[90%] md:w-[80%] p-8"
      >
        <h1 className="font-roboto font-bold">Log In</h1>
        <div className="w-full flex gap-4 flex-col sm:flex-row">
          <div className="w-full">
            <label htmlFor="email" className="font-roboto font-bold">
              Enter Your Email<span className="text-red-700">*</span>
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
              placeholder="e.g. - abc@def.com"
              required=""
            />
          </div>
        </div>
        <div className="w-full flex gap-4 flex-col sm:flex-row">
          <div className="w-full relative">
            <label htmlFor="password" className="font-roboto font-bold">
              Enter Password<span className="text-red-700">*</span>
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="Login-password"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
              placeholder="Enter Password"
              required=""
            />
            <div
              onClick={(e) => {
                e.preventDefault();
                if (viewPassword) {
                  document.querySelector("#Login-password").type = "password";
                  setViewPassword(!viewPassword);
                } else {
                  document.querySelector("#Login-password").type = "text";
                  setViewPassword(!viewPassword);
                }
              }}
              className="cursor-pointer w-fit h-fit absolute right-[5%] bottom-1/4 translate-y-1/4"
            >
              {viewPassword ? (
                <i class="bi bi-eye-slash-fill"></i>
              ) : (
                <i class="bi bi-eye-fill"></i>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Log In
          </button>
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
