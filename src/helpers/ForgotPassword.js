import axios from "axios";

var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function handleForgotPassword(
  email,
  setAlt,
  setAltMsg
) {
  if (email != "") {
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
      .post("http://localhost:3000/forgot", { email })
      .then((res) => {
        if (res.data.state == "done") {
          setAlt(true);
          setAltMsg("Password changed, new password has been sent to your email");
          //set the new password and send it to email
        } else if (res.data.state == "doesNotExist") {
          setAlt(true);
          setAltMsg("Email doesn't exist in our record, plese register");
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
    setAltMsg("Please enter email address");
    setTimeout(() => {
      setAlt(false);
      setAltMsg("");
    }, 2000);
  }
}
