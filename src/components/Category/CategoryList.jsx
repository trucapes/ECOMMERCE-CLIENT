// CategoryList.js
import React, { useState, useEffect } from "react";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryForm from "./CategoryForm";
import AdminCategoryAPI from "../../api/admin/adminCategoryAPI";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../api/apiwrapper";

const CategoryList = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFormOpen === false) {
      fetchData();
    }
  }, [isFormOpen]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await AdminCategoryAPI.getAllCategories();
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error.response.data.message);
      setLoading(false);
    }
  };

  const openForm = (category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedCategory(null);
    setIsFormOpen(false);
  };

  const handleDelete = async (categoryId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmed) {
      const res = await AdminCategoryAPI.deleteCategory(categoryId);
      // Fetch updated category data after deletion

      if (res.data.error === false) {
        toast.success(res.data.message);
        fetchData();
      } else {
        toast.error(res.data.message);
      }
    }
  };

  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="text-3xl mt-4 mb-4 text-gray-900">Categories</h1>
        <div className=" flex flex-row items-stretch justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => openForm(null)}
          >
            Add New Category
          </Button>
        </div>
      </div>
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
      ) : (
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Index</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories &&
                  categories.data.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell>{category._id}</TableCell>
                      <TableCell>{category.index}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        <a
                          href={`${
                            SERVER_URL + category.image.replace(/\\/g, "/")
                          }`.replace("/public/", "/")}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`${
                              SERVER_URL + category.image.replace(/\\/g, "/")
                            }`.replace("/public/", "/")}
                            alt={category.name}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </a>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="info"
                          aria-label="edit"
                          onClick={() => openForm(category)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          aria-label="delete"
                          onClick={() => {
                            handleDelete(category._id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* CategoryForm as a Popup */}
          <CategoryForm
            category={selectedCategory}
            open={isFormOpen}
            onClose={closeForm}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryList;
