import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FlashSlider = () => {
  const { flashsaleProducts } = useAppContext();

  const slides = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <section className="w-full mx-auto p-6 bg-slate-200 group relative overflow-hidden">
      <section className="inline-block whitespace-nowrap overflow-x-scroll">
        {/* {flashsaleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))} */}
        {slides.map((slide, index) => {
          return (
            <section
              key={index}
              className="bg-[#f5f5f5] p-8 rounded-xl grid place-items-center text-xl w-[250px] mx-4"
            >
              Slide {slide}
            </section>
          );
        })}
      </section>
      <section className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-0 text-2xl rounded-full p-2 cursor-pointer bg-primary text-white opacity-50 group-hover:opacity-100">
        <FaChevronLeft size={20} />
      </section>

      <section className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-0 text-2xl rounded-full p-2 cursor-pointer bg-primary text-white opacity-50 group-hover:opacity-100">
        <FaChevronRight size={20} />
      </section>
    </section>
  );
};

export default FlashSlider;
