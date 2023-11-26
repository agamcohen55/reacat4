import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    userData: undefined,
    userInfo: undefined,
  },
  reducers: {
    //collection of functions to setState
    login(state, action) {
      //when called turn loogin falg to true
      //save the user token
      //save the user info
      state.loggedIn = true;
      state.userData = action.payload.dataFromToken._id;
      state.userInfo = action.payload.userInfo;
    },
    logout(state) {
      //perform logout
      //set the loggedin flag to false
      //clear the state from any data and remove the token from the storage
      state.loggedIn = false;
      state.userData = "";
      state.userId = "";
      // state.userName = "";
      state.userInfo = "";
      localStorage.removeItem("token", "");
      sessionStorage.removeItem("token", "");
    },
  },
});

//export the set functions for the components to make use of the actions
export const authActions = authSlice.actions;

//in reducer we have all the necessary data to connect with the big pie
export default authSlice.reducer;
