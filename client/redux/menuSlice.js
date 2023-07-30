import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    value: false,
  },
  reducers: {
    toggleMenu: (state) => {
      state.value = !state.value;
    }
  },
});


export const { toggleMenu } = menuSlice.actions;

export const selectMenuState = (state) => state.menu.value;

export default menuSlice.reducer;