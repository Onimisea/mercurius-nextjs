import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { getSession, useSession, signOut } from "next-auth/react";
import { Sidebar } from "../components";
import { FiMenu, FiPackage } from "react-icons/fi";
import { FaEnvelope, FaHeart } from "react-icons/fa";
import { MdClose, MdInventory } from "react-icons/md";
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
      icon: <ImUser size={20} className="mr-2" />,
      active: true,
    },
    {
      name: "Favourites",
      url: "/favourites",
      icon: <FaHeart size={20} className="mr-2" />,
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
      url: "/logout",
      icon: <RiLogoutBoxFill size={20} className="mr-2" />,
    },
  ];

  const [asideOpen, setAsideOpen] = useState(false);

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

          <section className="w-full flex items-start justify-start mt-14">
            <section className="flex flex-col items-center justify-start sticky top-0 left-0 mr-10">
              <section className="grid place-items-center sm2:hidden w-[40px] h-[40px] font-bold duration-300 cursor-pointer">
                {/* grid place-items-center sm2:hidden w-[40px] h-[40px] absolute
                -top-[40px] left-[8px] font-bold duration-300 cursor-pointer */}
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
                } sm2:w-[200px] px-[15px] py-[20px] md:px-[20px] md:py-[35px] flex items-start justify-between relative duration-300`}
              >
                <Sidebar links={sidebarLinks} asideOpen={asideOpen} />
              </section>
            </section>

            <section
              className={`bg-gray-300 w-[100%] flex flex-col items-center justify-center whitespace-nowrap overflow-x-scroll scrollbar-none scroll-smooth duration-500`}
            >
              <section className="w-full sticky top-0 left-0 bg-black px-4 py-3 md:px-6 md:py-4 mb-8">
                <h1 className="text-xl text-white">Account</h1>
              </section>

              <section
                className={`w-[100%] h-fit flex flex-col items-center justify-center px-4 py-3 md:px-6 md:py-4 ${
                  asideOpen ? "" : ""
                } scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-primary scroll-smooth duration-500`}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                porta dictum erat, a facilisis augue. In posuere id lacus eget
                lacinia. In placerat magna sed sem bibendum, tincidunt porta
                libero finibus. Interdum et malesuada fames ac ante ipsum primis
                in faucibus. Etiam ut tempus orci. Nulla a ipsum sem. Aliquam
                fringilla suscipit pulvinar. Duis nec orci ligula. Pellentesque
                lectus neque, interdum quis interdum a, faucibus non nibh.
                Quisque faucibus, enim vitae suscipit venenatis, ante metus
                molestie arcu, non feugiat tortor lectus at enim. Pellentesque
                ultricies justo suscipit purus molestie elementum eget sed
                velit. Aliquam id vehicula sapien. Vivamus consectetur sapien
                sodales neque sodales blandit. Morbi feugiat felis a magna
                varius efficitur. Vestibulum quis velit ipsum. Donec justo
                felis, bibendum vitae nisl nec, mollis rhoncus tortor. Mauris
                aliquet laoreet hendrerit. Donec pulvinar lorem a eleifend
                auctor. Cras vitae mollis ante, at volutpat turpis. Donec varius
                orci sed ultrices aliquam. Praesent eget risus id nunc pulvinar
                euismod. Vestibulum elementum, velit eget feugiat dapibus, dolor
                dolor vulputate nulla, vitae rutrum risus quam ac dolor.
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Etiam eu bibendum leo, ut scelerisque ipsum.
                Vivamus elementum magna id metus ornare convallis. Curabitur
                nisl arcu, egestas sed iaculis eu, sagittis nec nulla. Proin
                faucibus massa eu augue suscipit, sed congue nisi varius. Morbi
                quis lacus sed mauris suscipit hendrerit nec quis dolor. Donec
                malesuada quis neque a rhoncus. Vestibulum suscipit accumsan
                turpis in varius. Suspendisse id est in ex pretium ultrices quis
                ut ligula. Suspendisse id risus ut felis lobortis elementum eget
                nec justo. Nunc sollicitudin, dui ac dapibus varius, neque velit
                ullamcorper odio, a porta odio nibh sed quam. Fusce tempus
                gravida neque at accumsan. Nunc venenatis enim a ex fermentum, a
                elementum libero accumsan. Nam fermentum pretium tellus. In a
                odio luctus, tristique nunc quis, fermentum nisl. Nulla id
                volutpat nisl, id tristique felis. Cras faucibus neque ac lacus
                blandit ullamcorper. Sed eget metus feugiat, ornare leo quis,
                ornare tellus. Sed sed mattis risus. Curabitur diam diam,
                aliquet et varius ac, imperdiet et ex. Maecenas scelerisque
                blandit sodales. Suspendisse pulvinar felis vitae nunc placerat
                fermentum. Duis bibendum nulla ornare, imperdiet dui id,
                lobortis nunc. Nullam dignissim accumsan faucibus. Cras sodales
                turpis massa, imperdiet ullamcorper tellus mattis in.
                Suspendisse eget ante vitae purus congue egestas ornare vitae
                dolor. Mauris tincidunt quam a velit aliquam dapibus. Duis
                varius erat non tortor congue malesuada. Cras volutpat quis
                tortor venenatis porta. Praesent vulputate sagittis ante, eget
                laoreet lectus pulvinar quis. Phasellus id massa non enim
                lacinia posuere vitae condimentum dolor. Curabitur ut libero a
                quam facilisis cursus. In sed elit nisl. In a gravida ipsum, nec
                mattis lectus. Curabitur tempor a tortor in consectetur. Nam nec
                augue tellus. Phasellus vel dolor porta mauris varius vehicula.
                Maecenas ex lectus, maximus a consectetur id, ultricies eget
                augue. Donec porttitor maximus laoreet. Aliquam scelerisque
                dapibus neque.
              </section>
            </section>
          </section>
        </section>
      )}
    </section>
  );
};

export default account;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   };
  // }

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
