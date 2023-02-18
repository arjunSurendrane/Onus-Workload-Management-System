import { createSlice } from "@reduxjs/toolkit";
import axios from "../../api/index";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("User")),
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    createUser: (state, actions) => {
      console.log(actions.payload);
      localStorage.setItem("User", JSON.stringify({ ...actions.payload.user }));
      state.user = actions.payload.user;
    },
    registerUser: (state, data) => {
      state.user = data.payload;
    },
    createCookie: () => {},
    deleteCookie: () => {},
  },
});

export const { createUser, registerUser, createCookie, deleteCookie } =
  userSlice.actions;
export default userSlice.reducer;
