import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import userTransactionAPI from "../../api/userTransactionAPI";

// Generate Order Data

export default function Orders() {
  const [data, setData] = React.useState([]);

  const getTransactions = async () => {
    try {
      const response = await userTransactionAPI.getTransactions();

      if (response.data.error === false) {
        setData(response.data.data);
      } else {
      }
    } catch (error) {
      setData([]);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [data]);

  return (
    <React.Fragment>
      <h1>Your Transactions</h1>
      {data.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          You don't have any transactions
        </div>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Remaining</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.performedOn}</TableCell>
                <TableCell align="right">{`$${row.amount}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
}
