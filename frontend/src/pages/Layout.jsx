import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import "../assets/dist/css/demo.min.css";
import "../assets/dist/css/tabler.min.css";

import "../assets/dist/js/demo.js";
import "../assets/dist/js/tabler.js";

import customFetch from "../utils/customFetch.js";
import { splitErrors } from "../utils/showError.jsx";
import { setCurrentUser } from "../features/userSlice.js";
import { useSelector } from "react-redux";
import { Footer, Sidebar, Topnav } from "../components";

// Loader starts ------
export const loader = (store) => async () => {
  const { currentUser } = store.getState().user;
  try {
    if (!currentUser.name) {
      const response = await customFetch.get(`/user/current`);
      store.dispatch(setCurrentUser(response.data.data));
    }
    return currentUser;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const Layout = () => {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((store) => store.user);
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

  return (
    <>
      <Topnav />
      <Sidebar />
      <div className="page-wrapper">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
