import api from "./apiwrapper";

const userTransactionAPI = {
  // Get user profile
  getTransactions: async () => {
    const response = await api.get("/get_transactions");
    return response;
  },
};

export default userTransactionAPI;
