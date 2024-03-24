import api from "../apiwrapper";

export const RepaymentAPI = {
  sendRepaymentRequest: async (data) => {
    const response = await api.post("/admin/repayment/sendRequest", data);
    return response;
  },
};
