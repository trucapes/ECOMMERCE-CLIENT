import { toast } from "react-toastify";
import authAPI from "../api/auth";

var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const convertToRequiredFormat = (data) => {
  return {
    firstName: data.fName,
    lastName: data.lName,
    email: data.email,
    mobileNo: data.mobile,
    country: data.enteredCountry,
    city: data.city,
    company: data.comName,
    companyWebsite: data.comWeb,
    companyAddress: data.comAddress,
    userRole: data.role,
    password: data.password,
  };
};

export function handleSignup(
  fName,
  lName,
  email,
  mobile,
  enteredCountry,
  city,
  comName,
  comWeb,
  comAddress,
  role,
  agree,
  enterISDcode,
  password,
  cnfPassword,
  setAlt,
  setAltMsg,
  setLoader
) {
  if (
    fName !== "" &&
    lName !== "" &&
    email !== "" &&
    mobile !== "" &&
    enteredCountry !== "" &&
    city !== "" &&
    role !== "" &&
    enterISDcode !== "" &&
    password !== "" &&
    cnfPassword !== ""
  ) {
    if (!pattern.test(email)) {
      setAlt(true);
      setAltMsg("Enter valid email address");
      setTimeout(() => {
        setAlt(false);
        setAltMsg("");
      }, 2000);
      return;
    }
    if (!agree) {
      setAlt(true);
      setAltMsg("You must agree with the terms and conditions");
      setTimeout(() => {
        setAlt(false);
        setAltMsg("");
      }, 2000);
      return;
    }
    if (password === cnfPassword) {
      setLoader(true);
      authAPI
        .register(
          convertToRequiredFormat({
            fName,
            lName,
            email,
            mobile,
            enteredCountry,
            city,
            comName,
            comWeb,
            comAddress,
            role,
            enterISDcode,
            password,
          })
        )
        .then((res) => {
          if (res.data.error === false) {
            setAlt(true);
            setAltMsg(res.data.message);
            let success = window.confirm(
              "Your Account has been created successfully, you can login once you are verified"
            );
            if (success) {
              window.location.href = "/";
            }
          }
        })
        .catch((err) => {
          setAlt(true);
          setAltMsg(err.response.data.message);
        })
        .finally(() => {
          setLoader(false);
          setTimeout(() => {
            setAlt(false);
            setAltMsg("");
          }, 1000);
        });
    } else {
      setAlt(true);
      setAltMsg("Password in both the fields should be same");
      setTimeout(() => {
        setAlt(false);
        setAltMsg("");
      }, 2000);
    }
  } else {
    setAlt(true);
    setAltMsg("Enter all fields");
    setTimeout(() => {
      setAlt(false);
      setAltMsg("");
    }, 2000);
  }
}

export function handleLogIn(email, password, setAlt, setAltMsg, setLoader) {
  if (email !== "" && password !== "") {
    if (!pattern.test(email)) {
      setAlt(true);
      setAltMsg("Enter valid email address");
      setTimeout(() => {
        setAlt(false);
        setAltMsg("");
      }, 2000);
      return;
    }
    setLoader(true);
    authAPI
      .login({ identifier: email, password: password })
      .then((res) => {
        setAlt(true);
        setAltMsg(res.data.message);
        if (res.status === 200) {
          console.log(res.data);

          if (res.data.user.isPending === true) {
            toast.error(
              "Your account is not verified yet. Please contact admin for verification"
            );
            setAlt(true);
            setAltMsg(
              "Your account is not verified yet. Please contact admin for verification"
            );
            setTimeout(() => {
              setAlt(false);
              setAltMsg("");
            }, 2000);
            return;
          }

          //set the token and UserContext and navigate to main page
          localStorage.setItem("tru-scapes-token", res.data.token);
          if (res.data.user.userRole === "admin") {
            window.location.href = "/admin";
          } else {
            window.location.href = "/";
          }
        }
      })
      .catch((err) => {
        setAlt(true);
        console.log(err);
        setAltMsg(err.response.data.message);
      })
      .finally(() => {
        setLoader(false);
        setTimeout(() => {
          setAlt(false);
          setAltMsg("");
        }, 1000);
      });
  } else {
    setAlt(true);
    setAltMsg("Enter all fields");
    setTimeout(() => {
      setAlt(false);
      setAltMsg("");
    }, 2000);
  }
}
