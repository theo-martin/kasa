import "./styles/css/style.css";
import App from "./App";
import { RouterProvider } from "react-router";
import router from "./router";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import React from "react";
import ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Header />
      <App />
      <Footer />
    </RouterProvider>
  </React.StrictMode>
);
