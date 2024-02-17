import api from "../apiwrapper";

const AdminProductAPI = {
  // Get all categories with pagination, filtering, and sorting
  getAllProducts: async (queryParams) => {
    const response = await api.get("/admin/products", { params: queryParams });
    return response;
  },

  // Create a new category
  createProduct: async (formData) => {
    const response = await api.post("/admin/products", formData);
    return response;
  },

  // Edit an existing category
  editProduct: async (Id, formData) => {
    const response = await api.put(`/admin/products/${Id}`, formData);
    return response;
  },

  // Delete a category
  deleteProductById: async (Id) => {
    const response = await api.delete(`/admin/products/${Id}`);
    return response;
  },
};

export default AdminProductAPI;
