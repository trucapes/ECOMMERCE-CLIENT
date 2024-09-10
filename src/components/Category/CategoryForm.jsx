// CategoryForm.js
import React, { useEffect, useState } from "react";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import AdminCategoryAPI from "../../api/admin/adminCategoryAPI";
import {toast} from 'react-toastify'
import { setDynamicContentType } from "../../api/apiwrapper";
import { handleFireBaseUpload } from "../../utils/upload-file";

const CategoryForm = ({ category, open, onClose, categories }) => {
  const [formData, setFormData] = useState({
    name: "",
    index: "",
    image: "",
    category: "categories",
  });

  useEffect(() => {
    
      // Set form data based on the category when the dialog opens
      setFormData({
        name: category ? category.name : "",
        index: category ? category.index : "",
        image: "",
        category: "categories"
      });

  }, [open, category]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      parent: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected File:", selectedFile.name, selectedFile.type);
  
    setFormData({
      ...formData,
      image: selectedFile,
    });
  };
  

  const handleSubmit = async () => {
    console.log("Form Data:", formData);
    // Handle form submission logic here

    const form = formData;

    const imageUrl = await handleFireBaseUpload(form.image);

    form.imageUrl = imageUrl;

    console.log("Form Data:", form);
    console.log("Image URL:", imageUrl);

    setDynamicContentType("multipart/form-data");

    if(category){
      const response = await AdminCategoryAPI.editCategory(category._id, formData)

      if(response.data.error){
        toast.error(response.data.message);
      }else{
        toast.success(response.data.message)
      }
    }else{
      const response = await AdminCategoryAPI.createCategory(formData)

      if(response.data.error){
        toast.error(response.data.message);
      }else{
        toast.success(response.data.message)
      }
    }
    
    setDynamicContentType("application/json");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle>{category ? "Update Category" : "Add New Category"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Index"
          variant="outlined"
          fullWidth
          margin="normal"
          name="index"
          value={formData.index}
          onChange={handleChange}
        />
        { categories &&
        <FormControl fullWidth>
              <InputLabel>Parent Category</InputLabel>
              <Select
                name="category"
                value={formData.parent}
                onChange={handleCategoryChange}
              >
                {
                  categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
        </FormControl>
        }
        <TextField
          type="file"
          label="Upload Image"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleImageChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {category ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm;
