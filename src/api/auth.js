import api from "./apiwrapper";

const authAPI = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response;
  },

  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response;
  },

  logout: async () => {
    try {
      await api.get("/auth/logout");
      // Clear token from local storage
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
};

export default authAPI;
