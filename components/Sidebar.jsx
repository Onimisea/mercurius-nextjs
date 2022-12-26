import React from "react";
import Link from "next/link";

const Sidebar = ({ links }) => {
  console.log(links);
  return (
    <section className="w-full h-fit grid place-items-center">
      <ul className="p-0 m-0 block w-full space-y-4">
        {links.map((ln) => (
          <li className="w-full p-2 md:text-md grid place-items-center">
            <Link
              href={ln.url}
              className={`w-[60%] flex items-center justify-start h-full cursor-pointer text-white hover:text-primary`}
            >
              <span className="mr-2">{ln.icon}</span>
              <span className="w-[100%] bg-red-500">{ln.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
