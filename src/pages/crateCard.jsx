import React from "react";
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
import { Navigate, useNavigate } from "react-router-dom";
import { Copyright } from "@mui/icons-material";
import {
  normalizCratCard,
  normalizCrateCard,
} from "../NormaliezedDate/normalizCrateCard";
import { validateCrateCard } from "../validation/crateCardValidate";
import { Alert } from "@mui/material";
const defaultTheme = createTheme();

const CrateCard = () => {
  const [errorsState, setErrorsState] = useState("");
  const [secondtrychance, setSeconrychance] = useState(false);

  const required = [
    "title",
    "subtitle",
    "description",
    "email",
    "phone",
    "country",
    "city",
    "street",
    "housenumber",
  ];
  const [inputsValue, setInputsValue] = useState({
    title: "",
    subtitle: "",
    description: "",
    email: "",
    web: "",
    url: "",
    alt: "",
    phone: "",
    state: "",
    country: "",
    city: "",
    street: "",
    housenumber: "",
    zip: "",
  });
  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
    const updatedInputs = {
      ...inputsValue,
      [e.target.id]: e.target.value,
    };
    if (secondtrychance) {
      //when its his second try and we gave him the warning then
      //alert him if its still an error or if its not
      const joiResponse = validateCrateCard(updatedInputs);
      setErrorsState(joiResponse);
    }
    if (e.target.id === "housenumber") {
      //check if its the lest input and want to regisert
      //sende the inpunts to the joi validate
      //if error from joi then set them and trigerr a alert for each input
      //if the joi dosent have value it empty so let the user hit submit
      const joiResponse = validateCrateCard(updatedInputs);
      console.log(joiResponse);
      setErrorsState(joiResponse);
      setSeconrychance(true);
    }
  };
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    //get the data and normalize it to the server
    event.preventDefault();
    const data = normalizCrateCard(inputsValue);

    console.log("data", data);
    const req = axios
      .post("/cards", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          crate card
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ width: "100%" }}
        >
          <Grid container spacing={4} sx={{ mt: "1em" }}>
            <Grid item xs={6}>
              {Object.keys(inputsValue)
                .slice(0, Math.ceil(Object.keys(inputsValue).length / 2))
                .map((key) => (
                  <Grid container spacing={2} key={key} sx={{ mb: "1.8em" }}>
                    <TextField
                      fullWidth
                      autoFocus={key == "title" ? true : false}
                      id={key}
                      label={key}
                      value={inputsValue[key]}
                      onChange={handleInputsChange}
                      required={required.includes(key)}
                    />
                    {errorsState && errorsState[key] && (
                      <Alert severity="warning">{errorsState[key]}</Alert>
                    )}
                  </Grid>
                ))}
            </Grid>
            <Grid item xs={6}>
              {Object.keys(inputsValue)
                .slice(Math.ceil(Object.keys(inputsValue).length / 2))
                .map((key) => (
                  <Grid container spacing={2} key={key} sx={{ mb: "1.8em" }}>
                    <TextField
                      autoFocus={key == "title" ? true : false}
                      fullWidth
                      id={key}
                      label={key}
                      value={inputsValue[key]}
                      onChange={handleInputsChange}
                      required={required.includes(key)}
                    />
                    {errorsState && errorsState[key] && (
                      <Alert severity="warning">{errorsState[key]}</Alert>
                    )}
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
            disabled={errorsState !== null}
          >
            create card
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CrateCard;
