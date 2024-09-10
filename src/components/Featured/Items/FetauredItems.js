import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ItemCard from "../../Card/ItemCard/ItemCard";
import ReactLoading from "react-loading";
import "./FeaturedItems.css";
import { useEffect, useState } from "react";
import { userProductsAPI } from "../../../api/userProductsAPI";

const FeaturedItems = (props) => {
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    const getFeaturedItems = async () => {
      try {
        const response = await userProductsAPI.getHomeProducts();
        console.log(response.data.data);
        setFeaturedItems([...response.data.data]);
      } catch (error) {
        console.log(error);
      }
    };
    getFeaturedItems();
  }, []);

  return (
    <div className="featured__products__container">
      <div className="featured__products">
        <div className="featured__products__header">
          <h3 className="featured__items__header__big">Featured Items </h3>
        </div>
        <div className="featured__products__header__line"></div>
        <div className="d-flex w-100 justify-content-center align-items-center m-auto">
          {featuredItems && featuredItems.length === 0 && (
            <ReactLoading
              type="balls"
              color="#FFE26E"
              height={100}
              width={100}
              className="m-auto"
            />
          )}
          {featuredItems && featuredItems.length > 0 && (
            <div className="featured__products__card__container">
              {featuredItems.map((item) => (
                <ItemCard
                  key={item._id}
                  profile={props.profile}
                  item={item}
                  category={item.category.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedItems;
