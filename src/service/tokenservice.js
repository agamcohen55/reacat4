const TOKEN = "token";
const storeToken = (token, rememberMe) => {
  //clean the storage from initial token to avoid broken token or duplicate and etc
  //save the token in localstorage or sessionstorage depends on the remember me
  localStorage.removeItem("token", "");
  sessionStorage.removeItem("token", "");
  if (rememberMe)
    try {
      localStorage.setItem(TOKEN, token);
    } catch (error) {
      console.error("Error setting localStorage", error);
    }
  else {
    sessionStorage.setItem(TOKEN, token);
  }
};
const isTokenInLocalStorage = () => {
  return !!localStorage.getItem(TOKEN);
};
const getToken = () => {
  //checks for TOKEN in the storage
  //if in local then detect whether or not he wanted to be remamber
  //return the token and if he wanted to be saved on local
  if (isTokenInLocalStorage()) {
    const local = true;
    return { token: localStorage.getItem(TOKEN), local };
  } else {
    const local = false;
    return { token: sessionStorage.getItem(TOKEN), local };
  }
};
export { getToken, storeToken };
