import React from "react";
import Logo from "../assets/static/logo-white.svg";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome, AiOutlineFile } from "react-icons/ai";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdAddLink } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { currentUser } = useSelector((store) => store.users);
  let homeRoute = "";
  switch (currentUser.role_id) {
    case 1:
      homeRoute = `/admin/dashboard`;
      break;
    case 2:
      homeRoute = `/seller/dashboard`;
      break;
    case 3:
      homeRoute = `/buyer/dashboard`;
      break;
  }

  return (
    <aside
      className="navbar navbar-vertical navbar-expand-lg"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <h1 className="navbar-brand navbar-brand-autodark">
          <Link to="/admin/dashboard">
            <img
              src={Logo}
              style={{ height: "40px" }}
              alt={import.meta.env.VITE_ADMIN_TITLE}
            />
          </Link>
        </h1>
        <div className="collapse navbar-collapse" id="sidebar-menu">
          <ul className="navbar-nav pt-lg-3">
            <li className="nav-item">
              <NavLink className="nav-link" to={homeRoute}>
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  <AiOutlineHome size={18} />
                </span>
                <span className="nav-link-title">Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/users">
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  <FiUsers size={18} />
                </span>
                <span className="nav-link-title">Users</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/routes">
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  <MdAddLink size={18} />
                </span>
                <span className="nav-link-title">Routes / URLs</span>
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#navbar-extra"
                data-bs-toggle="dropdown"
                data-bs-auto-close="false"
                role="button"
                aria-expanded="false"
              >
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  <AiOutlineFile size={18} />
                </span>
                <span className="nav-link-title">Applications</span>
              </a>
              <div className="dropdown-menu">
                <div className="dropdown-menu-columns">
                  <div className="dropdown-menu-column">
                    <Link to="/admin/applications" className="dropdown-item">
                      All applications
                    </Link>
                    <Link
                      to="/admin/search-application"
                      className="dropdown-item"
                    >
                      Search application
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/reports">
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  <BsGraphUpArrow size={16} />
                </span>
                <span className="nav-link-title">Reports</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
