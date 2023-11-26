import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { validateLogin } from "../../validation/loginValidation";
import { Alert } from "@mui/material";
import useAutoLogin from "../../hooks/useAutoLogin";
import { storeToken } from "../../service/tokenservice";
import ErrorMessage from "../../tostifyHandeker/ErrorMessage";
import SuccessMessage from "../../tostifyHandeker/SuccessMessage";
import ROUTES from "../../routes/ROUTES";
import NavLinkComponent from "../../layout/header/NavLinkComponent";

const LoginPage = () => {
  const [secondtrychance, setSeconrychance] = useState(false);

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorsState, setErrorsState] = useState("");
  const [rememberMe, setRemember] = useState(false);
  const login = useAutoLogin();
  const wanstToRemember = () => {
    setRemember(!rememberMe);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const joiResponse = validateLogin({
        email: emailValue,
        password: passwordValue,
      });
      setErrorsState(joiResponse);
      if (joiResponse) return;
      let { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      storeToken(data, rememberMe);
      await login();
      SuccessMessage("log in successfully!");
      //check the inputs to make sore they are valid
      //if the input invaild then the ui change to disply the message
      // when the login was successfull check whether he want to save
      //to stay login or just in the session
      //finaly run the login function to dispath the user data and toast a meesage
    } catch (err) {
      ErrorMessage(err.response.data);
      //handle the submit error and toast the message
    }
  };
  const handleEmailInputChange = (e) => {
    setEmailValue(e.target.value);
    if (secondtrychance) {
      //when its his second try and we gave him the warning then
      //alert him if its still an error or if its not
      const joiResponse = validateLogin({
        email: e.target.value,
        password: passwordValue,
      });
      setErrorsState(joiResponse);
    }
  };
  const handlePasswordInputChange = (e) => {
    setPasswordValue(e.target.value);
    const joiResponse = validateLogin({
      email: emailValue,
      password: e.target.value,
    });
    setSeconrychance(true);
    setErrorsState(joiResponse);
  };
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={emailValue}
              onChange={handleEmailInputChange}
            />
            {errorsState && errorsState.email && (
              <Alert severity="warning">{errorsState.email}</Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={passwordValue}
              onChange={handlePasswordInputChange}
            />
            {errorsState && errorsState.password && (
              <Alert severity="warning">{errorsState.password}</Alert>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              checked={rememberMe}
              onChange={wanstToRemember}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              disabled={errorsState !== null}
              //
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Button variant="contained" fullWidth>
                <NavLinkComponent to={ROUTES.REGISTER}>
                  Don't have an account? Sign Up
                </NavLinkComponent>
              </Button>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
