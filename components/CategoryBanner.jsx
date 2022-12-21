import React, { useState, useEffect } from "react";
import Image from "next/image";

const CategoryBanner = ({ catData }) => {
  console.log(catData);

  const [catImg, setcatImg] = useState("");
  // console.log(subcatData);

  useEffect(() => {
    if (catData) {
      const bgUrl = (imgUrl) =>
        "https://res.cloudinary.com/dxhq8jlxf/" + imgUrl.replace(/ /g, "%20");

      const catBg = bgUrl(catData.category_image);
      console.log(catBg);
    }
  }, []);

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
