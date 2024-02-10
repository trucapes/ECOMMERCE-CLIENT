// CategoryList.js
import React from "react";
import { Typography, CircularProgress } from "@mui/material";

const CategoryList = ({ categories, loading }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Categories
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <ul>
          {categories &&
            categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
