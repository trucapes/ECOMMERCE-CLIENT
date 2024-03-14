import React, { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import {
  Button,
  MenuItem,
  Select,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from "@mui/material";
import {
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext,
  Visibility,
  CheckCircleOutline,
  DeleteOutline,
  Close,
  LocalAtm,
  AddCircle,
  RemoveCircle,
} from "@mui/icons-material";
import AdminUserAPI from "../api/admin/adminUserAPI";
import Modal from "@mui/material/Modal";
import MyAccount from "../components/Account/MyAccount/MyAccount";
import { toast } from "react-toastify";
import TransactionPopUp from "../components/TransactionPopUp/TransactionPopUp";
import NoDataFound from "../components/NoDataFound/NoDataFound";

const AdminUsers = ({ profile }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("createdAt"); // Default sorting by createdAt
  const [userRole, setUserRole] = useState("all"); // Default no filter for userRole
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [popUp, setPopUp] = useState(false);
  const [userForTransaction, setUserForTransaction] = useState(null);
  const [userName, setUserName] = useState("");
  const [transactionType, setTransactionType] = useState("");

  console.log(profile);

  useEffect(() => {
    fetchData();
  }, [search, page, sortBy, userRole, popUp]);

  const fetchData = async () => {
    try {
      setLoading(true);
      var filter = {};

      if (search) {
        filter.search = search;
      }
      if (userRole && userRole !== "all") {
        filter.userRole = userRole;
      }

      if (page) {
        filter.page = page;
      }

      if (sortBy) {
        filter.sortBy = sortBy;
      }
      const response = await AdminUserAPI.getAllUsers(filter);
      setUsers(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error.response.data.message);
      setLoading(false);
    }
  };

  function handleTransactions(id, name, type) {
    setTransactionType(type);
    setUserForTransaction(id);
    setUserName(name);
    setPopUp(true);
  }

  // const handlePageChange = (newPage) => {
  //   setPage(newPage);
  // };

  const handleFirstPage = () => {
    setPage(1);
  };

  const handleLastPage = () => {
    setPage(totalPages);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  console.log(users);

  return (
    <div className="p-2 w-full">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="text-3xl mt-4 mb-4 text-gray-900">Payments</h1>
        {users && users.length > 0 && (
          <div className=" flex flex-row items-stretch justify-center">
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search in Users"
              className="bg-gray-50 border outline-none text-gray-900 rounded-l-lg focus:border-[#ffe26e] block w-full px-3"
            />
            <div className="w-fit flex justify-start">
              <button
                type="submit"
                className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-r-lg text-sm px-4 py-2.5 text-center"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>
      {users && users.length > 0 && (
        <div className="flex flex-row items-center justify-between mt-4">
          <div>
            <Select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="mr-4"
            >
              <MenuItem value="all">All Roles</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="distributor">Distributor</MenuItem>
              <MenuItem value="dealer">Dealer</MenuItem>
              <MenuItem value="contractor">Contractor</MenuItem>
            </Select>
          </div>
          <div>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="createdAt">Sort by Date</MenuItem>
              <MenuItem value="firstName">Sort by First Name</MenuItem>
              <MenuItem value="lastName">Sort by Last Name</MenuItem>
            </Select>
          </div>
        </div>
      )}
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
      ) : users && users.length === 0 ? (
        <NoDataFound TryingToFind={"Users"} />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>User Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                  <TableCell>{user.country}</TableCell>
                  <TableCell>{`$${parseFloat(user.wallet.balance).toFixed(
                    2
                  )}`}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {user.userRole}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        handleTransactions(user._id, user.firstName, "credit")
                      }
                    >
                      <AddCircle />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleTransactions(user._id, user.firstName, "debit")
                      }
                    >
                      <RemoveCircle />
                    </IconButton>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      type="submit"
                      className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg text-sm px-4 py-2.5 text-center"
                    >
                      Request Repayment
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {totalPages > 0 && (
        <div className="flex justify-center mt-4">
          <Button
            variant="outlined"
            color="info"
            onClick={handleFirstPage}
            startIcon={<FirstPage />}
          ></Button>
          <Button
            variant="outlined"
            color="info"
            onClick={handlePrevPage}
            startIcon={<NavigateBefore />}
          ></Button>
          <div style={{ width: "20px" }} />
          Page {page} of {totalPages}
          <div style={{ width: "20px" }} />
          <Button
            variant="outlined"
            color="info"
            onClick={handleNextPage}
            endIcon={<NavigateNext />}
          ></Button>
          <Button
            variant="outlined"
            color="info"
            onClick={handleLastPage}
            endIcon={<LastPage />}
          ></Button>
        </div>
      )}

      <Modal open={openModal} onClose={handleCloseModal}>
        <div style={{ background: "#fff", height: "100vh", overflowY: "auto" }}>
          <IconButton
            style={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={handleCloseModal}
          >
            <Close color="error" />
          </IconButton>
          {selectedUser && <MyAccount user={selectedUser} isAdmin={true} />}
        </div>
      </Modal>
      <TransactionPopUp
        id={userForTransaction}
        setIsPopped={setPopUp}
        userName={userName}
        isPopped={popUp}
        adminId={profile}
        type={transactionType}
      />
    </div>
  );
};

export default AdminUsers;
