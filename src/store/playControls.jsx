import { createSlice } from "@reduxjs/toolkit";

const initailPlayControlsState = {
  playPause: false,
  mute: false,
  played: 0,
  volume: 0.5,
  loop: false,
  videoIndex: 0,
  allLoop: false,
  random: false,
  playSecond: "00:00",
  remainSecond: "04:46",
  favPlay: false,
  active: null,
};

const playControlsSlice = createSlice({
  name: "playControl",
  initialState: initailPlayControlsState,
  reducers: {
    play(state) {
      state.playPause = true;
    },

    pause(state) {
      state.playPause = false;
    },

    togglePlay(state) {
      state.playPause = !state.playPause;
    },

    toggleMute(state) {
      state.mute = !state.mute;
    },

    resetPlayed(state) {
      state.played = 0;
    },

    adjustPlayed(state, action) {
      state.played = action.payload;
    },

    adjustValume(state, action) {
      state.volume = action.payload;
    },

    toggleLoop(state) {
      state.loop = !state.loop;
    },

    stopLoop(state) {
      state.loop = false;
    },

    adjustVideoIndex(state, action) {
      state.videoIndex = action.payload;
    },

    stopAllLoop(state) {
      state.allLoop = false;
    },

    toggleAllLoop(state) {
      state.allLoop = !state.allLoop;
    },

    toggleRandom(state) {
      state.random = !state.random;
    },

    adjustplaySecond(state, action) {
      state.playSecond = action.payload;
    },

    adjustRemainSecond(state, action) {
      state.remainSecond = action.payload;
    },

    openFavPlay(state) {
      state.favPlay = true;
    },

    closeFavPlay(state) {
      state.favPlay = false;
    },

    adjustActive(state, action) {
      state.active = action.payload;
    },
  },
});

export const playControlsActions = playControlsSlice.actions;

export default playControlsSlice.reducer;
