import { toast } from "react-toastify";
//toast an success message with the success that calld the function

const SuccessMessage = (message) => {
  const themeFromLocal = localStorage.getItem("theme");
  const checked = themeFromLocal === "true";
  const theme = !checked ? "light" : "dark";
  toast.success(message, {
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

export default SuccessMessage;
