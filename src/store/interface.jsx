import { createSlice } from "@reduxjs/toolkit";

const initialInterfaceState = {
  home: true,
  fav: false,
  main: false,
  control: false,
  unFinish: false,
  profile: false,
  setting: false,
};

const interfaceSlice = createSlice({
  name: "interface",
  initialState: initialInterfaceState,
  reducers: {
    openHome(state) {
      state.home = true;
    },

    closeHome(state) {
      state.home = false;
    },

    openFav(state) {
      state.fav = true;
    },

    closeFav(state) {
      state.fav = false;
    },

    openMain(state) {
      state.main = true;
    },

    closeMain(state) {
      state.main = false;
    },

    openControl(state) {
      state.control = true;
    },

    closeControl(state) {
      state.control = false;
    },

    openUnFinish(state) {
      state.unFinish = true;
    },

    closeUnFinish(state) {
      state.unFinish = false;
    },
    openProfile(state) {
      state.profile = true;
    },

    closeProfile(state) {
      state.profile = false;
    },
    openSetting(state) {
      state.setting = true;
    },

    closeSetting(state) {
      state.setting = false;
    },
  },
});

export const interfaceActions = interfaceSlice.actions;

export default interfaceSlice.reducer;
