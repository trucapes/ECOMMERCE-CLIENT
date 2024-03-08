import api from "../apiwrapper";

export const transactionAPI = {
  performTransaction: async (credentials) => {
    const response = await api.post("/transaction", credentials);
    return response;
  },
};
