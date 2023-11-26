import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { useSelector } from "react-redux";
const Directing = () => {
  const loggedin = useSelector((bigPie) => bigPie.authReducer.loggedIn);
  const navigate = useNavigate();
  //direct the user on open to diffrent route depends on whether he loggin alredy
  useEffect(() => {
    if (loggedin) {
      navigate(ROUTES.HOME);
    } else {
      navigate(ROUTES.CARDS);
    }
  }, []);
};
export default Directing;
