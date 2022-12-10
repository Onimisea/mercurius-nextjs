import React from "react";
import Link from "next/link";

import { MdFacebook } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillGoogleCircle,
} from "react-icons/ai";

const Footer = () => {
  return (
    <section className="text-gray-300 w-[85%] max-w-screen-xl mx-auto py-12 flex flex-wrap items-center md:justify-evenly space-y-6 space-x-10">
      <section className="about">
        <Link href="/">
          <h1 className="logo text-primary font-dalek text-2xl mb-6">
            MERCURIUS
          </h1>
        </Link>

        <p className="text-md">
          Nigeria's No.1 thrift and luxury e-commerce <br />
          website that caters for all your fashion needs. <br />
          Offers high-quality fashion items and tech gadgets <br />
          at great discount and coupons.
        </p>
      </section>
      <section className="links">
        <h3 className="text-primary font-dalek text-xl mb-6">Other Links</h3>
        <ul>
          <li className="my-1">
            <section className="cursor-pointer hover:text-primary">
              <Link href="/about">About Mercurius</Link>
            </section>
          </li>
          <li className="my-1">
            <section className="cursor-pointer hover:text-primary">
              <Link href="/contacts">Contact Us</Link>
            </section>
          </li>
          <li className="my-1">
            <section
              className="cursor-pointer hover:text-primary"
            >
              <Link href="/terms-of-service">Terms of Service</Link>
            </section>
          </li>
          <li className="my-1">
            <section
              className="cursor-pointer hover:text-primary"
            >
              <Link href="/privacy-policy">Privacy Policy</Link>
            </section>
          </li>
        </ul>
      </section>
      <section className="contact">
        <h3 className="text-primary font-dalek text-xl mb-6">Contact Us</h3>
        <ul>
          <li>WorldWide</li>
          <li className="my-1">
            <section
              className="cursor-pointer hover:text-primary"
            >
              <Link href="tel:+2348034023726">+234 803 402 3726</Link>
            </section>
          </li>
          <li className="my-1">
            <section
              className="cursor-pointer hover:text-primary"
            >
              <Link href="mailto:sales@mercurius.com">sales@mercurius.com</Link>
            </section>
          </li>
        </ul>
        <section className="mt-4 flex space-x-4 text-xl">
          <MdFacebook className="social__icon cursor-pointer hover:text-primary hover:scale-125 duration:300" />
          <AiFillTwitterCircle className="social__icon cursor-pointer hover:text-primary hover:scale-125 duration:300" />
          <AiFillInstagram className="social__icon cursor-pointer hover:text-primary hover:scale-125 duration:300" />
          <AiFillGoogleCircle className="social__icon cursor-pointer hover:text-primary hover:scale-125 duration:300" />
        </section>
      </section>
    </section>
  );
};

export default Footer;
