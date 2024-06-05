import { toast } from "react-toastify";

export const splitErrors = (text) => {
  if (text) {
    const arr = text.split(",");
    arr.map((err) => {
      return toast.error(err);
    });
  }
};
