import React from "react";
import Detail from "./Detail";
import Description from "./Description";
import ItemCarousel from "./ItemCarousel";

function ViewProduct(props) {
  return (
    <div className="w-full h-auto">
      <div className="detail__and__carousel__container h-auto w-full flex justify-center items-center flex-row flex-wrap mt-5">
        <ItemCarousel />
        <Detail item={props.item} />
      </div>
      <div className="item__description__container h-auto w-full">
        <Description item={props.item} />
      </div>
    </div>
  );
}

export default ViewProduct;
