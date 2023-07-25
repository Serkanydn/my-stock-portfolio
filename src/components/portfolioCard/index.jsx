import React, { useEffect } from "react";
import StockCard from "@/components/stockCard";

import { createModal } from "@/utils/modal";

import { useDispatch, useSelector } from "react-redux";

import * as XLSX from "xlsx";
import { useRef } from "react";

import Dropdown from "@/components/formElements/dropdown";

import {
  TbFileExport,
  TbFileImport,
  TbTrashX,
  TbSquarePlus,
} from "react-icons/tb";

function PortfolioCard({ portfolio }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);



  const portfolioDropdownItems = [
    {
      title: "Add Stock",
      icon: <TbSquarePlus size="16" />,
      onClick: () => {
        handleAddStock();
      },
    },
    {
      title: "Export Excel",
      icon: <TbFileExport size="16" />,
      onClick: () => {
        handleExportExcel();
      },
    },
    {
      title: "Delete",
      icon: <TbTrashX size="16" />,
      onClick: () => {
        handleDelete();
      },
    },
  ];

  const handleDelete = () => {
    createModal("deletePortfolio", portfolio);
  };
  const handleAddStock = () => {
    createModal("addStock", portfolio.id);
  };

  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();

    portfolio.stocks.forEach((stock) => {
      const excelFormat = stock.records.map((record) => {
        return [
          record.name,
          record.cost,
          record.piece,
          record.commission,
          record.action,
          record.profitAndLossPercent === "-"
            ? record.profitAndLossPercent
            : record.profitAndLossPercent + "%",
          record.profitAndLoss,
          `${new Date(record.date).toLocaleDateString("Tr-tr")} ${record.time}`,
          record.totalCost,
        ];
      });

      excelFormat.unshift([
        "Name",
        "Cost",
        "Piece",
        "Commission",
        "Action",
        "Profit And Loss (%)",
        "Profit And Loss",
        "Date",
        "Total Cost",
      ]);

      excelFormat.push(["", "", "", "", "", "", "", "", ""]);
      excelFormat.push([
        "",
        `Total: ${stock.totalCost}`,
        `Total Piece: ${stock.totalPiece} `,
        "",
        "",
        "",
        `Total Profit And Loss: ${stock.profitAndLoss}`,
        "",
        "",
      ]);
      excelFormat.push([
        "",
        `Average: ${stock.averageCost}`,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]);
      const ws = XLSX.utils.aoa_to_sheet(excelFormat);
      XLSX.utils.book_append_sheet(wb, ws, stock.name);
    });

    XLSX.writeFile(wb, `${portfolio.name}.xlsx`);
  };

  useEffect(() => {
  }, []);

  return (
    <div className="flex-1 w-full h-full max-w-5xl border rounded shadow grow">
      <div className="flex items-center justify-between p-2 bg-gray-200 ">
        <div className="text-xl font-semibold select-none ">
          {portfolio.name}
        </div>

        <div>
          <Dropdown items={portfolioDropdownItems} />
        </div>
      </div>
      <div className="w-100 flex flex-col gap-2  overflow-y-auto h-[565px] py-2  px-2 ">
        {portfolio.stocks?.length ? (
          portfolio.stocks.map((stock, index) => <StockCard key={index} data={stock} />)
        ) : (
          <div className="p-4 text-blue-700 bg-blue-100 rounded ">
            Let's start by adding stock !
          </div>
        )}
      </div>
      <div className="flex justify-between p-2 text-sm font-semibold bg-gray-200 ">
        <p>Toplam Portfolio Tutarı: {portfolio.totalCost}</p>
        <p>
          Toplam Portfolio Kar / Zarar:{" "}
          {portfolio.profitAndLoss > 0 ? (
            <span className="text-green-600">{portfolio.profitAndLoss}</span>
          ) : (
            <span className="text-red-600">{portfolio.profitAndLoss}</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default PortfolioCard;
