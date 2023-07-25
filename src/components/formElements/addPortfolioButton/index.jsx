import React, { useState } from "react";
import { createModal } from "@/utils/modal";

function AddPortfolioButton() {
  const handleShowModal = () => createModal("addPortfolio");

  return (
    <>
      <button
        className="p-2 text-white duration-300 ease-linear bg-green-600 rounded-md select-none hover:bg-green-700"
        onClick={handleShowModal}
      >
        Add Portfolio
      </button>
    </>
  );
}

export default AddPortfolioButton;
