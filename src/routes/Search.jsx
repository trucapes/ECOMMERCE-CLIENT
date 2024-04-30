import { useParams } from "react-router-dom";
import Search from "../components/Search";

const SearchView = ({ profile }) => {
  const param = useParams();
  console.log(param.query);
  return <Search profile={profile} />;
};

export default SearchView;
