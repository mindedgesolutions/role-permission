import React from "react";
import { Outlet } from "react-router-dom";
import { splitErrors } from "../utils/showError";
import customFetch from "../utils/customFetch";
import { setListRoles } from "../features/roleSlice";

export const loader = (store) => async () => {
  const { listRoles } = store.getState().roles;
  try {
    if (listRoles.length === 0) {
      const response = await customFetch.get(`/roles/all`);
      store.dispatch(setListRoles(response?.data?.data?.rows));
    }
    return null;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

const AdminLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminLayout;
