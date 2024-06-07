import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalRecords: 0,
  totalPages: 0,
  currentPage: 1,
  editId: "",
  editModal: false,
  deleteId: "",
  deleteModal: false,
  changeCount: 0,
};

const commonSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    updateCount: (state) => {
      state.changeCount = state.changeCount + 1;
    },
    setTotal: (state, action) => {
      state.totalRecords = action.payload.totalRecords;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
    unsetTotal: (state) => {
      state.totalRecords = 0;
      state.totalPages = 0;
      state.currentPage = 1;
    },
    setEditMode: (state, action) => {
      state.editId = action.payload;
      state.editModal = true;
    },
    unsetEditMode: (state) => {
      state.editId = "";
      state.editModal = false;
    },
    setDeleteMode: (state, action) => {
      state.deleteId = action.payload;
      state.deleteModal = true;
    },
    unsetDeleteMode: (state) => {
      state.deleteId = "";
      state.deleteModal = false;
    },
  },
});

export const {
  updateCount,
  setTotal,
  unsetTotal,
  setEditMode,
  unsetEditMode,
  setDeleteMode,
  unsetDeleteMode,
} = commonSlice.actions;
export default commonSlice.reducer;
