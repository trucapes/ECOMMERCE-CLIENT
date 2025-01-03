import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./CartCard.css";
import { CartItemsContext } from "../../../../Context/CartItemsContext";
import { Chip, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { SERVER_URL } from "../../../../api/apiwrapper";

const CartCard = (props) => {
  console.log(props);
  let cartItems = useContext(CartItemsContext);
  // const [size, setSize] = useState(props.item.size);

  const handelQuantityIncrement = (event) => {
    cartItems.quantity(props.item._id, "INC");
  };

  const handelQuantityDecrement = (event) => {
    if (props.item.itemQuantity > 1) {
      cartItems.quantity(props.item._id, "DEC");
    }
  };

  const handelRemoveItem = () => {
    cartItems.removeItem(props.item);
  };

  // const handleSizeChange = (event) => {
  //   setSize(event.target.value);
  // };

  return (
    <div className="cart__item__card">
      <div className="cart__item__detail">
        <div className="cart__item__image">
          <img
            src={
              props.item.images[0].path
                ? `${
                    SERVER_URL + props.item.images[0].path.replace(/\\/g, "/")
                  }`.replace("/public/", "/")
                : props.item.images[0]
            }
            alt="item"
            className="item__image"
          />
        </div>
        <div className="cart__item__name">{props.item.name}</div>
      </div>
      <div className="cart__item__quantity">
        <IconButton onClick={handelQuantityIncrement}>
          <AddCircleIcon />
        </IconButton>
        <div type="text" name="quantity" className="quantity__input">
          {props.item.itemQuantity}
        </div>
        <IconButton onClick={handelQuantityDecrement}>
          <RemoveCircleIcon fontSize="medium" />
        </IconButton>
      </div>
      <div className="product size">
        <Box sx={{ minWidth: 80 }}>
          <Chip
            label={props.item.size ?? "Default"}
            variant="filled"
            color="primary"
          />
        </Box>
      </div>
      <div className="cart__item__price">${props.item.price} </div>
      <div className="remove__item__icon">
        <IconButton>
          <HighlightOffIcon onClick={handelRemoveItem} />
        </IconButton>
      </div>
    </div>
  );
};

export default CartCard;
