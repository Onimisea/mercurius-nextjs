import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";
import { GoSearch, GoSettings } from "react-icons/go";

const AllProducts = () => {
  const {
    products,
    productFilter: { byCategory, searchQuery },
    productFilterDispatch,
  } = useAppContext();

  const transformProducts = () => {
    let filteredProducts = products;

    if (byCategory) {
      if (byCategory === "all") {
        filteredProducts = filteredProducts.filter((product) =>
          product.product_type.includes("")
        );
      } else {
        filteredProducts = filteredProducts.filter((product) =>
          product.product_type.includes(byCategory)
        );
      }
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    return filteredProducts;
  };

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl pt-16 pb-14 flex flex-col items-center">
      <h1 className="text-black sm:text-lg md:text-2xl md2:text-3xl lg:text-4xl font-dalek font-bold">
        All Products
      </h1>

      <section className="flex flex-row items-center justify-center flex-wrap mt-6">
        <section
          className="bg-white w-fit text-center m-2 p-2 rounded-md shadow-md cursor-pointer hover:border-[1px] border-primary"
          onClick={(e) => {
            productFilterDispatch({
              type: "FILTER_BY_CATEGORY",
              payload: "all",
            });
          }}
        >
          <p>All</p>
        </section>

        {products.map((product) => (
          <section
            key={product.id}
            className="bg-white w-fit text-center m-2 p-2 rounded-md shadow-md cursor-pointer hover:border-[1px] border-primary"
            onClick={(e) => {
              productFilterDispatch({
                type: "FILTER_BY_CATEGORY",
                payload: product.product_type,
              });
            }}
          >
            <p className="">{product.product_type}</p>
          </section>
        ))}
      </section>

      <section className="search w-[85%] mx-auto max-w-screen-xl mt-10 mb-5">
        <form className="w-full">
          <label
            htmlFor="search__input"
            className="flex items-center justify-center"
          >
            <input
              type="search"
              className="bg-white py-2 pl-4 pr-7 sm:w-full rounded-md border-[0.1rem] outline-none border-gray-400 hover:border-primary focus:border-primary placeholder-gray-300 hover:placeholder-primary-300 text-sm md:py-4 md:w-[70%]"
              placeholder="Search for product"
              required
              onChange={(e) => {
                productFilterDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
            {/* <GoSettings className="filter__icon z-20 -ml-6 hover:text-primary focus:text-primary cursor-pointer" /> */}
          </label>
        </form>
      </section>

      {/* {transformProducts().length > 0 ? (
        transformProducts().map((product) => (
          <section className="w-full mx-auto max-w-screen-xl flex flex-wrap items-center justify-center">
            <ProductCard product={product} />
          </section>
        ))
      ) : (
        <section className="w-full mx-auto max-w-screen-xl flex flex-wrap items-center justify-center">
          <h3 className="font-dalek text-xl mt-6">No Product Found</h3>
        </section>
      )} */}

      <section className="w-full mx-auto max-w-screen-xl flex flex-wrap items-center justify-center">
        {transformProducts().length > 0 ? (
          transformProducts().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h3>No Product Found</h3>
        )}
      </section>
    </section>
  );
};

export default AllProducts;
