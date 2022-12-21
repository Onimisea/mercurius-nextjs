import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/AppContext";
import { CategoryBanner } from "../../components";

export default function CategoryPage({}) {
  const router = useRouter();
  const { products } = useAppContext();
  const [catObj, setCatObj] = useState({});
  const [catBg, setCatBg] = useState("");
  const [subcatObj, setSubcatObj] = useState({});

  const bgUrl = (imgUrl) =>
    "https://res.cloudinary.com/dxhq8jlxf/" + imgUrl.replace(/ /g, "%20");

  useEffect(() => {
    if (router.isReady) {
      const categories = fetch(
        "https://mercurius-api-production.up.railway.app/api/inventory/c/"
      )
        .then((res) => res.json())
        .then((catData) => {
          const cat = catData.filter(
            (category) => category.slug === router.query.slug[0]
          );

          setCatObj(cat[0]);
          setCatBg(bgUrl(cat[0].category_image));

          const subcats = cat[0].subcategories.filter(
            (subcat) => subcat.slug === router.query.slug[1]
            );

          setSubcatObj(subcats[0])
        });
    }
  }, [router.query]);

  console.log(subcatObj);

  return (
    <section className="">
      <Head>
        <title>Mercurius {subcatObj.name} | Best Thrift Store in Nigeria</title>
      </Head>

      <section className="w-full min-w-full h-fit max-h-fit grid place-items-center overflow-hidden z-10 relative">
        <section className="bg-black absolute top-0 left-0 w-full h-[100%] opacity-70 z-30"></section>

        <img
          src={catBg}
          alt=""
          width={0}
          height={0}
          className="w-full h-fit max-h-fit object-cover object-center z-20"
        />

        <section className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center px-4 z-40">
          <h1 className="text-white sm:text-lg md:text-2xl md2:text-3xl lg:text-4xl font-dalek font-semibold">
            {subcatObj.name}
          </h1>
          <p className="text-white text-sm mt-4">{subcatObj.description}</p>
        </section>
      </section>
    </section>
  );
}

export const getServerSideProps = async ({ req }) => {
  // const session = await getSession({ req });

  const products = await fetch(
    "https://mercurius-api-production.up.railway.app/api/inventory/"
  ).then((res) => res.json());

  return {
    props: {
      products,
    },
  };
};
