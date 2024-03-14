import Carousel from 'react-bootstrap/Carousel';
import './ItemCarousel.css'
import { SERVER_URL } from '../../../api/apiwrapper';

const ProductCarousel = (props) => {
      console.log(props)

    return (
      <div className="product__carousel__container">
        <div className="product__carousel">
          <Carousel variant="dark" interval={4000}>
            <Carousel.Item>
            <div className="carousel__image__container">
                <img className="carousel__image" src={`${
                            SERVER_URL +
                            props.item[0].path.replace(/\\/g, "/")
                          }`.replace("/public/", "/")} alt="item"/>
            </div>
            </Carousel.Item>  
            <Carousel.Item>
            <div className="carousel__image__container">
                <img className="carousel__image" src={`${
                            SERVER_URL +
                            props.item[1].path.replace(/\\/g, "/")
                          }`.replace("/public/", "/")} alt="item"/>
              </div>
            </Carousel.Item>   
            {/* <Carousel.Item>
            <div className="carousel__image__container">
                <img className="carousel__image" src={`https://shema-backend.vercel.app/public/${props.item.category}/${props.item.image[2].filename}`} alt="item"/>
              </div>
            </Carousel.Item> */}
          </Carousel>
        </div>
      </div>
     );
}
 
export default ProductCarousel;