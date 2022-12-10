import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { AllProducts, Flashsales, HeroBanner } from "../components";
import { useAppContext } from "../context/AppContext";

export default function Home({
  session,
  categories,
  product,
  flashsale_timer,
}) {
  const {
    flashsaleProducts,
    isLoggedIn,
    setIsLoggedIn,
    setCategory,
    products,
    setProducts,
    flashsaleTimer,
    setFlashsaleTimer,
    flashsaleTimerSwitch,
    setFlashsaleTimerSwitch,
  } = useAppContext();

  useEffect(() => {
    if (categories) {
      window.localStorage.setItem("CategoryData", JSON.stringify(categories));
      setCategory(JSON.parse(window.localStorage.getItem("CategoryData")));
    }

    if (product) {
      window.localStorage.setItem("ProductsData", JSON.stringify(product));
      setProducts(JSON.parse(window.localStorage.getItem("ProductsData")));
    }

    if (flashsale_timer) {
      const activeFlashsaleDatetime = flashsale_timer[0].when;

      const activeFlashsaleDate = new Date(activeFlashsaleDatetime).getTime();

      window.localStorage.setItem(
        "FlashsaleTimeMilliseconds",
        activeFlashsaleDate
      );

      setFlashsaleTimer(
        window.localStorage.getItem("FlashsaleTimeMilliseconds")
      );

      if (Date.now() > activeFlashsaleDate) {
        setFlashsaleTimerSwitch(false);
      } else {
        setFlashsaleTimerSwitch(true);
      }
    }
  }, []);

  return (
    <section className="">
      <Head>
        <title>Mercurius | Best Thrift Store in Nigeria</title>
      </Head>

      <section className="z-10">
        <HeroBanner />
      </section>

      {flashsaleTimerSwitch && (
        <section className="my-6">
          <Flashsales />
        </section>
      )}

      <section className="mt-3 mb-3 bg-[#fafafa]">
        <AllProducts />
      </section>
    </section>
  );
}

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  const categories = await fetch("http://localhost:8000/api/inventory/c/").then(
    (res) => res.json()
  );

  const product = await fetch("http://localhost:8000/api/inventory/").then(
    (res) => res.json()
  );

  const flashsale_timer = await fetch(
    "http://localhost:8000/api/inventory/f/"
  ).then((res) => res.json());

  return {
    props: {
      session,
      categories,
      product,
      flashsale_timer,
    },
  };
};



