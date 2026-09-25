import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import { isEnv } from "./utils";
import { logo } from "./logo";

logo();

if (isEnv("production")) disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
