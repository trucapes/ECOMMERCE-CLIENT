import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import Category from "../components/Category/Category";
import { CategoryAPI } from "../api/categoryAPI";
import ItemCard from "../components/Card/ItemCard/ItemCard";
import NoDataFound from "../components/NoDataFound/NoDataFound";
import { 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Chip,
  Box
} from '@mui/material';
import { styled } from '@mui/system';


const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform 0.15s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9 aspect ratio
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

const SubcategoryChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
const CategoryView = ({ profile }) => {
  const [page, setPage] = useState(1);
  const [categoryName, setCategoryName] = useState("");
  const [subcategories, setSubCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const param = useParams();
  console.log(param);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  function handlePageIncrement() {
    setPage(page + 1);
    fetchData(page + 1);
  }

  const fetchData = async (currentPage = 1) => {
    setLoading(true);
    const response = await CategoryAPI.getCategoryByName({
      category: param.id,
      page: currentPage,
    });
    setCategoryName(param.id);
    setSubCategories(response.data.data.name.subcategories);
    console.log(response.data.data.products);
    currentPage === 1
      ? setData([...response.data.data.products])
      : setData([...data, ...response.data.data.products]);
    setTotalPages(response.data.data.totalPages);
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
    return () => {
      setPage(1);
      setData([]);
      setLoading(true);
    };
  }, [param.id]);

  return (
    <>
      <div className="d-flex flex-col min-vh-100 w-100 pt-5 justify-content-center align-items-center m-auto">
       
        {!loading && (
          <div className="w-full px-7 py-3">
            <h2 className="font-semibold">{categoryName} &nbsp; {subcategories.map((subcat) => (
                <Link to={`/category/${subcat.name}`}>
                  <SubcategoryChip
                    key={subcat._id}
                    label={subcat.name}
                    onClick={() => {/* Handle subcategory click */}}
                  />
                  </Link>
                ))}</h2>
          </div>
        )}
        <div className="w-full flex-wrap flex justify-center">
          {loading ? (
            <ReactLoading
              type="balls"
              color="#FFE26E"
              height={100}
              width={100}
              className="m-auto"
            />
          ) : data && data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.map((item) => (
                <ItemCard
                  profile={profile}
                  item={item}
                  category={item.category.name}
                />
              ))}
            </div>
          ) : (
            <NoDataFound TryingToFind={"Products"} />
          )}
        </div>
      </div>
      <div className="w-full flex py-5 justify-center">
        {totalPages > page && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handlePageIncrement();
            }}
            type="submit"
            className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Show More
          </button>
        )}
      </div>
    </>
  );
};

export default CategoryView;
