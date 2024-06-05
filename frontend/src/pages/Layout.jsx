import React, { useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "../assets/dist/css/demo.min.css";
import "../assets/dist/css/tabler.min.css";

import "../assets/dist/js/demo.js";
import "../assets/dist/js/tabler.js";
import customFetch from "../utils/customFetch.js";
import { splitErrors } from "../utils/showError.jsx";

// Loader starts ------
export const loader = async () => {
  try {
    const response = await customFetch.get(`/user/current`);
    return response.data.data;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const Layout = () => {
  const { pathname } = useLocation();
  const data = useLoaderData();
  const roleId = data?.role_id;
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
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
