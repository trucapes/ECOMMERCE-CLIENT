import { useState, useEffect } from "react";
import axios from "axios";
import RelatedCard from "../../Card/RelatedCard/RelatedCard";
import "./Related.css";
import { userProductsAPI } from "../../../api/userProductsAPI";
import { Try } from "@mui/icons-material";
import ItemCard from "../../Card/ItemCard/ItemCard";

const Related = (props) => {
  console.log(props);
  const [relatedItems, setRelatedItems] = useState([]);

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
  }, []);

  return (
    <div className="related__products">
      <div className="related__header__container">
        <div className="related__header">
          <h2>You may like</h2>
        </div>
        <div className="related__header__line"></div>
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xl:grid-cols-4">
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
