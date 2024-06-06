import React from "react";
import logo from "../assets/static/logo.svg";

const TableLoader = () => {
  return (
    <div className="page page-center vh-80">
      <div className="container container-slim py-4">
        <div className="text-center">
          <div className="mb-3">
            <a href="." className="navbar-brand navbar-brand-autodark">
              <img src={logo} alt={import.meta.env.VITE_ADMIN_TITLE} />
            </a>
          </div>
          <h3 className="text-muted mb-3">Loading data ...</h3>
          <div className="progress progress-sm">
            <div className="progress-bar progress-bar-indeterminate"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLoader;
