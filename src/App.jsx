import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "./Components/Footer";
import Header from "./Components/Header";
import "./styles/css/style.css";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
