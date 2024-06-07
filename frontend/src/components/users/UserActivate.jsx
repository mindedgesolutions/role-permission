import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { VscVmActive } from "react-icons/vsc";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateCount } from "../../features/commonSlice";
import { splitErrors } from "../../utils/showError";

const UserActivate = ({ id }) => {
  const dispatch = useDispatch();

  const activateUser = async () => {
    try {
      await customFetch.post(`/users/activate/${id}`);
      toast.success(`User activated`);
      dispatch(updateCount());
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-success btn-sm me-2"
        onClick={activateUser}
      >
        <VscVmActive size={14} />
      </button>

      {/* <button type="button" className="btn btn-secondary btn-sm">
        <FaRegTrashAlt size={14} />
      </button> */}
    </>
  );
};

export default UserActivate;
