import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./theme.css";
// Polyfill fetch for browsers/environments missing it
ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
