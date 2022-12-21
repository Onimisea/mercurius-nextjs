import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const CategoryBanner = ({ catData }) => {
  const router = useRouter();

  const [catImg, setcatImg] = useState("");
  const [subcatObj, setSubcatObj] = useState({});

  // console.log(catData);

  // console.log(subcatData);

  function bgUrl(imgUrl) {
    return (
      "https://res.cloudinary.com/dxhq8jlxf/" + imgUrl.replace(/ /g, "%20")
    );
  }

  // console.log(catData);

  const catBg = catData.category_image;

  // console.log(catBg);

  useEffect(() => {
    if (router.isReady) {
      console.log(catBg);
    }
  }, []);

  // console.log(bgUrl(catBg));

  // console.log("https://res.cloudinary.com/dxhq8jlxf/" + catBg.replace(/ /g, "%20"));

  // useEffect(() => {
  //   if (router.isReady) {
  //     if (catData) {
  //       // setcatImg();
  //       // const catBg = bgUrl(catData.category_image);
  //       // console.log(catBg);
  //       console.log(catData);
  //     }
  //   }
  // }, []);

  return (
    <section className="w-full min-w-[320px] h-[100%] max-h-[400px] grid place-items-center overflow-hidden z-10 relative">
      {/* <section className="bg-black absolute top-0 left-0 w-full h-[100%] opacity-90"></section> */}

      {/* <Image
        src={catBg}
        alt=""
        width={0}
        height={0}
        className="w-full h-[100%] max-h-[400px] object-cover object-center"
      /> */}

      {/* <section className="text-white absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-4xl uppercase font-poppins font-bold tracking-wider">
          {catData.name}
        </h1>
        <p className="my-5 tracking-wide text-lg">{catData.desc}</p>
        <span className="text-primary">{`#mercurius${catData.slug}`}</span>
      </section> */}
    </section>
  );
};

export default CategoryBanner;
