import api from "../apiwrapper";

const AdminCategoryAPI = {
  // Get all categories with pagination, filtering, and sorting
  getAllCategories: async (queryParams) => {
    const response = await api.get("/admin/category", { params: queryParams });
    return response.data;
  },

  // Create a new category
  createCategory: async (formData) => {
    const response = await api.post("/admin/category", formData);
    return response.data;
  },

  // Edit an existing category
  editCategory: async (categoryId, formData) => {
    const response = await api.put(`/admin/category/${categoryId}`, formData);
    return response.data;
  },

  // Delete a category
  deleteCategory: async (categoryId) => {
    const response = await api.delete(`/admin/category/${categoryId}`);
    return response.data;
  },
};

export default AdminCategoryAPI;
