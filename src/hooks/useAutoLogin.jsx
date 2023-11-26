import axios from "axios";
import { jwtDecode } from "jwt-decode";


import { useDispatch } from "react-redux";
import { authActions } from "../REDUX/authSlice";
import { getToken } from "../service/tokenservice";

const useAutoLogin = () => {
  const dispatch = useDispatch();
  return async (skipTokenTest = false) => {
    try {
      const tokenoOBj = getToken();
      if (!tokenoOBj.token) return null; // if no token dont even run the function and return null
      const dataFromToken = jwtDecode(tokenoOBj.token);
      if (!skipTokenTest) {
        try {
          const response = await axios.get(`/users/${dataFromToken._id}`);
          dispatch(
            authActions.login({
              dataFromToken: dataFromToken,
              userInfo: response.data,
            })
          );
          // when log in successfully run this block
          // return the data of the user
          return { name: response.data.name.first, authorized: true };
        } catch (err) {
          // when log in failed run this block
          //ade send the resulte
          return { err: err.message, authorized: false };
        }
      }
    } catch (err) {
      // when there was error unrelated to the server like invailed token
      return { err: "token decode faild plese log in", authorized: false };
    }
    return null;
  };
};

export default useAutoLogin;
