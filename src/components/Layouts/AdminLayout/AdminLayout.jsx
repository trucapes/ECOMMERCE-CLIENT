import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import {
  Add,
  AttachMoney,
  Category,
  LockResetRounded,
  PieChart,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { FaChevronDown } from "react-icons/fa6";
import profileAPI from "../../../api/profileAPI";
import ResetPasswordPopup from "../../Card/RegisterCard/ResetPasswordPopup";

export const mainListItems = (
  <React.Fragment>
    <Link style={{ color: "#000" }} legacyBehavior href="/admin">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link style={{ color: "#000" }} legacyBehavior href="/admin/users">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </Link>
    <Link style={{ color: "#000" }} legacyBehavior href="/admin/categories">
      <ListItemButton>
        <ListItemIcon>
          <Category />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItemButton>
    </Link>
    <Link style={{ color: "#000" }} legacyBehavior href="/admin/products/add">
      <ListItemButton>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText primary="Add Product" />
      </ListItemButton>
    </Link>
    <Link style={{ color: "#000" }} legacyBehavior href="/admin/products">
      <ListItemButton>
        <ListItemIcon>
          <Category />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItemButton>
    </Link>
    <Link style={{ color: "#000" }} legacyBehavior href="/admin/order">
      <ListItemButton>
        <ListItemIcon>
          <PieChart />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
    </Link>
    <Link style={{ color: "#000" }} legacyBehavior href="/admin/payments">
      <ListItemButton>
        <ListItemIcon>
          <AttachMoney />
        </ListItemIcon>
        <ListItemText primary="Payments" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright © "}
      Tru-Scapes {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// Create a custom theme by extending the default theme
const defaultTheme = createTheme({
  // Customize the palette for colors
  palette: {
    primary: {
      main: "#FFE26E",
    },
    secondary: {
      main: "#e0ffee",
    },
  },

  // Customize the typography
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2rem",
    },
    h2: {
      fontSize: "1.5rem",
    },
  },

  spacing: 8,
  shape: {
    borderRadius: 8,
  },
});

const AdminLayout = ({ children, profile }) => {
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openResetPassword, setOpenResetPassword] = React.useState(false);
  const nav = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("tru-scapes-token");

    // Perform a hard refresh to the '/' URL
    window.location.href = "/";
  };

  const checkAdminUser = async () => {
    // const adminUser = await profileAPI.getProfile();

    // console.log(adminUser)

    if (profile && profile.userRole === "admin") {
      setLoading(false);
    } else {
      // setLoading(true);
      nav("/");
    }
  };

  React.useEffect(() => {
    checkAdminUser();
  }, [profile]);

  return (
    <ThemeProvider theme={defaultTheme}>
      {!loading && (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px",
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>

              <div style={{ display: "flex", alignItems: "center" }}>
                {profile && (
                  <>
                    <Avatar
                      alt={profile.userName}
                      src={profile.avatar} // Assuming there's an 'avatar' property in the profile
                      sx={{ width: 32, height: 32, marginRight: 1 }}
                    />
                    <IconButton
                      size="small"
                      color="inherit"
                      onClick={handleMenuClick}
                    >
                      <FaChevronDown />
                    </IconButton>
                  </>
                )}
              </div>

              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    setOpenResetPassword(true);
                  }}
                >
                  <ListItemIcon>
                    <LockResetRounded fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Reset Password" />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>

              {/* <Headers /> */}
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: [1],
              }}
            >
              Version: 1.0.0
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />

            <List component="nav">{mainListItems}</List>
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              {children}
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      )}

      {profile && profile.email && (
        <ResetPasswordPopup
          isOpen={openResetPassword}
          setIsOpen={setOpenResetPassword}
          email={profile.email}
        />
      )}

      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </ThemeProvider>
  );
};

export default AdminLayout;
