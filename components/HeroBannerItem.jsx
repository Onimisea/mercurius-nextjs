import React from "react";
import Image from "next/image";
import heroImg1 from "../public/assets/hero-imgs/hero-bg.jpg";
import heroImg2 from "../public/assets/hero-imgs/hero-bg2.png";
import heroImg3 from "../public/assets/hero-imgs/hero-bg3.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const heroImgs = [
  {
    image: heroImg2,
    heading: "Mercurius",
    desc: "The best online clothing option for you",
    hashtag: "#mercurius4all",
  },
  {
    image: heroImg1,
    heading: "Mercurius",
    desc: "The best online clothing option for you",
    hashtag: "#mercurius4all",
  },
  {
    image: heroImg3,
    heading: "Mercurius",
    desc: "The best online clothing option for you",
    hashtag: "#mercurius4all",
  },
];

const HeroBannerItem = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul className="m-0">{dots}</ul>;
    },
  };

  return (
    <>
      <Slider
        {...settings}
        className="heroSlider w-full h-[100%] max-h-[500px] overflow-hidden relative"
      >
        {heroImgs.map((img, i) => (
          <section className="relative" key={i}>
            <section className="bg-black absolute top-0 left-0 w-full h-[100%] opacity-90"></section>
            <Image
              src={img.image}
              alt=""
              width={0}
              height={0}
              className="w-full h-[100%] max-h-[500px] object-cover object-center"
            />

            <section className="text-white absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
              <h1 className="text-4xl uppercase font-poppins font-bold tracking-wider">
                {img.heading}
              </h1>
              <p className="my-5 tracking-wide text-lg">{img.desc}</p>
              <span className="text-primary">{img.hashtag}</span>
            </section>
          </section>
        ))}
      </Slider>
    </>
  );
};

export default HeroBannerItem;
