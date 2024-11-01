import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Box,
  Divider,
  ListSubheader,
  Container,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import AdminCategoryAPI from "../../../api/admin/adminCategoryAPI";
import AdminProductAPI from "../../../api/admin/adminProductAPI";
import { toast } from "react-toastify";
import { SERVER_URL, setDynamicContentType } from "../../../api/apiwrapper";
import GalleryPopup from "../../Gallery/Gallery";

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
  const steps = ["Product Details", "Pricing", "Images", "Additional Details"];
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [openGalleryPopup, setOpenGalleryPopup] = useState(false);

  const validateStep = (step) => {
    const newErrors = {};

    console.log(productData);

    switch (step) {
      case 0:
        if (!productData.name.trim())
          newErrors.name = "Product name is required";
        if (!productData.category) newErrors.category = "Category is required";
        if (!productData.description.trim())
          newErrors.description = "Description is required";
        break;
      case 1:
        if (!productData["price.regular"])
          newErrors["price.regular"] = "Regular price is required";
        // Add more price validations as needed
        break;
      case 2:
        if (
          !product &&
          (!productData.images || productData.images.length === 0)
        )
          newErrors.images = "At least one image is required";
        break;
      case 3:
        if (!productData.index) newErrors.index = "Index is required";
        if (!productData.shippingCost)
          newErrors.shippingCost = "Shipping cost is required";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
    "discount.distributor": "0",
    "discount.dealer": "0",
    "discount.contractor": "0",
    "salesTax.distributor": "0",
    "salesTax.dealer": "0",
    "salesTax.contractor": "0",
    shippingCost: "0",
    stockAvailable: true,
    hotProduct: true,
    index: "10000",
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
        "discount.distributor": "0",
        "discount.dealer": "0",
        "discount.contractor": "0",
        "salesTax.distributor": "0",
        "salesTax.dealer": "0",
        "salesTax.contractor": "0",
        shippingCost: "0",
        stockAvailable: true,
        hotProduct: true,
        index: "10000",
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
        images: inputData.images,
        imagePreviews: inputData.images.map((image) =>
          image && image.path
            ? `${SERVER_URL + image.path.replace(/\\/g, "/")}`.replace(
                "/public/",
                "/"
              )
            : image
        ),
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

    if (!productData.shippingCost) {
      return;
    }

    try {
      // Create a copy of productData to avoid modifying the original state
      const jsonProductData = { ...productData };

      // Remove imagePreviews from the data to be sent
      delete jsonProductData.imagePreviews;

      // Send the request using JSON
      if (product) {
        const res = await AdminProductAPI.editProduct(
          product._id,
          jsonProductData
        );

        if (res.data.error === false) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await AdminProductAPI.createProduct(jsonProductData);

        if (res.data.error === false) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          {product ? "Edit Product" : "Add Product"}
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit}>
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Product Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Product Name"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={productData.category}
                      onChange={handleCategoryChange}
                    >
                      {categories &&
                        categories.map((category) => [
                          <MenuItem key={category._id} value={category._id}>
                            {category.name}
                          </MenuItem>,
                          ...(category.subcategories &&
                          category.subcategories.length > 0
                            ? [
                                <ListSubheader
                                  key={`subheader-${category._id}`}
                                >
                                  {category.name} Subcategories
                                </ListSubheader>,
                                ...category.subcategories.map((subcategory) => (
                                  <MenuItem
                                    key={subcategory._id}
                                    value={subcategory._id}
                                    style={{ paddingLeft: "32px" }}
                                  >
                                    {subcategory.name}
                                  </MenuItem>
                                )),
                              ]
                            : []),
                        ])}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Description
                  </Typography>
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
                  />
                </Grid>
              </Grid>
              {errors.name && (
                <Typography color="error">{errors.name}</Typography>
              )}
              {errors.category && (
                <Typography color="error">{errors.category}</Typography>
              )}
              {errors.description && (
                <Typography color="error">{errors.description}</Typography>
              )}
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Pricing Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Prices</Typography>
                  <Grid container spacing={2}>
                    {["regular", "distributor", "dealer", "contractor"].map(
                      (type) => (
                        <Grid item xs={12} sm={6} md={3} key={`price-${type}`}>
                          <TextField
                            label={`${
                              type.charAt(0).toUpperCase() + type.slice(1)
                            } Price`}
                            name={`price.${type}`}
                            value={productData[`price.${type}`]}
                            onChange={handleInputChange}
                            fullWidth
                            error={!!errors[`price.${type}`]}
                            helperText={errors[`price.${type}`]}
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1">Taxes</Typography>
                  <Grid container spacing={2}>
                    {["distributor", "dealer", "contractor"].map((type) => (
                      <Grid item xs={12} sm={6} md={4} key={`tax-${type}`}>
                        <TextField
                          label={`${
                            type.charAt(0).toUpperCase() + type.slice(1)
                          } Tax`}
                          name={`salesTax.${type}`}
                          value={productData[`salesTax.${type}`]}
                          onChange={handleInputChange}
                          fullWidth
                          error={!!errors[`salesTax.${type}`]}
                          helperText={errors[`salesTax.${type}`]}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1">Discounts</Typography>
                  <Grid container spacing={2}>
                    {["distributor", "dealer", "contractor"].map((type) => (
                      <Grid item xs={12} sm={6} md={4} key={`discount-${type}`}>
                        <TextField
                          label={`${
                            type.charAt(0).toUpperCase() + type.slice(1)
                          } Discount`}
                          name={`discount.${type}`}
                          value={productData[`discount.${type}`]}
                          onChange={handleInputChange}
                          fullWidth
                          error={!!errors[`discount.${type}`]}
                          helperText={errors[`discount.${type}`]}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Image Upload
              </Typography>
              <Button
                variant="contained"
                onClick={() => setOpenGalleryPopup(true)}
              >
                Choose New Image
              </Button>
              {/* <input type="file" multiple onChange={handleImageChange} /> */}
              {productData.imagePreviews && (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {productData.imagePreviews.map((preview, index) => (
                    <Grid key={index} item xs={6} sm={4} md={3}>
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
              {errors.images && (
                <Typography color="error">{errors.images}</Typography>
              )}
            </Box>
          )}

          {activeStep === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Additional Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Index"
                    name="index"
                    value={productData.index}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Shipping Cost"
                    name="shippingCost"
                    value={productData.shippingCost}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
              {errors.index && (
                <Typography color="error">{errors.index}</Typography>
              )}
              {errors.shippingCost && (
                <Typography color="error">{errors.shippingCost}</Typography>
              )}
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button type="submit" variant="contained" color="primary">
                  {product ? "Update Product" : "Add Product"}
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </form>
      </Paper>
      <GalleryPopup
        open={openGalleryPopup}
        onClose={() => setOpenGalleryPopup(false)}
        setImages={(e) => {
          setProductData({
            ...productData,
            images: e.map((image) => image.url),
            imagePreviews: e.map((image) => image.url),
          });
        }}
      />
    </Container>
  );
};

export default AddProductPage;
