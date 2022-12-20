import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const FlashSlider = () => {
  const { flashsaleProducts } = useAppContext();

  return (
    <section className="w-full mx-auto p-6 bg-slate-500 grid place-items-center">
      

      <section className="flex items-center justify-center overflow-hidden">
        {/* {flashsaleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))} */}
      </section>
    </section>
  );
};

export default FlashSlider;
