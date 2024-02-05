import axios from "axios";

var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    fName != "" &&
    lName != "" &&
    email != "" &&
    mobile != "" &&
    enteredCountry != "" &&
    city != "" &&
    role != "" &&
    enterISDcode != "" &&
    password != "" &&
    cnfPassword != ""
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
    if (password == cnfPassword) {
      axios
        .post("http://localhost:3000/signup", {
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
        .then((res) => {
          if (res.data.state == "done") {
            setAlt(true);
            setAltMsg("Signup Success");
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
    }, 2000);
  }
  console.log(
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
    password
  );
}
export function handleLogIn(email, password, setAlt, setAltMsg) {
  if (email != "" && password != "") {
    if (!pattern.test(email)) {
      setAlt(true);
      setAltMsg("Enter valid email address");
      setTimeout(() => {
        setAlt(false);
        setAltMsg("");
      }, 2000);
      return;
    }
    axios
      .post("http://localhost:3000/login", { email, password })
      .then((res) => {
        if (res.data.state == "exist") {
          setAlt(true);
          setAltMsg("Log In Success");
          //set the token and UserContext and navigate to main page
        } else if (res.data.sate == "doesNotExist") {
          setAlt(true);
          setAltMsg("Email doesn't exist in our record, plese register");
        } else {
          setAlt(true);
          setAltMsg("Wrong Password");
        }
      })
      .catch((err) => {
        setAlt(true);
        setAltMsg("Error while sending the data");
      })
      .finally(() => {
        setTimeout(() => {
          setAlt(false);
          setAltMsg("");
        }, 2000);
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
