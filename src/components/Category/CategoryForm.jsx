// CategoryForm.js
import React from "react";
import { TextField, Button } from "@mui/material";

const CategoryForm = ({ category }) => {
  return (
    <div>
      <TextField label="Name" variant="outlined" fullWidth margin="normal" />
      <TextField label="Index" variant="outlined" fullWidth margin="normal" />
      <TextField
        type="file"
        label="Upload Image"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary">
        Add Category
      </Button>
    </div>
  );
};

export default CategoryForm;
