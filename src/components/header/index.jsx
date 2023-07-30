"use client";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setPortfolios, addPortfolio } from "@/store/portfolios";
import { toggleSidebar } from "@/store/sidebar";
import AddPortfolioButton from "@/components/formElements/addPortfolioButton";

import localStorageService from "@/services/localStorageService";

import * as XLSX from "xlsx";
import { useRef } from "react";
const { v4: uuidv4 } = require("uuid");
import { motion, AnimatePresence } from "framer-motion";

import toaserService from "@/services/toaster";

import { MdMenu, MdMenuOpen } from "react-icons/md";
import { createModal } from "@/utils/modal";
import { getDate } from "@/utils/toolkit";

function Header() {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const { isShow } = useSelector((state) => state.sidebar);

  useEffect(() => {
    const portfolios = localStorageService.getPortfolios();
    if (portfolios?.length > 0) dispatch(setPortfolios(portfolios));
  }, []);

  const importExcel = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    const { files } = event.target;

    for await (const file of files) {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);

      const importedPortfolio = {
        name: file.name.split(".").slice(0, -1).join(""),
        stocks: [],
        id: uuidv4(),
        profitAndLoss: 0,
        totalCost: 0,
      };

      const { SheetNames, Sheets } = workbook;
      SheetNames.forEach((sheetName) => {
        const stockId = uuidv4();
        const data = XLSX.utils.sheet_to_json(Sheets[sheetName]);

        let totalCost, totalPiece, averageCost, profitAndLoss;

        data.forEach((d) => {
          Object.entries(d).forEach(([key, value]) => {
            if (typeof value === "string" && value.includes("Total:")) {
              totalCost = Number(value.split(":")[1].trim());
            }

            if (typeof value === "string" && value.includes("Average:")) {
              totalPiece = Number(value.split(":")[1].trim());
            }

            if (typeof value === "string" && value.includes("Total Piece:")) {
              averageCost = Number(value.split(":")[1].trim());
            }

            if (
              typeof value === "string" &&
              value.includes("Total Profit And Loss:")
            ) {
              profitAndLoss = Number(value.split(":")[1].trim());
            }
          });
        });

        importedPortfolio.totalCost += totalCost;
        importedPortfolio.profitAndLoss += profitAndLoss;

        const filteredData = data
          .filter((prop) => prop.Name !== "")
          .map((data) => {
            return {
              id: uuidv4(),
              stockId,
              portfolioId: importedPortfolio.id,
              name: data["Name"],
              action: data["Action"],
              cost: data["Cost"],
              date: data["Date"].split(" ")[0],
              time: data["Date"].split(" ")[1],
              piece: data["Piece"],
              commission: data["Commission"],
              profitAndLossPercent: data["Profit And Loss (%)"].replace(
                "%",
                ""
              ),
              profitAndLoss: data["Profit And Loss"],
              totalCost: data["Total Cost"],
            };
          });

        importedPortfolio.stocks.push({
          id: stockId,
          name: sheetName,
          portfolioId: importedPortfolio.id,
          records: [...filteredData],
          totalCost,
          averageCost,
          totalPiece,
          profitAndLoss,
        });
      });

      try {
        dispatch(addPortfolio(importedPortfolio));
      } catch (error) {
        toaserService.toast(error.message, "error");
      }
    }
    fileInputRef.current.value = null;
  };

  const handleEmptyExcell = () => {
    const wb = XLSX.utils.book_new();

    const excelFormat = [
      [
        "Name",
        "Cost",
        "Piece",
        "Commission",
        "Action",
        "Profit And Loss (%)",
        "Profit And Loss",
        "Date",
        "Total Cost",
      ],
      [
        "Stock Name",
        "100",
        "1",
        "5",
        "Buy",
        "-",
        "-",
        `${new Date(getDate().date).toLocaleDateString("Tr-tr")} ${
          getDate().time
        }`,
        "100",
      ],
      [
        "Stock Name",
        "200",
        "1",
        "5",
        "Sell",
        "100%",
        "100",
        `${new Date(getDate().date).toLocaleDateString("Tr-tr")} ${
          getDate().time
        }`,
        "205",
      ],
      ["", "", "", "", "", "", "", "", ""],
      [
        "",
        `Total: 0`,
        `Total Piece: 0 `,
        "",
        "",
        "",
        `Total Profit And Loss: 100`,
        "",
        "",
      ],
      ["", `Average: 0`, "", "", "", "", "", "", ""],
    ];

    const ws = XLSX.utils.aoa_to_sheet(excelFormat);
    XLSX.utils.book_append_sheet(wb, ws, "Stock Name");

    XLSX.writeFile(wb, `Portfolio Name.xlsx`);
  };

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  const handleShowModal = () => createModal("addPortfolio");

  return (
    <>
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex w-10 items-center justify-center rounded-md transition-all ease-in-out hover:bg-[#F3F4F6] text-[#6B7280] hover:text-black ">
          {!isShow ? (
            <MdMenu className="cursor-pointer" onClick={toggle} size="32" />
          ) : (
            <MdMenuOpen className="cursor-pointer" onClick={toggle} size="32" />
          )}
        </div>

        <div className="flex items-center justify-end gap-2 me-3">
          <button
            onClick={handleEmptyExcell}
            className="p-2 text-white duration-300 ease-linear bg-yellow-500 rounded-md cursor-pointer select-none hover:bg-yellow-600"
          >
            Install Empty Excel
          </button>
          <label className="p-2 text-white duration-300 ease-linear bg-yellow-500 rounded-md cursor-pointer select-none hover:bg-yellow-600">
            <input
              type="file"
              ref={fileInputRef}
              multiple
              onChange={importExcel}
              accept=".xlsx"
              className="hidden select-none "
            />
            İmport Portfolio From Excel
          </label>

          <AddPortfolioButton onClick={handleShowModal} />
        </div>
      </div>
    </>
  );
}

export default Header;
