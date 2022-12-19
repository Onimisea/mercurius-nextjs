import React, { useEffect } from "react";
import { MdAdd, MdCheck, MdClose } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const {
    appState: { cart, wishlist },
    appStateDispatch,
    addToCart,
    addToWishlist,
    removeFromCart,
    removeFromWishlist,
  } = useAppContext();

  const fi = product.product_images.filter((image) => image.is_feature == true);

  const fiUrl =
    "https://res.cloudinary.com/dxhq8jlxf/" +
    fi[0].product_images.replace(/ /g, "%20");

  return (
    <section className="bg-white sm2:m-4 p-0 shadow-md rounded-lg relative text-center cursor-pointer group w-full sm2:w-[250px]">
      {product.is_onFlashsale && (
        <span className="w-fit block absolute top-[15px] left-[15px] bg-primary text-white px-3 py-2 rounded-lg">
          -{product.flashsale}%
        </span>
      )}

      <ul className="product__actions w-fit block absolute top-[100px] md:top-[150px] right-[15px] space-y-2">
        {cart.some((p) => p.id === product.id) ? (
          <li
            className="bg-black w-[50px] h-[50px] grid place-items-center cursor-pointer text-white hover:bg-primary rounded-md shadow-md"
            onClick={() => {
              removeFromCart(product);
              toast.error(`${product.name} removed from cart`);
            }}
          >
            <MdClose className="product__card__icon remove_from_cart" />
          </li>
        ) : (
          <li
            className="bg-white w-[50px] h-[50px] grid place-items-center cursor-pointer hover:text-primary rounded-md shadow-md"
            onClick={() => {
              addToCart(product);
              toast.success(`${product.name} added to cart`);
            }}
          >
            <MdAdd className="product__card__icon add_from_cart" />
          </li>
        )}

        {wishlist.some((w) => w.id === product.id) ? (
          <li
            className="bg-white w-[50px] h-[50px] grid place-items-center cursor-pointer hover:text-white hover:bg-primary rounded-md shadow-md text-primary"
            onClick={() => {
              removeFromWishlist(product);
              toast.error(`${product.name} removed from wishlist`);
            }}
          >
            <FaHeart className="product__card__icon remove_from_wishlist" />
          </li>
        ) : (
          <li
            className="bg-white w-[50px] h-[50px] grid place-items-center cursor-pointer hover:text-primary rounded-md shadow-md"
            onClick={() => {
              addToWishlist(product);
              toast.success(`${product.name} added to wishlist`);
            }}
          >
            <FiHeart className="product__card__icon" />
          </li>
        )}
      </ul>

      <img
        src={fiUrl}
        alt={product.name}
        className="w-full h-full sm2:w-[250px] sm2:h-[250px] object-contain duration-300"
      />
      <h4 className="product__name my-3 text-md group-hover:text-primary w-full h-[50px] overflow-hidden">
        {product.name}
      </h4>
      <p className="product__price text-[18px] font-semibold mt-4">
        ₦{product.is_onFlashsale ? product.flashsale_price : product.price}
      </p>
    </section>
  );
};

export default ProductCard;
