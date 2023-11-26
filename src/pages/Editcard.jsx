import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios, { Axios } from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import SuccessMessage from "../tostifyHandeker/SuccessMessage";
import WarningMessage from "../tostifyHandeker/WarningMessage";
import ErrorMessage from "../tostifyHandeker/ErrorMessage";
import ROUTES from "../routes/ROUTES";
import { normalizUpdatCard } from "../NormaliezedDate/normalizUpdatCard";

const Editcard = () => {
  const user_id = useSelector((bigpie) => bigpie.authReducer.userData);
  const user_info = useSelector((bigpie) => bigpie.authReducer.userInfo
  );
  const [canEdit, setcanEdit] = useState(false);
  const [inputsValue, setInputsValue] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    url: "",
  });
  const [oldValues, setOldValues] = useState("");
  // console.log(user_id);
  let { cardId } = useParams();
  // console.log(cardId);
  useEffect(() => {
    axios
      .get(`/cards/${cardId}`)
      .then(function (response) {
        // console.log(response);
        setInputsValue({
          title: response.data.title,
          subtitle: response.data.subtitle,
          description: response.data.description,
          phone: response.data.phone,
          url: response.data.image.url,
          country: response.data.address.country,
        });
        setOldValues({
          email: response.data.email,
          city: response.data.address.city,
          street: response.data.address.street,
          houseNumber: response.data.address.houseNumber,
        });
        // check if he is the crator or admin
        //if he one of them so a message then procced
        //if not show him the card but block the inputs and show him a message
        //that indicate that he isnt the cretor cause if he was admin he shoulnt see any warning at all
        if (response.data.user_id == user_id||user_info.isAdmin) {
          setcanEdit(true);
          SuccessMessage(`you can now edit!`);
        } else {
          WarningMessage("you are NOT the creator");
        }
      })
      .catch((err) => {
        //server error cant get the cards details
        ErrorMessage(err)
      });
  }, []);

  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    //normalikze data and send it to the server
   const dataToSend = normalizUpdatCard(inputsValue,oldValues)
    console.log(dataToSend);
     axios
      .put(`/cards/${cardId}`, dataToSend)
      .then(function (response) {
        //change sucssfull
SuccessMessage("edit success!")
navigate(ROUTES.HOME)
      })
      .catch(function (error) {
        //server error cant change the cards details
        ErrorMessage(error.response.data)      });
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            // marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            update card
          </Typography>
        </Box>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {" "}
          <Grid container spacing={4}>
            {Object.keys(inputsValue).map((key) => (
              <Grid container item spacing={2} key={key}>
                <TextField
                  disabled={!canEdit}
                  fullWidth
                  id={key}
                  label={key}
                  value={inputsValue[key]}
                  onChange={handleInputsChange}
                />
              </Grid>
            ))}

            {canEdit && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                update card
              </Button>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Editcard;
