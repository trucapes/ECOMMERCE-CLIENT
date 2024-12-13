import { Fragment, useContext, useState } from "react";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import CartCard from "./CartCard/CartCard";
import "./Cart.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { OrderAPI } from "../../../api/paymentAPI";
import { Link, useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "350px",
  width: "45%",
  height: "400px",
  bgcolor: "background.paper",
  border: "5px solid #FFE26E",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

// const

const Cart = ({ profile }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
  const handleCheckoutOpen = () => setOpenCheckoutModal(true);
  const handleCheckoutClose = () => setOpenCheckoutModal(false);

  const nav = useNavigate();

  const cartItems = useContext(CartItemsContext);
  console.log(cartItems.items);

  const handleCheckout = async () => {
    if (cartItems.totalAmount > 0) {
      //Storing the items which are in cart, in local storage to be accessed on checkout

      const itemsObj = cartItems.items.map((item) => {
        console.log(item);
        return {
          name: item.name,
          category: item.categoryName,
          image: item.images[0].path ? item.images[0].path : item.images[0],
          product: item._id,
          quantity: item.itemQuantity,
          price: item.price,
        };
      });

      const config = {
        items: itemsObj,
        reason: "checkout",
        amount: cartItems.totalAmount,
        userID: profile._id,
      };
      console.log(config.items);

      //Checking if there is any previous checkout in local storage

      if (localStorage.getItem("checkoutConfig")) {
        localStorage.removeItem("checkoutConfig");
      }

      //Storing the config in local storage

      localStorage.setItem("checkoutConfig", JSON.stringify(config));
      console.log(localStorage.getItem("checkoutConfig"));

      // window.location.href = "/order/checkout";

      nav("/order/checkout?items=" + JSON.stringify(itemsObj));

      // const response = await OrderAPI.placeOrder(config);

      //   await axios
      //     .post("http://localhost:3000/api/payment", config)
      //     .then((res) => {
      //       console.log(res.data);
      //       window.location.replace(res.data);
      //       handleCheckoutOpen();
      //     })
      //     .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  return (
    <Fragment>
      <Badge badgeContent={cartItems.items.length} color="error">
        <ShoppingCartIcon
          color="black"
          onClick={handleOpen}
          sx={{ width: "35px" }}
        />
      </Badge>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="cart__header">
            <h2>Your Cart</h2>
          </div>
          <div className="cart__items__container">
            <div className="cartItems">
              {cartItems.items.length === 0 ? (
                <div className="cart__empty"> Empty cart!</div>
              ) : (
                <div className="shop__cart__items">
                  {cartItems.items.map((item) => (
                    <CartCard key={item._id} item={item} profile={profile} />
                  ))}
                </div>
              )}
              {cartItems.items.length > 0 && (
                <div className="options">
                  <div className="total__amount">
                    <div className="total__amount__label">Total Amount:</div>
                    <div className="total__amount__value">
                      ${cartItems.totalAmount}
                    </div>
                  </div>
                  <div
                    // to={"/order/checkout"}
                    onClick={() => handleClose()}
                    className="checkout"
                  >
                    <Button variant="outlined" onClick={handleCheckout}>
                      Checkout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Modal>
      <Modal open={openCheckoutModal} onClose={handleCheckoutClose}>
        <Box sx={style}>
          <div className="d-flex w-100 h-100 justify-content-center align-items-center">
            <h2>Your checkout was successful</h2>
          </div>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default Cart;
