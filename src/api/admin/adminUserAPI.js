// adminUserAPI.js

import api from "../apiwrapper";

const AdminUserAPI = {
  // Get all users with pagination, filtering, and sorting
  getAllUsers: async (queryParams) => {
    const response = await api.get("/admin/users", { params: queryParams });
    return response;
  },

  // Get user by ID or email
  getUserByIdOrEmail: async (idOrEmail) => {
    const response = await api.get(`/admin/users/${idOrEmail}`);
    return response;
  },

  // Search users by name or email
  searchUsers: async (searchQuery) => {
    const response = await api.get("/admin/users/search", {
      params: { query: searchQuery },
    });
    return response;
  },

  // Delete user by ID
  deleteUserById: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response;
  },

  // Verify user by ID
  verifyUserById: async (userId, body = {}) => {
    const response = await api.put(`/admin/users/verify/${userId}`, body);
    return response;
  },

  addAdminEmail: async (email) => {
    const response = await api.post("/admin/email/add", { email });
    return response;
  },

  getAllAdminEmails: async () => {
    const response = await api.get("/admin/email");
    return response;
  },

  deleteAdminEmailById: async (id) => {
    const response = await api.delete(`/admin/email/${id}`);
    return response;
  },
};

export default AdminUserAPI;
