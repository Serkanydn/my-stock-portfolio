import React, { useEffect, useMemo } from "react";
import { IoIosClose } from "react-icons/io";
import { createModal, destroyModal } from "@/utils/modal";

import Dropdown from "@/components/formElements/dropdown";

import { TbFileExport, TbTrashX, TbSquarePlus } from "react-icons/tb";
import * as XLSX from "xlsx";

import { useDispatch } from "react-redux";

function StockCard({ data: stock }) {

  const dispatch = useDispatch();

  useEffect(() => {


  }, [])
  const stockDropdownItems = [
    // {
    //   title: "Export Excel",
    //   icon: <TbFileExport size="16" />,
    //   onClick: () => {
    //     handleExportExcel();
    //   },
    // },
    {
      title: "Delete",
      icon: <TbTrashX size="16" />,
      onClick: () => {
        handleDelete();
      },
    },
  ];

  const handleDelete = () => {
    createModal("deleteStock", {
      portfolioId: stock.portfolioId,
      stockId: stock.id,
    });
  };

  const handleAddRecord = () => {
    createModal("addRecord", {
      portfolioId: stock.portfolioId,
      stockId: stock.id,
      name: stock.name,
      action: "Buy",
    });
  };

  const handleSellRecord = () => {
    createModal("addRecord", {
      portfolioId: stock.portfolioId,
      stockId: stock.id,
      name: stock.name,
      action: "Sell",
    });
  };

  // const handleExportExcel = () => {
  //   const wb = XLSX.utils.book_new();

  //   const excelFormat = stock.records.map((record) => {
  //     return [
  //       record.name,
  //       record.cost,
  //       record.piece,
  //       record.commission,
  //       record.action,
  //       record.profitAndLossPercent === "-" ? record.profitAndLossPercent : record.profitAndLossPercent + "%",
  //       record.profitAndLoss,
  //       `${new Date(record.date).toLocaleDateString("Tr-tr")} ${record.time}`,
  //       record.totalCost,
  //     ];
  //   });

  //   excelFormat.unshift(["Name", "Cost", "Piece", "Commission", "Action", "Profit And Loss (%)", "Profit And Loss", "Date", "Total Cost"]);

  //   excelFormat.push(["", "", "", "", "", "", "", "", ""]);
  //   excelFormat.push([
  //     "",
  //     `Total: ${stock.totalCost}`,
  //     `Total Piece: ${stock.totalPiece} `,
  //     "",
  //     "",
  //     "",
  //     `Total Profit And Loss: ${stock.profitAndLoss}`,
  //     "",
  //     "",
  //   ]);
  //   excelFormat.push(["", `Average: ${stock.averageCost}`, "", "", "", "", "", "", ""]);
  //   const ws = XLSX.utils.aoa_to_sheet(excelFormat);
  //   XLSX.utils.book_append_sheet(wb, ws, stock.name);

  //   XLSX.writeFile(wb, `${stock.name}.xlsx`);
  // };

  const handleSummary = () => {
    createModal("recordsTable", {
      head: [
        {
          name: "Action",
          sortable: true,
        },
        {
          name: "Date",
          sortable: true,
        },
        {
          name: "Cost",
          sortable: true,
        },
        {
          name: "Piece",
          sortable: true,
        },

        {
          name: "Commission",
        },

        {
          name: "Profit And Loss (%)",
          sortable: true,
        },
        {
          name: "Profit And Loss ",
        },
        {
          name: "Total Cost",
        },
        {
          name: "",
          width: 100,
        },
      ],
      records: stock.records,
      stockId: stock.id,
      portfolioId: stock.portfolioId,
      ignoredFields: ["Name"]
    });
  };
  return (
    <div
      tabIndex="0"
      aria-label="card 1"
      className="p-4 bg-white border rounded shadow focus:outline-none hover:bg-slate-50 "
    >
      <div className="flex items-center pb-2 border-b border-gray-200 ">
        <div className="flex items-start justify-between w-full">
          <div className="w-full pl-2">
            <p
              tabIndex="0"
              className="text-lg font-medium leading-5 text-gray-800 focus:outline-none"
            >
              {stock.name}
            </p>
          </div>
          <div>
            <Dropdown items={stockDropdownItems} />
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between px-2 align-bottom">
        <div
          tabIndex="0"
          className="flex flex-col gap-1 pt-2 text-sm font-semibold leading-5 text-gray-600 select-none focus:outline-none"
        >
          <div>Tutar: {stock.totalCost}</div>
          <div>Ortalama Maliyet: {stock.averageCost}</div>
          <div>Adet: {stock.totalPiece}</div>
          <div>Profit And Loss: {stock.profitAndLoss}</div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={handleAddRecord}
            className="px-4 py-2 text-xs font-medium leading-3 text-indigo-700 transition-all ease-linear bg-green-100 rounded hover:bg-green-200"
          >
            Buy
          </button>
          {stock.totalPiece > 0 && (
            <button
              onClick={handleSellRecord}
              className="px-4 py-2 text-xs font-medium leading-3 text-indigo-700 transition-all ease-linear bg-red-100 rounded hover:bg-red-200"
            >
              Sell
            </button>
          )}
          <button
            onClick={handleSummary}
            className="px-4 py-2 text-xs font-medium leading-3 text-indigo-700 transition-all ease-linear bg-indigo-100 rounded hover:bg-indigo-200"
          >
            Summary
          </button>
        </div>
      </div>
    </div>
  );
}

export default StockCard;
