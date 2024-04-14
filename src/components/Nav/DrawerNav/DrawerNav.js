import { useState, Fragment, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Control from "../Controls/Control";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Form from "../Search-Bar/Form";
import { Link } from "react-router-dom";
import { CategoryAPI } from "../../../api/categoryAPI";

const DrawerNav = ({ profile, isAuthenticated }) => {
  const [state, setState] = useState({
    left: false,
  });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const response = await CategoryAPI.getCategories();
      console.log(response.data.data);
      setCategories([...response.data.data]);
    };
    getCategories();
  }, []);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <Link to="https://tru-scapes.com/" target="_blank">
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/">
            <ListItemText primary="Shop" />
          </Link>
        </ListItem>

        {categories.length > 0 &&
          categories.map((category) => (
            <ListItem>
              <Link to={`/category/${category.name}`}>
                <ListItemText primary={category.name} />
              </Link>
            </ListItem>
          ))}
      </List>
      <List>
        <ListItem disablePadding>
          <Control profile={profile} isAuthenticated={isAuthenticated} />
        </ListItem>
      </List>
      <List>
        <ListItem>
          <div className="search__drawer">
            <Form />
          </div>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <Fragment>
      {["left"].map((anchor) => (
        <Fragment>
          {state.left ? (
            <MenuOpenIcon fontSize="large" />
          ) : (
            <MenuIcon fontSize="large" onClick={toggleDrawer(anchor, true)} />
          )}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default DrawerNav;
