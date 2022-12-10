import React from "react";
import Head from "next/head";
import Script from "next/script";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <section className="layout font-poppins">
      <Head>
        

      </Head>
      <header className="header bg-white shadow-lg overflow-x-hidden z-50">
        <Header />
      </header>

      <main className="main">{children}</main>

      <footer className="footer bg-black">
        <Footer />
      </footer>
    </section>
  );
};

export default Layout;
