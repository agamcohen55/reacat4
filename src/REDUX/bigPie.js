import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import DarkReducer from "./DarkTheme";

const store = configureStore({
  reducer: {
    authReducer,
    DarkReducer,
  },
});

export default store;
