import { toast } from "react-toastify";
//toast an error message with the error that calld the function
const ErrorMessage = (err) => {
  const themeFromLocal = localStorage.getItem("theme");
  const checked = themeFromLocal === "true";
  const theme = !checked ? "light" : "dark";
  toast.error(`${err}`, {
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

export default ErrorMessage;
