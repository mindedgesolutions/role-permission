import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  console.log(error.status);

  if (error.status === 404) {
    return <div>Page not found</div>;
  }

  return <div>Something went wrong!</div>;
};

export default Error;
