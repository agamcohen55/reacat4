import LayoutComponent from "./layout/LayoutComponent";
import { ToastContainer, toast } from "react-toastify";
import Router from "./routes/Router";
import { useEffect, useState } from "react";
import useAutoLogin from "./hooks/useAutoLogin";
import { CircularProgress } from "@mui/material";
import { getToken } from "./service/tokenservice";
import ErrorMessage from "./tostifyHandeker/ErrorMessage";
import SuccessMessage from "./tostifyHandeker/SuccessMessage";

const App = () => {
  const login = useAutoLogin();
  const [userData, setUserData] = useState(null);
  const tokenObj = getToken();
  const [done, setDone] = useState(false);
  const [welcomeShown, setWelcomeShown] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const userdata = await login();
        if (userdata != null) {
          if (!userdata.authorized) {
            ErrorMessage(userdata.err);
          } else {
            setUserData(userdata);
            if (tokenObj.local && !welcomeShown) {
              SuccessMessage(`welcome back ${userdata.name}`);
              setWelcomeShown(true); // Ensure the message is only shown once
            }
          }
        }
      } catch (err) {
        ErrorMessage(err);
      } finally {
        setDone(true);
      }
    })();
  }, [welcomeShown, tokenObj.local]); // Add dependencies here

  return (
    <div className="App">
      <LayoutComponent>
        <ToastContainer />
        {done ? <Router userData={userData} /> : <CircularProgress />}
      </LayoutComponent>
    </div>
  );
};

export default App;
