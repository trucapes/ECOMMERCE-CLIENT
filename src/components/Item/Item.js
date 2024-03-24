import { Container } from '@mui/material';
import ItemCarousel from './Carousel/ItemCarousel';
import Description from './Description/Description';
import Detail from './Detail/Detail';
import './Item.css';
import Related from './Related/Related';

const Item = (props) => {
    console.log(props)
    return ( 
        <div className="item__container">
            <Container sx={{mt: 10, mb: 10}}>
            <div className="product__name__main">{props.item.name}</div>
            <div style={{height: "30px"}} />
            <div className="detail__and__carousel__container">
                <ItemCarousel item={props.item.images}/>
                <Detail profile={props.profile} item={props.item}/>
            </div>
            <div className="item__description__container">
                <Description item={props.item}/>
            </div>
            <div className="related__items__container">
                <Related profile={props.profile} category={props.item.category}/>
            </div>
            </Container>
        </div>
     );
}
 
export default Item;