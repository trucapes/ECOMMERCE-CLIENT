import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../routes/Home";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
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
import AdminProducts from "../routes/AdminProducts";
import AdminUsers from "../routes/AdminUser";
import ViewProduct from "../components/ProductPage/ViewProduct";
import Layout from "../components/Layouts/Layout";

function App() {
  return (
    <CartItemsProvider>
      <WishItemsProvider>
        <SearchProvider>
          <Router>
            <Layout>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/account">
                  <Route path="me" element={<MyAccount />} />
                  <Route path="manage" element={<ManageAccount />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="forgot" element={<ForgotPassword />} />
                  <Route path="*" element={<Login />} />
                </Route>

                <Route path={"/product"}>
                  <Route path=":id" element={<ViewProduct />} />
                </Route>
                <Route path="/shop" element={<Shop />} />
                <Route path="/category">
                  <Route path=":id" element={<CategoryView />} />
                </Route>
                <Route path="/item">
                  <Route path="/item/men">
                    <Route path=":id" element={<ItemView />} />
                  </Route>
                  <Route path="/item/women">
                    <Route path=":id" element={<ItemView />} />
                  </Route>
                  <Route path="/item/kids">
                    <Route path=":id" element={<ItemView />} />
                  </Route>
                  <Route path="/item/featured">
                    <Route path=":id" element={<ItemView />} />
                  </Route>
                </Route>
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/search/*" element={<SearchView />} />

                <Route path="/admin">
                  <Route path="order" element={<AdminOrder />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="users" element={<AdminUsers />} />
                </Route>
              </Routes>
            </Layout>
          </Router>
        </SearchProvider>
      </WishItemsProvider>
    </CartItemsProvider>
  );
}

export default App;
