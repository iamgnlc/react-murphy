import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import { logo } from "./logo";
import { isEnv } from "./utils";

logo();

if (isEnv("production")) disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
