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
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import PeopleIcon from "@mui/icons-material/People";
import { AddBox, Home, Money, Person, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import CircularProgress from "@mui/material/CircularProgress";

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
    <Link style={{ color: "#000" }} legacyBehavior href="/admin/matches">
      <ListItemButton>
        <ListItemIcon>
          <SportsCricketIcon />
        </ListItemIcon>
        <ListItemText primary="Matches" />
      </ListItemButton>
    </Link>
    <Link style={{ color: "#000" }} legacyBehavior href="/admin/pnlreport">
      <ListItemButton>
        <ListItemIcon>
          <SsidChartIcon />
        </ListItemIcon>
        <ListItemText primary="Profit & Loss" />
      </ListItemButton>
    </Link>
    <Link style={{ color: "#000" }} legacyBehavior href="/admin/transactions">
      <ListItemButton>
        <ListItemIcon>
          <Money />
        </ListItemIcon>
        <ListItemText primary="Transactions" />
      </ListItemButton>
    </Link>
    <Link style={{ color: "#000" }} legacyBehavior href="/">
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home Page" />
      </ListItemButton>
    </Link>
    <Link style={{ color: "#000" }} legacyBehavior href="/profile">
      <ListItemButton>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Profile Page" />
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

const AdminLayout = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [loginUser, setLoginUser] = React.useState(null);
  const nav = useNavigate();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  //   const checkAdminUser = async () => {
  //     const adminUser = await authService.getUser();

  //     if (
  //       adminUser &&
  //       adminUser.user &&
  //       (adminUser.user.role === "admin" || adminUser.user.role === "master")
  //     ) {
  //       setLoading(false);
  //       setLoginUser(adminUser);
  //     } else {
  //       nav("/");
  //     }
  //   };

  React.useEffect(() => {
    // checkAdminUser();
  }, []);

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
