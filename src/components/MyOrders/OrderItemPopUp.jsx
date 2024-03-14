import { Cancel } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "./Scroll.css";
import { SERVER_URL } from "../../api/apiwrapper";
import { Link } from "react-router-dom";

function OrderItemPopUp({
  isPopped,
  itemIndex,
  itemForPupUp,
  setItemForPupUp,
  setIsPopped,
}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (isPopped) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPopped]);
  if (!isPopped) return null;
  return (
    <div className="fixed top-1/2 left-1/2 w-[600px] border border-r-slate-500 -translate-x-1/2 overflow-hidden py-4 -translate-y-1/2 h-[400px] z-[100000000] bg-white rounded-lg shadow-lg p-8">
      <div className="relative w-full h-full">
        <div
          className="-top-5 -right-5 absolute cursor-pointer"
          onClick={() => {
            setIsPopped(false);
            // window.location.reload();
          }}
        >
          <Cancel fontSize="large" />
        </div>
        <h1 className="text-center">Order Items</h1>
        <div className="order-item-body-container w-full h-full py-7 overflow-y-scroll">
          {itemForPupUp.products.map((item) => {
            return (
              <Link
                to={`/item/${item.category}/${item.product}`}
                className="item-details-container bg-[#fff1b8] w-full h-32 flex my-4 flex-row gap-2 hover:bg-[#ffeca0] duration-200 p-4 rounded-xl"
              >
                <div className="h-full aspect-square object-contain grid place-items-center">
                  <img
                    className=" "
                    src={
                      item.imagePath
                        ? `${
                            SERVER_URL + item.imagePath.replace(/\\/g, "/")
                          }`.replace("/public/", "/")
                        : ""
                    }
                    alt={`${item.name}_Img`}
                  />
                </div>
                <div className="details-container flex flex-col">
                  <div className="order-date my-auto">
                    <span className="font-medium">Name: {item.name}</span>
                  </div>
                  <div className="order-date my-auto">
                    <span className="font-medium">{`Price: $${item.price}`}</span>
                  </div>
                  <div className="order-date my-auto">
                    <span className="font-medium">Qty.: {item.quantity}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OrderItemPopUp;
