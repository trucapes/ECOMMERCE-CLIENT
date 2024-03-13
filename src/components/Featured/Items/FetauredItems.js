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
        console.log(response.data);
        setFeaturedItems(response.data);
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
          <Link to="/shop" className="featured__header__small">
            Show all
            <ArrowRightAltIcon />
          </Link>
        </div>
        <div className="featured__products__header__line"></div>
        <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
          {!props.items && (
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
              {featuredItems.map((item) => {
                <ItemCard
                  profile={props.profile}
                  item={item}
                  category="featured"
                />;
              })}
              <ItemCard
                profile={props.profile}
                item={props.items[4]}
                category="featured"
              />
              <ItemCard
                profile={props.profile}
                item={props.items[10]}
                category="featured"
              />
              <ItemCard
                profile={props.profile}
                item={props.items[20]}
                category="featured"
              />
              <ItemCard
                profile={props.profile}
                item={props.items[16]}
                category="featured"
              />
              <ItemCard
                profile={props.profile}
                item={props.items[5]}
                category="featured"
              />
              <ItemCard
                profile={props.profile}
                item={props.items[13]}
                category="featured"
              />
              <ItemCard
                profile={props.profile}
                item={props.items[23]}
                category="featured"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedItems;
