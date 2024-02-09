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
  role,
  agree,
  enterISDcode,
  password,
  cnfPassword,
  setAlt,
  setAltMsg
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
    if (agree) {
      setAlt(true);
      setAltMsg("You must agree with the terms and conditions");
      setTimeout(() => {
        setAlt(false);
        setAltMsg("");
      }, 2000);
      return;
    }
    if (password === cnfPassword) {
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
            role,
            enterISDcode,
            password,
          })
        )
        .then((res) => {
          if (res.data.error === false) {
            setAlt(true);
            setAltMsg(
              "Register Successfully! You will be able to login once Admin Approves."
            );
            // localStorage.setItem("token", res.data.token);
          } else {
            setAlt(true);
            setAltMsg("Email already exists, please login");
          }
        })
        .catch((err) => {
          setAlt(true);
          setAltMsg("Error While Sending the Data");
        })
        .finally(() => {
          setTimeout(() => {
            setAlt(false);
            setAltMsg("");
          }, 2000);
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
    }, 5000);
  }
}

export function handleLogIn(email, password, setAlt, setAltMsg) {
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
    authAPI
      .login({ identifier: email, password: password })
      .then((res) => {
        if (res.status === 200) {
          setAlt(true);
          setAltMsg("Log In Success");
          //set the token and UserContext and navigate to main page
          localStorage.setItem("tru-scapes-token", res.data.token);
        } else if (res.data.state === "doesNotExist") {
          setAlt(true);
          setAltMsg("Email doesn't exist in our record, plese register");
        } else {
          setAlt(true);
          setAltMsg(res.data.message);
        }
      })
      .catch((err) => {
        setAlt(true);
        console.log(err);
        setAltMsg(err.response.data.message);
      })
      .finally(() => {
        setTimeout(() => {
          setAlt(false);
          setAltMsg("");
        }, 5000);
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
