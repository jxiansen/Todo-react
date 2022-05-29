import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App1 from "./classComponent";
import App2 from "./functionComponent";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App1 />
    {/* <App2 /> */}
  </React.StrictMode>
);
