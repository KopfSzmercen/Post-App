import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider } from "@mui/material/styles";
import customTheme from "./config/customTheme";

import { store } from "./store/store";
import { Provider } from "react-redux";

export const BASE_API_URL = "https://glacial-wave-95692.herokuapp.com";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={customTheme}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
