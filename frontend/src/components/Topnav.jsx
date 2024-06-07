import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import avatar from "../assets/static/avatars/000m.jpg";
import { useSelector } from "react-redux";

const Topnav = ({ logout }) => {
  const { currentUser } = useSelector((store) => store.users);
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  const toggleDarkMode = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    const theme = newTheme === true ? "dark" : "";
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-bs-theme", theme);
  };

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", localStorage.getItem("theme"));
  }, [isDarkTheme]);

  return (
    <header className="navbar navbar-expand-md d-none d-lg-flex d-print-none">
      <div className="container-xl">
        <div className="navbar-nav flex-row order-md-last">
          <div className="d-none d-md-flex">
            <Link to={`#`} onClick={toggleDarkMode} className="me-3">
              {isDarkTheme ? (
                <IoMdSunny
                  className="nav-link px-0 cursor-pointer mt-2"
                  title="Enable light mode"
                />
              ) : (
                <FaMoon
                  className="nav-link px-0 cursor-pointer mt-2"
                  title="Enable dark mode"
                />
              )}
            </Link>
          </div>
          <div className="nav-item dropdown">
            <Link
              to="#"
              className="nav-link d-flex lh-1 text-reset p-0"
              data-bs-toggle="dropdown"
              aria-label="Open user menu"
            >
              <img
                src={avatar}
                alt={import.meta.env.VITE_ADMIN_TITLE}
                className="avatar avatar-sm"
              />
              <div className="d-none d-xl-block ps-2">
                <div>{currentUser?.name?.toUpperCase()}</div>
                <div className="mt-1 small text-secondary fs-6">
                  {currentUser?.role?.toUpperCase()}
                </div>
              </div>
            </Link>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <NavLink to="/profile" className="dropdown-item">
                Profile
              </NavLink>
              <div className="dropdown-divider"></div>
              <NavLink to="/change-password" className="dropdown-item">
                Change Password
              </NavLink>
              <button type="button" className="dropdown-item" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div></div>
        </div>
      </div>
    </header>
  );
};

export default Topnav;
