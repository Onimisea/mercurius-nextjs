import React from "react";
import Link from "next/link";

const Sidebar = ({ links }) => {
  console.log(links);
  return (
    <section className="w-full h-fit grid place-items-center">
      <ul className="p-0 m-0 block w-full space-y-4 bg-red-300">
        {links.map((ln) => (
          <li className="w-full p-2 md:text-md bg-red-600 grid place-items-center">
            <Link
              href={ln.url}
              className={`w-[80%] flex items-center justify-start h-full cursor-pointer text-white hover:text-primary bg-red-800`}
            >
              {ln.icon}
              {ln.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
