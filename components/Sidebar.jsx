import React from "react";
import Link from "next/link";

const Sidebar = ({ links }) => {
  console.log(links);
  return (
    <section className="w-full h-fit grid place-items-center">
      <ul className="p-0 m-0 block">
        {links.map((ln) => (
          <li className="flex items-center justify-center text-md md:text-lg">
            <Link href={ln.url} className={`w-full h-full px-2 py-1 cursor-pointer text-white hover:text-primary`}>
              {ln.icon}
              {ln.name}
            </Link>
          </li>
        ))}

        {/* <li className="flex items-center justify-center text-md md:text-lg">
        <ImUser size={25} className="mr-2" />
        Account
      </li>
      <li className="flex items-center justify-center text-md md:text-lg">
        <FiHeart size={25} className="mr-2" />
        Favourites
      </li>
      <li className="flex items-center justify-center text-md md:text-lg">
        <FiPackage size={25} className="mr-2" />
        Orders
      </li>
      <li className="flex items-center justify-center text-md md:text-lg">
        <FaEnvelope size={25} className="mr-2" />
        Inbox
      </li>
      <li className="flex items-center justify-center text-md md:text-lg">
        <MdInventory size={25} className="mr-2" />
        Inventory
      </li>
      <li className="flex items-center justify-center text-md md:text-lg">
        <RiLogoutBoxFill size={25} className="mr-2" />
        Log Out
      </li> */}
      </ul>
    </section>
  );
};

export default Sidebar;
