import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";
import Head from "next/head";

const ProductPage = ({ product, productImages }) => {
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

  const [productDI, setProductDI] = useState(null);
  const pdi = productImages.filter((pi) => pi.is_featured === true);
  setProductDI(pdi[0]);
  console.log(productDI)

  const bgUrl = (imgUrl) =>
    "https://res.cloudinary.com/dxhq8jlxf/" + imgUrl.replace(/ /g, "%20");

  useEffect(() => {}, []);

  console.log(product);
  console.log(productImages);

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>Mercurius {product.name} | Best Thrift Store in Nigeria</title>
      </Head>

      <section className="w-full mx-auto max-w-screen-xl grid place-items-center my-6 bg-white">
        <section className="w-full mx-auto max-w-screen-xl flex items-center justify-between mt-6">
          <section className="w-[48%] flex flex-col items-center justify-center">
            <section className="w-full h-[500px]">
              {}
              <img
                src=""
                alt=""
                width={0}
                height={0}
                className="w-full h-[500px] max-h-[500px] object-cover object-center z-20"
              />
            </section>

            <section className="w-full h-[150px] flex items-center justify-between"></section>
          </section>

          <section className="w-[48%]">
            <section className="text-black sm:text-2xl md:text-3xl font-semibold">
              {product.name}
            </section>
            <section className="mt-1 sm2:mt-2 font-semibold text-lg">
              ₦{numbersWithCommas(product.price)}
            </section>
            <section className="mt-1 sm2:mt-2 text-md">
              {product.description}
            </section>
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
    return {
      params: {
        slug: product.slug,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const products = await fetch(
    "https://mercurius-api-production.up.railway.app/api/inventory/"
  ).then((res) => res.json());

  const productArr = products.filter((product) => product.slug === slug);
  const product = productArr[0];

  const bgUrl = (imgUrl) =>
    "https://res.cloudinary.com/dxhq8jlxf/" + imgUrl.replace(/ /g, "%20");

  const productImages = product.product_images.map((pi) => ({
    product: pi.product,
    product_image: bgUrl(pi.product_images),
    alt_text: pi.alt_text,
    is_featured: pi.is_feature,
  }));

  return {
    props: {
      product,
      productImages,
    },
  };
};
