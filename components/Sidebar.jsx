import React from "react";
import Link from "next/link";

const Sidebar = ({ links }) => {

  return (
    <section className="bg-red-200 w-full h-fit flex items-center justify-center">
      <ul className="bg-red-400 p-0 m-0 flex flex-col items-center justify-center w-full space-y-4">
        {links.map((ln) => (
          <li className="bg-red-600 w-full p-2 md:text-md flex flex-col items-center justify-center">
            <Link
              href={ln.url}
              className={`bg-red-800 w-[60%] flex items-center justify-start h-full cursor-pointer text-white hover:text-primary`}
            >
              <span className="mr-2">{ln.icon}</span>
              <span className="">{ln.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
