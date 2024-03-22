import React, { useContext, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import userTransactionAPI from "../../api/userTransactionAPI";
import NoDataFound from "../NoDataFound/NoDataFound";
import { Skeleton } from "@mui/material";
import { userDataContext } from "../../Context/UserDataContext";
import { creditAPI } from "../../api/creditAPI";
import { ChevronRight } from "@mui/icons-material";

// Generate Order Data

function DateToString(date) {
  const d = new Date(date);
  // console.log(date);
  const performedOn =
    d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  return performedOn;
}

export default function Orders({ profile }) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
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
      ) : data.length === 0 ? (
        <NoDataFound TryingToFind={"Transactions"} />
      ) : (
        <div className="w-full flex flex-row gap-2 justify-between">
          <div className="border p-2 bg-slate-200 border-slate-600 w-full rounded-xl ">
            <h1 className="text-lg">Wallet Balance</h1>
            <h1 className="sm:text-2xl text-xl">
              ${parseFloat(profile.walletBalance).toFixed(2)}
            </h1>
          </div>
          <div className="border p-2 flex flex-row justify-between bg-slate-200 border-slate-600 w-full rounded-xl">
            <div>
              <h1 className="text-lg">Due Credit</h1>
              <h1 className="sm:text-2xl text-xl">
                $
                {profile.credit !== null
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
                }}
                type="submit"
                className=" disabled:bg-slate-300 w-fit hover:text-[#ffe26e] bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg disabled:hover:text-black text-sm px-4 py-2.5 text-center"
              >
                Repay
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
