import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "@/services/localStorageService";
import { calculatePurchaseAndPostSaleSummary } from "@/utils/stockCalculator";

const initialState = {
  data: [],
};

export const portfolios = createSlice({
  name: "portfolios",
  initialState,
  reducers: {
    addPortfolio: (state, action) => {
      const portfolio = action.payload;
      state.data = [...state.data, portfolio];
      localStorageService.addPortfolio(portfolio);
    },
    deletePortfolio: (state, action) => {
      const portfolioId = action.payload;
      state.data = state.data.filter((d) => d.id !== portfolioId);
      localStorageService.deletePortfolio(portfolioId);
    },
    setPortfolios: (state, action) => {
      state.data = action.payload;
    },
    addStock: (state, action) => {
      const stock = action.payload;
      const portfolios = state.data;
      const portfolio = portfolios.find(
        (portfolio) => portfolio.id === stock.portfolioId
      );
      portfolio.stocks.push(stock);

      localStorageService.addStock(stock);
    },

    addRecord: (state, action) => {
      const record = action.payload;
      const portfolios = state.data;
      const portfolio = portfolios.find(
        (portfolio) => portfolio.id === record.portfolioId
      );

      const stock = portfolio.stocks.find(
        (stock) => stock.id === record.stockId
      );

      stock.records.push(record);

      let { totalCost, totalPiece, averageCost, profitAndLoss } =
        calculatePurchaseAndPostSaleSummary(stock.records);
      console.log(totalCost, totalPiece, averageCost, profitAndLoss);

      stock.totalCost = totalCost || 0;
      stock.totalPiece = totalPiece || 0;
      stock.averageCost = averageCost || 0;
      stock.profitAndLoss = profitAndLoss || 0;

      const stockIndex = portfolio.stocks.findIndex(
        (stock) => stock.id === record.stockId
      );
      portfolio.stocks.splice(stockIndex, 1, stock);

      portfolio.profitAndLoss = parseFloat(
        portfolio.stocks
          .reduce((acc, stock) => acc + stock.profitAndLoss, 0)
          .toFixed(2)
      );

      portfolio.totalCost = parseFloat(
        portfolio.stocks
          .reduce((acc, stock) => acc + stock.totalCost, 0)
          .toFixed(2)
      );

      localStorageService.replacePortfolio(portfolio);
    },
    updateStockRecord: (state, action) => {
      const { portfolioId, stockId, id, ...otherData } = action.payload;
      const portfolios = state.data;
      const portfolio = portfolios.find(
        (portfolio) => portfolio.id === portfolioId
      );
      const stock = portfolio.stocks.find((stock) => stock.id === stockId);
      const updatedRecordIndex = stock.records.findIndex(
        (transaction) => transaction.id === id
      );

      stock.records.splice(updatedRecordIndex, 1, {
        portfolioId,
        stockId,
        id,
        ...otherData,
      });
      let { totalCost, totalPiece, averageCost, profitAndLoss } =
        calculatePurchaseAndPostSaleSummary(stock.records);

      stock.totalCost = totalCost || 0;
      stock.totalPiece = totalPiece || 0;
      stock.averageCost = averageCost || 0;
      stock.profitAndLoss = profitAndLoss || 0;

      const stockIndex = portfolio.stocks.findIndex(
        (item) => item.id === stock.id
      );
      portfolio.stocks.splice(stockIndex, 1, stock);

      portfolio.profitAndLoss = parseFloat(
        portfolio.stocks
          .reduce((acc, stock) => acc + stock.profitAndLoss, 0)
          .toFixed(2)
      );

      portfolio.totalCost = parseFloat(
        portfolio.stocks
          .reduce((acc, stock) => acc + stock.totalCost, 0)
          .toFixed(2)
      );

      localStorageService.replacePortfolio(portfolio);
    },
    deleteStock: (state, action) => {
      const { portfolioId, stockId } = action.payload;
      const portfolios = state.data;
      const portfolio = portfolios.find(
        (portfolio) => portfolio.id === portfolioId
      );

      portfolio.stocks = portfolio.stocks.filter(
        (stock) => stock.id !== stockId
      );

      portfolio.profitAndLoss = parseFloat(
        portfolio.stocks
          .reduce((acc, stock) => acc + stock.profitAndLoss, 0)
          .toFixed(2)
      );

      portfolio.totalCost = parseFloat(
        portfolio.stocks
          .reduce((acc, stock) => acc + stock.totalCost, 0)
          .toFixed(2)
      );

      localStorageService.deleteStock(portfolioId, stockId);
    },

    deleteStockRecord: (state, action) => {
      const { portfolioId, stockId, id } = action.payload;
      const portfolios = [...state.data];
      const portfolio = portfolios.find(
        (portfolio) => portfolio.id === portfolioId
      );
      const stock = portfolio.stocks.find((stock) => stock.id === stockId);

      const newRecords = stock.records.filter(
        (transaction) => transaction.id !== id
      );
      console.log("newRecords", newRecords);
      let { totalCost, totalPiece, averageCost, profitAndLoss } =
        calculatePurchaseAndPostSaleSummary(newRecords);

      stock.totalCost = totalCost || 0;
      stock.totalPiece = totalPiece || 0;
      stock.averageCost = averageCost || 0;
      stock.profitAndLoss = profitAndLoss || 0;
      stock.records = [...newRecords];

      portfolio.profitAndLoss = parseFloat(
        portfolio.stocks
          .reduce((acc, stock) => acc + stock.profitAndLoss, 0)
          .toFixed(2)
      );

      portfolio.totalCost = parseFloat(
        portfolio.stocks
          .reduce((acc, stock) => acc + stock.totalCost, 0)
          .toFixed(2)
      );
      localStorageService.replacePortfolio(portfolio);
    },
    refresh: (state) => {
      state.data = [...state.data];
    },
  },
  // extreReducers: {},
});

export const {
  addPortfolio,
  deletePortfolio,
  setPortfolios,
  addStock,
  addRecord,
  deleteStock,
  deleteStockRecord,
  updateStockRecord,
  refresh,
} = portfolios.actions;
export default portfolios.reducer;

//
