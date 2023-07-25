import React from "react";
import { IoIosClose } from "react-icons/io";
import { destroyModal } from "@/utils/modal";
function Header({ title }) {
  return (
    <div className="flex items-center justify-between p-5 font-medium border-b-2 ">
      <label className="text-lg text-gray-700 ">{title}</label>
      <button onClick={destroyModal} className="">
        <IoIosClose size="2em" className="text-gray-300 duration-100 ease-linear hover:text-gray-700" />
      </button>
    </div>
  );
}

export default Header;
