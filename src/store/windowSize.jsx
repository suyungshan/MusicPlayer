import { createSlice } from "@reduxjs/toolkit";

const initialWindowSizeState = { smallScreen: false, midScreen: false };

const windowSizeSlice = createSlice({
  name: "windowSize",
  initialState: initialWindowSizeState,
  reducers: {
    closeSmallScreen(state) {
      state.smallScreen = false;
    },
    openSmallScreen(state) {
      state.smallScreen = true;
    },
    closeMidScreen(state) {
      state.midScreen = false;
    },
    openMidScreen(state) {
      state.midScreen = true;
    },
  },
});

export const windowSizeActions = windowSizeSlice.actions;

export default windowSizeSlice.reducer;
