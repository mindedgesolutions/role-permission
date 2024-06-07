import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "",
  listUsers: [],
  listSellers: [],
  listBuyers: [],
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
    setListSellers: (state, action) => {
      state.listSellers = action.payload;
    },
    unsetListSellers: (state) => {
      state.listSellers = [];
    },
    setListBuyers: (state, action) => {
      state.listBuyers = action.payload;
    },
    unsetListBuyers: (state) => {
      state.listBuyers = [];
    },
  },
});

export const {
  setCurrentUser,
  unsetCurrentUser,
  setListUsers,
  unsetListUsers,
  setListSellers,
  unsetListSellers,
  setListBuyers,
  unsetListBuyers,
} = userSlice.actions;
export default userSlice.reducer;
