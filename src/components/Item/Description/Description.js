import "./Description.css";

const Description = (props) => {
  return (
    <div className="product__description__product">
      <div className="description__header__container">
        <div className="description__header__line"></div>
        <div className="description__header">Details</div>
      </div>
      <div
        className="w-full specifications-container"
        dangerouslySetInnerHTML={{ __html: props.item.description }}
      />
      {/* <div className="description__specifics__container">
                <div className="description__specifics">
                <div className="description__header__line"></div>
                <div className="description__highlights__header">Highlights</div>
                    <ul>
                        {"{props.item.highlights.map((highlight) => <li>{highlight}</li>)}"}
                    </ul>
                </div>
            </div> */}
    </div>
  );
};

export default Description;
