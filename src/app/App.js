import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "../routes/Home";
import ManageAccount from "../components/Account/ManageAccount/ManageAccount";
import MyAccount from "../components/Account/MyAccount/MyAccount";
import Shop from "../components/Shop/Shop";
import ItemView from "../routes/ItemView";
import CategoryView from "../routes/CategoryView";
import SearchView from "../routes/Search";
import CartItemsProvider from "../Context/CartItemsProvider";
import Login from "../components/Authentication/Login/Login";
import Register from "../components/Authentication/Register/Register";
import Wishlist from "../components/Wishlist";
import WishItemsProvider from "../Context/WishItemsProvider";
import SearchProvider from "../Context/SearchProvider";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import AdminOrder from "../routes/AdminOrder";
import AdminUsers from "../routes/AdminUser";
import ViewProduct from "../components/ProductPage/ViewProduct";
import Layout from "../components/Layouts/Layout";
import { useEffect, useState } from "react";
import profileAPI from "../api/profileAPI";
import { ToastContainer } from "react-toastify";
import CategoryList from "../components/Category/CategoryList";
import AddProductPage from "../components/ProductPage/Admin/AddProductPage";
import AdminProductList from "../components/ProductPage/Admin/AdminProductList";
import { Check } from "@mui/icons-material";
import Checkout from "../components/Checkout/Checkout";
import AdminDashboard from "../routes/AdminDashboard";
function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const getProfile = async () => {
    try {
      const response = await profileAPI.getProfile();

      if (response.data.error === false) {
        setUser(response.data.data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("tru-scapes-token");
      }
    } catch (error) {
      setIsAuthenticated(false);
      localStorage.removeItem("tru-scapes-token");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <CartItemsProvider>
      <WishItemsProvider>
        <SearchProvider>
          <Router>
            <Layout profile={user} isAuthrnticated={isAuthenticated}>
              <Routes>
                <Route index element={<Home profile={user} />} />
                <Route path="/account">
                  <Route
                    path="me"
                    element={
                      <MyAccount
                        user={user}
                        isAuthenticated={isAuthenticated}
                      />
                    }
                  />
                  <Route path="manage" element={<ManageAccount />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="forgot" element={<ForgotPassword />} />
                  <Route path="*" element={<Login />} />
                </Route>
                <Route path="/order/checkout" element={<Checkout />} />
                <Route path={"/product"}>
                  <Route path=":id" element={<ViewProduct />} />
                </Route>
                <Route path="/shop" element={<Home />} />
                <Route path="/category">
                  <Route path=":id" element={<CategoryView profile={user} />} />
                </Route>
                <Route path="/item">
                  <Route path="/item/men">
                    <Route path=":id" element={<ItemView profile={user} />} />
                  </Route>
                  <Route path="/item/women">
                    <Route path=":id" element={<ItemView profile={user} />} />
                  </Route>
                  <Route path="/item/kids">
                    <Route path=":id" element={<ItemView profile={user} />} />
                  </Route>
                  <Route path="/item/featured">
                    <Route path=":id" element={<ItemView profile={user} />} />
                  </Route>
                </Route>
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/search/*" element={<SearchView />} />

                <Route path="/admin">
                  <Route path="" element={<AdminDashboard  />} />
                  <Route path="order" element={<AdminOrder />} />
                  <Route path="categories" element={<CategoryList />} />
                  <Route path="products">
                    <Route path="add" element={<AddProductPage />} />
                    <Route path="" element={<AdminProductList />} />
                  </Route>
                  <Route path="users">
                    <Route path="" element={<AdminUsers profile={user} />} />
                  </Route>
                </Route>
              </Routes>
            </Layout>
          </Router>
          <ToastContainer />
        </SearchProvider>
      </WishItemsProvider>
    </CartItemsProvider>
  );
}

export default App;
