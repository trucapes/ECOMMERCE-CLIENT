import api from "./apiwrapper";

export const userProductsAPI = {
  getHomeProducts: async () => {
    const response = await api.get("/products/home_featured");
    return response;
  },
  getFeaturedProducts: async () => {
    const response = await api.get("/products/category_featured");
    return response;
  },
  getProductById: async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response;
  },
  getProductsByCategory: async (filter) => {
    const response = await api.get("/products", { params: filter });
    return response;
  },
};
