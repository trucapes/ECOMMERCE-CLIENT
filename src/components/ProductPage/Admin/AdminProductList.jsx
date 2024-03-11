import React, { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import {
  Button,
  MenuItem,
  Select,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from "@mui/material";
import {
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext,
  Visibility,
  CheckCircleOutline,
  DeleteOutline,
  Close,
  Edit,
} from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import AdminUserAPI from "../../../api/admin/adminUserAPI";
import AdminProductAPI from "../../../api/admin/adminProductAPI";
import AddProductPage from "./AddProductPage";
import { SERVER_URL } from "../../../api/apiwrapper";
import NoDataFound from "../../NoDataFound/NoDataFound";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("createdAt"); // Default sorting by createdAt
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, [search, page, sortBy, openModal]);

  const fetchData = async () => {
    try {
      setLoading(true);
      var filter = {};

      if (search) {
        filter.search = search;
      }

      if (page) {
        filter.page = page;
      }

      if (sortBy) {
        filter.sortBy = sortBy;
      }
      const response = await AdminProductAPI.getAllProducts(filter);
      setProducts(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error.response.data.message);
      setLoading(false);
    }
  };

  const handleApproveUser = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this user?"
    );
    if (confirmed) {
      try {
        // Call API to approve user
        await AdminUserAPI.verifyUserById(userId);
        toast.success("User approved successfully");
        // Optionally, you can also fetch updated user data after approval
        fetchData();
      } catch (error) {
        console.error("Error approving user:", error);
        toast.error("Failed to approve user");
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Product?"
    );
    if (confirmed) {
      try {
        // Call API to delete user
        await AdminProductAPI.deleteProductById(userId);
        toast.success("Product deleted successfully");
        // Optionally, you can also fetch updated user data after deletion
        fetchData();
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  // const handlePageChange = (newPage) => {
  //   setPage(newPage);
  // };

  const handleFirstPage = () => {
    setPage(1);
  };

  const handleLastPage = () => {
    setPage(totalPages);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-2 w-full">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="text-3xl mt-4 mb-4 text-gray-900">Products</h1>
        {products && products.length !== 0 && (
          <div className=" flex flex-row items-stretch justify-center">
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search in Users"
              className="bg-gray-50 border outline-none text-gray-900 rounded-l-lg focus:border-[#ffe26e] block w-full px-3"
            />
            <div className="w-fit flex justify-start">
              <button
                type="submit"
                className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-r-lg text-sm px-4 py-2.5 text-center"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>
      {products && products.length !== 0 && (
        <div className="flex flex-row items-center justify-between mt-4">
          <div></div>
          <div>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="createdAt">Sort by Date</MenuItem>
              <MenuItem value="name">Sort by Name</MenuItem>
              <MenuItem value="index">Sort by Index</MenuItem>
            </Select>
          </div>
        </div>
      )}
      {loading ? (
        <>
          <Skeleton variant="rectangular" height={40} animation="wave" />
          <br />
          <Skeleton variant="rectangular" height={40} animation="wave" />
          <br />
          <Skeleton variant="rectangular" height={40} animation="wave" />
          <br />
          <Skeleton variant="rectangular" height={40} animation="wave" />
          <br />
          <Skeleton variant="rectangular" height={40} animation="wave" />
        </>
      ) : products && products.length === 0 ? (
        <NoDataFound TryingToFind={"Products"} />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="products table">
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price (Regular)</TableCell>
                <TableCell>Price </TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Sales Tax </TableCell>
                <TableCell>Shipping Cost</TableCell>
                <TableCell>Stock Available</TableCell>
                <TableCell>Hot Product</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.index}</TableCell>
                  <TableCell>
                    {product.images[0] && (
                      <a
                        href={`${
                          SERVER_URL +
                          product.images[0].path.replace(/\\/g, "/")
                        }`.replace("/public/", "/")}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`${
                            SERVER_URL +
                            product.images[0].path.replace(/\\/g, "/")
                          }`.replace("/public/", "/")}
                          alt={product.name}
                          style={{ width: "50px", height: "50px" }}
                        />
                      </a>
                    )}
                    <br />
                    {product.name}
                  </TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>{product.price.regular}</TableCell>
                  <TableCell>
                    Distributor: {product.price.distributor}
                    <br />
                    Dealer: {product.price.dealer}
                    <br />
                    Contractor{product.price.contractor}
                  </TableCell>
                  <TableCell>
                    Distributor: {product.discount.distributor}
                    <br />
                    Dealer: {product.discount.dealer}
                    <br />
                    Contractor{product.discount.contractor}
                  </TableCell>
                  <TableCell>
                    Distributor: {product.salesTax.distributor}
                    <br />
                    Dealer: {product.salesTax.dealer}
                    <br />
                    Contractor{product.salesTax.contractor}
                  </TableCell>
                  <TableCell>{product.shippingCost}</TableCell>
                  <TableCell>{product.stockAvailable ? "Yes" : "No"}</TableCell>
                  <TableCell>{product.hotProduct ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenModal(product)}>
                      <Edit color="info" />
                    </IconButton>
                    {/* Assuming you have similar functionality for product approval */}
                    {product.isPending && (
                      <IconButton
                        onClick={() => handleApproveUser(product._id)}
                      >
                        <CheckCircleOutline color="success" />
                      </IconButton>
                    )}
                    <IconButton onClick={() => handleDeleteUser(product._id)}>
                      <DeleteOutline color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {totalPages > 0 && (
        <div className="flex justify-center mt-4">
          <Button
            variant="outlined"
            color="info"
            onClick={handleFirstPage}
            startIcon={<FirstPage />}
          ></Button>
          <Button
            variant="outlined"
            color="info"
            onClick={handlePrevPage}
            startIcon={<NavigateBefore />}
          ></Button>
          <div style={{ width: "20px" }} />
          Page {page} of {totalPages}
          <div style={{ width: "20px" }} />
          <Button
            variant="outlined"
            color="info"
            onClick={handleNextPage}
            endIcon={<NavigateNext />}
          ></Button>
          <Button
            variant="outlined"
            color="info"
            onClick={handleLastPage}
            endIcon={<LastPage />}
          ></Button>
        </div>
      )}

      <Modal
        sx={{ alignItems: "center" }}
        open={openModal}
        onClose={handleCloseModal}
      >
        <div
          style={{
            background: "#fff",
            padding: "30px",
            height: "90vh",
            marginTop: "5vh",
            width: "90%",
            marginLeft: "5%",
            overflowY: "auto",
          }}
        >
          <IconButton
            style={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={handleCloseModal}
          >
            <Close color="error" />
          </IconButton>
          {selectedUser && <AddProductPage product={selectedUser} />}
        </div>
      </Modal>
    </div>
  );
};

export default AdminProductList;
