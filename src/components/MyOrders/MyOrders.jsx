import { Check, ChevronRight, PriorityHigh } from "@mui/icons-material";
import { Button, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderItemPopUp from "./OrderItemPopUp";
import { OrderAPI } from "../../api/paymentAPI";
import NoDataFound from "../NoDataFound/NoDataFound";

function MyOrders({ profile }) {
  const [isPopped, setIsPopped] = useState(false);
  const [order, setOrder] = useState([]);
  const [itemIndex, setItemIndex] = useState(null);
  const [itemforPopUp, setItemforPopUp] = useState(null);
  const [loading, setLoading] = useState(false);

  function DateToString(date) {
    const d = new Date(date);
    // console.log(date);
    const performedOn =
      d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    return performedOn;
  }

  function ItemPopUp(index, item) {
    setItemIndex(index);
    setItemforPopUp(item);
    setIsPopped(true);
  }

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await OrderAPI.getOrders();
      setLoading(false);
      console.log(response.data.data)
      if (response.data.error === false) {
        setOrder(response.data.data);
      } else {
        setOrder(null);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className=" w-full h-full">
      <h1 className="my-4 text-2xl">My Orders</h1>
      <OrderItemPopUp
        isPopped={isPopped}
        itemForPupUp={itemforPopUp}
        itemIndex={itemIndex}
        setIsPopped={setIsPopped}
      />
      <div className="w-full flex gap-3 flex-col">
        {loading ? (
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
        ) : order && order.length === 0 ? (
          <NoDataFound TryingToFind={"Orders"} />
        ) : (
          order.map((item, index) => (
            <div className="order-container flex flex-col bg-[#fff1b8] hover:bg-[#ffeca0] duration-200 p-8 rounded-xl">
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
                      {DateToString(item.createdAt)}
                    </div>
                  </div>
                  <div className="flex flex-col ">
                    <div className="order-price my-auto">
                      <span className="font-bold">Order Price </span> -{" "}
                      {`$${item.price}`}
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
                  <Button
                    variant="text"
                    onClick={() => {
                      ItemPopUp(index, item);
                      console.log(itemIndex, itemforPopUp, isPopped);
                    }}
                    sx={{ color: "black" }}
                  >
                    View All {item.products.length} Items <ChevronRight />
                  </Button>
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
          ))
        )}
      </div>
    </div>
  );
}

export default MyOrders;
