import axios from "axios";
export const SERVER_URL = "https://truscapes-server.onrender.com/";
export const API_BASE_URL = "https://truscapes-server.onrender.com/api"; // Update with your API base URL
//https://truscapes-server.onrender.com/api
//http://localhost:5000/api
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
    api.defaults.headers.common["authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["authorization"];
  }
};

// Function to set dynamic Content-Type header
export const setDynamicContentType = (contentType) => {
  api.defaults.headers["Content-Type"] = contentType;
};

setAuthToken();

export default api;
