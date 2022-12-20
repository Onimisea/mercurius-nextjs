import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const FlashSlider = () => {
  const { flashsaleProducts } = useAppContext();

  return (
    <section className="w-full mx-auto p-6 bg-slate-500 grid place-items-center">
      <h1 className="font-dalek text-3xl text-primary">
        New Slider for Flash Products
      </h1>
      <p className="text-md text-gray-300">Construction In Progress</p>

      <section className="grid grid-col-1 sm3:grid-cols-2 md:grid-col-3">
        {flashsaleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </section>
  );
};

export default FlashSlider;
