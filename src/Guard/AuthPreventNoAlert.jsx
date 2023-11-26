import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const AuthPreventNoAlert = ({ children }) => {
  const loggedin = useSelector((bigPie) => bigPie.authReducer.loggedIn);
  const redirect = useLocation().state?.redirect;
  //check if he got to the login page by redircting by the system
  //when he perform log in the system will direct him to the orginal path or the home page
  //if he alrady logged in redirct him to chidren regardless
  //no alert so when he log in he dosent get the message that he dosent belong here...
  // console.log(redirect);
  if (!loggedin) {
    return children;
  } else {
    if (redirect) {
      return <Navigate to={redirect} />;
    } else {
      return <Navigate to={ROUTES.HOME} />;
    }
  }
};
export default AuthPreventNoAlert;
