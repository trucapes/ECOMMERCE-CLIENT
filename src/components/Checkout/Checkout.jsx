import React, { useContext, useEffect, useState } from "react";
import InputBox from "../InputBox/InputBox";
import { OrderAPI } from "../../api/paymentAPI";
import { Alert } from "bootstrap";
import AlertMsg from "../Alert/AlertMsg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { CartItemsContext } from "../../Context/CartItemsContext";

function Checkout() {
  let cartItems = useContext(CartItemsContext);

  const [checkOutConfig, setCheckOutConfig] = useState({});
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState("");
  const [card, setCard] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");

  async function confirmOrder() {
    if (addressLine1 === "" || city === "" || pincode === "") {
      setAlert(true);
      setMsg("All fields are required");
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      return;
    }

    if (!paymentType) {
      setAlert(true);
      setMsg("Select Payment Type");
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      return;
    }

    let address = {
      addressLine1,
      addressLine2,
      city,
      pincode,
    };

    address = { ...address, ...checkOutConfig };

    let payment = {};

    if (paymentType === "wallet") {
      payment = { ...address, ...checkOutConfig };
    } else if (paymentType === "creditCard") {
      if (
        card === "" ||
        cvv === "" ||
        expiryMonth === "" ||
        expiryYear === ""
      ) {
        setAlert(true);
        setMsg("Fill all credit card details");
        setTimeout(() => {
          setAlert(false);
        }, 3000);
        return;
      }
      payment = {
        ...address,
        ...checkOutConfig,
        paymentMethod: paymentType,
        card,
        cvv,
        expiryMonth,
        expiryYear,
      };
    }

    setLoader(true);
    const response = await OrderAPI.placeOrder(payment).finally(() => {
      setLoader(false);
    });
    setLoader(false);
    console.log(response);
    if (response.status === 201) {
      toast.success("Order Placed Successfully");
      cartItems.removeItem({});
    } else if (response.status === 200) {
      toast.warn(response.data.message);
    } else {
      toast.error("Internal Server Error");
    }
    setTimeout(() => {
      setAlert(false);
      // navigate("/account/me");
    }, 3000);
  }

  useEffect(() => {
    let config = localStorage.getItem("checkoutConfig");
    config = JSON.parse(config);
    setCheckOutConfig(config);
  }, []);

  if (!checkOutConfig) {
    return null;
  }

  return (
    <div className="w-full h-full flex p-8 justify-center">
      <div className="checkout-container py-8 w-[60%]">
        <div className="">
          <h1 className="my-4">Shipping Address</h1>
          <div className="">
            <InputBox
              className={"my-2"}
              label={"Address Line 1"}
              required={true}
              setter={setAddressLine1}
            />
            <InputBox label={"Address Line 2"} setter={setAddressLine2} />
          </div>
          <div className="w-full flex flex-row gap-2">
            <InputBox label={"City"} required={true} setter={setCity} />
            <InputBox label={"ZIPcode"} required={true} setter={setPincode} />
          </div>
        </div>
        <div className="my-8">
          <h1 className="my-4">Payment Method</h1>
          <div className="w-full flex flex-row gap-2">
            <div
              onClick={() => {
                setPaymentType("wallet");
              }}
              className="flex flex-row items-center gap-2"
            >
              <input
                type="radio"
                name="payment"
                id="wallet"
                value="wallet"
                checked={paymentType === "wallet"}
              />
              <label htmlFor="wallet">Wallet</label>
            </div>
            <div
              onClick={() => {
                setPaymentType("creditCard");
              }}
              className="flex flex-row items-center gap-2"
            >
              <input
                type="radio"
                name="payment"
                id="creditCard"
                value="creditCard"
                checked={paymentType === "creditCard"}
              />
              <label htmlFor="creditCard">Credit Card</label>
            </div>
          </div>
          {paymentType === "creditCard" && (
            <div className="w-full flex flex-col gap-2">
              <InputBox
                label={"Card Number"}
                required={true}
                setter={setCard}
              />
              <div className="grid grid-cols-2 gap-2">
                <InputBox
                  label={"CVV"}
                  required={true}
                  setter={setCvv}
                  className="col-span-1"
                />
                <div className="col-span-1">
                  <div className="flex gap-2">
                    <InputBox
                      label={"Expiry"}
                      required={true}
                      setter={setExpiryMonth}
                      placeholder="MM"
                    />
                    <InputBox
                      label={""}
                      required={true}
                      setter={setExpiryYear}
                      placeholder="YYYY"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex my-8 justify-center">
          {alert && <AlertMsg message={msg} />}
        </div>
        <div className="w-full my-8 flex justify-center">
          {loader ? (
            <ClipLoader loading={loader} />
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                confirmOrder();
              }}
              type="submit"
              className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Confirm Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
