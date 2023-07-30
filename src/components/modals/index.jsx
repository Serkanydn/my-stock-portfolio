import React, { useEffect, Fragment, useRef } from "react";
import modalData from "@/modals";
import { useModals, destroyModal } from "@/utils/modal";
import { motion, AnimatePresence } from "framer-motion";

function Modal() {
  const modals = useModals();

  useEffect(() => {
    const handleClick = ({ key }) => key === "Escape" && destroyModal();

    window.addEventListener("keydown", handleClick);

    return () => {
      window.removeEventListener("keydown", handleClick);
    };
    // 
  }, []);


  const lastModal = modals.at(-1)


  if (lastModal.prevDestroy) {
    const m = modalData.find((m) => m.name === lastModal.name);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
        <div
          onClick={(event) => event.stopPropagation()}
          className="bg-white border border-gray-400 rounded-md drop-shadow-xl animate-opacity"
        >
          <m.element data={lastModal.data} close={destroyModal} />
        </div>
      </div>
    )
  }


  return (
    // onClick={destroyModal}
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">

      {modals.map((modal, index) => {
        const m = modalData.find((m) => m.name === modal.name);
        return (
          <div
            key={index}
            onClick={(event) => event.stopPropagation()}
            className="hidden bg-white border border-gray-400 rounded-md last:block drop-shadow-xl animate-opacity"
          >
            <m.element data={modal.data} close={destroyModal} />
          </div>
        )
      })}





    </div>
  );
}

export default Modal;
