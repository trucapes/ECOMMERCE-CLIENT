import { Check, PriorityHigh } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { OrderAPI } from "../api/paymentAPI";
import AdminUserAPI from "../api/admin/adminUserAPI";
import AdminProductAPI from "../api/admin/adminProductAPI";

function AdminDashboard() {
  const [noOfOrders, setNoOfOrders] = useState(0);
  const [noOfPendingOrders, setNoOfPendingOrders] = useState(0);
  const [noOfUsers, setNoOfUsers] = useState(0);
  const [recentOrders, setRecentOrders] = useState(null);
  const [products, setProducts] = useState(0);

  async function getOrders() {
    const response = await OrderAPI.getOrders();
    console.log(response.data.data);
    setNoOfOrders(response.data.data.length);

    const productResponse = await AdminProductAPI.getAllProducts({
      page: 1,
    });

    setProducts(productResponse.data.totalCount);

    const responseData = response.data.data.map((item) => {
      return {
        isDelivered: item.isDelivered,
        userId: item.userId._id,
        address: item.shippingAddress,
        id: item._id,
        customerName: item.userId.firstName + " " + item.userId.lastName,
        date: DateToString(item.createdAt),
        amount: item.price,
        status: item.status,
        products: [...item.products],
      };
    });

    const pendingOrders = responseData.filter(
      (order) => order.status === "pending"
    );
    setNoOfPendingOrders(pendingOrders.length);

    const recentOrders = responseData.slice(0, 5);

    setRecentOrders(recentOrders);
    console.log(recentOrders);
  }
  async function getUsers() {
    const response = await AdminUserAPI.getAllUsers();

    const Users = response.data.data.filter(
      (item) => item.userRole !== "admin"
    );
    setNoOfUsers(Users.length);
  }

  function DateToString(date) {
    const d = new Date(date);
    // console.log(date);
    const performedOn =
      d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    return performedOn;
  }

  useEffect(() => {
    getOrders();
    getUsers();
  }, []);

  return (
    <div className="">
      <div className="dashboard-header w-full grid grid-cols-4 gap-4">
        <div className="border p-2 bg-slate-200 border-slate-600 w-full rounded-xl ">
          <h1 className="text-lg">Total Orders:</h1>
          <h1 className="sm:text-2xl text-xl">{noOfOrders}</h1>
        </div>
        <div className="border p-2 bg-slate-200 border-slate-600 w-full rounded-xl ">
          <h1 className="text-lg">Total Customers:</h1>
          <h1 className="sm:text-2xl text-xl">{noOfUsers}</h1>
        </div>
        <div className="border p-2 bg-slate-200 border-slate-600 w-full rounded-xl ">
          <h1 className="text-lg">Pending Orders:</h1>
          <h1 className="sm:text-2xl text-xl">{noOfPendingOrders}</h1>
        </div>
        <div className="border p-2 bg-slate-200 border-slate-600 w-full rounded-xl ">
          <h1 className="text-lg">Total Products:</h1>
          <h1 className="sm:text-2xl text-xl">{products}</h1>
        </div>
      </div>
      <h1 className="text-2xl my-12">Recent Orders</h1>
      <div className="w-full">
        {recentOrders &&
          recentOrders.length > 0 &&
          recentOrders.map((item, index) => (
            <div className="order-container flex flex-col my-4 bg-[#fff1b8] hover:bg-[#ffeca0] duration-200 p-8 rounded-xl">
              <div className="orders-header flex flex-row justify-between">
                <div className="icon-id-date-container gap-4 flex flex-row justify-start">
                  <div className="icon flex justify-center items-center w-16 aspect-square border-[3px] rounded-xl border-slate-600 border-dashed">
                    {item.isDelivered ? (
                      <Check color="success" />
                    ) : (
                      <PriorityHigh color="error" />
                    )}
                  </div>
                  <div className="flex flex-col ">
                    <div className="order-id my-auto">
                      <span className="font-bold">Order ID </span> - {item._id}
                    </div>
                    <div className="order-date my-auto">
                      <span className="font-bold">Ordered On</span> -{" "}
                      {DateToString(item.date)}
                    </div>
                  </div>
                  <div className="flex flex-col ">
                    <div className="order-price my-auto">
                      <span className="font-bold">Order Price </span> -{" "}
                      {`$${item.amount}`}
                    </div>
                    <div className="order-status my-auto">
                      <span className="font-bold">Order Status - </span>
                      <span className="bg-[#d1b95a] capitalize px-2 rounded-full font-normal text-base">
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="view-order flex flex-col items-start">
                  {item.isDelivered && (
                    <div className="delivered-date">
                      <span className="font-bold">Delivered On</span> -{" "}
                      {DateToString(item.updatedAt)}
                    </div>
                  )}
                </div>
              </div>
              <div className="order-footer"></div>
            </div>
          ))}
        {recentOrders && recentOrders.length === 0 && (
          <div className="w-full flex flex-col justify-center items-center text-center">
            <img
              className="w-[40%]"
              src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-7621845-6166999.png"
              alt=""
            />
            <h1 className="text-center text-lg sl">No Orders Found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
