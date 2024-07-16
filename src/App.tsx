import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/Home";
import { AppProvider } from "./context/AppProvider";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Home />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
