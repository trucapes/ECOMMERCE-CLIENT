import "./ItemCard.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import { SERVER_URL } from "../../../api/apiwrapper";
import { toast } from "react-toastify";

const ItemCard = (props) => {
  console.log(props);
  const [isHovered, setIsHovered] = useState(false);
  const cartItems = useContext(CartItemsContext);
  const wishItems = useContext(WishItemsContext);

  //   console.log(props.item);

  const handelAddToCart = () => {
    const itemForCart = { ...props.item };
    itemForCart.price =
      props.profile.userRole === "dealer"
        ? props.item.price.dealer.toFixed(2)
        : props.profile.userRole === "distributor"
        ? props.item.price.distributor.toFixed(2)
        : props.profile.userRole === "contractor"
        ? props.item.price.contractor.toFixed(2)
        : props.item.price.regular.toFixed(2);
    cartItems.addItem(itemForCart, 1, 1);
    toast.success("Item added to cart");
  };

  const handelAddToWish = () => {
    console.log(props.item);
    const itemForWish = { ...props.item };
    itemForWish.price =
      props.profile.userRole === "dealer"
        ? props.item.price.dealer.toFixed(2)
        : props.profile.userRole === "distributor"
        ? props.item.price.distributor.toFixed(2)
        : props.profile.userRole === "contractor"
        ? props.item.price.contractor.toFixed(2)
        : props.item.price.regular.toFixed(2);
    wishItems.addItem(itemForWish);
  };

  return (
    <div className="product__card__card hover:scale-105 duration-150">
      <div className="product__card">
        <Link to={`/item/${props.category}/${props.item._id}`}>
          <div className="product__image">
            <img
              src={
                props.item.images[0] && props.item.images[0].path
                  ? `${
                      SERVER_URL + props.item.images[0].path.replace(/\\/g, "/")
                    }`.replace("/public/", "/")
                  : props.item.images[0]
              }
              alt="item"
              className="product__img"
            />
          </div>
        </Link>
        <div className="product__card__detail">
          <Link to={`/item/${props.item.category.name}/${props.item._id}`}>
            <div className="product__name">{props.item.name}</div>
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
                    ? "$" + props.item.price.dealer.toFixed(2)
                    : props.profile.userRole === "distributor"
                    ? "$" + props.item.price.distributor.toFixed(2)
                    : props.profile.userRole === "contractor"
                    ? "$" + props.item.price.contractor.toFixed(2)
                    : "$" + props.item.price.regular.toFixed(2)}
                </span>
              </div>
            )}
          </Link>
          {props.profile && (
            <div className="product__card__action">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handelAddToWish();
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
                  handelAddToCart();
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
    </div>
  );
};

export default ItemCard;
