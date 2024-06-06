import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Forbidden = () => {
  const { currentUser } = useSelector((store) => store.users);
  let returnPath = "";
  switch (currentUser.role_id) {
    case 1:
      returnPath = `/admin/dashboard`;
      break;
    case 2:
      returnPath = `/seller/dashboard`;
      break;
    case 3:
      returnPath = `/buyer/dashboard`;
      break;
  }

  return (
    <div className="border-top-wide border-primary d-flex flex-column">
      <div className="page page-center">
        <div className="container-tight py-4">
          <div className="empty">
            <div className="empty-header">403</div>
            <p className="empty-title">This page is off limit!</p>
            <p className="empty-subtitle text-muted">
              No, no!! You are not allowed to peep into this page
            </p>
            <div className="empty-action">
              <Link to={returnPath} className="btn btn-primary">
                <FaArrowLeftLong size={18} className="me-2" />
                Take me home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
