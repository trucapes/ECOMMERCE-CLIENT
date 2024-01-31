import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterCard.css";
import { Stack, FormControlLabel, Checkbox } from "@mui/material";
import axios from "axios";

const RegisterCard = () => {
  const [ISDcodes, setISDcodes] = useState([]);
  const [country, setCountry] = useState([]);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [enteredCountry, setEnteredCountry] = useState("");
  const [city, setCity] = useState("");
  const [comName, setComName] = useState(null);
  const [comWeb, setComWeb] = useState(null);
  const [role, setRole] = useState("");
  const [agree, setAgree] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [viewCnfPassword, setViewCnfPassword] = useState(false);
  const [enteredISDcode, setEnteredISDcode] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      let countries = res.data.map((data) => {
        return data.name.common;
      });
      let ISDs = res.data.map((data) => {
        if (!data.idd.root) return "";
        let suf = "";
        if (data.idd.suffixes) {
          suf += data.idd.suffixes[0];
        }
        return data.idd.root + suf;
      });
      countries.sort();
      ISDs.sort();
      setCountry(countries);
      setISDcodes(ISDs);
    });
  }, []);

  return (
    <div className="register__card__container w-full flex justify-center items-center">
      <Stack
        spacing={4}
        className="shadow-md rounded-md w-[95%] sm:w-[90%] md:w-[80%] p-8"
      >
        <h1 className="font-roboto font-bold">Create Account</h1>
        <div className="w-full flex gap-4 flex-col sm:flex-row">
          <div className="w-full">
            <label htmlFor="firstName" className="font-roboto font-bold">
              Enter First Name<span className="text-red-700">*</span>
            </label>
            <input
              onChange={(e) => {
                e.preventDefault();
                setFName(e.target.value);
              }}
              type="text"
              name="firstName"
              id="firstName"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
              placeholder="e.g. - John"
              required=""
            />
          </div>
          <div className="w-full">
            <label htmlFor="secondName" className="font-roboto font-bold">
              Enter Last Name<span className="text-red-700">*</span>
            </label>
            <input
              onChange={(e) => {
                e.preventDefault();
                setLName(e.target.value);
              }}
              type="text"
              name="secondName"
              id="secondName"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
              placeholder="e.g. - Deer"
              required=""
            />
          </div>
        </div>
        <div className="w-full flex gap-4 flex-col sm:flex-row">
          <div className="w-full">
            <label htmlFor="email" className="font-roboto font-bold">
              Enter Your Email<span className="text-red-700">*</span>
            </label>
            <input
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
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
          <div className=" w-full sm:w-[45%]">
            <label htmlFor="ISDcode" className="font-roboto font-bold">
              Select ISD Code<span className="text-red-700">*</span>
            </label>
            <select
              onChange={(e) => {
                e.preventDefault();
                setEnteredISDcode(e.target.value);
              }}
              id="ISDcode"
              name="ISDcode"
              placeholder="Select ISD Code"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
            >
              {ISDcodes.map((val, index) => {
                if (!val) return;
                return (
                  <option key={index} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="mobile" className="font-roboto font-bold">
              Enter Mobile No.<span className="text-red-700">*</span>
            </label>
            <input
              onChange={(e) => {
                e.preventDefault();
                setMobile(e.target.value);
              }}
              id="mobile"
              name="mobile"
              type="text"
              placeholder="e.g. - 12334567890"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
            />
          </div>
        </div>
        <div className="w-full flex gap-4 flex-col sm:flex-row">
          <div className="w-full">
            <label htmlFor="country" className="font-roboto font-bold">
              Select Country<span className="text-red-700">*</span>
            </label>
            <select
              onChange={(e) => {
                e.preventDefault();
                setEnteredCountry(e.target.value);
              }}
              type="text"
              name="country"
              id="country"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
              placeholder="Select Country"
              required=""
            >
              {country.map((val, index) => {
                if (!val) return;
                return (
                  <option key={index} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="city" className="font-roboto font-bold">
              Enter City<span className="text-red-700">*</span>
            </label>
            <input
              onChange={(e) => {
                e.preventDefault();
                setCity(e.target.value);
              }}
              type="text"
              name="city"
              id="city"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
              placeholder="e.g. - Delhi"
              required=""
            />
          </div>
        </div>
        <div className="w-full flex gap-4 flex-col sm:flex-row">
          <div className="w-full">
            <label htmlFor="companyName" className="font-roboto font-bold">
              Enter Company/Business Name
            </label>
            <input
              onChange={(e) => {
                e.preventDefault();
                setComName(e.target.value);
              }}
              type="text"
              name="companyName"
              id="companyName"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
              placeholder="e.g. - Google"
              required=""
            />
          </div>
        </div>
        <div className="w-full flex gap-4 flex-col sm:flex-row">
          <div className="w-full">
            <label htmlFor="companyWebsite" className="font-roboto font-bold">
              Enter Company/Business Website
            </label>
            <input
              onChange={(e) => {
                e.preventDefault();
                setComWeb(e.target.value);
              }}
              type="text"
              name="companyWebsite"
              id="companyWebsite"
              class="bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
              placeholder="e.g. - www.xyz.com"
              required=""
            />
          </div>
        </div>
        <div className="w-full flex gap-4 flex-col sm:flex-row">
          <div className="w-full sm:w-[30%]">
            <label htmlFor="role" className="font-roboto font-bold">
              Register as<span className="text-red-700">*</span>
            </label>
            <select
              onChange={(e) => {
                e.preventDefault();
                setRole(e.target.value);
              }}
              type="text"
              name="role"
              id="role"
              class="bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
              placeholder="e.g. - www.xyz.com"
              required=""
            >
              <option value={"Distributor"}>Distributor</option>
              <option value={"Dealer"}>Dealer</option>
              <option value={"Contractor"}>Contractor</option>
            </select>
          </div>
        </div>
        <div className="w-full flex gap-4 flex-col sm:flex-row">
          <div className="w-full relative">
            <label htmlFor="password" className="font-roboto font-bold">
              Enter Password<span className="text-red-700">*</span>
            </label>
            <input
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              id="Registration-password"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
              placeholder="Enter Password"
              required=""
            />
            <div
              onClick={(e) => {
                e.preventDefault();
                if (viewPassword) {
                  document.querySelector("#Registration-password").type =
                    "password";
                  setViewPassword(!viewPassword);
                } else {
                  document.querySelector("#Registration-password").type =
                    "text";
                  setViewPassword(!viewPassword);
                }
              }}
              className=" cursor-pointer w-fit h-fit absolute right-[5%] bottom-1/4 translate-y-1/4"
            >
              {viewPassword ? (
                <i class="bi bi-eye-slash-fill"></i>
              ) : (
                <i class="bi bi-eye-fill"></i>
              )}
            </div>
          </div>
          <div className="w-full relative">
            <label htmlFor="cnfPassword" className="font-roboto font-bold">
              Re-enter Password<span className="text-red-700">*</span>
            </label>
            <input
              onChange={(e) => {
                e.preventDefault();
                setCnfPassword(e.target.value);
              }}
              type="password"
              name="cnfPassword"
              id="Registration-cnfPassword"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
              placeholder="Re-enter Password"
              required=""
            />
            <div
              onClick={(e) => {
                e.preventDefault();
                if (viewCnfPassword) {
                  document.querySelector("#Registration-cnfPassword").type =
                    "password";
                  setViewCnfPassword(!viewCnfPassword);
                } else {
                  document.querySelector("#Registration-cnfPassword").type =
                    "text";
                  setViewCnfPassword(!viewCnfPassword);
                }
              }}
              className="w-fit cursor-pointer h-fit absolute right-[5%] bottom-1/4 translate-y-1/4"
            >
              {viewCnfPassword ? (
                <i class="bi bi-eye-slash-fill"></i>
              ) : (
                <i class="bi bi-eye-fill"></i>
              )}
            </div>
          </div>
        </div>
        <div
          onClick={(e) => {
            setAgree(!agree);
          }}
          className=" w-full flex flex-row justify-start items-center"
        >
          <FormControlLabel control={<Checkbox defaultChecked />} label="" />
          <h1 className="text-sm font-normal">
            I agree to the{" "}
            <span className="text-blue-600 underline cursor-pointer">
              Terms and Conditions
            </span>{" "}
            of Tru Scapes
          </h1>
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Create Account
          </button>
        </div>
        <div className="text-sm">
          Already have an account?{" "}
          <span>
            <Link
              className="text-blue-500 hover:underline cursor-pointer"
              to={"/account/login"}
            >
              Log In
            </Link>
          </span>
        </div>
      </Stack>
    </div>
  );
};

export default RegisterCard;
