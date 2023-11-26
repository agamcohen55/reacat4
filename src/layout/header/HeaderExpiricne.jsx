import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import { useDispatch, useSelector } from "react-redux";
import links from "./Mylinks";
import { DarkActions } from "../../REDUX/DarkTheme";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import NavLinkComponent from "./NavLinkComponent";
import { authActions } from "../../REDUX/authSlice";
import { Button, Drawer } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import ErrorMessage from "../../tostifyHandeker/ErrorMessage";
import FilterComponent from "./serachcomponent/FilterComponent";
const { alwaysLinks, loggedinLinks, loggedoutLinks, adminType } = links;
function ResponsiveAppBar({ darkEnable }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((bigPie) => bigPie.authReducer);
  const loggedin = auth.loggedIn;
  const decodedToken = auth.userData;
  const userInfo = auth.userInfo;
  const handleChangetheme = () => {
    dispatch(DarkActions.changeState(!darkEnable));
    localStorage.setItem("theme", !darkEnable);
    localStorage.setItem(decodedToken, !darkEnable);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleLogOut = () => {
    setAnchorElUser(null);
    dispatch(authActions.logout());
    navigate("/cards");
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    if (!loggedin) {
      ErrorMessage("cannot open plese log in");
    } else {
      setAnchorElUser(event.currentTarget);
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor={"left"}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {loggedin &&
                loggedinLinks.map((myItem) => (
                  <NavLinkComponent to={myItem.to} key={myItem.to}>
                    {myItem.children}
                  </NavLinkComponent>
                ))}
              {!loggedin &&
                loggedoutLinks.map((myItem) => (
                  <NavLinkComponent to={myItem.to} key={myItem.to}>
                    {myItem.children}
                  </NavLinkComponent>
                ))}
              {alwaysLinks.map((myItem) => (
                <NavLinkComponent to={myItem.to} key={myItem.to}>
                  {myItem.children}
                </NavLinkComponent>
              ))}
            </Drawer>
          </Box>
          {!darkEnable && <NightlightIcon onClick={handleChangetheme} />}
          {darkEnable && <LightModeIcon onClick={handleChangetheme} />}
          <FilterComponent />
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {loggedin &&
              loggedinLinks.map((myItem) => (
                <NavLinkComponent to={myItem.to} key={myItem.to}>
                  {myItem.children}
                </NavLinkComponent>
              ))}
            {!loggedin &&
              loggedoutLinks.map((myItem) => (
                <NavLinkComponent to={myItem.to} key={myItem.to}>
                  {myItem.children}
                </NavLinkComponent>
              ))}
            {alwaysLinks.map((myItem) => (
              <NavLinkComponent to={myItem.to} key={myItem.to}>
                {myItem.children}
              </NavLinkComponent>
            ))}
            {userInfo &&
              userInfo.isAdmin &&
              adminType.map((myItem) => (
                <NavLinkComponent to={myItem.to} key={myItem.to}>
                  {myItem.children}
                </NavLinkComponent>
              ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
               
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ flexDirection: "column", display: "flex" }}>
                {" "}
                <Button onClick={handleCloseUserMenu}>
                  <NavLinkComponent to={`/profile/${decodedToken}`}>
                    profile
                  </NavLinkComponent>
                </Button>
                <Button onClick={handleLogOut}>logout</Button>
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default React.memo(ResponsiveAppBar);
