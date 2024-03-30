import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  FormControl,
  Typography,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableContainer,
  TableBody,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import "react-quill/dist/quill.snow.css"; // Import the styles
import ReactQuill from "react-quill";
import AdminCategoryAPI from "../../../api/admin/adminCategoryAPI";
import AdminProductAPI from "../../../api/admin/adminProductAPI";
import { toast } from "react-toastify";
import { setDynamicContentType } from "../../../api/apiwrapper";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const AddProductPage = ({ product }) => {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategoryData();
    setProductPreFilledValues();
  }, []);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      const response = await AdminCategoryAPI.getAllCategories();
      setCategories(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error.response.data.message);
      setLoading(false);
    }
  };

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    "price.regular": "",
    "price.distributor": "",
    "price.dealer": "",
    "price.contractor": "",
    "discount.distributor": "",
    "discount.dealer": "",
    "discount.contractor": "",
    "salesTax.distributor": "",
    "salesTax.dealer": "",
    "salesTax.contractor": "",
    shippingCost: "",
    stockAvailable: true,
    hotProduct: true,
    index: "",
    images: null,
  });

  const setProductPreFilledValues = () => {
    if (!product) {
      setProductData({
        name: "",
        description: "",
        category: "",
        "price.regular": "",
        "price.distributor": "",
        "price.dealer": "",
        "price.contractor": "",
        "discount.distributor": "",
        "discount.dealer": "",
        "discount.contractor": "",
        "salesTax.distributor": "",
        "salesTax.dealer": "",
        "salesTax.contractor": "",
        shippingCost: "",
        stockAvailable: true,
        hotProduct: true,
        index: "",
        images: null,
      });
    } else {
      const inputData = product;
      const prodData = {
        name: inputData.name,
        description: inputData.description,
        category: inputData.category._id,
        "price.regular": inputData.price.regular.toString(),
        "price.distributor": inputData.price.distributor.toString(),
        "price.dealer": inputData.price.dealer.toString(),
        "price.contractor": inputData.price.contractor.toString(),
        "discount.distributor": inputData.discount.distributor.toString(),
        "discount.dealer": inputData.discount.dealer.toString(),
        "discount.contractor": inputData.discount.contractor.toString(),
        "salesTax.distributor": inputData.salesTax.distributor.toString(),
        "salesTax.dealer": inputData.salesTax.dealer.toString(),
        "salesTax.contractor": inputData.salesTax.contractor.toString(),
        shippingCost: inputData.shippingCost.toString(),
        stockAvailable: inputData.stockAvailable,
        hotProduct: inputData.hotProduct,
        index: inputData.index.toString(),
      };

      setProductData(prodData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setProductData((prevData) => ({ ...prevData, [name]: checked }));
    } else {
      setProductData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setProductData((prevData) => ({
      ...prevData,
      category: selectedCategoryId,
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setProductData((prevData) => ({ ...prevData, images: files }));

    // Display image previews
    const imagePreviews = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imagePreviews.push(event.target.result);
        if (imagePreviews.length === files.length) {
          // Set the image previews in the state
          setProductData((prevData) => ({ ...prevData, imagePreviews }));
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      productData.imagePreviews = null;

      // Append product data
      Object.keys(productData).forEach((key) => {
        if (key === "images") {
          // Append each image to FormData
          for (let i = 0; i < productData.images.length; i++) {
            formData.append("images", productData.images[i]);
          }
        } else {
          formData.append(key, productData[key]);
        }
      });

      // Set dynamic content type for multipart/form-data
      setDynamicContentType("multipart/form-data");

      // Send the request using FormData
      if (product) {
        const res = await AdminProductAPI.editProduct(product._id, formData);

        if (res.data.error === false) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await AdminProductAPI.createProduct(formData);

        if (res.data.error === false) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      // Reset content type to application/json
      setDynamicContentType("application/json");
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Product Details Section */}
        <Typography variant="h6" gutterBottom>
          Product Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Product Name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={productData.category}
                onChange={handleCategoryChange}
              >
                {categories &&
                  categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              className="bg-primary-50"
              name="description"
              modules={modules}
              formats={formats}
              value={productData.description}
              onChange={(e) => {
                let obj = {
                  target: {
                    name: "description",
                    value: e,
                    type: "text",
                    checked: false,
                  },
                };
                handleInputChange(obj);
              }}
            />{" "}
            {/* <TextField
              label="Description"
              name="description"
              multiline
              minRows={6}
              maxRows={10}
              value={productData.description}
              onChange={handleInputChange}
              fullWidth
              required
            /> */}
          </Grid>
        </Grid>
        <br />
        <br />
        {/* Price Details Section */}
        <Typography variant="h6" gutterBottom>
          Price Details
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Regular</TableCell>
                <TableCell>Distributor</TableCell>
                <TableCell>Dealer</TableCell>
                <TableCell>Contractor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell>
                  <TextField
                    name="price.regular"
                    value={productData["price.regular"]}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="price.distributor"
                    value={productData["price.distributor"]}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="price.dealer"
                    value={productData["price.dealer"]}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="price.contractor"
                    value={productData["price.contractor"]}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <TextField
                    name="salesTax.distributor"
                    value={productData["salesTax.distributor"]}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="salesTax.dealer"
                    value={productData["salesTax.dealer"]}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="salesTax.contractor"
                    value={productData["salesTax.contractor"]}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Discount</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <TextField
                    name="discount.distributor"
                    value={productData["discount.distributor"]}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="discount.dealer"
                    value={productData["discount.dealer"]}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="discount.contractor"
                    value={productData["discount.contractor"]}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>
                  <TextField
                    label={`Total Regular`}
                    value={productData["price.regular"]}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label={`Total Distributor`}
                    value={
                      (parseFloat(productData["price.distributor"]) *
                        (100 -
                          parseFloat(productData["discount.distributor"])) *
                        (100 +
                          parseFloat(productData["salesTax.distributor"]))) /
                      10000
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label={`Total Dealer`}
                    value={
                      (parseFloat(productData["price.dealer"]) *
                        (100 - parseFloat(productData["discount.dealer"])) *
                        (100 + parseFloat(productData["salesTax.dealer"]))) /
                      10000
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label={`Total Contractor`}
                    value={
                      (parseFloat(productData["price.contractor"]) *
                        (100 - parseFloat(productData["discount.contractor"])) *
                        (100 +
                          parseFloat(productData["salesTax.contractor"]))) /
                      10000
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <br />
        <br />

        <Typography variant="h6" gutterBottom>
          Image Upload
        </Typography>
        <input type="file" multiple onChange={handleImageChange} />

        {productData.imagePreviews && (
          <Grid container spacing={2}>
            {productData.imagePreviews.map((preview, index) => (
              <Grid key={index} item xs={2}>
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    margin: "5px",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
        <br />
        <br />

        {/* Additional Details Section */}
        <Typography variant="h6" gutterBottom>
          Additional Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={productData.stockAvailable}
                  onChange={handleInputChange}
                  name="stockAvailable"
                  color="primary"
                />
              }
              label="Stock Available"
            />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={productData.hotProduct}
                  onChange={handleInputChange}
                  name="hotProduct"
                  color="primary"
                />
              }
              label="Hot Product"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Index"
              name="index"
              value={productData.index}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Shipping Cost"
              name="shippingCost"
              value={productData.shippingCost}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          {/* Add other additional details fields as needed */}
        </Grid>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProductPage;
