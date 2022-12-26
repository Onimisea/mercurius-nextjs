import React from "react";
import Link from "next/link";
import { FiHeart, FiPackage } from "react-icons/fi";
import { FaEnvelope } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { ImUser } from "react-icons/im";
import { RiLogoutBoxFill } from "react-icons/ri";

const Sidebar = () => {
  return <section className="w-full h-fit grid place-items-center">
    <ul className="">
      <li className="">
        <ImUser size={25} className="mr-2" />
        Account
      </li>
    </ul>
  </section>
};

export default Sidebar;
