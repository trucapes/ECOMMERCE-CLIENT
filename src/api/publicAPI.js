import api from "./apiwrapper";

const publicAPI = {
  // Get user profile
  getCategories: async () => {
    const response = await api.get("/public/categories");
    return response;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put("/profile", profileData);
    return response;
  },
};

export default publicAPI;
