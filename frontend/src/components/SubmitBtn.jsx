import React from "react";
import { BtnSpinner } from ".";

const SubmitBtn = ({ className, isLoading, text }) => {
  return (
    <button
      type="submit"
      className={className || `btn btn-success`}
      disabled={isLoading}
    >
      {isLoading && <BtnSpinner />}
      {text || `Save and continue`}
    </button>
  );
};

export default SubmitBtn;
