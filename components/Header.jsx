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

const Header = () => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    appState: { cart },
    avatarMenuOpen,
    setAvatarMenuOpen,
    userInfo,
    setUserInfo,
    category,
    setCategory,
  } = useAppContext();

  const { data: session } = useSession();
  const [submenuName, setSubmenuName] = useState("");

  useEffect(() => {
    setCategory(JSON.parse(window.localStorage.getItem("CategoryData")));
  }, []);

  const handleSignOut = () => {
    window.localStorage.removeItem("UserData");
    toast.success("Signed Out Successfully");
    signOut({ callbackUrl: "http://localhost:3000" });
  };

  useEffect(() => {
    setUserInfo(JSON.parse(window.localStorage.getItem("UserData")));
  }, []);

  return (
    <section className="w-[85%] max-w-screen-xl mx-auto flex items-center justify-between py-6 z-50">
      <Link href="/">
        <h1 className="Signo z-50 font-dalek text-2xl font-extrabold cursor-pointer hover:scale-105 duration-300">
          MERCURIUS
        </h1>
      </Link>

      <nav className="hidden md2:block">
        <ul className="hidden md2:flex space-x-4 lg:space-x-6">
          <li className="">
            <section className="text-lg hover:text-primary cursor-pointer">
              <Link href="/">Home</Link>
            </section>
          </li>

          {category.map((category) => (
            <li key={category.id} className="group">
              <section className="text-lg hover:text-primary cursor-pointer">
                <Link href={`/c/${category.slug}`}>{category.name}</Link>
              </section>

              {category.subcategories && (
                <section>
                  <section className="bg-white py-4 space-y-2 rounded-md absolute top-[55px] hidden group-hover:block border-b-2 duration-500 z-50">
                    {category.subcategories.map((subcategory) => (
                      <section key={subcategory.id} className="">
                        <section className="text-gray-800 py-2 px-6 hover:bg-slate-100 block text-md hover:text-primary">
                          <Link
                            href={`/c/${category.slug}?subcategory=${subcategory.slug}`}
                            className=""
                          >
                            {subcategory.name}
                          </Link>
                        </section>
                      </section>
                    ))}
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
                  <p>Profile</p>
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
                  <p>Wishlist</p>
                </Link>
                <Link
                  href=""
                  className="block px-8 py-2 rounded-sm hover:bg-slate-100 text-md hover:text-primary"
                >
                  <p>Coupons</p>
                </Link>
                <Link
                  href=""
                  className="block px-8 py-2 rounded-sm hover:bg-slate-100 text-md hover:text-primary"
                >
                  <p>Storehouse</p>
                </Link>
                <Link
                  href=""
                  className="block px-8 py-2 rounded-sm hover:bg-slate-100 text-md hover:text-primary"
                >
                  <p>Affiliates</p>
                </Link>
                <button
                  type="button"
                  className="bg-primary font-bold text-white rounded-md cursor-pointer px-6 py-2 outline-none hover:bg-black duration-300 w-full"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-8 py-2 rounded-sm hover:bg-slate-100 text-md hover:text-primary"
                >
                  <p>Sign In</p>
                </Link>
                <Link
                  href="/register"
                  className="block px-8 py-2 rounded-sm hover:bg-slate-100 text-md hover:text-primary"
                >
                  <p>Register</p>
                </Link>
                <Link
                  href="/wishlist"
                  className="block px-8 py-2 rounded-sm hover:bg-slate-100 text-md hover:text-primary"
                >
                  <p>Wishlist</p>
                </Link>
                <Link
                  href=""
                  className="block px-8 py-2 rounded-sm hover:bg-slate-100 text-md hover:text-primary"
                >
                  <p>Affiliates</p>
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

      <span className="hamburger md2:hidden text-xl cursor-pointer hover:text-primary hover:scale-125 duration:300">
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
        className={`z-20 md2:hidden bg-white shadow-xl absolute w-[300px] h-full top-24 ${
          isSidebarOpen ? "left-0" : "left-[-200%]"
        }  py-5 overflow-y-hidden duration-300`}
      >
        <ul className="block">
          {category.map((category) => (
            <li
              key={category.id}
              className="my-1 pl-7 py-2 text-lg hover:bg-slate-100"
            >
              {/* <section
                onClick={() => {
                  submenuName !== topNavLink.name
                    ? setSubmenuName(topNavLink.name)
                    : setSubmenuName("");
                }}
                className="flex items-center justify-between mr-4 hover:text-primary cursor-pointer"
              >
                <section className="block ">
                  <Link href={topNavLink.href}>{topNavLink.name}</Link>
                </section>
                {topNavLink.submenu &&
                  (submenuName !== topNavLink.name ? (
                    <FiChevronDown className="text-lg" />
                  ) : (
                    <FiChevronUp className="text-lg" />
                  ))}
              </section> */}

              {/* <section
                className={`${
                  submenuName === topNavLink.name ? "md2:hidden" : "hidden"
                }`}
              >
                {topNavLink.submenu && (
                  <section>
                    <section className="py-3 space-y-2 divide-y-2 divide-primary divide-opacity-30 duration-500">
                      {topNavLink.sublinks.map((sublink) => (
                        <section key={sublink.id} className="">
                          <section className="pl-7 py-2 text-gray-800 hover:bg-white block text-md hover:text-primary cursor-pointer">
                            <Link href={sublink.href} className="">
                              {sublink.name}
                            </Link>
                          </section>
                        </section>
                      ))}
                    </section>
                  </section>
                )}
              </section> */}
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
};

export default Header;
