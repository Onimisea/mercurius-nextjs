import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useAppContext } from "../../../../context/AppContext";
import toast from "react-hot-toast";
import { getSession, useSession, signOut } from "next-auth/react";
import { Sidebar } from "../../../../components";
import { FiMenu, FiPackage, FiEdit } from "react-icons/fi";
import { FaEnvelope, FaHeart } from "react-icons/fa";
import { MdClose, MdInventory } from "react-icons/md";
import { ImUser } from "react-icons/im";
import { RiLogoutBoxFill } from "react-icons/ri";
import { BsArrowLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const addresses = ({ userStatus, address }) => {
  const router = useRouter();

  const { userInfo, setUserInfo } = useAppContext();

  const handleSignOut = () => {
    window.localStorage.removeItem("UserData");
    setUserInfo(null);
    signOut({ callbackUrl: "/register" });
  };

  // Form Dependencies
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: userStatus.id,
      country: "Nigeria",
    },
  });

  const onSubmit = async (data) => {
    if (userStatus) {
      try {
        const options = {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        };

        console.log(data);

        await fetch(
          `https://mercurius-api-production.up.railway.app/api/addresses/${address.id}/update/`,
          options
        )
          .then((res) => res.json())
          .then((resData) => {
            if (resData.errors) {
              toast.error(resData.errors[0]);
            } else {
              toast.success(resData.success);
              router.reload("/account/addresses/");
            }
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Please LOGIN to your account to update it");
      handleSignOut();
    }
  };

  const sidebarLinks = [
    {
      name: "Account",
      url: "/account",
      icon: <ImUser size={20} className="mr-2" />,
      active: true,
    },
    {
      name: "Favourites",
      url: "/favourites",
      icon: <FaHeart size={20} className="mr-2" />,
    },
    {
      name: "Orders",
      url: "/orders",
      icon: <FiPackage size={20} className="mr-2" />,
    },
    {
      name: "Inbox",
      url: "/inbox",
      icon: <FaEnvelope size={20} className="mr-2" />,
    },
    {
      name: "Storehouse",
      url: "/storehouse",
      icon: <MdInventory size={20} className="mr-2" />,
    },
    {
      name: "Log Out",
      url: null,
      icon: <RiLogoutBoxFill size={20} className="mr-2" />,
    },
  ];

  const [asideOpen, setAsideOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" || typeof window !== null) {
      if (!window.localStorage.getItem("UserData")) {
        router.push("/login");
      }
    }
  }, []);

  const [oldAddress, setOldAddress] = useState(address);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setOldAddress((prevAddress) => {
      return {
        ...prevAddress,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>Mercurius | Edit Address | Best Thrift Store in Nigeria</title>
      </Head>

      {userStatus.error ? (
        <section className="w-full p-12 grid place-items-center text-center">
          <h4 className="text-xl text-primary text-center">
            Please, complete your Account registration. Or Login with your
            registered email address!
          </h4>
          <Link href="/register">
            <button
              className="bg-black rounded-md mt-5 px-5 py-3 text-white hover:bg-primary cursor-pointer w-fit"
              onClick={handleSignOut}
            >
              Register
            </button>
          </Link>
        </section>
      ) : (
        <section className="w-full flex flex-col items-start justify-start my-10">
          <h1 className="text-2xl sm2:text-3xl md2:text-4xl text-primary font-dalek">
            Settings
          </h1>

          <section className="w-full flex items-start justify-start mt-8">
            <section className="flex flex-col h-full items-start sticky top-0 left-0 mr-5 md:mr-7">
              <section className="grid place-items-center sm2:hidden w-[40px] h-[40px] ml-1 font-bold duration-300 cursor-pointer">
                {asideOpen ? (
                  <MdClose
                    size={25}
                    className="text-primary"
                    onClick={() => setAsideOpen(false)}
                  />
                ) : (
                  <FiMenu
                    size={25}
                    className="text-black"
                    onClick={() => setAsideOpen(true)}
                  />
                )}
              </section>

              <section
                className={`bg-black ${
                  asideOpen ? "w-[175px] duration-300" : "w-[60px]"
                } sm2:w-[200px] h-full px-[15px] py-[20px] md:px-[20px] md:py-[35px] flex items-start justify-between relative duration-300`}
              >
                <Sidebar links={sidebarLinks} asideOpen={asideOpen} />
              </section>
            </section>

            <section
              className={`bg-[#F1F1F1] w-[100%] flex flex-col items-center justify-center scroll-smooth duration-500`}
            >
              <section className="w-full sticky top-0 left-0 bg-black text-white px-4 py-3 md:px-6 md:py-4 mb-5 md:mb-8 flex items-center justify-start z-30">
                <Link href="/account/addresses">
                  <BsArrowLeft
                    size={25}
                    className="p-0 m-0 mr-4 cursor-pointer hover:text-primary duration-300"
                  />
                </Link>
                <h3 className="text-xl">Edit Address</h3>
              </section>

              <section
                className={`w-full h-fit flex flex-col items-center justify-center px-4 py-3 md:px-6 md:py-4 z-20 ${
                  asideOpen ? "" : ""
                } overflow-x-hidden scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-primary scroll-smooth space-y-3 duration-500`}
              >
                <form
                  className="grid grid-cols-1 grid-rows-6 md2:grid-cols-2 md2:grid-rows-3 md2:gap-8 space-y-3 md2:space-y-0 w-full"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <section className="">
                    <label htmlFor="fullname">House Number</label>
                    <section className="flex items-center justify-between relative mt-1">
                      <input
                        {...register("house_no", {
                          required: {
                            value: true,
                            message: "House Number is required",
                          },
                          pattern: {
                            value: /^[A-Za-z0-9 ]*$/,
                            message: "Please enter valid house number",
                          },
                          maxLength: {
                            value: 6,
                            message:
                              "Postal Code should not be longer than 6 digits",
                          },
                        })}
                        type="text"
                        name="house_no"
                        placeholder={
                          oldAddress.house_no ? oldAddress.house_no : "1"
                        }
                        value={oldAddress.house_no ? oldAddress.house_no : ""}
                        onChange={handleChange}
                        className={`appearance-none rounded-sm py-3 pl-5 w-full placeholder-[#868686] pr-12 text-black outline-none ${
                          errors.house_no &&
                          "border-2 border-red-500 text-red-500 bg-black"
                        }`}
                      />
                    </section>

                    {errors.house_no && errors.house_no.type === "pattern" && (
                      <span className="text-red-500 block mt-2">
                        {errors.house_no.message}
                      </span>
                    )}
                    {errors.house_no && errors.house_no.type === "required" && (
                      <span className="text-red-500 block mt-2">
                        {errors.house_no.message}
                      </span>
                    )}
                    {errors.house_no &&
                      errors.house_no.type === "maxLength" && (
                        <span className="text-red-500 block mt-2">
                          {errors.house_no.message}
                        </span>
                      )}
                  </section>

                  <section className="">
                    <label htmlFor="street_name">Street Name</label>
                    <section className="flex items-center justify-between relative mt-1">
                      <input
                        {...register("street_name", {
                          required: {
                            value: true,
                            message: "Street Name is required",
                          },
                          pattern: {
                            value: /^[A-Za-z ,\-]+$/,
                            message: "Please enter valid street name",
                          },
                        })}
                        type="text"
                        name="street_name"
                        placeholder={
                          oldAddress.street_name
                            ? oldAddress.street_name
                            : "Silicon Valley Street"
                        }
                        value={
                          oldAddress.street_name ? oldAddress.street_name : ""
                        }
                        onChange={handleChange}
                        className={`appearance-none rounded-sm py-3 pl-5 w-full placeholder-[#868686] pr-12 text-black outline-none ${
                          errors.street_name &&
                          "border-2 border-red-500 text-red-500 bg-black"
                        }`}
                      />
                    </section>

                    {errors.street_name &&
                      errors.street_name.type === "pattern" && (
                        <span className="text-red-500 block mt-2">
                          {errors.street_name.message}
                        </span>
                      )}
                    {errors.street_name &&
                      errors.street_name.type === "required" && (
                        <span className="text-red-500 block mt-2">
                          {errors.street_name.message}
                        </span>
                      )}
                  </section>

                  <section className="">
                    <label htmlFor="bus_stop">Bus Stop</label>
                    <section className="flex items-center justify-between relative mt-1">
                      <input
                        {...register("bus_stop", {
                          required: {
                            value: true,
                            message: "Bus Stop is required",
                          },
                          pattern: {
                            value: /^[A-Za-z ]*$/,
                            message: "Please enter valid street name",
                          },
                        })}
                        type="text"
                        name="bus_stop"
                        placeholder={
                          oldAddress.bus_stop
                            ? oldAddress.bus_stop
                            : "Sili Bus Stop"
                        }
                        value={oldAddress.bus_stop ? oldAddress.bus_stop : ""}
                        onChange={handleChange}
                        className={`appearance-none rounded-sm py-3 pl-5 w-full placeholder-[#868686] pr-12 text-black outline-none ${
                          errors.bus_stop &&
                          "border-2 border-red-500 text-red-500 bg-black"
                        }`}
                      />
                    </section>

                    {errors.bus_stop && errors.bus_stop.type === "pattern" && (
                      <span className="text-red-500 block mt-2">
                        {errors.bus_stop.message}
                      </span>
                    )}
                    {errors.bus_stop && errors.bus_stop.type === "required" && (
                      <span className="text-red-500 block mt-2">
                        {errors.bus_stop.message}
                      </span>
                    )}
                  </section>

                  <section className="">
                    <label htmlFor="lga">LGA</label>
                    <section className="flex items-center justify-between relative mt-1">
                      <input
                        {...register("lga", {
                          required: {
                            value: true,
                            message: "LGA is required",
                          },
                          pattern: {
                            value: /^[A-Za-z ]*$/,
                            message: "Please enter valid LGA",
                          },
                        })}
                        type="text"
                        name="lga"
                        placeholder={
                          oldAddress.lga ? oldAddress.lga : "Corn Valley"
                        }
                        value={oldAddress.lga ? oldAddress.lga : ""}
                        onChange={handleChange}
                        className={`appearance-none rounded-sm py-3 pl-5 w-full placeholder-[#868686] pr-12 text-black outline-none ${
                          errors.lga &&
                          "border-2 border-red-500 text-red-500 bg-black"
                        }`}
                      />
                    </section>

                    {errors.lga && errors.lga.type === "pattern" && (
                      <span className="text-red-500 block mt-2">
                        {errors.lga.message}
                      </span>
                    )}
                    {errors.lga && errors.lga.type === "required" && (
                      <span className="text-red-500 block mt-2">
                        {errors.lga.message}
                      </span>
                    )}
                  </section>

                  <section className="">
                    <label htmlFor="postal_code">Postal Code</label>
                    <section className="flex items-center justify-between relative mt-1">
                      <input
                        {...register("postal_code", {
                          required: {
                            value: false,
                            message: "Postal Code is required",
                          },
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Please enter valid street name",
                          },
                          maxLength: {
                            value: 6,
                            message:
                              "Postal Code should not be longer than 6 digits",
                          },
                        })}
                        type="text"
                        name="postal_code"
                        placeholder={
                          oldAddress.postal_code
                            ? oldAddress.postal_code
                            : "123456"
                        }
                        value={
                          oldAddress.postal_code ? oldAddress.postal_code : ""
                        }
                        onChange={handleChange}
                        className={`appearance-none rounded-sm py-3 pl-5 w-full placeholder-[#868686] pr-12 text-black outline-none ${
                          errors.postal_code &&
                          "border-2 border-red-500 text-red-500 bg-black"
                        }`}
                      />
                    </section>

                    {errors.postal_code &&
                      errors.postal_code.type === "pattern" && (
                        <span className="text-red-500 block mt-2">
                          {errors.postal_code.message}
                        </span>
                      )}
                    {errors.postal_code &&
                      errors.postal_code.type === "required" && (
                        <span className="text-red-500 block mt-2">
                          {errors.postal_code.message}
                        </span>
                      )}

                    {errors.postal_code &&
                      errors.postal_code.type === "maxLength" && (
                        <span className="text-red-500 block mt-2">
                          {errors.postal_code.message}
                        </span>
                      )}
                  </section>

                  <section className="">
                    <label htmlFor="state">State</label>
                    <section className="flex items-center justify-between relative mt-1">
                      <input
                        {...register("state", {
                          required: {
                            value: true,
                            message: "State is required",
                          },
                          pattern: {
                            value: /^[A-Za-z ]*$/,
                            message: "Please enter valid State",
                          },
                        })}
                        type="text"
                        name="state"
                        placeholder={
                          oldAddress.state ? oldAddress.state : "Your State"
                        }
                        value={oldAddress.state ? oldAddress.state : ""}
                        onChange={handleChange}
                        className={`appearance-none rounded-sm py-3 pl-5 w-full placeholder-[#868686] pr-12 text-black outline-none ${
                          errors.state &&
                          "border-2 border-red-500 text-red-500 bg-black"
                        }`}
                      />
                    </section>

                    {errors.state && errors.state.type === "pattern" && (
                      <span className="text-red-500 block mt-2">
                        {errors.state.message}
                      </span>
                    )}
                    {errors.state && errors.state.type === "required" && (
                      <span className="text-red-500 block mt-2">
                        {errors.state.message}
                      </span>
                    )}
                  </section>

                  <section className="">
                    <label htmlFor="country">Country</label>
                    <section className="flex items-center justify-between relative mt-1">
                      <input
                        {...register("country", {
                          required: {
                            value: false,
                            message: "Country is required",
                          },
                          pattern: {
                            value: /^[A-Za-z ]*$/,
                            message: "Please enter valid Country",
                          },
                        })}
                        type="text"
                        name="country"
                        placeholder={
                          oldAddress.country ? oldAddress.country : "Nigeria"
                        }
                        value={
                          oldAddress.country ? oldAddress.country : "Nigeria"
                        }
                        onChange={handleChange}
                        className={`appearance-none rounded-sm py-3 pl-5 w-full placeholder-[#868686] pr-12 text-black outline-none ${
                          errors.country &&
                          "border-2 border-red-500 text-red-500 bg-black"
                        }`}
                      />
                    </section>

                    {errors.country && errors.country.type === "pattern" && (
                      <span className="text-red-500 block mt-2">
                        {errors.country.message}
                      </span>
                    )}
                    {errors.country && errors.country.type === "required" && (
                      <span className="text-red-500 block mt-2">
                        {errors.country.message}
                      </span>
                    )}
                  </section>

                  <section className="flex items-center justify-start">
                    <label className="mt-1" htmlFor="is_default">
                      Set as Default
                    </label>

                    <input
                      {...register("is_default", {
                        required: false,
                      })}
                      className="appearance-none rounded-sm py-3 pl-5 pr-12 text-black outline-none h-5 w-5 border border-gray-300 bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-300 ml-3 cursor-pointer"
                      type="checkbox"
                      checked={oldAddress.is_default}
                      onChange={handleChange}
                      name="is_default"
                      id="is_default"
                    />
                  </section>

                  <section className="flex items-center justify-start md2:justify-end md2:col-start-2">
                    <button className="bg-black text-white rounded-sm px-8 py-4 grid place-items-center w-fit cursor-pointer hover:bg-primary duration-300">
                      <span>Save Changes</span>
                    </button>
                  </section>
                </form>

                {/* end of address card */}
              </section>
            </section>
          </section>
        </section>
      )}
    </section>
  );
};

export default addresses;

export const getServerSideProps = async ({ req, params: { pk } }) => {
  const session = await getSession({ req });
  let userStatus = {};

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    await fetch(
      "https://mercurius-api-production.up.railway.app/api/users/verify/",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(session.user),
      }
    )
      .then((res) => res.json())
      .then((userStatusRes) => {
        userStatus = userStatusRes;
        return userStatus;
      });

    let userAddressesArr = [];
    let addressesArr = [];
    let address = [];

    const allAddresses = await fetch(
      "https://mercurius-api-production.up.railway.app/api/addresses/"
    ).then((res) => res.json());

    if (allAddresses.length !== 0) {
      userAddressesArr = await allAddresses.filter(
        (address) => address.user === userStatus.id
      );
    }

    if (userAddressesArr.length !== 0) {
      addressesArr = await userAddressesArr.filter(
        (address) => address.id.toString() === pk
      );
    }

    if (addressesArr.length !== 0) {
      address = await addressesArr[0];
    }

    return {
      props: { session, userStatus, address },
    };
  }
};
