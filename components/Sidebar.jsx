import React from "react";
import Link from "next/link";
import { getSession, useSession, signOut } from "next-auth/react";

const Sidebar = ({ links, asideOpen }) => {
  const handleSignOut = () => {
    window.localStorage.removeItem("UserData");
    setUserInfo(null);
    signOut({ callbackUrl: "/" });
  };

  return (
    <section className="w-fit h-fit flex items-center justify-center">
      <ul className="p-0 m-0 flex flex-col items-center justify-center w-full space-y-4">
        {links.map((ln) => {
          return (
            <li className="w-fit md:text-md flex flex-col items-start justify-start">
              <Link
                href={ln.url === null ? "" : ln.url}
                className={` ${
                  asideOpen ? "w-[150px]" : "w-[60px]"
                } sm2:w-[150px] flex items-center justify-start h-full cursor-pointer text-white hover:text-primary ${
                  ln.active && "text-primary hover:text-gray-300"
                }`}
                onClick={ln.url === null ? () => handleSignOut() : ""}
              >
                <span className="mr-1">{ln.icon}</span>
                <span
                  className={` ${
                    asideOpen ? "flex p-0 m-0" : "hidden"
                  } sm2:flex`}
                >
                  {ln.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Sidebar;
