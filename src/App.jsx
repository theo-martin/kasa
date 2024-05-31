import React from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import AppRouter from "./Router";
import "./styles/css/style.css";

function App() {
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
