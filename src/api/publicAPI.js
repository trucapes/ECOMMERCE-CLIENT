import api from "./apiwrapper";

const publicAPI = {
  // Get user profile
  getCategories: async (reqType) => {
    const response = await api.get("/public/categories", {
      headers: { for: reqType },
    });
    return response;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put("/profile", profileData);
    return response;
  },
};

export default publicAPI;
