import api from "./apiwrapper";

const profileAPI = {
  // Get user profile
  getProfile: async () => {
    
    const response = await api.get("/profile");
    return response;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put("/profile", profileData);
    return response;
  },
};

export default profileAPI;
