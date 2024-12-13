import React, { useContext, useEffect } from "react";
import userTransactionAPI from "../../api/userTransactionAPI";
import NoDataFound from "../NoDataFound/NoDataFound";
import { Dialog, Skeleton } from "@mui/material";
import { creditAPI } from "../../api/creditAPI";
import { ChevronRight } from "@mui/icons-material";
import InputBox from "../InputBox/InputBox";
import { ClipLoader } from "react-spinners";
import AlertMsg from "../Alert/AlertMsg";
import { OrderAPI } from "../../api/paymentAPI";
import { toast } from "react-toastify";

export default function Orders({ profile }) {
  const [data, setData] = React.useState([]);
  const [paymentDialogueOpen, setPaymentDialogueOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [card, setCard] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [expiryMonth, setExpiryMonth] = React.useState("");
  const [expiryYear, setExpiryYear] = React.useState("");
  const [msg, setMsg] = React.useState(null);

  console.log(profile);

  const getTransactions = async () => {
    setLoading(true);
    try {
      const credit = await creditAPI.getCreditByUserId(profile._id);
      console.log(credit.data);
      const response = await userTransactionAPI.getTransactions();
      setLoading(false);
      if (response.data.error === false) {
        // console.log(response.data.data);
        setData(response.data.data);
      } else {
      }
    } catch (error) {
      setData([]);
    }
  };

  const confirmPayment = async () => {
    if (!card || !cvv || !expiryMonth || !expiryYear) {
      setMsg("All fields are required");
      setPaymentDialogueOpen(true);
      return;
    }
    let payment = {
      card,
      cvv,
      expiryMonth,
      expiryYear,
    };

    try {
      const response = await OrderAPI.payCreditDue(payment);
      if (response.data.error === false) {
        setPaymentDialogueOpen(false);
        toast.success(response.data.message);
        getTransactions();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <React.Fragment>
      <h1 className="my-4 text-2xl">My Wallet</h1>
      {loading ? (
        <div className="grid grid-cols-2 gap-2">
          <Skeleton
            variant="rounded"
            sx={{ width: "100%" }}
            height={90}
            animation="wave"
          />
          <Skeleton
            variant="rounded"
            sx={{ width: "100%" }}
            height={90}
            animation="wave"
          />
        </div>
      ) : profile === null ? (
        <NoDataFound TryingToFind={"Credit Balance"} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-2 bg-slate-200 border-slate-600 w-full rounded-xl place-self-center">
            <h1 className="text-lg">Wallet Balance</h1>
            <h1 className="sm:text-2xl text-xl">
              $
              {!isNaN(parseFloat(profile.walletBalance)) ||
              profile.walletBalance === null
                ? parseFloat(profile.walletBalance).toFixed(2)
                : 0}
            </h1>
          </div>
          <div className="border p-2 flex flex-row justify-between bg-slate-200 border-slate-600 w-full rounded-xl">
            <div>
              <h1 className="text-lg">Due Credit</h1>
              <h1 className="sm:text-2xl text-xl">
                $
                {!isNaN(parseFloat(profile.credit.credit))
                  ? parseFloat(profile.credit.credit).toFixed(2)
                  : 0}
              </h1>
            </div>
            <div>
              <button
                disabled={
                  profile.credit === null || profile.credit.credit === 0
                    ? true
                    : false
                }
                onClick={(e) => {
                  e.preventDefault();
                  setPaymentDialogueOpen(true);
                }}
                type="submit"
                className=" disabled:bg-slate-300 w-fit hover:text-[#ffe26e] bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg disabled:hover:text-black text-sm px-4 py-2.5 text-center"
              >
                {profile.credit === null || profile.credit.credit === 0
                  ? "No Due"
                  : "Repay"}
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={paymentDialogueOpen}>
        <div className="w-full flex flex-col gap-2 p-5">
          <InputBox label={"Card Number"} required={true} setter={setCard} />
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
          <div className="w-full my-2 flex justify-between">
            <button
              onClick={(e) => {
                e.preventDefault();
                setPaymentDialogueOpen(false);
              }}
              type="button"
              className="Registration-button w-fit text-black hover:text-white bg-white duration-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                confirmPayment();
              }}
              type="submit"
              className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
