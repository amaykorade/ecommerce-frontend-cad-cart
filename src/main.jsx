import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
// import { CartProvider } from "./utils/addToCart.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <CartProvider> */}
    {/* <ToastContainer /> */}
    <App />
    {/* </CartProvider> */}
  </Provider>
);
