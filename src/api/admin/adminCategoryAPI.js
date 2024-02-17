import api from "../apiwrapper";

const AdminCategoryAPI = {
  // Get all categories with pagination, filtering, and sorting
  getAllCategories: async (queryParams) => {
    const response = await api.get("/admin/category", { params: queryParams });
    return response;
  },

  // Create a new category
  createCategory: async (formData) => {
    const response = await api.post("/admin/category", formData);
    return response;
  },

  // Edit an existing category
  editCategory: async (categoryId, formData) => {
    const response = await api.put(`/admin/category/${categoryId}`, formData);
    return response;
  },

  // Delete a category
  deleteCategory: async (categoryId) => {
    const response = await api.delete(`/admin/category/${categoryId}`);
    return response;
  },
};

export default AdminCategoryAPI;
