import api from "../apiwrapper";
import { OrderAPI } from "../paymentAPI";
import AdminProductAPI from "./adminProductAPI";
import AdminUserAPI from "./adminUserAPI";

export const DashboardAPI = {
  getDashboardData: async () => {
    //Get user Details

    const usersResponse = await AdminUserAPI.getAllUsers();
    const customers = usersResponse.data.data.filter(
      (item) => item.userRole !== "admin"
    );
    const totalCustomers = customers.length;

    //Get Product Details

    const productsResponse = await AdminProductAPI.getAllProducts({ page: 1 });
    const productCount = productsResponse.data.totalCount;

    //Get Order Details

    const ordersResponse = await OrderAPI.getOrders();
    const totalOrderCount = ordersResponse.data.data.length;
    const allOrders = ordersResponse.data.data.map((item) => {
      return {
        isDelivered: item.isDelivered,
        userId: item.userId?._id,
        address: item.shippingAddress,
        id: item._id,
        customerName: item.userId?.firstName + " " + item.userId?.lastName,
        date: DateToString(item.createdAt),
        updatedAt: DateToString(item.updatedAt),
        amount: item.price,
        status: item.status,
        products: [...item.products],
      };
    });
    const pendingOrders = allOrders.filter(
      (order) => order.status === "pending"
    );
    const pendingOrderCount = pendingOrders.length;

    //Preparing the Data Object to Return
    const tiles = [
      {
        Title: "Total Orders",
        Value: totalOrderCount,
      },
      {
        Title: "Pending Orders",
        Value: pendingOrderCount,
      },
      {
        Title: "Total Users",
        Value: totalCustomers,
      },
      {
        Title: "Total Products",
        Value: productCount,
      },
    ];

    const Orders = allOrders.slice(0, 5);

    return {
      tiles,
      Orders,
    };
  },
};

function DateToString(date) {
  const d = new Date(date);
  // console.log(date);
  const performedOn =
    d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  return performedOn;
}
