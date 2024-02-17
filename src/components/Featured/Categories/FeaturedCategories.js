import { useContext, useEffect, useState } from "react";
import { FeatureCategoryContext } from "../../../Context/FeaturedCategoryContext";
import CategoryCard from "../../Card/FeaturedCard/CategoryCard";
import './FeaturedCategories.css'
import publicAPI from "../../../api/publicAPI";
import {Grid, Container} from "@mui/material"
import { SERVER_URL } from "../../../api/apiwrapper";

const Categories = () => {
    // const featuredCategories = useContext(FeatureCategoryContext)
    const [categories, setCategories] = useState([])
    const fetchCategories = async () => {
        const res = await publicAPI.getCategories();
        
        if(res.data.error === false) {
            setCategories(res.data.data)
        }
    }
    useEffect(() => {
        fetchCategories()
    }, [])
    return ( 
        <div className="featured__categories__container">
            <div className="featured__categories">
                <div className="featured__categories__header">
                    <h1 className='featured__header__big'>Featured Categories </h1>
                    <div className="featured__categories__header__line"></div>
                </div>
                {/* <div className="featured__categories__card__container">
                    { featuredCategories.map((category) =>  <CategoryCard key={category.id} data={category}/>)}
                </div> */}

                <Container>

                <Grid container spacing={2} sx={{mt: 4, mb: 4}}>
                    {
                        categories.map((category, index) => {
                            return (
                                <Grid xs={4} md={2} item key={index}>
                                    <img className="animate__pop" style={{width: "100%"}} src={`${SERVER_URL + category.image.replace(/\\/g, "/")}`.replace('/public/', '/')} alt={category.name} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
                </Container>
            </div>
        </div>  
     );
}
 
export default Categories;