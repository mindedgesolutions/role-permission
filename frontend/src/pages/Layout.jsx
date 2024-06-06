import React, { useEffect } from "react";
import { Outlet, redirect, useLocation, useNavigate } from "react-router-dom";

import "../assets/dist/css/tabler.min.css";
import "../assets/dist/css/demo.min.css";

import "../assets/dist/js/tabler.min.js";
import "../assets/dist/js/demo.min.js";

import customFetch from "../utils/customFetch.js";
import { splitErrors } from "../utils/showError.jsx";
import { setCurrentUser } from "../features/userSlice.js";
import { useSelector } from "react-redux";
import { Footer, Sidebar, Topnav } from "../components";

// Loader starts ------
export const loader = (store) => async () => {
  const { currentUser } = store.getState().users;
  try {
    if (!currentUser.name) {
      const response = await customFetch.get(`/user/current`);
      store.dispatch(setCurrentUser(response.data.data));
    }
    return currentUser;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return redirect("/");
  }
};

// Main component starts ------
const Layout = () => {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((store) => store.users);
  const roleId = currentUser?.role_id;
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        await customFetch.get(`/auth/access`, {
          params: {
            role: roleId,
            url: pathname,
          },
        });
      } catch (error) {
        splitErrors(error?.response?.data?.msg);
        if (error?.response?.status === 403) {
          navigate("/forbidden");
        }
        return error;
      }
    };
    checkAccess();
  }, [pathname]);

  const logout = async () => {};

  return (
    <>
      <Topnav logout={logout} />
      <Sidebar />
      <div className="page-wrapper">
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
