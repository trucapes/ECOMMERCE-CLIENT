import { createContext, useState } from "react";

const UserDataContext = createContext();

const [userData, setUserData] = useState({});

function setUser(Data) {
  setUserData({
    ...Data,
  });
}

function UserDataProvider({ children }) {
  <UserDataContext.Provider value={{ userData, setUser }}>
    {children}
  </UserDataContext.Provider>;
}

export default UserDataContext;

const dummyData = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  mobileNo: "1234567890",
  country: "India",
  city: "New Delhi",
  company: "ABC Corporation",
  companyWebsite: "https://example.com",
  userRole: "distributor",
  password: "password123",
  isVerified: false,
  isPending: true,
};
