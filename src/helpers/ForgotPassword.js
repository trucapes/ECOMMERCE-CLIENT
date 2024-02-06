import axios from "axios";

var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function handleForgotPassword(
  email,
  password,
  cnfPassword,
  setAlt,
  setAltMsg
) {
  if (email != "" && password != "" && cnfPassword != "") {
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
      .post("http://localhost:3000/forgot", { email, password })
      .then((res) => {
        if (res.data.state == "done") {
          setAlt(true);
          setAltMsg("Password changed Successfully");
          //set the new token and UserContext and navigate to main page
        } else if (res.data.state == "doesNotExist") {
          setAlt(true);
          setAltMsg("Email doesn't exist in our record, plese register");
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
    setAltMsg("Enter all fields");
    setTimeout(() => {
      setAlt(false);
      setAltMsg("");
    }, 2000);
  }
}
