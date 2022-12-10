import React from "react";
import HeroBannerItem from "./HeroBannerItem";

const HeroBanner = () => {
  return (
    <section className="w-full min-w-[320px] h-[100%] max-h-[500px] grid place-items-center overflow-hidden z-10">
      <HeroBannerItem />
    </section>
  );
};

export default HeroBanner;
