import { useEffect, useState } from "react";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import "./index.css";
import { userProductsAPI } from "../../api/userProductsAPI";
import ItemCard from "../Card/ItemCard/ItemCard";

const Search = ({ profile }) => {
  const search = useContext(SearchContext);
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(null);

  const searchQuery = {
    query: search.searchQuery,
  };

  const searchProducts = () => {
    const query = searchQuery.query;

    userProductsAPI.getProductsByCategory({ q: query }).then((response) => {
      setSearchData(response.data.data);
    });
  };

  useEffect(() => {
    searchProducts();
    setSearchParam(searchQuery, { replace: true });
  }, [searchQuery.query, searchParam]);

  return (
    <div className="search__container">
      {searchData && searchData.length > 0 && (
        <div>
          <h1>Search results for "{searchQuery.query}"</h1>
          <div className="w-full flex-wrap flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {searchData.map((item) => (
                <ItemCard
                  profile={profile}
                  item={item}
                  category={item.category.name}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {searchData && searchData.length === 0 && (
        <div className="search__container__header">
          <h1>No results found for "{search.searchQuery}"</h1>
        </div>
      )}
    </div>
  );
};

export default Search;
