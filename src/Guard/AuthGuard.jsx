import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import WarningMessage from "../tostifyHandeker/WarningMessage";

const AuthGuard = ({ children }) => {
  const loggedin = useSelector((bigPie) => bigPie.authReducer.loggedIn);
  const location = useLocation();
  // console.log(loggedin);
  // redircet the user on access page he should not enter and saving to original path
  //so when they will login direct tehm to the original path
  if (loggedin) {
    return children;
  } else {
    WarningMessage("you need to log in to access this page");
    return (
      <Navigate
        to={ROUTES.LOGIN}
        state={{ redirect: location.pathname }}
        replace={true}
      />
    );
  }
};
export default AuthGuard;
