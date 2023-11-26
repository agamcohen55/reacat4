import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios, { Axios } from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Copyright, Done } from "@mui/icons-material";
import { normalizUpdatUser } from "../NormaliezedDate/normalizUpdatUser";
import { Switch } from "@mui/material";
import { useSelector } from "react-redux";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import SuccessMessage from "../tostifyHandeker/SuccessMessage";
import ErrorMessage from "../tostifyHandeker/ErrorMessage";

const defaultTheme = createTheme();

const ProfileEdit = () => {
  const checked = useSelector((bigPie) => bigPie.DarkReducer);
  const theme = !checked ? "light" : "dark";
  // const [userDate, setDataFromServer] = useState(null);
  const userinfo = useSelector((bigPie) => bigPie.authReducer.userInfo);
  const [userDate, setuserDate] = useState(userinfo);
  const [business, setbusiness] = useState(null);
  const [done, setDone] = useState(false);
  const [disableEdit, setdisableEdit] = useState(true);
  const [disableSubmit, setdisableSubmit] = useState(true);

  let { userId } = useParams();
  const navigate = useNavigate();
  const [inputsValue, setInputsValue] = useState({
    firstName: userDate.name.first,
    lastName: userDate.name.last,
    email: userDate.email,
    phone: userDate.phone,
    country: userDate.address.country,
    city: userDate.address.city,
    street: userDate.address.street,
  });
  useEffect(() => {
    if (userinfo.isAdmin) {
      //check if he is admin and if so get the user he wants to edit and inform him he can edit
      axios
        .get(`/users/${userId}`)
        .then(function (response) {
          console.log(response.data);
          setuserDate(response.data);
          setInputsValue({
            firstName: response.data.name.first,
            lastName: response.data.name.last,
            email: response.data.email,
            phone: response.data.phone,
            country: response.data.address.country,
            city: response.data.address.city,
            street: response.data.address.street,
          });
          SuccessMessage(`you can edit ${response.data.name.first}'s profile`);
          setDone(true);
        })
        .catch((err) => {
          //catch an server error
          ErrorMessage(err.response.data);
        });
    } else {
      setDone(true);
    }
  }, []);

  const isBusinessCange = () => {
    setbusiness(!business);
  };
  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
    if (e.target.id == "password") {
      setdisableSubmit(false);
    }
  };
  const handleWantToEdit = () => {
    setdisableEdit(false);
    setbusiness(userDate.isBusiness || false);
    setInputsValue({
      firstName: userDate.name.first,
      lastName: userDate.name.last,
      email: userDate.email,
      phone: userDate.phone,
      country: userDate.address.country,
      city: userDate.address.city,
      street: userDate.address.street,
      password: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //when he hit submit then send the udape and th non update to a normalize data strucutre
    //then send it to server and toast a message indicat if it succeed
    const request = normalizUpdatUser(inputsValue, userDate, business);
    axios
      .put(`/users/${userDate._id}`, request)
      .then(function (response) {
        SuccessMessage("edit succseed");
        navigate(ROUTES.HOME);
      })
      .catch(function (error) {
        ErrorMessage(error.response.data);
      });
  };

  if (userDate && done) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            information of {inputsValue.firstName}{" "}
            {disableEdit && (
              <Button onClick={handleWantToEdit}>edit user</Button>
            )}
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={4}>
              {Object.keys(inputsValue).map((key) => (
                <Grid container item spacing={2} key={key}>
                  <TextField
                    disabled={disableEdit}
                    fullWidth
                    id={key}
                    type={key}
                    label={key}
                    value={inputsValue[key]}
                    onChange={handleInputsChange}
                  />
                </Grid>
              ))}
              {!disableEdit && (
                <>
                  <Grid
                    container
                    item
                    spacing={2}
                    sx={{ justifyContent: "center" }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        alignSelf: "center",
                        justifyContent: "center",
                      }}
                    >
                      is this a business account?
                    </Typography>
                    <Switch checked={business} onChange={isBusinessCange} />
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    disabled={disableSubmit}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    upadate information
                  </Button>
                </>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  } else {
    return <Typography variant="h1">you did log out</Typography>;
  }
};

export default ProfileEdit;
