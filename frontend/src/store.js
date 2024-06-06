import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./features/commonSlice";
import userReducer from "./features/userSlice";
import roleReducer from "./features/roleSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    users: userReducer,
    roles: roleReducer,
  },
});
