import { Cancel } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "./Scroll.css";
import { OrderAPI } from "../../api/paymentAPI";
import AlertMsg from "../Alert/AlertMsg";
import { toast } from "react-toastify";

function AdminOrderPopUp({
  isPopped,
  itemIndex,
  itemForPupUp,
  setItemForPupUp,
  setIsPopped,
}) {
  const [data, setData] = useState(null);
  const [newStatus, setNewStatus] = useState(null);
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");

  const updateStatus = async () => {
    if (newStatus === null) return;
    if (newStatus === itemForPupUp.status) return;

    console.log(itemForPupUp);

    try {
      const response = await OrderAPI.updateOrderStatus({
        id: itemForPupUp.id,
        status: newStatus,
      });

      if (response.data.error === false) {
        setNewStatus(null);
        toast.success(response.data.message);
        setTimeout(() => {
          setIsPopped(false);
        }, 1000);
      } else {
        setNewStatus(null);
        toast.success(response.data.message);
        setTimeout(() => {
          setIsPopped(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isPopped) {
      document.body.style.overflow = "hidden";
      console.log(itemForPupUp);
    }

    //Resquest to the server to get product images by the id
    // const response = await ProductAPI.getProductById(itemForPupUp.products);

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPopped]);
  if (!isPopped) return null;
  return (
    <div className="fixed top-1/2 left-1/2 w-[80%] border border-r-slate-500 -translate-x-1/2 overflow-hidden py-4 -translate-y-1/2 h-[90%] z-[100000000] bg-white rounded-lg shadow-lg p-8">
      <div className="relative w-full h-full">
        <div
          className="-top-5 -right-5 absolute cursor-pointer"
          onClick={() => {
            setIsPopped(false);
          }}
        >
          <Cancel fontSize="large" />
        </div>
        <h1 className="text-center">Order Items</h1>
        <div className="order-item-body-container w-full h-full pt-7 pb-14 overflow-y-scroll">
          {itemForPupUp.products.map((item) => {
            return (
              <div className="item-details-container bg-[#fff1b8] w-full h-32 flex my-4 flex-row gap-2 hover:bg-[#ffeca0] duration-200 p-4 rounded-xl">
                <div className="h-full aspect-square object-contain grid place-items-center">
                  <img
                    className=" "
                    src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3BmLXMxMDgtcG0tNDExMy1tb2NrdXAuanBn.jpg"
                    alt=""
                  />
                </div>
                <div className="details-container flex flex-col">
                  <div className="order-item-name my-auto">
                    <span className="font-medium">Name: {item.name}</span>
                  </div>
                  <div className="order-date-price my-auto">
                    <span className="font-medium">{`Price: $${item.price}`}</span>
                  </div>
                  <div className="order-date-quantity my-auto">
                    <span className="font-medium">Qty.: {item.quantity}</span>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="w-full border-y border-y-black flex flex-row justify-between border-dashed">
            <div className="address-container">
              <div className="font-medium">Shipping Address:</div>
              {Object.values(itemForPupUp.address).map((item) => {
                return <div>{item}</div>;
              })}
            </div>
            <div className="bill-container text-end">
              <div className="font-medium">
                Bill Amount: {`$${itemForPupUp.amount}`}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-1">
            Status :{" "}
            <span className="bg-[#d1b95a] capitalize px-2 rounded-full font-normal text-base">
              {itemForPupUp.status}
            </span>
          </div>
          <div className="w-[50%] flex gap-4 flex-col">
            <div className="w-full sm:w-[30%]">
              <label htmlFor="role" className="font-roboto font-bold">
                Update Status<span className="text-red-700">*</span>
              </label>
              <select
                defaultValue={""}
                onChange={(e) => {
                  e.preventDefault();
                  setNewStatus(e.target.value);
                }}
                type="text"
                name="role"
                id="role"
                className="bg-gray-100 border-gray-300 text-gray-900 rounded-lg focus:border-slate-600 block w-full p-3"
                placeholder="e.g. - www.xyz.com"
                required=""
              >
                <option value={""}>Update Status</option>
                {[
                  "Pending",
                  "Confirmed",
                  "Shipped",
                  "Delivered",
                  "Cancelled",
                ].map((item) => {
                  return (
                    <option className="capitalize" value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-fit flex justify-center">
              <button
                disabled={newStatus !== null ? false : true}
                onClick={(e) => {
                  e.preventDefault();
                  updateStatus();
                }}
                type="submit"
                className=" disabled:bg-slate-700 disabled:cursor-not-allowed Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Update
              </button>
            </div>
            {alert && <AlertMsg message={msg} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderPopUp;
