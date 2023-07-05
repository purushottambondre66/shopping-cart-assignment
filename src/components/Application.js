import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AllProducts } from "../pages/allProducts/AllProducts";
import { ProductList } from "../pages/allProducts/ProductList";

export const Application = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/all-products"} />} />
      <Route path="/all-products" element={<AllProducts />} />
      <Route path="/product-list/:subCategoryId" element={<ProductList />} />
    </Routes>
  );
};
