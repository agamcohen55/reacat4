import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import WarningMessage from "../tostifyHandeker/WarningMessage";

const AuthPrevent = ({ children }) => {
  const loggedin = useSelector((bigPie) => bigPie.authReducer.loggedIn);
  //if the user loggedin he cant use this page so direct him
  if (!loggedin) {
    return children;
  } else {
    WarningMessage(`you alreday logged in`);
    return <Navigate to={ROUTES.HOME} replace={true} />;
  }
};
export default AuthPrevent;
