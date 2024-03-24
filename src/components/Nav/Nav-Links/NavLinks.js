import { Link } from "react-router-dom";
import "./NavLinks.css";
import { useEffect, useState } from "react";
import { CategoryAPI } from "../../../api/categoryAPI";

const NavLinks = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const response = await CategoryAPI.getCategories();
      console.log(response.data.data);
      setCategories([...response.data.data]);
    };
    getCategories();
  }, []);

  return (
    <nav className="nav__bottom__container">
      <div className="bottom__container">
        <ul className="nav">
          <li className="nav-link">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-link">
            <Link to="/shop">Shop</Link>{" "}
          </li>
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
