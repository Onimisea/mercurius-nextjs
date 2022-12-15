import React, { useState, Fragment, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { HiUser } from "react-icons/hi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { useAppContext } from "../context/AppContext";
import Avatar from "./Avatar";
import toast from "react-hot-toast";

import { getSession, useSession, signOut } from "next-auth/react";
import Image from "next/image";

const Header = () => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    appState: { cart },
    avatarMenuOpen,
    setAvatarMenuOpen,
  } = useAppContext();

  const { data: session } = useSession();
  let userInfo = null;
  const [categoriesData, setCategoriesData] = useState([]);
  const [submenuName, setSubmenuName] = useState("");
  const bgUrl = (imgUrl) =>
    "https://res.cloudinary.com/dxhq8jlxf/" + imgUrl.replace(/ /g, "%20");

  useEffect(() => {
    if (session) {
      window.localStorage.setItem("UserData", JSON.stringify(session.user));
    }
    session ? console.log(session.user) : console.log("None");

    const categories = fetch(
      "https://mercurius-api-production.up.railway.app//api/inventory/c/"
    )
      .then((res) => res.json())
      .then((catData) => setCategoriesData(catData));

    userInfo = window.localStorage.getItem("UserData")
      ? JSON.parse(window.localStorage.getItem("UserData"))
      : null;
  }, []);

  console.log(categoriesData)

  const handleSignOut = () => {
    window.localStorage.removeItem("UserData");
    window.localStorage.removeItem("UserData");
    toast.success("Signed Out Successfully");
    signOut({ callbackUrl: "/login" });
  };

  return (
    <section className="w-[85%] max-w-screen-xl mx-auto flex items-center justify-between py-6 z-50">
      <Link href="/">
        <h1 className="z-50 font-dalek text-2xl font-semibold cursor-pointer hover:scale-105 duration-300">
          MERCURIUS
        </h1>
      </Link>

      <nav className="hidden md3:block">
        <ul className="hidden md3:flex space-x-4 lg:space-x-6">
          <li className="">
            <section className="text-lg hover:text-primary cursor-pointer hover:border-b-2 hover:border-primary duration-300">
              <Link href="/">Home</Link>
            </section>
          </li>

          {categoriesData.map((categoryData) => (
            <li key={categoryData.id} className="group">
              <section className="text-lg hover:text-primary cursor-pointer hover:border-b-2 hover:border-primary duration-300">
                <Link href="#">{categoryData.name}</Link>
              </section>

              {/* {`/c/${categoryData.slug}`} */}

              {categoryData.subcategories && (
                <section>
                  <section className="bg-white p-4 space-y-2 rounded-md absolute top-[55px] left-[7%] hidden group-hover:flex group-hover:items-center group-hover:justify-center border-b-2 border-b-primary duration-500 z-50 w-[85%] overflow-hidden">
                    <section className="flex items-center justify-around space-x-5">
                      <section className="w-[35%] h-[250px] relative">
                        <section className="bg-black absolute top-0 left-0 w-full h-[100%] opacity-60"></section>
                        <Image
                          src={bgUrl(categoryData.category_image)}
                          alt=""
                          width={0}
                          height={0}
                          className="w-full h-[100%] max-h-[250px] object-fill"
                        />
                        <section className="absolute top-0 left-0 w-full h-[100%] grid place-items-center">
                          <h3 className="text-xl text-white font-bold text-center">
                            {categoryData.name}
                          </h3>
                        </section>
                      </section>

                      <section className="flex items-start justify-between w-[62%]">
                        {categoryData.subcategories.map((subcat) => {
                          let subcName = subcat.name.split(" ");

                          return (
                            <section
                              key={subcat.id}
                              className="w-[47%] overflow-hidden"
                            >
                              <h3 className="font-bold font-dalek text-xl mb-4">
                                {subcName[1]}
                              </h3>

                              <section className="flex items-start justify-between flex-wrap">
                                {subcat.lowersubcategories.map((lsubcat) => (
                                  <section
                                    key={lsubcat.id}
                                    className="text-lg my-2 w-[47%] hover:text-primary cursor-pointer duration-300"
                                  >
                                    <Link
                                      href={`/c/${categoryData.slug}/${subcat.slug}/${lsubcat.slug}`}
                                      className="hover:border-b-2 hover:border-primary duration-300"
                                    >
                                      {lsubcat.name}
                                    </Link>
                                  </section>
                                ))}
                              </section>
                            </section>
                          );
                        })}
                      </section>
                    </section>
                  </section>
                </section>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <section className="header__icons space-x-6 text-xl flex items-center justify-center">
        <span
          className="block z-20 w-fit group cursor-pointer"
          onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
        >
          {session ? (
            <Avatar
              src={session.user.image}
              alt={session.user.name}
              isHeader={true}
              className="hover:text-primary"
            />
          ) : (
            <section className="flex items-center justify-center">
              <HiUser className="cursor-pointer hover:text-primary hover:scale-125 duration:300 mr-1" />
              <FaCaretDown size={20} />
            </section>
          )}

          <section
            className={`text-[16px] z-50 bg-white border-[1px] p-2 space-y-0 absolute top-[85px] rounded-md w-fit ${
              avatarMenuOpen ? "block" : "hidden"
            }`}
          >
            {session ? (
              <>
                {userInfo ? (
                  <p className="block px-8 py-2 rounded-md hover:bg-slate-100 hover:text-primary border-b-2">
                    {userInfo.fullname}
                  </p>
                ) : (
                  <p></p>
                )}
                <Link
                  href=""
                  className="block px-8 py-2 rounded-md hover:bg-slate-100 hover:text-primary"
                >
                  <p>Account</p>
                </Link>
                <Link
                  href=""
                  className="block px-8 py-2 rounded-sm hover:bg-slate-100 text-md hover:text-primary"
                >
                  <p>Favourites</p>
                </Link>
                <Link
                  href=""
                  className="block px-8 py-2 rounded-sm hover:bg-slate-100 text-md hover:text-primary"
                >
                  <p>Orders</p>
                </Link>

                <Link
                  href=""
                  className="block px-8 py-2 rounded-sm hover:bg-slate-100 text-md hover:text-primary"
                >
                  <p>Inbox</p>
                </Link>
                <Link
                  href=""
                  className="block px-8 py-2 rounded-sm hover:bg-slate-100 text-md hover:text-primary"
                >
                  <p>Storehouse</p>
                </Link>

                <button
                  type="button"
                  className="bg-primary font-bold text-white rounded-md cursor-pointer px-6 py-2 outline-none hover:bg-black duration-300 w-full"
                  onClick={handleSignOut}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-8 py-2 rounded-sm hover:bg-slate-100 text-md hover:text-primary"
                >
                  <p>Log In</p>
                </Link>
                <Link
                  href="/register"
                  className="block px-8 py-2 rounded-sm hover:bg-slate-100 text-md hover:text-primary"
                >
                  <p>Register</p>
                </Link>
                <Link
                  href="/favourites"
                  className="block px-8 py-2 rounded-sm hover:bg-slate-100 text-md hover:text-primary"
                >
                  <p>Favourites</p>
                </Link>
              </>
            )}
          </section>
        </span>

        <span className="cart__wrapper relative flex">
          <Link href="/cart">
            <span>
              <FaShoppingCart className="relative cursor-pointer hover:text-primary hover:scale-125 duration:300" />
              {cart.length > 0 && (
                <span className="cart__items__quantity  absolute -top-5 -right-5 bg-primary w-7 h-7 rounded-full grid place-items-center text-white text-sm">
                  {cart.length}
                </span>
              )}
            </span>
          </Link>
        </span>

        <span className="cart__wrapper relative flex">
          <Link href="/cart">
            <span>
              <TfiHeadphoneAlt className="relative cursor-pointer hover:text-primary hover:scale-125 duration:300 ml-3" />
            </span>
          </Link>
        </span>
      </section>

      <span className="hamburger md3:hidden text-xl cursor-pointer hover:text-primary hover:scale-125 duration:300">
        {isSidebarOpen ? (
          <MdClose
            className="header__icon menu__close__btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        ) : (
          <FiMenu
            className="header__icon menu__open__btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        )}
      </span>

      {/* Mobile Menu */}

      <aside
        className={`z-20 md3:hidden bg-white shadow-xl absolute w-[320px] h-full top-20 ${
          isSidebarOpen ? "left-0" : "left-[-200%]"
        }  py-5 overflow-y-auto duration-300 scrollbar scrollbar-track-gray-300 scrollbar-thumb-primary`}
      >
        <ul className="block overflow-y-auto">
          <li className="my-1 pl-7 py-2 text-lg hover:bg-slate-100">
            <section className="text-lg hover:text-primary cursor-pointer hover:border-b-2 hover:border-primary duration-300">
              <Link href="/">Home</Link>
            </section>
          </li>

          {categoriesData.map((categoryData) => (
            <li
              key={categoryData.id}
              className="my-1 pl-7 py-2 text-lg hover:bg-slate-100"
            >
              <section
                onClick={() => {
                  submenuName !== categoryData.name
                    ? setSubmenuName(categoryData.name)
                    : setSubmenuName("");
                }}
                className="flex items-center justify-between mr-4 hover:text-primary cursor-pointer"
              >
                <section className="block ">
                  <p>{categoryData.name}</p>
                </section>
                {categoryData.subcategories &&
                  (submenuName !== categoryData.name ? (
                    <FiChevronDown className="text-lg" />
                  ) : (
                    <FiChevronUp className="text-lg" />
                  ))}
              </section>

              <section
                className={`${
                  submenuName === categoryData.name ? "md3:hidden" : "hidden"
                }`}
              >
                {categoryData.subcategories && (
                  <section>
                    <section className="py-3 space-y-2 divide-y-2 divide-primary divide-opacity-30 duration-500">
                      {categoryData.subcategories.map((subcat) => {
                        let subcName = subcat.name.split(" ");
                        return (
                          <section key={subcat.id} className="">
                            <section className="pl-7 py-2 text-gray-800 hover:bg-white block text-md">
                              <h3 className="font-dalek text-xl my-4">
                                {subcName[1]}
                              </h3>
                              {subcat.lowersubcategories.map((lsubcat) => (
                                <section
                                  key={lsubcat.id}
                                  className="text-lg my-2 w-[47%] hover:text-primary cursor-pointer duration-300"
                                >
                                  <Link
                                    href={`/c/${categoryData.slug}/${subcat.slug}/${lsubcat.slug}`}
                                    className="hover:border-b-2 hover:border-primary duration-300"
                                  >
                                    {lsubcat.name}
                                  </Link>
                                </section>
                              ))}
                            </section>
                          </section>
                        );
                      })}
                    </section>
                  </section>
                )}
              </section>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
};

export default Header;
