import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Landing from "../components/Landing/Landing";
import FeaturedItems from "../components/Featured/Items/FetauredItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import { TabTitle } from "../utils/General";

const Home = ({profile}) => {
  const [featuredItems, setFeaturedItems] = useState();
  TabTitle("Home - Tru Scapes");

  useEffect(() => {
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
      <FeaturedItems profile={profile}  items={featuredItems} />
    </Fragment>
  );
};

export default Home;
