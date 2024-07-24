import React, { useState, useEffect } from "react";
import {
  Skeleton,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CategoryForm from "./CategoryForm";
import AdminCategoryAPI from "../../api/admin/adminCategoryAPI";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../api/apiwrapper";
import { AddBox } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CategoryList = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    if (isFormOpen === false) {
      fetchData();
    }
  }, [isFormOpen]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await AdminCategoryAPI.getAllCategories();
      const sortedCategories = response.data.data.sort((a, b) => b.index - a.index);
      setCategories(sortedCategories);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error.response.data.message);
      setLoading(false);
    }
  };

  const openForm = (category, ca) => {
    if (ca) {
      setSelectedCategories(categories);
    }
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedCategories(null);
    setSelectedCategory(null);
    setIsFormOpen(false);
  };

  const handleDelete = async (categoryId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmed) {
      const res = await AdminCategoryAPI.deleteCategory(categoryId);
      if (res.data.error === false) {
        toast.success(res.data.message);
        fetchData();
      } else {
        toast.error(res.data.message);
      }
    }
  };

  const handleExpandClick = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update indexes
    const updatedItems = items.map((item, index) => ({
      ...item,
      index: items.length - index, // Reverse the index so highest is at top
    }));

    setCategories(updatedItems);

    // Update indexes in the backend
    try {
      for (let item of updatedItems) {
        await AdminCategoryAPI.editCategory(item._id, { index: item.index });
      }
      toast.success("Category order updated successfully");
    } catch (error) {
      console.error("Error updating category order:", error);
      toast.error("Failed to update category order");
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Categories
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddBox />}
          onClick={() => openForm(null, null)}
        >
          Add New Category
        </Button>
      </Box>

      {loading ? (
        [...Array(6)].map((_, index) => (
          <Skeleton key={index} variant="rectangular" height={100} sx={{ mb: 2 }} animation="wave" />
        ))
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="categories">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {categories &&
                  categories.map((category, index) => (
                    <Draggable key={category._id} draggableId={category._id} index={index}>
                      {(provided) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          component={Card}
                          sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                        >
                          <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
                            <div {...provided.dragHandleProps}>
                              <DragIndicatorIcon sx={{ mr: 2, my: 2 }} />
                            </div>
                            <CardMedia
                              component="img"
                              sx={{ width: 100, height: 100, mr: 2 }}
                              image={category.image.includes("http") ? category.image : `${SERVER_URL + category.image.replace(/\\/g, "/")}`.replace("/public/", "/")}
                              alt={category.name}
                            />
                            <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
                              <Typography variant="h6">{category.name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                Index: {category.index}
                              </Typography>
                            </CardContent>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            <IconButton onClick={() => openForm(category, null)}>
                              <EditIcon color="info" />
                            </IconButton>
                            <IconButton onClick={() => openForm(null, "categories")}>
                              <AddBox color="success" />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(category._id)}>
                              <DeleteIcon color="warning" />
                            </IconButton>
                            {category.subcategories && category.subcategories.length > 0 && (
                              <IconButton
                                onClick={() => handleExpandClick(category._id)}
                                aria-expanded={expandedCategory === category._id}
                                aria-label="show more"
                              >
                                <ExpandMoreIcon />
                              </IconButton>
                            )}
                          </Box>
                          <Collapse in={expandedCategory === category._id} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                            <Divider sx={{ my: 1 }} />
                            <List component="div" disablePadding>
                              {category.subcategories.map((subcategory) => (
                                <ListItem key={subcategory._id} sx={{ pl: 4 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <img
                                      src={subcategory.image}
                                      alt={subcategory.name}
                                      style={{ width: 30, height: 30, marginRight: 10 }}
                                    />
                                    <ListItemText primary={subcategory.name} />
                                    <ListItemSecondaryAction>
                                      <IconButton edge="end" aria-label="edit" onClick={() => openForm(subcategory, null)}>
                                        <EditIcon color="info" />
                                      </IconButton>
                                      <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(subcategory._id)}>
                                        <DeleteIcon color="warning" />
                                      </IconButton>
                                    </ListItemSecondaryAction>
                                  </Box>
                                </ListItem>
                              ))}
                            </List>
                          </Collapse>
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      )}

      <CategoryForm
        category={selectedCategory}
        open={isFormOpen}
        onClose={closeForm}
        categories={selectedCategories}
      />
    </Box>
  );
};

export default CategoryList;