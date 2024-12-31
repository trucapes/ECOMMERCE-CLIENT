import { useContext, useState } from "react";
import "./Detail.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Chip } from "@mui/material";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Detail = (props) => {
  // console.log(props.item);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState();
  const [selectedVariant, setSelectedVariant] = useState(
    props?.item?.variants[0]?.name || null
  );
  const [variantPrice, setVariantPrice] = useState(
    props?.item?.variants[0]?.additionalPrice || 0
  );

  const cartItems = useContext(CartItemsContext);
  const wishItems = useContext(WishItemsContext);

  const handelQuantityIncrement = (event) => {
    setQuantity((prev) => (prev += 1));
  };

  const handelQuantityDecrement = (event) => {
    if (quantity > 1) {
      setQuantity((prev) => (prev -= 1));
    }
  };

  const handelAddToCart = () => {
    if (selectedVariant === null && (props.item.variants || []).length > 0) {
      toast.warning("Please choose a variant to continue.");
    }
    const itemForCart = { ...props.item };
    itemForCart.price =
      props.profile.userRole === "dealer"
        ? (
            parseFloat(props.item.price.dealer.toFixed(2)) + variantPrice
          ).toFixed(2)
        : props.profile.userRole === "distributor"
        ? (
            parseFloat(props.item.price.distributor.toFixed(2)) + variantPrice
          ).toFixed(2)
        : props.profile.userRole === "contractor"
        ? (
            parseFloat(props.item.price.contractor.toFixed(2)) + variantPrice
          ).toFixed(2)
        : (
            parseFloat(props.item.price.regular.toFixed(2)) + variantPrice
          ).toFixed(2);
    cartItems.addItem(itemForCart, quantity, selectedVariant);
    toast.success("Item added to cart");
  };

  const handelAddToWish = () => {
    // console.log(props.item);
    const itemForWish = { ...props.item };
    itemForWish.price =
      props.profile.userRole === "dealer"
        ? (
            parseFloat(props.item.price.dealer.toFixed(2)) + variantPrice
          ).toFixed(2)
        : props.profile.userRole === "distributor"
        ? (
            parseFloat(props.item.price.distributor.toFixed(2)) + variantPrice
          ).toFixed(2)
        : props.profile.userRole === "contractor"
        ? (
            parseFloat(props.item.price.contractor.toFixed(2)) + variantPrice
          ).toFixed(2)
        : (
            parseFloat(props.item.price.regular.toFixed(2)) + variantPrice
          ).toFixed(2);
    wishItems.addItem(itemForWish);
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const getShortDescription = (htmlContent, maxLength) => {
    const plainText = stripHtml(htmlContent);
    return truncateText(plainText, maxLength);
  };

  return (
    <div className="product__detail__container">
      <div className="product__detail">
        <div className="product__main__detail">
          <div className="product__name__main" style={{ fontSize: "18px" }}>
            {props.item.name}
          </div>
          <div
            className="product__detail__description"
            style={{ fontSize: "14px", marginTop: "10px" }}
          >
            {getShortDescription(props.item.description, 200)}
          </div>
          <a
            href="#description"
            className="product__link"
            style={{ marginTop: "10px", color: "blue" }}
          >
            Read more &nbsp; &gt;&gt;
          </a>
          {/* <div className="product__color flex flex-row gap-3">
            {props.item.hotProduct && (
              <Chip
                label={"Hot Product"}
                sx={{ color: "black", backgroundColor: "#FFE26E" }}
              />
            )}
            {props.item.stockAvailable ? (
              <Chip
                label={"In Stock"}
                sx={{ color: "black", backgroundColor: "#FFE26E" }}
              />
            ) : (
              <Chip
                label={"Out of stock"}
                sx={{ color: "black", backgroundColor: "#FFE26E" }}
              />
            )}
          </div> */}
          <div className="product__price__detail">
            {props.profile && props.item
              ? props.profile.userRole === "dealer"
                ? "$" +
                  (
                    parseFloat(props.item.price.dealer.toFixed(2)) +
                    variantPrice
                  ).toFixed(2)
                : props.profile.userRole === "distributor"
                ? "$" +
                  (
                    parseFloat(props.item.price.distributor.toFixed(2)) +
                    variantPrice
                  ).toFixed(2)
                : props.profile.userRole === "contractor"
                ? "$" +
                  (
                    parseFloat(props.item.price.contractor.toFixed(2)) +
                    variantPrice
                  ).toFixed(2)
                : "$" +
                  (
                    parseFloat(props.item.price.regular.toFixed(2)) +
                    variantPrice
                  ).toFixed(2)
              : // <Link to="/account/login">Login to see price</Link>
                null}
          </div>
        </div>

        {props.profile && (
          <form onSubmit={handelAddToCart} className="product__form">
            <Box display="flex" flexWrap="wrap" gap={1}>
              {props.item.variants.map((variant, indx) => (
                <Chip
                  key={indx}
                  label={`${variant.name} (+$${variant.additionalPrice})`}
                  variant={
                    selectedVariant === variant.name ? "filled" : "outlined"
                  }
                  onClick={() => {
                    setSelectedVariant(variant.name);
                    setVariantPrice(variant.additionalPrice);
                  }}
                  color="primary"
                />
              ))}
            </Box>
            <div className="product__quantity__and__size">
              <div className="product__quantity">
                <IconButton onClick={handelQuantityIncrement}>
                  <AddCircleIcon />
                </IconButton>
                <div type="text" name="quantity" className="quantity__input">
                  {quantity}
                </div>
                <IconButton onClick={handelQuantityDecrement}>
                  <RemoveCircleIcon fontSize="medium" />
                </IconButton>
              </div>
            </div>
            <div className="collect__item__actions">
              <div className="add__cart__add__wish">
                <div className="add__cart">
                  <Button
                    variant="outlined"
                    size="large"
                    sx={[
                      {
                        "&:hover": {
                          backgroundColor: "#FFE26E",
                          borderColor: "#FFE26E",
                          borderWidth: "3px",
                          color: "black",
                        },
                        minWidth: 200,
                        borderColor: "black",
                        backgroundColor: "black",
                        color: "#FFE26E",
                        borderWidth: "3px",
                      },
                    ]}
                    onClick={handelAddToCart}
                  >
                    ADD TO BAG
                  </Button>
                </div>
                <div className="add__wish">
                  <IconButton
                    variant="outlined"
                    size="large"
                    sx={[
                      {
                        "&:hover": {
                          backgroundColor: "#FFE26E",
                          borderColor: "#FFE26E",
                          borderWidth: "3px",
                          color: "black",
                        },
                        borderColor: "black",
                        backgroundColor: "black",
                        color: "#FFE26E",
                        borderWidth: "3px",
                      },
                    ]}
                    onClick={handelAddToWish}
                  >
                    <FavoriteBorderIcon
                      sx={{ width: "22px", height: "22px" }}
                    />
                  </IconButton>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Detail;
