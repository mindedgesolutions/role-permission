import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { splitErrors } from "../../utils/showError";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { unsetDeleteMode, updateCount } from "../../features/commonSlice";

const UserDeleteModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { deleteId, deleteModal } = useSelector((store) => store.common);
  const { listUsers } = useSelector((store) => store.users);

  const user = listUsers.find((i) => i.id === deleteId);

  const handleClose = () => {
    dispatch(unsetDeleteMode());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await customFetch.delete(`/users/delete/${deleteId}`);

      toast.error(`User deactivated`);
      dispatch(unsetDeleteMode());
      dispatch(updateCount());

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <Modal show={deleteModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Deactivate {user?.name?.toUpperCase()}</Modal.Title>
      </Modal.Header>
      <form method="post" onSubmit={handleSubmit}>
        <Modal.Body>
          <p>Sure you wish to deactivate {user?.name?.toUpperCase()}?</p>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-danger me-2">
            Deactivate
          </button>
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

export default UserDeleteModal;
