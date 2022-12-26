import React from "react";
import Link from "next/link";

const Sidebar = ({ links }) => {

  return (
    <section className="w-[200px] h-fit flex items-center justify-center">
      <ul className="p-0 m-0 flex flex-col items-center justify-center w-full space-y-4">
        {links.map((ln) => (
          <li className="w-full md:text-md flex flex-col items-start justify-start bg-red-300">
            <Link
              href={ln.url}
              className={`w-[150px] flex items-center justify-start h-full cursor-pointer text-white hover:text-primary ${
                ln.active && "text-primary hover:text-gray-500"
              } bg-red-700`}
            >
              <span className="mr-1">{ln.icon}</span>
              <span className="">{ln.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
