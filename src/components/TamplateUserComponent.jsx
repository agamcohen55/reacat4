import {
  IconButton,
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  Box,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const TamplateUserComponent = ({
  firstName,
  lastName,
  email,
  id,
  onDeleteuser,
  onEdituser,
}) => {
  // console.log(canDelete);
  const [deleteUser, setDeletedUser] = useState(false);
  const loggedin = useSelector((bigPie) => bigPie.authReducer.loggedIn);
  const handleDeleteUser = () => {
    //send the father the id of the user
    //set delete to true which will stop it from rendering
    setDeletedUser(true);
    onDeleteuser(id);
  };
  const handleEditUser = () => {
    //send the father id of the user
    onEdituser(id);
  };

  if (!deleteUser) {
    return (
      <Card
        sx={
          {
            // boxShadow: "2px 2px 5px",
            // border: "3px solid grey",
            // borderRadius: "8px",
          }
        }
      >
        <CardActionArea>
          <CardHeader
            title={firstName}
            subheader={lastName}
            sx={{
              backgroundColor: "grey",
              color: "black",
              textAlign: "center",
            }}
            // onClick={handleEditCardClick}
          />
          <CardContent
            sx={{
              backgroundColor: "lightgrey",
              color: "black",
              textAlign: "center",
            }}
          >
            {email}
          </CardContent>
        </CardActionArea>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Edit user">
            <IconButton onClick={handleEditUser} aria-label="do staff">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete user">
            <IconButton onClick={handleDeleteUser} aria-label="do staff">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Card>
    );
  }
};

TamplateUserComponent.propTypes = {
  // firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onEdituser: PropTypes.func.isRequired,
  onDeleteuser: PropTypes.func.isRequired,
};
export default memo(TamplateUserComponent);
