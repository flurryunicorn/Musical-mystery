import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import Game from "./components/Game";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <Game /> */}
    </BrowserRouter>
  </React.StrictMode>
);
