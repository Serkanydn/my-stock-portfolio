"use client";
import React from "react";
import { useDispatch } from "react-redux";
import toaserService from "@/services/toaster";

import Header from "./components/header";
import Footer from "./components/footer";
import { deleteStock, deleteStockRecord } from "@/store/portfolios";

function DeleteStock({ data: record, close }) {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    dispatch(deleteStockRecord({ portfolioId: record.portfolioId, stockId: record.stockId, id: record.id }));
    close();
    toaserService.toast(`Transaction complated.`);
  };
  return (
    <div>
      <Header title={"Delete Stock"} />
      <div className="p-4">Would you like to delete the record?</div>
      <Footer action={handleConfirm} actionButtonTitle="Confirm" />
    </div>
  );
}

export default DeleteStock;
