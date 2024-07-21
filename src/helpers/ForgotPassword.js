import axios from "axios";
import { API_BASE_URL } from "../api/apiwrapper";
import { toast } from "react-toastify";

var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function handleForgotPassword(email, setAlt, setAltMsg, setLoader) {
  if (email !== "") {
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
    axios
      .post(`${API_BASE_URL}/auth/forgot`, { email })
      .then((res) => {
        if (
          res.data.state === "done" ||
          res.status === 200 ||
          res.status === 201
        ) {
          setAlt(true);
          setAltMsg(
            "Password changed, new password has been sent to your email"
          );
          toast.success(
            "Password changed, new password has been sent to your email"
          );
          //set the new password and send it to email
        } else if (res.data.state === "doesNotExist") {
          setAlt(true);
          setAltMsg("Email doesn't exist in our record, plese register");
        }
      })
      .catch((err) => {
        setAlt(true);
        setAltMsg("Error while sending the data");
      })
      .finally(() => {
        setLoader(false);
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
