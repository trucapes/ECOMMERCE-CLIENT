import React, { useEffect, useState } from "react";
import InputBox from "../InputBox/InputBox";
import { transactionAPI } from "../../api/admin/transactionAPI";
import AlertMsg from "../Alert/AlertMsg";
import { Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

function TransactionPopUp({
  id,
  isPopped,
  setIsPopped,
  userName,
  adminId,
  type,
  setBalance,
}) {
  let [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const performTransaction = async () => {
    if (type === "debit") {
      amount = "-" + amount;
    }
    console.log(amount, typeof amount);
    try {
      setLoader(true);
      const response = await transactionAPI.performTransaction({
        from: adminId,
        to: id,
        amount,
      });

      if (response.data.error === false) {
        {
          response.status === 201
            ? setMsg(response.data.message)
            : setMsg(response.data.message);
        }
      } else {
        setMsg("Internal Server Error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      setIsPopped(false);
      toast.success("Transaction Successfull");
    }
  };
  
  useEffect(() => {
    if (isPopped) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  if (!isPopped) return null;
  //   alert(id);
  return (
    <div className="absolute top-1/2 left-1/2 w-[500px] border border-r-slate-500 -translate-x-1/2 -translate-y-1/2 h-[400px] z-[100000000] bg-white rounded-lg shadow-lg p-8">
      <div className="relative w-full h-full">
        <div
          className="-top-7 -right-7 absolute cursor-pointer"
          onClick={() => {
            setIsPopped(false);
          }}
        >
          <Cancel />
        </div>
        <h1 className="text-center">Debit/Credit Balance</h1>
        <h2 className="text-start text-[14px] my-2">
          Processing Transaction for {userName}
        </h2>
        <div className="transaction-body-container py-4 ">
          <InputBox
            label={"Enter Amount"}
            required={true}
            id={"amount"}
            setter={setAmount}
            type={"number"}
            placeholder={"Enter Amount"}
          />
          <div className="w-full my-8 flex justify-center">
            {loader ? (
              <ClipLoader loading={loader} />
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  performTransaction();
                }}
                type="submit"
                className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Process Transaction
              </button>
            )}
          </div>
          {alert && (
            <div className="w-full flex justify-center">
              <AlertMsg message={msg} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionPopUp;
