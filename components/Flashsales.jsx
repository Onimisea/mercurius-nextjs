import React from "react";
import FlashsaleSlider from "./FlashsaleSlider";
import { useAppContext } from "../context/AppContext";
import Timer from "./Timer";


const Flashsales = () => {
  const { flashsaleTimerSwitch } = useAppContext();
  
  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <section className="flex items-center justify-center bg-black px-5 py-3 sm2:w-fit mx-auto md:px-7 md:py-4 font-bold">
        <h1 className="text-white sm:text-lg md:text-2xl md2:text-3xl font-dalek">
          Flash Sale
        </h1>
        {flashsaleTimerSwitch && <Timer />}
      </section>

      <section className="my-6 ">
        <FlashsaleSlider />
      </section>
    </section>
  );
};

export default Flashsales;
