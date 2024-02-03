import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import { Head } from "./Head";
import { GlobalStyle } from "./styles";
import { isEnv } from "./utils";

if (isEnv("production")) disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Head />
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
