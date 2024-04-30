import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../../../api/apiwrapper";
import { toast } from "react-toastify";

const ResetPasswordPopup = ({ isOpen, setIsOpen, email }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      try {
        await axios.post(`${API_BASE_URL}/auth/reset`, {
          email: email,
          password: newPassword,
          oldPassword: currentPassword,
        });
        toast.success("Password Reset Successful");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setIsOpen(false);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" id="modal-title">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Enter Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            sx={{ mt: 2, width: "100%" }}
          />
          <TextField
            label="Enter New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mt: 2, width: "100%" }}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            sx={{ mt: 2, width: "100%" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ResetPasswordPopup;
