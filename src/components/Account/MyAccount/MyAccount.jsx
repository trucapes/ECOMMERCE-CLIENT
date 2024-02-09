import "./MyAccount.css";
import { Link } from "react-router-dom";
import { FormControl, Input, TextField } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

export function BasicTabs() {
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
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
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

const Buttons = ({ title, to, active }) => {
  return (
    <Link to={to}>
      <div
        className={`user-info-btns w-fit ${
          active ? "border-b-4 border-b-blue-600  text-blue-600" : ""
        } text-center font-semibold px-3 py-1 relative`}
      >
        {title}
      </div>
    </Link>
  );
};

const MyAccount = (props) => {
  return (
    <>
      <div className="account-container p-3 bg-slate-200">
        <div className="account-header bg-[#ffe26e] flex flex-col sm:flex-row rounded-t-lg p-[25px]">
          <div className="profile-container rounded-2xl overflow-hidden w-full sm:w-52 aspect-square">
            <img
              src="https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png"
              alt=""
            />
          </div>
          <div className="detail-container px-2 sm:py-2 py-4 sm:px-4 flex sm:flex-row justify-between">
            <div className="detail-container px-2 sm:px-4 flex flex-col justify-between">
              <div className="user-name font-bold w-fit">
                <input
                  className="bg-transparent cursor-pointer outline-none focus:border-b focus:border-b-black py-1 text-[34px] w-48"
                  defaultValue={"John Deer"}
                  // disabled
                />
              </div>
              <div className="user-role text-[16px] text-slate-700 font-bold">
                Role :{" "}
                <span>
                  <input
                    className="bg-transparent cursor-pointer outline-none focus:border-b focus:border-b-black py-1 w-40"
                    defaultValue={"John Deer"}
                    type="text"
                  />
                </span>
              </div>
              <div className="user-email text-[16px] text-slate-700 font-bold">
                Email :{" "}
                <span>
                  <input
                    className="bg-transparent outline-none cursor-pointer focus:border-b focus:border-b-black py-1 w-40"
                    defaultValue={"dsjkdsk@fffd.com"}
                    type="text"
                  />
                </span>
              </div>
              <div className="user-status text-[16px] text-slate-700 font-bold">
                Status :{" "}
                <span className="bg-[#d1b95a] px-2 rounded-full font-normal text-base">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
{/* Different Tabs */}
        <BasicTabs />
      </div>
    </>
  );
};

export default MyAccount;
