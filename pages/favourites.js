import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { getSession, useSession, signOut } from "next-auth/react";
import { Sidebar2 } from "../components";
import { FiMenu, FiPackage, FiEdit } from "react-icons/fi";
import { FaEnvelope, FaHeart } from "react-icons/fa";
import { MdClose, MdInventory } from "react-icons/md";
import { ImUser } from "react-icons/im";
import { RiLogoutBoxFill } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";

const favourites = ({ userStatus }) => {
  const {
    appState: { cart, wishlist },
    appStateDispatch,
    addToCart,
    removeFromWishlist,
    numbersWithCommas,
  } = useAppContext();

  const sidebarLinks = [
    {
      name: "Account",
      url: "/account",
      icon: <ImUser size={20} className="mr-2" />,
    },
    {
      name: "Favourites",
      url: "/favourites",
      icon: <FaHeart size={20} className="mr-2" />,
      active: true,
    },
    {
      name: "Orders",
      url: "/orders",
      icon: <FiPackage size={20} className="mr-2" />,
    },
    {
      name: "Inbox",
      url: "/inbox",
      icon: <FaEnvelope size={20} className="mr-2" />,
    },
    {
      name: "Inventory",
      url: "/inventory",
      icon: <MdInventory size={20} className="mr-2" />,
    },
    {
      name: "Log Out",
      url: null,
      icon: <RiLogoutBoxFill size={20} className="mr-2" />,
    },
  ];

  const [asideOpen, setAsideOpen] = useState(false);

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>Mercurius | Favourites | Best Thrift Store in Nigeria</title>
      </Head>

      {userStatus.error ? (
        <section className="w-full p-12 grid place-items-center text-center">
          <h4 className="text-xl text-primary text-center">
            Please, complete your Account registration!
          </h4>
          <Link href="/register">
            <button
              className="bg-black rounded-md mt-5 px-5 py-3 text-white hover:bg-primary cursor-pointer w-fit"
              onClick={handleSignOut}
            >
              Register
            </button>
          </Link>
        </section>
      ) : (
        <section className="w-full flex flex-col items-start justify-start my-10">
          <h1 className="text-2xl sm2:text-3xl md2:text-4xl text-primary font-dalek">
            Settings
          </h1>

          <section className="w-full flex items-start justify-start mt-8">
            <section className="flex flex-col h-full items-start sticky top-0 left-0 mr-5 md:mr-7">
              <section className="grid place-items-center md:hidden w-[40px] h-[40px] ml-1 font-bold duration-300 cursor-pointer">
                {asideOpen ? (
                  <MdClose
                    size={25}
                    className="text-primary"
                    onClick={() => setAsideOpen(false)}
                  />
                ) : (
                  <FiMenu
                    size={25}
                    className="text-black"
                    onClick={() => setAsideOpen(true)}
                  />
                )}
              </section>

              <section
                className={`bg-black ${
                  asideOpen ? "w-[175px] duration-300" : "w-[60px]"
                } md:w-[200px] h-full px-[15px] py-[20px] md:px-[20px] md:py-[35px] flex items-start justify-between relative duration-300`}
              >
                <Sidebar2 links={sidebarLinks} asideOpen={asideOpen} />
              </section>
            </section>

            <section
              className={`bg-[#F1F1F1] w-[100%] flex flex-col items-center justify-center scroll-smooth duration-500`}
            >
              <section className="w-full sticky top-0 left-0 bg-black px-4 py-3 md:px-6 md:py-4 mb-5 md:mb-8">
                <h3 className="text-xl text-white">
                  Favourites {wishlist.length > 0 && `(${wishlist.length})`}
                </h3>
              </section>

              <section
                className={`w-full h-fit flex flex-col items-center justify-center px-4 py-3 md:px-6 md:py-4 ${
                  asideOpen ? "" : ""
                } overflow-x-hidden scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-primary scroll-smooth space-y-3 duration-500`}
              >
                {wishlist.length === 0 ? (
                  <section className="w-full rounded-md mt-6 mb-12 p-4 flex flex-col items-center justify-center">
                    <h4 className="text-primary">
                      You have no item in your Favourites
                    </h4>
                    <Link href="/">
                      <button className="bg-black rounded-md mt-5 px-5 py-3 text-white hover:bg-primary cursor-pointer w-fit">
                        Back to Shopping
                      </button>
                    </Link>
                  </section>
                ) : (
                  <section className="w-[100%] space-y-6">
                    {wishlist.map((item) => {
                      const fi = item.product_images.filter(
                        (image) => image.is_feature == true
                      );

                      const fiUrl =
                        "https://res.cloudinary.com/dxhq8jlxf/" +
                        fi[0].product_images.replace(/ /g, "%20");

                      return (
                        <section
                          className="w-full bg-white rounded-md p-4 flex flex-col space-y-2 lg:space-y-0 lg:flex-row items-center justify-center lg:justify-between"
                          key={item.id}
                        >
                          <section className="flex items-start justify-between w-[100%] lg:w-[60%] lg3:w-[67%]">
                            <section className="block w-[150px] h-[150px] p-1 mr-8">
                              <img
                                src={fiUrl}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-md"
                              />
                            </section>
                            <section className="flex flex-col items-start space-y-2 w-full">
                              <section className="text-xl uppercase">
                                {item.name}
                              </section>
                              <section className="text-md text-[#868686]">
                                {item.description}
                              </section>
                              <section className="">
                                {item.is_onFlashsale ? (
                                  <p className="flex items-center justify-start">
                                    <s className="text-[#868686] text-md mr-2">
                                      ₦{numbersWithCommas(item.price)}
                                    </s>{" "}
                                    <span className="text-lg font-semibold">
                                      ₦{numbersWithCommas(item.flashsale_price)}
                                    </span>
                                  </p>
                                ) : (
                                  <p className="text-lg font-semibold">
                                    ₦{numbersWithCommas(item.price)}
                                  </p>
                                )}
                              </section>
                            </section>
                          </section>

                          <section className="flex flex-row items-center space-y-1 sm3:space-y-0 lg:space-y-1 w-[100%] lg:w-[30%] lg:flex-col lg3:w-[23%]">
                            <section className="w-full">
                              <button
                                className="bg-black rounded-sm px-5 py-4 text-white hover:bg-primary cursor-pointer w-full"
                                onClick={() => {
                                  addToCart(item);
                                  toast.success(`${item.name} added to Cart`);
                                }}
                              >
                                Add to Cart
                              </button>
                            </section>
                            <section className="w-full">
                              <button
                                className="rounded-sm px-5 py-3 text-primary hover:text-black cursor-pointer w-full flex flex-col sm3:flex-row items-center justify-center"
                                onClick={() => {
                                  removeFromWishlist(item);
                                  toast.error(
                                    `${item.name} removed from Favourites`
                                  );
                                }}
                              >
                                <HiOutlineTrash
                                  size={25}
                                  className="p-0 m-0 mr-2"
                                />
                                <span>Remove Item</span>
                              </button>
                            </section>
                          </section>
                        </section>
                      );
                    })}

                    <section
                      className="px-5 py-3 text-red-500 hover:text-black text-xl cursor-pointer w-full flex items-center justify-center uppercase font-semibold"
                      onClick={() => {
                        appStateDispatch({
                          type: "CLEAR_WISHLIST",
                        });
                        toast.error(`Favourites Cleared`);
                      }}
                    >
                      <span>Clear All</span>
                    </section>
                  </section>
                )}
              </section>
            </section>
          </section>
        </section>
      )}
    </section>
  );
};

export default favourites;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  let userStatus = {};

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    await fetch(
      "https://mercurius-api-production.up.railway.app/api/users/verify/",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(session.user),
      }
    )
      .then((res) => res.json())
      .then((userStatusRes) => {
        userStatus = userStatusRes;
        return userStatus;
      });

    return {
      props: { session, userStatus },
    };
  }
};
