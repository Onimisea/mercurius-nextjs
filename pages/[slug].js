import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";
import Head from "next/head";

const ProductPage = ({ products }) => {
  const router = useRouter();
  const {
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
  const [currProductDI, setCurrProductDI] = useState({});

  const bgUrl = (imgUrl) =>
    "https://res.cloudinary.com/dxhq8jlxf/" + imgUrl.replace(/ /g, "%20");

  useEffect(() => {
    if (products) {
      const currProd = products.filter(
        (prod) => prod.slug === router.query.slug
      );
      setCurrProduct(currProd[0]);

      if (currProd) {
        const currProdDI = currProd[0].product_images.filter(
          (img) => img.is_feature === true
        );
        // setCurrProductDI(bgUrl(currProdDI[0]));
        setCurrProductDI(currProdDI[0]);
      }
    }
  }, []);

  console.log(currProduct);
  console.log(currProductDI);

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>
          Mercurius {currProduct.name} | Best Thrift Store in Nigeria
        </title>
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

        <section className="w-full mx-auto max-w-screen-xl grid place-items-center bg-red-600 mt-10">
          <h1 className="text-black sm:text-2xl md:text-3xl font-dalek font-semibold">
            You Might Also Like
          </h1>
        </section>
      </section>
    </section>
  );
};

export default ProductPage;

export const getServerSideProps = async ({ req }) => {
  const products = await fetch(
    "https://mercurius-api-production.up.railway.app/api/inventory/"
  ).then((res) => res.json());

  return {
    props: {
      products,
    },
  };
};
