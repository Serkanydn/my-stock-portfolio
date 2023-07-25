import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "@/services/localStorageService";

const initialState = {
  isShow: true,
};

export const sidebar = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.isShow = !state.isShow;
    },
  },
  // extreReducers: {},
});

export const { toggleSidebar } = sidebar.actions;
export default sidebar.reducer;

//
