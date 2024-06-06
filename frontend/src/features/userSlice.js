import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "",
  listUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    unsetCurrentUser: (state) => {
      state.currentUser = "";
    },
    setListUsers: (state, action) => {
      state.listUsers = action.payload;
    },
    unsetListUsers: (state) => {
      state.listUsers = [];
    },
  },
});

export const {
  setCurrentUser,
  unsetCurrentUser,
  setListUsers,
  unsetListUsers,
} = userSlice.actions;
export default userSlice.reducer;
