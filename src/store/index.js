import { configureStore } from "@reduxjs/toolkit";
import portfolios from "./portfolios";
import sidebar from "./sidebar";
import modal from "./modal";

export const store = configureStore({
  devTools: true,
  reducer: {
    portfolios,
    sidebar,
    modal,
  },
});
