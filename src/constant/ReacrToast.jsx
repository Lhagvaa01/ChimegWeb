import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const successToast = (txt) => {
  toast.success(txt, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "colored",
  });
};

export const errorToast = (txt) => {
  toast.error(txt, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
