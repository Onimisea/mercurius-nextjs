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
  const [productDIs, setProductDIs] = useState({});

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
        setCurrProductDI(bgUrl(currProdDI[0].product_images));
        // setCurrProductDI(currProdDI[0]);
      }

      if (currProd[0]) {
        setProductDIs(currProd[0].product_images);
      }
    }
  }, []);

  // console.log(currProduct);
  // console.log(currProductDI);
  // console.log(productDIs);

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>
          Mercurius {currProduct.name} | Best Thrift Store in Nigeria
        </title>
      </Head>

      <section className="w-full mx-auto max-w-screen-xl grid place-items-center my-6 bg-white">
        <section className="w-full mx-auto max-w-screen-xl flex items-center justify-between mt-6">
          <section className="w-[48%] flex flex-col items-center justify-center">
            <section className="w-full h-[500px]">
              <img
                // src={bgUrl(lowersub.lowersubcategory_icon)}
                src={currProductDI}
                alt={currProduct.name}
                width={0}
                height={0}
                className="w-full h-[500px] max-h-[500px] object-cover object-center z-20"
              />
            </section>

            <section className="w-full h-[150px] flex items-center justify-between">
              {productDIs &&
                productDIs.map((pi) => {
                  console.log(pi);

                  // return (<h1>{pi.product}</h1>)

                  // return (
                  //   <img
                  //     src={bgUrl(pi.product_images)}
                  //     // src={currProductDI}
                  //     alt={pi.product}
                  //     width={0}
                  //     height={0}
                  //     className="w-[150px] h-[150px] object-cover object-center z-20 mx-2"
                  //   />
                  // );
                })}

              {/* {productDIs && console.log(productDIs)} */}
            </section>
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
