import { store } from "@/store";

import { append, destroy, destroyAll } from "@/store/modal";
import { useSelector } from "react-redux";

export const useModals = () => useSelector((state) => state.modal.modals);
export const createModal = (name, data = false, prevDestroy = false) =>
  store.dispatch(append({ name, data, prevDestroy }));
export const destroyModal = () => store.dispatch(destroy());
export const destroyAllModal = () => store.dispatch(destroyAll());
