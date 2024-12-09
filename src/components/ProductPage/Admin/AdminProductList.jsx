import React, { useState, useEffect, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Skeleton } from "@mui/material";
import {
  Box,
  List,
  Typography,
  IconButton,
  Button,
  Select,
  MenuItem,
  Grid,
  Divider,
  Chip,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import {
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext,
  Edit,
  Delete,
  Close,
  Check,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import AdminProductAPI from "../../../api/admin/adminProductAPI";
import AddProductPage from "./AddProductPage";
import { SERVER_URL } from "../../../api/apiwrapper";
import NoDataFound from "../../NoDataFound/NoDataFound";
import AdminCategoryAPI from "../../../api/admin/adminCategoryAPI";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("index"); // Default sorting by createdAt
  const [categorySelected, setCategorySelected] = useState("all");
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchData();
    if (categories.length === 0) fetchCategoryData();
  }, [search, page, sortBy, openModal, categorySelected]);

  const fetchData = async () => {
    try {
      setLoading(true);
      var filter = {};

      filter.limit = 50;

      if (search) {
        filter.search = search;
      }

      if (page) {
        filter.page = page;
      }

      if (sortBy) {
        filter.sortBy = sortBy;
      }

      if (categorySelected !== "all") {
        filter.category_id = categorySelected;
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

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      const response = await AdminCategoryAPI.getAllCategories();
      const sortedCategories = response.data.data.sort(
        (a, b) => b.index - a.index
      );
      setCategories(sortedCategories);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error.response.data.message);
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (userId) => {
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

  const handleMoveUp = async (product, index) => {
    try {
      setLoading(true);
      if (index > 0) {
        const product_at_index = products[index];
        const product_at_index_1 = products[index - 1];

        const response = await AdminProductAPI.editProduct(
          product_at_index._id,
          { index: product_at_index_1.index }
        );
        const response2 = await AdminProductAPI.editProduct(
          product_at_index_1._id,
          { index: product_at_index.index }
        );

        if ((response.data.error === false, response2.data.error === false)) {
          setProducts([
            ...products.slice(0, index - 1),
            product_at_index,
            product_at_index_1,
            ...products.slice(index + 1),
          ]);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const handleMoveDown = async (product, index) => {
    try {
      setLoading(true);
      if (index < products.length - 1) {
        const product_at_index = products[index + 1];
        const product_at_index_1 = products[index];

        const response = await AdminProductAPI.editProduct(
          product_at_index._id,
          { index: product_at_index_1.index }
        );
        const response2 = await AdminProductAPI.editProduct(
          product_at_index_1._id,
          { index: product_at_index.index }
        );

        if ((response.data.error === false, response2.data.error === false)) {
          setProducts([
            ...products.slice(0, index - 1),
            product_at_index,
            product_at_index_1,
            ...products.slice(index + 1),
          ]);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const onDragEnd = useCallback(
    async (result) => {
      if (!result.destination) {
        return;
      }

      const newProducts = Array.from(products);
      const [reorderedItem] = newProducts.splice(result.source.index, 1);
      newProducts.splice(result.destination.index, 0, reorderedItem);

      // Update indexes
      newProducts.forEach((product, index) => {
        if (categorySelected === "all") {
          product.index = (totalPages - page + 1) * 20 + 20 - (index + 1); // Assuming 10 items per page
        } else {
          product.category_index =
            (totalPages - page + 1) * 20 + 20 - (index + 1); // Assuming 10 items per page
        }
      });

      setProducts(newProducts);

      try {
        for (const product of newProducts) {
          let updatevalue = {};

          if (categorySelected === "all") {
            updatevalue = {
              index: product.index,
            };
          } else {
            updatevalue = {
              category_index: product.category_index,
            };
          }
          await AdminProductAPI.editProduct(product._id, updatevalue);
        }
        toast.success("Product order updated successfully");
      } catch (error) {
        console.error("Error updating product order:", error);
        toast.error("Failed to update product order");
      }
    },
    [products, page]
  );

  const updateProductIndexes = useCallback(async () => {
    setLoading(true);
    try {
      for (const product of products) {
        await AdminProductAPI.editProduct(product._id, {
          index: product.index,
        });
      }
      toast.success("Product order updated successfully");
    } catch (error) {
      console.error("Error updating product order:", error);
      toast.error("Failed to update product order");
    } finally {
      setLoading(false);
    }
  }, [products]);

  const PriceInfo = ({ label, price, discount, tax }) => (
    <Box mb={1}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Typography variant="body2">Price: ${price}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">Discount: ${discount}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">Tax: ${tax}</Typography>
        </Grid>
      </Grid>
      <Typography variant="body1" fontWeight="bold">
        Total: ${(price - discount + tax).toFixed(2)}
      </Typography>
    </Box>
  );

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
              placeholder="Search in Products"
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
          <div>
            <Select
              value={categorySelected}
              onChange={(e) => setCategorySelected(e.target.value)}
            >
              <MenuItem value="all">All Category Products</MenuItem>
              {categories &&
                categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </div>
          <div>
            {categorySelected === "all" && (
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="createdAt">Sort by Date</MenuItem>
                <MenuItem value="name">Sort by Name</MenuItem>
                <MenuItem value="index">Sort by Index</MenuItem>
              </Select>
            )}
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="products">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {products.map((product, index) => (
                  <Draggable
                    key={product._id}
                    draggableId={product._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ProductCard
                          product={product}
                          handleOpenModal={handleOpenModal}
                          handleDeleteProduct={handleDeleteProduct}
                          PriceInfo={PriceInfo}
                          isDragging={snapshot.isDragging}
                          products={products}
                          handleMoveUp={handleMoveUp}
                          handleMoveDown={handleMoveDown}
                          index={index}
                          categorySelected={categorySelected}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
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

const ProductCard = ({
  products,
  product,
  index,
  handleDeleteProduct,
  handleOpenModal,
  handleMoveDown,
  handleMoveUp,
  PriceInfo,
  isDragging,
  categorySelected,
}) => {
  return (
    <Card
      elevation={3}
      sx={{ mb: 2, opacity: isDragging ? 0.5 : 1, cursor: "move" }}
    >
      <Grid container>
        <Grid item xs={12} md={3}>
          <CardMedia
            component="img"
            height="200"
            image={
              product.images[0] && product.images[0].path
                ? `${
                    SERVER_URL + product.images[0].path.replace(/\\/g, "/")
                  }`.replace("/public/", "/")
                : product.images[0]
            }
            alt={product.name}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h5" component="div">
                {categorySelected === "all"
                  ? product.index
                  : product.category_index}
                . {product.name}
              </Typography>
              <Box>
                <IconButton
                  onClick={() => handleOpenModal(product)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteProduct(product._id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
                <IconButton
                  onClick={() => handleMoveUp(product, index)}
                  disabled={index === 0}
                  color="success"
                >
                  <ArrowUpward />
                </IconButton>
                <IconButton
                  onClick={() => handleMoveDown(product, index)}
                  disabled={index === products.length - 1}
                  color="success"
                >
                  <ArrowDownward />
                </IconButton>
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.category.name}
                </Typography>
                <Typography variant="body2">
                  Regular Price: ${product.price.regular}
                </Typography>
                <Typography variant="body2">
                  Shipping Cost: ${product.shippingCost}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" justifyContent="flex-end">
                  <Chip
                    icon={product.stockAvailable ? <Check /> : <Close />}
                    label={product.stockAvailable ? "In Stock" : "Out of Stock"}
                    color={product.stockAvailable ? "success" : "error"}
                    variant="outlined"
                    sx={{ mr: 1 }}
                  />
                  {/* <Chip
                    icon={product.hotProduct ? <Check /> : <Close />}
                    label={
                      product.hotProduct ? "Hot Product" : "Regular Product"
                    }
                    color={product.hotProduct ? "warning" : "default"}
                    variant="outlined"
                  /> */}
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <PriceInfo
                  label="Distributor"
                  price={product.price.distributor}
                  discount={product.discount.distributor}
                  tax={product.salesTax.distributor}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <PriceInfo
                  label="Dealer"
                  price={product.price.dealer}
                  discount={product.discount.dealer}
                  tax={product.salesTax.dealer}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <PriceInfo
                  label="Contractor"
                  price={product.price.contractor}
                  discount={product.discount.contractor}
                  tax={product.salesTax.contractor}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AdminProductList;
