import { useState, useEffect } from "react";
import axios from "axios";
import RelatedCard from "../../Card/RelatedCard/RelatedCard";
import "./Related.css";
import { userProductsAPI } from "../../../api/userProductsAPI";
import { Try } from "@mui/icons-material";
import ItemCard from "../../Card/ItemCard/ItemCard";

const Related = (props) => {
  console.log(props);
  const [menItems, setMenItems] = useState();
  const [relatedItems, setRelatedItems] = useState([]);
  const [womenItems, setWomenItems] = useState();
  const [kidsItems, setKidsItems] = useState();

  useEffect(() => {
    const getRelatedItems = async () => {
      try {
        const response = await userProductsAPI.getProductsByCategory({
          category: props.category,
          page: 1,
        });
        console.log(response.data);
        setRelatedItems([...response.data.data.products]);
      } catch (error) {
        console.log(error);
      }
    };
    getRelatedItems();
    axios
      .get("https://shema-backend.vercel.app/api/items")
      .then((res) => {
        setMenItems(res.data.filter((item) => item.category === "men"));
        setKidsItems(res.data.filter((item) => item.category === "kids"));
        setWomenItems(res.data.filter((item) => item.category === "women"));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="related__products">
      <div className="related__header__container">
        <div className="related__header">
          <h2>Recommended Products</h2>
        </div>
        <div className="related__header__line"></div>
      </div>
      <div className="related__card__container">
        {relatedItems &&
          relatedItems.length > 0 &&
          relatedItems.map((item) => (
            <ItemCard
              category={item.category.name}
              profile={props.profile}
              item={item}
            />
          ))}
      </div>
    </div>
  );
};

export default Related;
