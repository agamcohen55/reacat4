import { toast } from "react-toastify";
//toast an warning message with the warning that calld the function

const WarningMessage = (message) => {
  const themeFromLocal = localStorage.getItem("theme");
  const checked = themeFromLocal === "true";
  const theme = !checked ? "light" : "dark";
  toast.warning(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: theme,
  });
};

export default WarningMessage;
