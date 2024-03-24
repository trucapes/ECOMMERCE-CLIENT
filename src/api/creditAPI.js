import api from "./apiwrapper";

export const creditAPI = {
  getCreditByUserId: async (user) => {
    const response = await api.post("/credit", { user: user });
    return response;
  },
};
