import { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import Landing from "../components/Landing/Landing";
import FeaturedItems from "../components/Featured/Items/FetauredItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import { TabTitle } from "../utils/General";
import ShopCategory from "../components/Shop/Container/ShopCategory";
import { userProductsAPI } from "../api/userProductsAPI";
import { CartItemsContext } from "../Context/CartItemsContext";
import { Container } from "@mui/material";

const Home = ({ profile }) => {
  const [categoryFeaturedItems, setCategoryFeaturedItems] = useState([]);
  TabTitle("Shop - Tru Scapes");
  const [loading, setLoading] = useState(true);
  const cartItems = useContext(CartItemsContext);
  // console.log(cartItems.items, cartItems.totalAmount);

  useEffect(() => {
    const getHomeItems = async () => {
      try {
        const response = await userProductsAPI.getFeaturedProducts();
        console.log(response.data.data);
        setCategoryFeaturedItems(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getHomeItems();
    // axios
    //   .get("https://shema-backend.vercel.app/api/items")
    //   .then((res) => setCategoryFeaturedItems(res.data))
    //   .catch((err) => console.log(err));

    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Landing />
      <Container maxWidth="xl" sx={{mt: 16, mb: 10}}>
        <FeaturedCategories profile={profile} />
        <FeaturedItems profile={profile} />
        {categoryFeaturedItems &&
          categoryFeaturedItems.length > 0 &&
          categoryFeaturedItems.map((item) => (
            <ShopCategory
              profile={profile}
              name="Hardscape"
              key="men"
              items={item}
            />
          ))}
      </Container>
      
    </Fragment>
  );
};

export default Home;
