import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "",
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
  },
});

export const { setCurrentUser, unsetCurrentUser } = userSlice.actions;
export default userSlice.reducer;
