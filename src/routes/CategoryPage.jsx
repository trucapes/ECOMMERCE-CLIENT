import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import CategoryList from "../components/Category/CategoryList";
import CategoryForm from "../components/Category/CategoryForm";
import AdminCategoryAPI from "../api/admin/adminCategoryAPI";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper>
          <CategoryList categories={categories} loading={loading} />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <CategoryForm />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CategoryPage;
