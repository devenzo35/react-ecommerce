import React from "react";
import { Provider } from "react-redux";
import "./assets/main.css";
import AppRouter from "./routers/AppRouter";
import { store } from "./store/store";

export const EcommerceApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
