import { useState } from "react";
import { userDataContext } from "./UserDataContext";

const UserDataProvider = (props) => {
  const [user, setUser] = useState({});

  const setUserData = (queryParam) => {
    setUser(queryParam);
  };

  const userDt = {
    userData: user,
    setUserData: setUserData,
  };
  return (
    <userDataContext.Provider value={userDt}>
      {props.children}
    </userDataContext.Provider>
  );
};

export default UserDataProvider;
