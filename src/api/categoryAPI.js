import api from "./apiwrapper";

export const CategoryAPI = {
  getCategories: async () => {
    const response = await api.get("/public/categories", {
      headers: { for: "categories" },
    });
    return response;
  },
  getCategoryByName: async (name) => {
    const response = await api.get(`/products`, {
      params: name,
      headers: { for: "product" },
    });
    return response;
  },
};
