import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterCard.css";
import { Stack, FormControlLabel, Checkbox } from "@mui/material";
import axios from "axios";
import InputBox from "../../InputBox/InputBox";
import AlertMsg from "../../Alert/AlertMsg";
import { handleSignup } from "../../../helpers/Auth";
import handleToggle from "../../../helpers/VisibilityToggler";
import { ClipLoader } from "react-spinners";

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
  const [loader, setLoader] = useState(false);

  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");

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
        className="shadow-md rounded-md w-full sm:w-[90%] md:w-[60%] p-4 sm:p-8"
      >
        <h4 className="font-roboto font-bold">Create Account</h4>
        <div className="w-full flex gap-1 flex-col sm:flex-row">
          <InputBox
            label={"Enter First Name"}
            required={true}
            setter={setFName}
            placeholder={"e.g. - John"}
            name={"firstName"}
          />
          <InputBox
            label={"Enter Last Name"}
            required={true}
            setter={setLName}
            placeholder={"e.g. - Deer"}
            name={"secondName"}
          />
        </div>
        <div className="w-full flex gap-4 flex-col sm:flex-row">
          <InputBox
            label={"Enter Your email"}
            required={true}
            setter={setEmail}
            placeholder={"e.g. - abc@def.com"}
            type={"email"}
            name={"email"}
          />
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
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
            >
              <option value="">Select ISD Code</option>
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
          <InputBox
            label={"Enter Mobile No."}
            required={true}
            setter={setMobile}
            placeholder={"e.g. 1234567890"}
            name={"mobile"}
          />
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
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
              placeholder="Select Country"
              required=""
            >
              <option value="">Select Country</option>
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
          <InputBox
            label={"Enter City"}
            required={true}
            setter={setCity}
            placeholder={"e.g. New York"}
            name={"city"}
          />
        </div>
        <div className="w-full flex gap-4 flex-col sm:flex-row">
          <InputBox
            label={"Enter Company/Business Name"}
            required={false}
            setter={setComName}
            placeholder={"e.g. - Google"}
            name={"companyName"}
          />
          <InputBox
            label={"Enter Company/Business Website"}
            required={false}
            setter={setComWeb}
            placeholder={"e.g. - www.example.com"}
            name={"companyWebsite"}
          />
        </div>
        <div className="w-full flex gap-4 flex-col sm:flex-row">
          <div className="w-full sm:w-[30%]">
            <label htmlFor="role" className="font-roboto font-bold">
              Register as<span className="text-red-700">*</span>
            </label>
            <select
              defaultValue={""}
              onChange={(e) => {
                e.preventDefault();
                setRole(e.target.value);
              }}
              type="text"
              name="role"
              id="role"
              className="bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
              placeholder="e.g. - www.xyz.com"
              required=""
            >
              <option value={""}>Select Role</option>
              <option value={"distributor"}>Distributor</option>
              <option value={"dealer"}>Dealer</option>
              <option value={"contractor"}>Contractor</option>
            </select>
          </div>
        </div>
        <div className="w-full flex gap-4 flex-col sm:flex-row">
          <InputBox
            label={"Enter Password"}
            className={"relative"}
            type={"password"}
            required={true}
            setter={setPassword}
            placeholder={"Enter Password"}
            id={"Registration"}
            name={"password"}
          >
            <div
              onClick={(e) => {
                handleToggle(
                  e,
                  viewPassword,
                  "Registration-password",
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
          <InputBox
            label={"Re-enter Password"}
            className={"relative"}
            type={"password"}
            required={true}
            setter={setCnfPassword}
            placeholder={"Re-enter Password"}
            id={"Registration"}
            name={"cnfPassword"}
          >
            <div
              onClick={(e) => {
                handleToggle(
                  e,
                  viewCnfPassword,
                  "Registration-cnfPassword",
                  setViewCnfPassword
                );
              }}
              className="w-fit cursor-pointer h-fit absolute right-[5%] bottom-1/4 translate-y-1/4"
            >
              {viewCnfPassword ? (
                <i className="bi bi-eye-slash-fill"></i>
              ) : (
                <i className="bi bi-eye-fill"></i>
              )}
            </div>
          </InputBox>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            setAgree(!agree);
          }}
          className=" w-full flex flex-row justify-start items-center"
        >
          <FormControlLabel control={<Checkbox checked={agree} />} label="" />
          <h1 className="text-sm font-normal">
            I agree to the{" "}
            <span className="text-blue-600 underline cursor-pointer">
              Terms and Conditions
            </span>{" "}
            of Tru Scapes
          </h1>
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
                handleSignup(
                  fName,
                  lName,
                  email,
                  mobile,
                  enteredCountry,
                  city,
                  comName,
                  comWeb,
                  role,
                  agree,
                  enteredISDcode,
                  password,
                  cnfPassword,
                  setAlert,
                  setMsg,
                  setLoader
                );
              }}
              type="submit"
              className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create Account
            </button>
          )}
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
