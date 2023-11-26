import { createSlice } from "@reduxjs/toolkit";
const DarkSlice = createSlice({
  name: "Dark",
  initialState: checkDark(),
  reducers: {
    //collection of functions to setState
    changeState(state, action) {
      //when called change the state
      return action.payload;
    },
  },
});
function checkDark() {
  //check the theme from local storage and set it to state
  const IsDark = localStorage.getItem("theme") === "true";
  return IsDark;
}
export const DarkActions = DarkSlice.actions;

//in reducer we have all the necessary data to connect with the big pie
export default DarkSlice.reducer;
