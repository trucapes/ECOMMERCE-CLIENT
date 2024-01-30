import "./NavBrand.css";
import { Link } from "react-router-dom";
import Logo from "../../../asset/brand/logo.png";

const NavBrand = () => {
  return (
    <div href="#home" className="navbrand__container">
      <Link to={"/"} className="navbrand__logo__container">
        <img className="navbrand__logo" src={Logo} alt="" />
      </Link>
    </div>
  );
};

export default NavBrand;
