import { Alert } from "@mui/material";
import React from "react";

function AlertMsg({ message }) {
  return (
    <div className="w-full sm:w-[45%]">
      <Alert
        severity="warning"
        sx={{ backgroundColor: "#ffe26e72", fontWeight: "600" }}
      >
        {message}
      </Alert>
    </div>
  );
}

export default AlertMsg;
