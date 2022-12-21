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
          setSubcatObj(cat[0]);
        });

      // const subcategories = catObj.subcategories.map(subcat => {
      //   console.log()
      // });

      for (let subcat of catObj.subcategories) {
        console.log(subcat);
      }
    }
  }, []);

  console.log(router.query);

  return (
    <section className="">
      <Head>
        <title>Mercurius {catObj.name} | Best Thrift Store in Nigeria</title>
      </Head>

      <section className="">
        <CategoryBanner catData={catObj} subcatData={subcatObj} />
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
