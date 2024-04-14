import { Container } from "@mui/material";
import ItemCarousel from "./Carousel/ItemCarousel";
import Description from "./Description/Description";
import Detail from "./Detail/Detail";
import "./Item.css";
import Related from "./Related/Related";

const Item = (props) => {
  console.log(props);
  return (
    <div className="item__container">
      <div className="w-full flex flex-col px-10 md:px-20 py-14">
        <div className="product__name__main">{props.item.name}</div>
        <div style={{ height: "30px" }} />
        <div className="detail__and__carousel__container">
          <ItemCarousel item={props.item.images} />
          <Detail profile={props.profile} item={props.item} />
        </div>
        <div className="item__description__container">
          <Description item={props.item} />
        </div>
        <div className="related__items__container">
          <Related profile={props.profile} category={props.item.category} />
        </div>
      </div>
    </div>
  );
};

export default Item;
