import { configureStore } from "@reduxjs/toolkit";
import interfaceReducer from "./interface";
import musicDataReducer from "./musicData";
import playControlsReducer from "./playControls";
import windowSizeReducer from "./windowSize";

const store = configureStore({
  reducer: {
    interface: interfaceReducer,
    musicData: musicDataReducer,
    playControls: playControlsReducer,
    windowSize: windowSizeReducer,
  },
});

export default store;
