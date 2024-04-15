import "./ItemCard.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import { SERVER_URL } from "../../../api/apiwrapper";

const ItemCard = (props) => {
  console.log(props);
  const [isHovered, setIsHovered] = useState(false);
  const cartItemsContext = useContext(CartItemsContext);
  const wishItemsContext = useContext(WishItemsContext);

  //   console.log(props.item);

  const handleAddToWishList = () => {
    wishItemsContext.addItem(props.item);
  };

  const handleAddToCart = () => {
    cartItemsContext.addItem(props.item, 1);
  };

  return (
    <div className="product__card__card hover:scale-105 duration-150">
      <Link to={`/item/${props.category}/${props.item._id}`}>
        <div className="product__card">
          <div className="product__image">
            <img
              src={`${
                SERVER_URL + props.item.images[0].path.replace(/\\/g, "/")
              }`.replace("/public/", "/")}
              alt="item"
              className="product__img"
            />
          </div>
          <div className="product__card__detail">
            <div className="product__name">
              <Link to={`/item/${props.item.category.name}/${props.item._id}`}>
                {props.item.name}
              </Link>
            </div>
            <div className="product__description">
              <span>
                {props.item.description
                  .replace(/<\/?[^>]+(>|$)/g, "")
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")
                  .concat(
                    props.item.description.split(" ").length > 80 ? " ..." : ""
                  )}
              </span>
            </div>
            <br />
            {props.profile !== null && (
              <div className="product__price">
                <span>
                  {props.profile.userRole === "dealer"
                    ? "$" + props.item.price.dealer
                    : props.profile.userRole === "distributor"
                    ? "$" + props.item.price.distributor
                    : props.profile.userRole === "contractor"
                    ? "$" + props.item.price.contractor
                    : "$" + props.item.price.regular}
                </span>
              </div>
            )}
            {props.profile && (
              <div className="product__card__action">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToWishList();
                  }}
                  sx={{
                    borderRadius: "20px",
                    width: "40px",
                    height:
                      "40px" /* borderWidth: '3px', borderStyle: 'solid', borderColor: '#FFE26E' */,
                  }}
                >
                  <FavoriteBorderIcon
                    sx={{ width: "22px", height: "22px", color: "black" }}
                  />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                  sx={{
                    borderRadius: "20px",
                    width: "40px",
                    height:
                      "40px" /*  borderWidth: '3px', borderStyle: 'solid', borderColor: '#FFE26E' */,
                  }}
                >
                  <AddShoppingCartIcon
                    sx={{ width: "22px", height: "22px", color: "black" }}
                  />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
