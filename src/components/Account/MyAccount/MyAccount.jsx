import React, { useEffect, useState } from "react";
import "./MyAccount.css";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BasicInfoTab from "./BasicInfoTabb";
import { useNavigate } from "react-router";
import UserTransaction from "../../Transactions/UserTransaction";
import WalletPage from "../../WalletPage/WalletPage";
import MyOrders from "../../MyOrders/MyOrders";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminUserAPI from "../../../api/admin/adminUserAPI";
import { toast } from "react-toastify";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function BasicTabs({ user, isAdmin }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          overflow: "scroll",
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTabs-indicator": { display: "none" },
            scrollSnapType: "x mandatory",
            "& .MuiTab-root": {
              fontSize: "0.8rem",
              minWidth: "40px",
              padding: "0px 10px",
              textAlign: "center",
            },
          }}
        >
          <Tab label="Basic Info" {...a11yProps(0)} />
          <Tab label="My Orders" {...a11yProps(1)} />
          <Tab label="Transactions" {...a11yProps(2)} />
          <Tab label="Wallet" {...a11yProps(3)} />
          {user && user.userRole === "admin" && (
            <Tab label="Settings" {...a11yProps(4)} />
          )}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <BasicInfoTab userData={user} isAdmin={isAdmin} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MyOrders profile={user} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <UserTransaction />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <WalletPage profile={user} />
      </CustomTabPanel>
      {user && user.userRole === "admin" && (
        <CustomTabPanel value={value} index={4}>
          <SettingsTabPanel profile={user} />
        </CustomTabPanel>
      )}
    </Box>
  );
}

const MyAccount = ({ user, isAdmin, isAuthenticated }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/account/login");
    }
  });

  return (
    <>
      {user && (
        <div className="account-container py-10 lg:px-60">
          <div className="account-header bg-[#ffe26e] flex flex-col sm:flex-row rounded-t-lg p-[25px]">
            <div className="profile-container rounded-2xl overflow-hidden w-full sm:w-52 aspect-square">
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/profile-5283577-4413139.png"
                alt=""
              />
            </div>
            <div className="detail-container px-2 sm:py-2 py-4 sm:px-4 flex sm:flex-row justify-between">
              <div className="detail-container px-2 sm:px-4 flex flex-col justify-between">
                <div className="user-name font-extrabold w-fit">
                  <h1>{user.name}</h1>
                </div>
                <div className="user-role text-[16px] text-slate-700 font-bold">
                  Role : <span className="capitalize">{user.userRole}</span>
                </div>
                <div className="user-email text-[16px] text-slate-700 font-bold">
                  Email : <span>{user.email}</span>
                </div>
                <div className="user-status text-[16px] text-slate-700 font-bold">
                  Status :{" "}
                  <span className="bg-[#d1b95a] px-2 rounded-full font-normal text-base">
                    {!user.isPending ? "Active" : "Pending "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Different Tabs */}
          <BasicTabs user={user} isAdmin={isAdmin} />
        </div>
      )}

      {!user && (
        <div className="p-3">
          <Stack spacing={1}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" height={60} />
            <Skeleton variant="rounded" height={60} />
          </Stack>
        </div>
      )}
    </>
  );
};

const SettingsTabPanel = ({ profile }) => {
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [showInput, setShowInput] = useState(false);

  const getEmails = async () => {
    try {
      const response = await AdminUserAPI.getAllAdminEmails();
      setEmails(response.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const handleAddEmail = async () => {
    setShowInput(true);
  };

  const handleSaveEmail = async () => {
    if (newEmail.trim() !== "") {
      try {
        const response = await AdminUserAPI.addAdminEmail(newEmail);
        console.log("New email saved:", response.data);
        setEmails([
          ...emails,
          { _id: response.data.data._id, email: newEmail },
        ]);
        setNewEmail("");
        setShowInput(false);
      } catch (error) {
        toast.error("Error adding email. Please try again later.");
        console.error("Error adding email:", error);
      }
    }
  };

  const handleDeleteEmail = async (id) => {
    try {
      await AdminUserAPI.deleteAdminEmailById(id);
      console.log("Email deleted:", id);
      setEmails(emails.filter((email) => email._id !== id));
    } catch (error) {
      toast.error("Error deleting email. Please try again later.");
      console.error("Error deleting email:", error);
    }
  };

  useEffect(() => {
    getEmails();
  }, []);

  useEffect(() => {
    console.log("Emails updated:", emails);
  }, [emails]);

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h6" gutterBottom>
        Manage Notification Emails
      </Typography>

      {/* Email List */}
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emails.map((email) => (
              <TableRow key={email._id}>
                <TableCell>{email.email}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteEmail(email._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add New Email */}
      {showInput ? (
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            label="Enter email"
            variant="outlined"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <Button variant="contained" onClick={handleSaveEmail}>
            Save
          </Button>
        </Box>
      ) : (
        <Button variant="contained" onClick={handleAddEmail}>
          Add New Email
        </Button>
      )}
    </Box>
  );
};

export default MyAccount;
