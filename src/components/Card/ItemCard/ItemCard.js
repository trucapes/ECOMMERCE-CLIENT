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
  const [isHovered, setIsHovered] = useState(false);
  const cartItemsContext = useContext(CartItemsContext);
  const wishItemsContext = useContext(WishItemsContext);
  console.log(props.item);
  const handleAddToWishList = () => {
    wishItemsContext.addItem(props.item);
  };

  const handleAddToCart = () => {
    cartItemsContext.addItem(props.item, 1);
  };

  return (
    <div className="product__card__card">
      <Link to={"/item/${props.item.category}/${props.item._id}"}>
        <div className="product__card">
          <div
            className="product__image"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? (
              <img
                src={SERVER_URL + props.item.images[0].path.replace(/\\/g, "/")}
                alt="item"
                className="product__img"
              />
            ) : (
              <img
                src={SERVER_URL + props.item.images[1].path.replace(/\\/g, "/")}
                alt="item"
                className="product__img"
              />
            )}
          </div>
          <div className="product__card__detail">
            <div className="product__name">
              <Link to={"/item/${props.item.category}/${props.item._id}"}>
                {props.item.name}
              </Link>
            </div>
            <div className="product__description">
              {/* <span>{props.item.description}</span> */}x lorem Ipsem
              description lorem Ipsem description lorem Ipsem description lorem
              Ipsem description
            </div>
            <div className="product__price">
              {props.profile ? (
                <span>${props.item.price.regular}</span>
              ) : (
                <Link to="/account/login">Login to see price</Link>
              )}
            </div>
            {props.profile && (
              <div className="product__card__action">
                <IconButton
                  onClick={handleAddToWishList}
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
                  onClick={handleAddToCart}
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
