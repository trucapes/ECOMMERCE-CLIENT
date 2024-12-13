import { Check, PriorityHigh } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { OrderAPI } from "../api/paymentAPI";
import AdminUserAPI from "../api/admin/adminUserAPI";
import AdminProductAPI from "../api/admin/adminProductAPI";
import NoDataFound from "../components/NoDataFound/NoDataFound";
import { DashboardAPI } from "../api/admin/adminDashboard";
import { ClipLoader } from "react-spinners";
import { Skeleton } from "@mui/material";

function AdminDashboard() {
  const [noOfOrders, setNoOfOrders] = useState(0);
  const [noOfPendingOrders, setNoOfPendingOrders] = useState(0);
  const [noOfUsers, setNoOfUsers] = useState(0);
  const [recentOrders, setRecentOrders] = useState(null);
  const [products, setProducts] = useState(0);
  const [data, setData] = useState(null);
  const [tilesLoader, setTilesLoader] = useState(false);

  const getData = async () => {
    setTilesLoader(true);
    // console.log("first");
    const response = await DashboardAPI.getDashboardData();
    console.log("This", response);
    setData({ ...response });
    setTilesLoader(false);
  };

  useEffect(() => {
    getData();
    // console.log("first");
  }, []);

  return (
    <div className="">
      {data === null ? (
        <div className="grid grid-cols-4 gap-2">
          <Skeleton
            variant="rounded"
            sx={{ width: "80%" }}
            height={90}
            animation="wave"
          />
          <Skeleton
            variant="rounded"
            sx={{ width: "80%" }}
            height={90}
            animation="wave"
          />
          <Skeleton
            variant="rounded"
            sx={{ width: "80%" }}
            height={90}
            animation="wave"
          />
          <Skeleton
            variant="rounded"
            sx={{ width: "80%" }}
            height={90}
            animation="wave"
          />
        </div>
      ) : (
        <div className="dashboard-header w-full grid grid-cols-4 gap-4">
          {data.tiles.map((item, index) => (
            <div className="border p-2 bg-slate-200 border-slate-600 w-full rounded-xl ">
              <h1 className="text-lg">{item.Title}</h1>
              <h1 className="sm:text-2xl text-xl">{item.Value}</h1>
            </div>
          ))}
        </div>
      )}
      <h1 className="text-2xl my-12">Recent Orders</h1>
      <div className="w-full">
        {data === null ? (
          <>
            <Skeleton variant="rectangular" height={80} animation="wave" />
            <br />
            <Skeleton variant="rectangular" height={80} animation="wave" />
            <br />
            <Skeleton variant="rectangular" height={80} animation="wave" />
            <br />
            <Skeleton variant="rectangular" height={80} animation="wave" />
            <br />
            <Skeleton variant="rectangular" height={80} animation="wave" />
          </>
        ) : (
          data.Orders.length > 0 &&
          data.Orders.map((item, index) => (
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
                      <span className="font-bold">Order ID </span> - {item.id}
                    </div>
                    <div className="order-date my-auto">
                      <span className="font-bold">Ordered On</span> -{" "}
                      {item.date}
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
                      {item.updatedAt}
                    </div>
                  )}
                </div>
              </div>
              <div className="order-footer"></div>
            </div>
          ))
        )}
        {recentOrders && recentOrders.length === 0 && (
          <NoDataFound TryingToFind="Orders" />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
