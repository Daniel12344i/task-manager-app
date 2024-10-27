// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css"; // Include Tailwind and any global styles here
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
