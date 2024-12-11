import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  styled,
  Grid,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { LockResetRounded } from "@mui/icons-material";
import ResetPasswordPopup from "../../Card/RegisterCard/ResetPasswordPopup";
import authAPI from "../../../api/auth";
import profileAPI from "../../../api/profileAPI";
import { toast } from "react-toastify";

const Container = styled("div")({
  marginTop: "20px",
});

const EditButton = styled(IconButton)({
  marginRight: "10px",
  float: "right",
});

const StyledTableCell = styled(TableCell)({
  padding: "8px",
  width: "25%", // Adjusted width for table cells
});

const StyledTextField = styled(TextField)({
  width: "100%", // Full-width input fields
});

const BasicInfoTab = ({ userData, isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const [openResetPasswordPopup, setOpenResetPasswordPopup] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    // Handle save action
    // console.log("Saved!");
    const response = await profileAPI.updateProfile({
      firstName: editedData.firstName,
      email: editedData.email,
      lastName: editedData.lastName,
      mobileNo: editedData.mobileNo,
      country: editedData.country,
      city: editedData.city,
      company: editedData.company,
      companyWebsite: editedData.companyWebsite,
      companyAddress: editedData.companyAddress,
    });

    toast.success(response.data.message);
    setIsEditing(false);

    window.location.reload();
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedData(userData); // Reset edited data to original data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container>
      {!isAdmin && (
        <Grid container justifyContent="flex-end">
          <Grid item>
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveClick}
                >
                  Save
                </Button>
                <Button color="secondary" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Tooltip title="Edit user information">
                  <EditButton
                    aria-label="edit"
                    color="primary"
                    onClick={handleEditClick}
                  >
                    <EditIcon />
                  </EditButton>
                </Tooltip>
                <Tooltip title="Reset password">
                  <IconButton
                    aria-label="reset password"
                    onClick={() => setOpenResetPasswordPopup(true)}
                  >
                    <LockResetRounded color="primary" />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Grid>
        </Grid>
      )}
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <StyledTableCell>First Name:</StyledTableCell>
              <TableCell>
                {isEditing ? (
                  <StyledTextField
                    name="firstName"
                    value={editedData.firstName}
                    onChange={handleInputChange}
                  />
                ) : (
                  userData.firstName
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Last Name:</StyledTableCell>
              <TableCell>
                {isEditing ? (
                  <StyledTextField
                    name="lastName"
                    value={editedData.lastName}
                    onChange={handleInputChange}
                  />
                ) : (
                  userData.lastName
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Email:</StyledTableCell>
              <TableCell>
                {isEditing ? (
                  <StyledTextField
                    name="email"
                    value={editedData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  userData.email
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Mobile Number:</StyledTableCell>
              <TableCell>
                {isEditing ? (
                  <StyledTextField
                    name="mobileNo"
                    value={editedData.mobileNo}
                    onChange={handleInputChange}
                  />
                ) : (
                  userData.mobileNo
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Wallet Balance:</StyledTableCell>
              <TableCell>{`$${
                userData.walletBalance
                  ? parseFloat(userData.walletBalance).toFixed(2)
                  : 0
              }`}</TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Country:</StyledTableCell>
              <TableCell>
                {isEditing ? (
                  <StyledTextField
                    name="country"
                    value={editedData.country}
                    onChange={handleInputChange}
                  />
                ) : (
                  userData.country
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>City:</StyledTableCell>
              <TableCell>
                {isEditing ? (
                  <StyledTextField
                    name="city"
                    value={editedData.city}
                    onChange={handleInputChange}
                  />
                ) : (
                  userData.city
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Company:</StyledTableCell>
              <TableCell>
                {isEditing ? (
                  <StyledTextField
                    name="company"
                    value={editedData.company}
                    onChange={handleInputChange}
                  />
                ) : (
                  userData.company
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Company Website:</StyledTableCell>
              <TableCell>
                {isEditing ? (
                  <StyledTextField
                    name="companyWebsite"
                    value={editedData.companyWebsite}
                    onChange={handleInputChange}
                  />
                ) : (
                  userData.companyWebsite
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Company Address:</StyledTableCell>
              <TableCell>
                {isEditing ? (
                  <StyledTextField
                    name="companyAddress"
                    value={editedData.companyAddress}
                    onChange={handleInputChange}
                  />
                ) : (
                  userData.companyAddress
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ResetPasswordPopup
        isOpen={openResetPasswordPopup}
        setIsOpen={setOpenResetPasswordPopup}
        email={userData.email}
      />
    </Container>
  );
};

export default BasicInfoTab;
