import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Landing from "../components/Landing/Landing";
import FeaturedItems from "../components/Featured/Items/FetauredItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import { TabTitle } from "../utils/General";
import ShopCategory from "../components/Shop/Container/ShopCategory";
import { userProductsAPI } from "../api/userProductsAPI";

const Home = ({ profile }) => {
  const [featuredItems, setFeaturedItems] = useState();
  TabTitle("Shop - Tru Scapes");
  const [menItems, setMenItems] = useState();
  const [womenItems, setWomenItems] = useState();
  const [kidsItems, setKidsItems] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://shema-backend.vercel.app/api/items")
      .then((res) => {
        setMenItems(res.data.filter((item) => item.category === "men"));
        setKidsItems(res.data.filter((item) => item.category === "kids"));
        setWomenItems(res.data.filter((item) => item.category === "women"));
        setLoading(false);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getHomeItems = async () => {
      try {
        const response = await userProductsAPI.getFeaturedProducts();
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    getHomeItems();
    axios
      .get("https://shema-backend.vercel.app/api/items")
      .then((res) => setFeaturedItems(res.data))
      .catch((err) => console.log(err));

    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Landing />
      <FeaturedCategories />
      <FeaturedItems profile={profile} items={featuredItems} />
      {menItems && (
        <ShopCategory
          profile={profile}
          name="Hardscape"
          key="men"
          items={menItems}
        />
      )}
      {womenItems && (
        <ShopCategory
          profile={profile}
          name="Deck"
          key="women"
          items={womenItems}
        />
      )}
      {kidsItems && (
        <ShopCategory
          profile={profile}
          name="Landscape"
          key="kids"
          items={kidsItems}
        />
      )}
    </Fragment>
  );
};

export default Home;
