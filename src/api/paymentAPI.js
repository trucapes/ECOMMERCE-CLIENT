import api from "./apiwrapper";

export const OrderAPI = {
  placeOrder: async (credentials) => {
    const response = await api.post("/payment", credentials);
    return response;
  },
  getOrders: async () => {
    const response = await api.get("/order");
    return response;
  },
  updateOrderStatus: async (credentials) => {
    const response = await api.post(`/order/update`, credentials);
    return response;
  },
};
