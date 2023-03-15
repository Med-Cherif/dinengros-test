import { toast, ToastOptions } from "react-toastify";

export default function toastAlert(
  content: string,
  type: ToastOptions["type"] = "success",
  options: ToastOptions = {}
) {
  toast[type](content, {
    ...options,
  });
}
