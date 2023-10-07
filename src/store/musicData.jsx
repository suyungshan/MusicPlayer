import { createSlice } from "@reduxjs/toolkit";
import {
  DUMMY_DATA,
  DUMMY_ALBUMHOT,
  DUMMY_ALBUMNEW,
  DUMMY_ALBUMRECOMMEND,
  DUMMY_ALBUMFEATURED,
} from "./DummyData";

const initialMusicDataState = {
  musicPlay: DUMMY_DATA.list,
  favList: [],
  nextPlay: DUMMY_DATA,
  playingData: DUMMY_DATA,
  controlerInfor: DUMMY_DATA,
  albumHot: DUMMY_ALBUMHOT,
  albumNew: DUMMY_ALBUMNEW,
  albumRecommend: DUMMY_ALBUMRECOMMEND,
  albumFeature: DUMMY_ALBUMFEATURED,
};

const musicDataSlice = createSlice({
  name: "musicData",
  initialState: initialMusicDataState,
  reducers: {
    updateMusicPlay(state, action) {
      state.musicPlay = action.payload;
    },

    updateFavList(state, action) {
      state.favList = action.payload;
    },

    updateNextPlay(state, action) {
      state.nextPlay = action.payload;
    },

    updatePlayingData(state, action) {
      state.playingData = action.payload;
    },

    updateControlerInfor(state, action) {
      state.controlerInfor = action.payload;
    },
  },
});

export const musicDataActions = musicDataSlice.actions;

export default musicDataSlice.reducer;
