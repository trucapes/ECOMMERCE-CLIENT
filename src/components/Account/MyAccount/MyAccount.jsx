import React from "react";
import "./MyAccount.css";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BasicInfoTab from "./BasicInfoTabb";

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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Basic Info" {...a11yProps(0)} />
          <Tab label="My Orders" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <BasicInfoTab userData={user} isAdmin={isAdmin} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}

const MyAccount = ({ user, isAdmin }) => {
  return (
    <>
      {user && (
        <div className="account-container p-3 ">
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
                  Role : <span>{user.userRole}</span>
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

export default MyAccount;
