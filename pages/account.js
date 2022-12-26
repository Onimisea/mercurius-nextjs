import React from "react";
import Head from "next/head";

const account = () => {
  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>Mercurius | Account | Best Thrift Store in Nigeria</title>
      </Head>

      <section className="w-full grid place-items-center my-10">
        <h1 className="text-2xl sm2:text-3xl md2:text-4xl text-primary font-dalek">
          Settings
        </h1>

        <section className="w-full flex items-start justify-between mt-8">
          <section className="bg-gray-300 w-[36%]">Sidebar</section>

          <section className="bg-gray-400 w-[60%]">Main</section>
        </section>
      </section>
    </section>
  );
};

export default account;
