import { useEffect, useState } from "react";
import { CartItemsContext } from "./CartItemsContext";

const CartItemsProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);

  const addToCartHandler = (item, quantity) => {
    const { _id, name, price, image, category, size } = item;
    removeFromCartHandler(item);
    setCartItems((prevItems) => [
      ...prevItems,
      { ...item, itemQuantity: quantity },
    ]);
  };

  const removeFromCartHandler = (item) => {
    console.log(Object.keys(item).length);
    if (Object.keys(item).length === 0) {
      setCartItems([]);
      return;
    }
    setCartItems(cartItems.filter((prevItem) => prevItem._id !== item._id));
  };

  const calculateTotalAmount = (currentCartItems) => {
    let total = 0;
    currentCartItems.forEach((item) => {
      total = total + item.price * item.itemQuantity;
    });

    setTotalAmountOfItems(total);
  };

  const quantityHandler = (itemId, action) => {
    console.log(action);
    console.log(itemId);
    console.log(cartItems);
    if (action === "INC") {
      setCartItems(
        cartItems.map((item) => {
          if (item._id === itemId) {
            item.itemQuantity += 1;
          }
          return item;
        })
      );
    } else {
      setCartItems(
        cartItems.map((item) => {
          if (item._id === itemId) {
            item.itemQuantity -= 1;
          }
          return item;
        })
      );
    }
  };

  useEffect(() => {
    calculateTotalAmount(cartItems);
  }, [cartItems]);

  const cartItemCtx = {
    items: cartItems,
    totalAmount: totalAmountOfItems,
    addItem: addToCartHandler,
    removeItem: removeFromCartHandler,
    quantity: quantityHandler,
  };

  return (
    <CartItemsContext.Provider value={cartItemCtx}>
      {props.children}
    </CartItemsContext.Provider>
  );
};

export default CartItemsProvider;
