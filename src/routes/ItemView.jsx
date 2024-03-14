import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import Item from "../components/Item/Item";
import { userProductsAPI } from "../api/userProductsAPI";
import { userDataContext } from "../Context/UserDataContext";
import { CartItemsContext } from "../Context/CartItemsContext";

const ProductView = ({ profile }) => {
  const param = useParams();
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);
  const user = useContext(userDataContext);
  const cartItems = useContext(CartItemsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(param);
    console.log(cartItems.items);
    console.log(user.userData);
    console.log(profile)
    const getItem = async () => {
      try {
        const response = await userProductsAPI.getProductById(param.id);
        // console.log(response.data.data);
        setItem(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getItem();

    // axios
    //   .get("https://shema-backend.vercel.app/api/items")
    //   .then((res) => {
    //     setItem(res.data.filter((item) => item._id === param.id));
    //     setLoading(false);
    //   })
    //   .catch((err) => console.log(err));
  }, [param.id]);

  return (
    <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
      {loading && (
        <ReactLoading
          type="balls"
          color="#FFE26E"
          height={100}
          width={100}
          className="m-auto"
        />
      )}
      {item && <Item profile={profile} item={item} />}
    </div>
  );
};

export default ProductView;
