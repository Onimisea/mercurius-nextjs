import React from "react";

const topNavLinks = [
  {
    id: 1,
    name: "Home",
    href: "/",
    submenu: false,
    sublinks: [],
  },
  {
    id: 2,
    name: "Luxury",
    href: "",
    submenu: true,
    sublinks: [
      { id: 1, name: "Male Wears", href: "/c/luxury/male-wears" },
      { id: 2, name: "Male Shoes", href: "/c/luxury/male-shoes" },
      { id: 3, name: "Female Shoes", href: "/c/luxury/female-shoes" },
      { id: 4, name: "Female Bags", href: "/c/luxury/female-bags" },
    ],
  },
  {
    id: 3,
    name: "Thrift",
    href: "",
    submenu: true,
    sublinks: [
      { id: 1, name: "Women's Clothes", href: "/c/thrift/womens-clothes" },
      { id: 2, name: "Men's Clothes", href: "/c/thrift/mens-clothes" },
    ],
  },
  {
    id: 4,
    name: "Jewellery & Accessories",
    href: "",
    submenu: true,
    sublinks: [
      { id: 1, name: "Rings", href: "/c/jewellery-and-accessories/rings" },
      {
        id: 2,
        name: "Necklaces",
        href: "/c/jewellery-and-accessories/necklaces",
      },
      {
        id: 3,
        name: "Earrings",
        href: "/c/jewellery-and-accessories/earrings",
      },
      {
        id: 4,
        name: "Bangles & Bracelets",
        href: "/c/jewellery-and-accessories/bangles-and-bracelets",
      },
      { id: 5, name: "Watches", href: "/c/jewellery-and-accessories/watches" },
    ],
  },
  {
    id: 5,
    name: "Cologne",
    href: "",
    submenu: true,
    sublinks: [
      { id: 1, name: "Perfumes", href: "/c/cologne/perfumes" },
      { id: 2, name: "Deodorants", href: "/c/cologne/deodorants" },
    ],
  },
];

export default topNavLinks;
