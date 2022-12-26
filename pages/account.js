import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { getSession, useSession, signOut } from "next-auth/react";
import { Sidebar } from "../components";
import { FiHeart, FiPackage } from "react-icons/fi";
import { FaEnvelope } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { ImUser } from "react-icons/im";
import { RiLogoutBoxFill } from "react-icons/ri";

const account = ({ userStatus }) => {
  const {
    appState: { cart },
    tabbed,
    setTabbed,
    userInfo,
    setUserInfo,
  } = useAppContext();

  const handleSignOut = () => {
    window.localStorage.removeItem("UserData");
    setUserInfo(null);
    signOut({ callbackUrl: "/register" });
  };

  const sidebarLinks = [
    {
      name: "Account",
      url: "/account",
      icon: <ImUser size={25} className="mr-2" />,
    },
    {
      name: "Favourites",
      url: "/favourites",
      icon: <FiHeart size={25} className="mr-2" />,
    },
    {
      name: "Orders",
      url: "/orders",
      icon: <FiPackage size={25} className="mr-2" />,
    },
    {
      name: "Inbox",
      url: "/inbox",
      icon: <FaEnvelope size={25} className="mr-2" />,
    },
    {
      name: "Inventory",
      url: "/inventory",
      icon: <MdInventory size={25} className="mr-2" />,
    },
    {
      name: "Log Out",
      url: "/logout",
      icon: <RiLogoutBoxFill size={25} className="mr-2" />,
    },
  ];

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>Mercurius | Account | Best Thrift Store in Nigeria</title>
      </Head>

      {userStatus.error ? (
        <section className="w-full p-12 grid place-items-center">
          <h4 className="text-xl text-primary">
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

          <section className="w-full flex items-start justify-between mt-8">
            <section className="bg-gray-300 w-[30%]">
              <Sidebar links={sidebarLinks} />
            </section>

            <section className="bg-gray-400 w-[65%]">Main</section>
          </section>
        </section>
      )}
    </section>
  );
};

export default account;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let userStatus = {};

  if (session.user) {
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
  }

  return {
    props: { session, userStatus },
  };
};
