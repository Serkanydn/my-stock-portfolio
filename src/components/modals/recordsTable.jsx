"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Table from "@/components/table";
import { createModal } from "@/utils/modal";
import { useSelector, useDispatch } from "react-redux";
import { refresh } from "@/store/portfolios";
import * as XLSX from "xlsx";

function RecordsTable({
  data: { head, records, stockId, portfolioId, ignoredFields },
  close,
}) {
  const { data: portfolios } = useSelector((state) => state.portfolios);

  const portfolio = portfolios.find(
    (portfolio) => portfolio.id === portfolioId
  );
  const stock = portfolio.stocks.find((stock) => stock.id === stockId);

  const dispatch = useDispatch();

  const handleDelete = (record) => {
    createModal("deleteStockRecord", record, true);
  };
  const handleUpdate = (record) => {
    createModal("updateStockRecord", record);
  };

  return (
    <div>
      <Header title={`Stock Summary (${stock.name})`} />
      <div className="w-[960px] px-3 py-5 ">
        <Table
          ignoredFields={ignoredFields}
          searchable={true}
          head={head}
          pagination={{ paginate: true, pageSize: 8 }}
          bodyTrClassConditionIndex={5}
          bodyTrClassCondition={(prop) => {
            const value = prop?.key || prop;
            if (value > 0) {
              return "bg-green-100";
            }

            if (value !== "-") {
              return "bg-red-100";
            }

            return "";
          }}
          body={
            stock.records.length &&
            stock.records.map((record) => {
              const buttons = [
                <button
                  onClick={() => {
                    handleUpdate(record);
                  }}
                  className="flex items-center justify-center w-full px-2 py-1 text-white bg-blue-600 rounded"
                >
                  Düzenle
                </button>,
              ];

              if (stock.records.at(-1).id === record.id) {
                buttons.push(
                  <button
                    onClick={() => {
                      handleDelete(record);
                    }}
                    className="flex items-center px-2 py-1 text-white bg-red-600 rounded"
                  >
                    Sil
                  </button>
                );
              }

              return [
                record.action,
                new Date(record.date).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
                record.cost,
                record.piece,
                record.commission,
                <div
                  key={record.profitAndLossPercent}
                  className={
                    record.profitAndLossPercent > 0
                      ? "text-green-600"
                      : record.profitAndLossPercent !== "-"
                      ? "text-red-600"
                      : ""
                  }
                  title={
                    record.action === "Sell"
                      ? "Percentage increase / decrease compared to average purchases "
                      : ""
                  }
                >
                  {record.action === "Sell"
                    ? "%" + record.profitAndLossPercent
                    : record.profitAndLossPercent}
                </div>,
                <div
                  className={
                    record.profitAndLoss > 0
                      ? "text-green-600"
                      : record.profitAndLoss !== "-"
                      ? "text-red-600"
                      : ""
                  }
                  title={
                    record.action === "Sell"
                      ? "Increase / decrease compared to average purchases"
                      : ""
                  }
                >
                  {record.profitAndLoss}
                </div>,
                <span
                  title={
                    record.action === "Buy"
                      ? "Total cost after adding commission"
                      : "Total earnings after deducting commission"
                  }
                >
                  {record.totalCost}
                </span>,
                ,
                buttons,
              ];
            })
          }
        />
      </div>
      <Footer />
    </div>
  );
}

export default RecordsTable;
