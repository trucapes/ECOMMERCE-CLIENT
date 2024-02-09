import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Update with your API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set authorization token
export const setAuthToken = () => {
  const token = localStorage.getItem("tru-scapes-token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;