import React from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";
import Head from "next/head";

const ProductPage = () => {
  const router = useRouter();
  const {
    productFilter: { byCategory, searchQuery },
    productFilterDispatch,
  } = useAppContext();

  const bgUrl = (imgUrl) =>
    "https://res.cloudinary.com/dxhq8jlxf/" + imgUrl.replace(/ /g, "%20");

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>Mercurius | Best Thrift Store in Nigeria</title>
      </Head>

      <section className="w-full mx-auto max-w-screen-xl flex flex-wrap items-center justify-center my-6">
        <h1 className="text-black sm:text-2xl md:text-3xl md2:text-4xl lg:text-5xl font-dalek font-semibold">
          Single Product Page
        </h1>
      </section>
    </section>
  );
};

export default ProductPage;
