import { Link } from "react-router-dom";
import "./NavLinks.css";
import { useEffect, useState } from "react";
import { CategoryAPI } from "../../../api/categoryAPI";

const NavLinks = ({profile}) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const res = await CategoryAPI.getCategories();
      if(profile && profile.userRole === "contractor"){
        res.data.data = res.data.data.filter((item) => !(item.name.includes("Hardscape") || item.name.includes("Landscape")));
      }
      setCategories([...res.data.data]);
    };
    getCategories();
  }, [profile]);

  return (
    <nav className="nav__bottom__container">
      <div className="bottom__container">
        <ul className="nav">
          {/* <li className="nav-link">
            <a href="https://tru-scapes.com/" target="_blank">
              Home
            </a>

          </li>
          <li className="nav-link">
            <Link to="/">Shop</Link>{" "}
          </li> */}
          {categories.length > 0 &&
            categories.map((category) => (
              <li className="nav-link">
                <Link to={`/category/${category.name}`}>{category.name}</Link>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavLinks;
