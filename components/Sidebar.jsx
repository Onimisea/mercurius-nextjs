import React from "react";
import Link from "next/link";

const Sidebar = ({ links }) => {
  console.log(links);
  return (
    <section className="w-full h-fit grid place-items-center">
      <ul className="p-0 m-0 block w-full space-y-4 bg-red-300">
        {links.map((ln) => (
          <li className="w-full md:text-md bg-red-600">
            <Link
              href={ln.url}
              className={`w-full flex items-center justify-center h-full px-2 py-1 cursor-pointer text-white hover:text-primary`}
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
