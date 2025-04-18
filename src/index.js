import React from "react";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initalState";
import reducer from "./context/reducer";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { ThemeProvider } from "@material-tailwind/react";
import { createRoot, hydrateRoot } from "react-dom/client";
import Snowfall from "./components/Snowfall"; // Snowfall компонентыг импорт хийх

// Get the root element
const rootElement = document.getElementById("root");

const AppWrapper = (
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Provider store={store}>
        <ThemeProvider>
          {/* Snowfall компонентыг бүх хуудсанд оруулах */}
          {/* <Snowfall /> */}
          <App />
        </ThemeProvider>
      </Provider>
    </StateProvider>
  </Router>
);

// Use hydrateRoot if there are pre-rendered HTML nodes, otherwise use createRoot
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, AppWrapper);
} else {
  createRoot(rootElement).render(AppWrapper);
}
