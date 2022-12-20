import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FlashSlider = () => {
  const { flashsaleProducts } = useAppContext();

  return (
    <section className="w-full mx-auto p-6 bg-slate-200 grid place-items-center group relative">
      <section className="flex items-center justify-center overflow-hidden">
        product
        {/* {flashsaleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))} */}
      </section>
      <section className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 cursor-pointer bg-primary text-white opacity-50 group-hover:opacity-100">
        <FaChevronLeft size={20} />
      </section>

      <section className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 cursor-pointer bg-primary text-white opacity-50 group-hover:opacity-100">
        <FaChevronRight size={20} />
      </section>
    </section>
  );
};

export default FlashSlider;
