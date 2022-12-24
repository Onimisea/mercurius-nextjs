import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";
import Head from "next/head";

const ProductPage = () => {
  const router = useRouter();
  const {
    products,
    appState: { cart, wishlist },
    appStateDispatch,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    totalPrice,
    shipping,
    setShipping,
    salesTax,
    setSalesTax,
    numbersWithCommas,
    increaseQty,
    decreaseQty,
  } = useAppContext();

  const [currProduct, setCurrProduct] = useState({});

  const bgUrl = (imgUrl) =>
    "https://res.cloudinary.com/dxhq8jlxf/" + imgUrl.replace(/ /g, "%20");

  useEffect(() => {
    const currProd = products.filter((prod) => prod.slug === router.query.slug);

    setCurrProduct(currProd);
  }, [router.isReady]);

  console.log(currProduct);

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>Mercurius | Best Thrift Store in Nigeria</title>
      </Head>

      <section className="w-full mx-auto max-w-screen-xl grid place-items-center my-6 bg-white">
        <section className="w-full mx-auto max-w-screen-xl flex items-center justify-between mt-6">
          <section className="w-[48%] bg-red-400">
            <h1 className="text-black sm:text-2xl md:text-3xl md2:text-4xl font-dalek font-semibold">
              Product Images
            </h1>
          </section>

          <section className="w-[48%] bg-red-500">
            <h1 className="text-black sm:text-2xl md:text-3xl md2:text-4xl font-dalek font-semibold">
              Product Details
            </h1>
          </section>
        </section>

        <section className="w-full mx-auto max-w-screen-xl grid place-items-center mt-6">
          <h1 className="text-black sm:text-2xl md:text-3xl md2:text-4xl font-dalek font-semibold">
            You Might Also Like
          </h1>
        </section>
      </section>
    </section>
  );
};

export default ProductPage;
