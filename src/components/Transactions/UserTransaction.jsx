import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import userTransactionAPI from "../../api/userTransactionAPI";
import NoDataFound from "../NoDataFound/NoDataFound";
import { Skeleton } from "@mui/material";

// Generate Order Data

function DateToString(date) {
  const d = new Date(date);
  // console.log(date);
  const performedOn =
    d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  return performedOn;
}

export default function Orders() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getTransactions = async () => {
    setLoading(true);
    try {
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
      <h1 className="my-4 text-2xl">My Transactions</h1>
      {loading ? (
        <>
          <Skeleton variant="rectangular" height={40} animation="wave" />
          <br />
          <Skeleton variant="rectangular" height={40} animation="wave" />
          <br />
          <Skeleton variant="rectangular" height={40} animation="wave" />
          <br />
          <Skeleton variant="rectangular" height={40} animation="wave" />
          <br />
          <Skeleton variant="rectangular" height={40} animation="wave" />
        </>
      ) : data.length === 0 ? (
        <NoDataFound TryingToFind={"Transactions"} />
      ) : (
        <Table size="small" sx={{ overflow: "scroll", width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Remaining</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row._id}</TableCell>
                <TableCell
                  sx={{
                    color: row.amount > 0 ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {parseFloat(row.amount).toFixed(2)}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{DateToString(row.createdAt)}</TableCell>
                <TableCell align="right">{`$${parseFloat(
                  row.balanceRemaining
                ).toFixed(2)}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
}
