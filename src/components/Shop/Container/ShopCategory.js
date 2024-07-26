import { Button } from "@mui/material";
import ItemCard from "../../Card/ItemCard/ItemCard";
import "./ShopCategory.css";
import { ArrowRight } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ShopCategory = (props) => {
  return (
    <>
    {props.profile && props.profile.userRole === "contractor" && !(props.items.title.includes('Landscape') || props.items.title.includes('Hardscape')) ? <div className="shop__category__container">
      <div className="shop__category__header">
        <div className="shop__category__header__big">
          <div className="shop__category__head flex flex-row">
            <h2 className="font-semibold">{props.items.title}</h2>
            <Link to={`/category/${props.items.title}`}>
              <Button
                variant="contained"
                endIcon={<ArrowRight />}
                sx={{
                  marginInline: "10px",
                  paddingInline: "10px",
                  boxShadow: "none",
                  bgcolor: "transparent",
                  ":hover": { bgcolor: "#ffe26e61", boxShadow: "none" },
                  color: "black",
                }}
              >
                View More
              </Button>
            </Link>
          </div>
          <div className="shop__category__header__line"></div>
        </div>
      </div>
      <div className="shop__category__card__container">
        <div className="shop__category__product__card">
          {props.items.value.map((data) => (
            <ItemCard
              profile={props.profile}
              item={data}
              category={data.categoryDetails.name}
            />
          ))}
        </div>
      </div>
    </div>: <div></div>}
    </>
  );
};

export default ShopCategory;
