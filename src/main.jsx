import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index";
import MusicPlayer from "./components/MusicPlayer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <MusicPlayer />
    </Provider>
  </React.StrictMode>
);
