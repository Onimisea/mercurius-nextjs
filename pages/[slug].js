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

      if (currProduct) {
        console.log(currProduct);
        // const currProdDI = currProduct.product_images.filter(
        //   (img) => img.is_feature === true
        // );
        // setCurrProductDI(bgUrl(currProdDI[0]));

        //   if (currProd[0].product_images) {
        //     setProductDIs(currProd[0].product_images);
        //   }
      }
    }
  }, []);

  console.log(currProduct);
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
                src={currProductDI}
                alt={currProduct.name}
                width={0}
                height={0}
                className="w-full h-[500px] max-h-[500px] object-cover object-center z-20"
              />
            </section>

            <section className="w-full h-[150px] flex items-center justify-between"></section>
          </section>

          <section className="w-[48%]">
            {/* <section className="text-black sm:text-2xl md:text-3xl font-semibold">
              {currProduct.name}
            </section>
            <section className="mt-1 sm2:mt-2 font-semibold text-lg">
              ₦{numbersWithCommas(currProduct.price)}
            </section>
            <section className="mt-1 sm2:mt-2 text-md">
              {currProduct.description}
            </section> */}
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

export const getStaticPaths = async () => {
  const products = await fetch(
    "https://mercurius-api-production.up.railway.app/api/inventory/"
  ).then((res) => res.json());

  const paths = products.map((product) => {
    console.log(product);

    return {
      params: {
        slug: product.slug,
      },
    };
  });

  console.log(paths.params);
  console.log(products);

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  console.log(slug);

  const products = await fetch(
    "https://mercurius-api-production.up.railway.app/api/inventory/"
  ).then((res) => res.json());

  return {
    props: {
      products,
    },
  };
};
