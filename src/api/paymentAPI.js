import api from "./apiwrapper";

export const OrderAPI = {
  placeOrder: async (credentials) => {
    const response = await api.post("/payment", credentials);
    return response;
  },
};
