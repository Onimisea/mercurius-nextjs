import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/AppContext";
import { CategoryBanner } from "../../components";

export default function CategoryPage({ categories, products }) {
  const router = useRouter();

  const { products } =
    useAppContext();

  const [catObj, setCatObj] = useState({});

  const bgUrl = (imgUrl) =>
    "https://res.cloudinary.com/dxhq8jlxf/" + imgUrl.replace(/ /g, "%20");

  const getCatData = () => {
    // const cat = JSON.parse(window.localStorage.getItem("CategoryData"));
    const ccd = categories.filter((category) => category.slug === router.query.slug);

    console.log(ccd);
    // console.log(router.query.slug);
    const catExt = {
      name: ccd[0].name,
      desc: ccd[0].description,
      slug: ccd[0].slug,
      bg: bgUrl(ccd[0].category_image),
    };

    setCatObj(catExt);
  };

  useEffect(() => {
    if (router.isReady) getCatData();
  }, [router.query, router.isReady]);

  console.log(catObj)

  return (
    <section className="">
      <Head>
        <title>Mercurius | Best Thrift Store in Nigeria</title>
      </Head>

      <section className="z-10">
        <CategoryBanner catData={catObj} />
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
