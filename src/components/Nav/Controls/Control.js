import "./Control.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import Cart from "../../Card/Cart/Cart";
import { useContext } from "react";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button } from "@mui/material";
import { SecurityRounded } from "@mui/icons-material";

const Control = ({ profile, isAuthenticated }) => {
  const wishItems = useContext(WishItemsContext);
  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("tru-scapes-token");

    // Perform a hard refresh to the '/' URL
    window.location.href = "/";
  };

  return (
    <div className="control__bar__container">
      <div className="controls__container">
        <div className="controls">
          {!profile && (
            <Link to={`/account/${profile ? "me" : "login"}`}>
              <Button variant="contained"> Login</Button>
            </Link>
          )}
        </div>
        {profile && (
          <>
            {profile.userRole === "admin" ? (
              <div
                className="control"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/admin";
                }}
              >
                <SecurityRounded color="black" sx={{ width: "35px" }} />
              </div>
            ) : (
              <div className="control">
                <Link to={`/account/${profile ? "me" : "login"}`}>
                  <PersonOutlineIcon color="black" sx={{ width: "35px" }} />
                </Link>
              </div>
            )}

            <div className="control">
              <Link to="/wishlist">
                <Badge badgeContent={wishItems.items.length} color="error">
                  <FavoriteBorderIcon color="black" sx={{ width: "35px" }} />
                </Badge>
              </Link>
            </div>
            <div className="control">
              <Cart profile={profile} />
            </div>
            <div className="control">
              <ExitToAppIcon
                color="black"
                size="large"
                sx={{ width: "35px", cursor: "pointer" }}
                onClick={handleLogout}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Control;
