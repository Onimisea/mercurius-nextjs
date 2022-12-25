import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";
import Head from "next/head";
import { MdClose } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

const ProductPage = ({ product, productImages, pdi }) => {
  const router = useRouter();

  const {
    appState: { cart, wishlist },
    appStateDispatch,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    totalPrice,
    shipping,
    setShipping,
    salesTax,
    setSalesTax,
    numbersWithCommas,
    increaseQty,
    decreaseQty,
  } = useAppContext();

  const [productDI, setProductDI] = useState(pdi);

  const bgUrl = (imgUrl) =>
    "https://res.cloudinary.com/dxhq8jlxf/" + imgUrl.replace(/ /g, "%20");

  useEffect(() => {}, []);

  console.log(product);

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>Mercurius {product.name} | Best Thrift Store in Nigeria</title>
      </Head>

      <section className="w-full mx-auto max-w-screen-xl grid place-items-center my-6 bg-white">
        <section className="w-full mx-auto max-w-screen-xl flex items-start justify-between mt-6">
          <section className="w-[48%] flex flex-col items-center justify-center space-y-6">
            <section className="w-full h-[500px]">
              <img
                src={productDI.product_image}
                alt={productDI.product}
                width={0}
                height={0}
                className="w-full h-[500px] max-h-[500px] object-cover object-center z-20"
              />
            </section>

            <section className="w-full h-[150px] flex items-center justify-start overflow-x-scroll">
              {productImages.map((pi) => (
                <section className="w-[150px] h-[150px] space-x-4">
                  <img
                    src={pi.product_image}
                    alt={pi.product}
                    width={0}
                    height={0}
                    className="w-[150px] h-[150px] object-cover object-center z-20"
                  />
                </section>
              ))}
            </section>
          </section>

          <section className="w-[48%] py-6">
            <section className="text-black sm3:text-2xl md:text-3xl">
              {product.name}
            </section>
            <section className="mt-2 sm3:mt-4 font-semibold sm3:text-lg md:text-xl">
              ₦{numbersWithCommas(product.price)}
            </section>
            <section className="my-3 sm3:my-5 text-md">
              {product.description}
            </section>

            <section className="flex items-center justify-start space-x-4">
              <section
                className="bg-black w-[30px] h-[30px] grid place-items-center text-white rounded-sm cursor-pointer hover:bg-primary duration-300"
                onClick={() => increaseQty(product.id)}
              >
                +
              </section>
              <section>{item.qty}</section>
              <section
                className="bg-black w-[30px] h-[30px] grid place-items-center text-white rounded-sm cursor-pointer hover:bg-primary duration-300"
                onClick={() => decreaseQty(product.id)}
              >
                -
              </section>
            </section>

            <section className="">
              <ul className="block space-y-2">
                {cart.some((p) => p.id === product.id) ? (
                  <li
                    className="bg-black w-full h-fit grid place-items-center cursor-pointer text-white hover:bg-primary rounded-sm"
                    onClick={() => {
                      removeFromCart(product);
                      toast.error(`${product.name} removed from cart`);
                    }}
                  >
                    <section className="flex items-center justify-center px-4 py-2 space-x-2">
                      <MdClose size={20} className="" />
                      <p className="text-md">Remove from Cart</p>
                    </section>
                  </li>
                ) : (
                  <li
                    className="bg-black w-full h-fit grid place-items-center cursor-pointer text-white hover:bg-primary rounded-sm"
                    onClick={() => {
                      addToCart(product);
                      toast.success(`${product.name} added to cart`);
                    }}
                  >
                    <section className="flex items-center justify-center px-4 py-2 space-x-2">
                      <FaShoppingCart size={20} className="" />
                      <p className="text-md">Add to Cart</p>
                    </section>
                  </li>
                )}

                {wishlist.some((w) => w.id === product.id) ? (
                  <li
                    className="bg-black w-full h-fit grid place-items-center cursor-pointer text-white hover:bg-primary rounded-sm"
                    onClick={() => {
                      removeFromWishlist(product);
                      toast.error(`${product.name} removed from favourite`);
                    }}
                  >
                    <section className="flex items-center justify-center px-4 py-2 space-x-2">
                      <MdClose size={20} className="" />
                      <p className="text-md">Remove from Favourite</p>
                    </section>
                  </li>
                ) : (
                  <li
                    className="bg-black w-full h-fit grid place-items-center cursor-pointer text-white hover:bg-primary rounded-sm"
                    onClick={() => {
                      addToWishlist(product);
                      toast.success(`${product.name} added to favourite`);
                    }}
                  >
                    <section className="flex items-center justify-center px-4 py-2 space-x-2">
                      <FiHeart size={20} className="" />
                      <p className="text-md">Add to Cart</p>
                    </section>
                  </li>
                )}
              </ul>
            </section>
          </section>
        </section>

        <section className="w-full mx-auto max-w-screen-xl grid place-items-center mt-16">
          <h1 className="text-black sm:text-2xl md:text-3xl font-dalek font-semibold">
            You Might Also Like
          </h1>
        </section>
      </section>
    </section>
  );
};

export default ProductPage;

export const getStaticPaths = async () => {
  const products = await fetch(
    "https://mercurius-api-production.up.railway.app/api/inventory/"
  ).then((res) => res.json());

  const paths = products.map((product) => {
    return {
      params: {
        slug: product.slug,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const products = await fetch(
    "https://mercurius-api-production.up.railway.app/api/inventory/"
  ).then((res) => res.json());

  const productArr = await products.filter((product) => product.slug === slug);

  const product = await productArr[0];

  console.log(product);

  const bgUrl = (imgUrl) =>
    "https://res.cloudinary.com/dxhq8jlxf/" + imgUrl.replace(/ /g, "%20");

  const productImages = await product.product_images.map((pi) => ({
    product: pi.product,
    product_image: bgUrl(pi.product_images),
    alt_text: pi.alt_text,
    is_featured: pi.is_feature,
  }));

  const pdiArr = await productImages.filter((pi) => pi.is_featured === true);

  const pdi = await pdiArr[0];

  return {
    props: {
      product,
      productImages,
      pdi,
    },
  };
};
