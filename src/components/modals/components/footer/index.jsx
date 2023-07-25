import React from "react";
import { destroyModal } from "@/utils/modal";

function Footer({ actionButtonTitle, action }) {
  return (
    <div className="flex flex-row items-center justify-end gap-3 p-2 border-t-2 ">
      <button
        onClick={destroyModal}
        className="flex-shrink-0 px-4 py-2 text-sm text-teal-500 duration-100 ease-linear border rounded hover:border-teal-500 text-md"
      >
        Close
      </button>
      {actionButtonTitle && (
        <button
          onClick={action}
          className="flex-shrink-0 px-4 py-2 text-sm text-white duration-100 ease-linear bg-teal-500 rounded hover:bg-teal-700 "
        >
          {actionButtonTitle}
        </button>
      )}
    </div>
  );
}

export default Footer;
