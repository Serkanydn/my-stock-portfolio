import { toast } from "react-toastify";

class ToasterService {
  toast(message, type = "success") {
    toast[type](message, {
      position: "top-right",
      theme: "colored",
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      autoClose: 2000,
    });
  }
}
export default new ToasterService();
