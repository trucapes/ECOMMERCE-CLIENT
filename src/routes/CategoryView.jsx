import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import Category from "../components/Category/Category";
import { CategoryAPI } from "../api/categoryAPI";
import ItemCard from "../components/Card/ItemCard/ItemCard";
import NoDataFound from "../components/NoDataFound/NoDataFound";

const CategoryView = ({ profile }) => {
  const [page, setPage] = useState(1);

  const param = useParams();
  console.log(param);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  function handlePageIncrement() {
    setPage(page + 1);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await CategoryAPI.getCategoryByName({
        category: param.id,
        page: page,
      });
      console.log(response.data.data.products);
      setData([...response.data.data.products]);
      setLoading(false);
      console.log(data);
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [param.id, page]);

  return (
    <>
      <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
        {loading && (
          <ReactLoading
            type="balls"
            color="#FFE26E"
            height={100}
            width={100}
            className="m-auto"
          />
        )}
        {data && data.length > 0 ? (
          data.map((item) => (
            <ItemCard
              profile={profile}
              item={item}
              category={item.category.name}
            />
          ))
        ) : (
          <NoDataFound TryingToFind={"Products"} />
        )}
      </div>
      <div className="w-full flex justify-center">
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
      </div>
    </>
  );
};

export default CategoryView;
