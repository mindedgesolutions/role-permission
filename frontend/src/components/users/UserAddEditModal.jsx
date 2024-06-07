import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import SubmitBtn from "../SubmitBtn";

const UserAddEditModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const addModal = false;
  const editId = false;
  const handleClose = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={addModal} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete modal</Modal.Title>
      </Modal.Header>
      <form method="post" autoComplete="off" onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row row-cards">
            <div className="mb-3 col-md-6 mt-0 pt-0">
              <label className="datagrid-title" htmlFor="name">
                Name <span className="text-danger">*</span> :{" "}
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
              />
            </div>
            <div className="mb-3 col-md-6 mt-0 pt-0">
              <label className="datagrid-title" htmlFor="name">
                Username :{" "}
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                id="username"
              />
            </div>
            <div className="mb-3 col-md-6 mt-0 pt-0">
              <label className="datagrid-title" htmlFor="email">
                Email <span className="text-danger">*</span> :{" "}
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
              />
            </div>
            <div className="mb-3 col-md-6 mt-0 pt-0">
              <label className="datagrid-title" htmlFor="email">
                Mobile <span className="text-danger">*</span> :{" "}
              </label>
              <input
                type="text"
                className="form-control"
                name="mobile"
                id="mobile"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <SubmitBtn text={`Update details`} isLoading={isLoading} />
          <button
            type="button"
            className="btn btn-default"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default UserAddEditModal;
