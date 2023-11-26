import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { useSelector } from "react-redux";
import WarningMessage from "../tostifyHandeker/WarningMessage";
const PageNotFound = () => {
  const loggedin = useSelector((bigPie) => bigPie.authReducer.loggedIn);
  const navigate = useNavigate();
  // redircet the user on ending in a lost page to diffrent route depends on whether he logg in the system
  useEffect(() => {
    WarningMessage("Page Not Found redirecting...");
    if (loggedin) {
      navigate(ROUTES.HOME);
    } else {
      navigate(ROUTES.CARDS);
    }
  }, []);
  return <Typography variant="h1">Page Not Found redirecting...</Typography>;
};
export default PageNotFound;
