import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { HoxRoot } from "hox";
ReactDOM.createRoot(document.getElementById("root")).render(
  // 全局Store 此处注册供全局组件调用
  <HoxRoot>
    <App />
  </HoxRoot>
);
