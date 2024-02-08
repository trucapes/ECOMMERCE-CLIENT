import { useState } from "react";
import "./Detail.css";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
//Props will be the object of item to be displayed----------------
const Detail = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(0);

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handelQuantityIncrement = (event) => {
    setQuantity((prev) => (prev += 1));
  };

  const handelQuantityDecrement = (event) => {
    if (quantity > 1) {
      setQuantity((prev) => (prev -= 1));
    }
  };

  const handelAddToCart = () => {};

  const handelAddToWish = () => {};

  return (
    <div className="product__detail__container">
      <div className="product__detail">
        <div className="product__main__detail">
          <div className="product__name__main">Item 1</div>
          <div className="product__detail__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
            quaerat minus dolores laudantium, pariatur obcaecati?
          </div>
          <div className="my-2">
            <div className="uppercase text-sm">in category</div>
          </div>
          <div className="product__price__detail">Price</div>
        </div>
        <form onSubmit={handelAddToCart} className="product__form">
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
                  <FavoriteBorderIcon sx={{ width: "22px", height: "22px" }} />
                </IconButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Detail;
