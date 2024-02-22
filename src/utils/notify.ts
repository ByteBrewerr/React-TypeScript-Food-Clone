import { toast } from "react-toastify";

const notify = (message: string, type: "success" | "error") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast(message);
  }
};

export default notify;
