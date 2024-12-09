import Navbottom from "../Nav/Nav-Links/NavLinks";
import Navtop from "../Nav/Container/Container";
import "./Header.css";

const Header = ({ profile, isAuthenticated }) => {
  return (
    <>
      <div className="header__container">
        <Navtop profile={profile} isAuthenticated={isAuthenticated} />
        <Navbottom profile={profile} />
      </div>
      <div style={{ height: "110px" }}>&nbsp;</div>
    </>
  );
};

export default Header;
