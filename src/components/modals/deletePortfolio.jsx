"use client";
import React from "react";
import { useDispatch } from "react-redux";
import toaserService from "@/services/toaster";

import Header from "./components/header";
import Footer from "./components/footer";
import { deletePortfolio } from "@/store/portfolios";

function DeletePortfolio({ data, close }) {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    dispatch(deletePortfolio(data.id));
    close();
    toaserService.toast(`Transaction complated.`);
  };
  return (
    <div>
      <Header title={"Delete Portfolio"} />
      <div className="p-4">Would you like to delete the record?</div>
      <Footer action={handleConfirm} actionButtonTitle="Confirm" />
    </div>
  );
}

export default DeletePortfolio;
