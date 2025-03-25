import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
// import ProductCard from "./components/molecules/ProductCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Product } from "./components/Product";
import { Home } from "./components/Home";
import ProductDetails from "./components/productDetails";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      {/* <ProductCard /> */}
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Product />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
