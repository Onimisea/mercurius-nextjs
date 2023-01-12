import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { getSession, useSession, signOut } from "next-auth/react";
import { Sidebar } from "../../components";
import { FiMenu, FiPackage, FiEdit } from "react-icons/fi";
import { FaEnvelope, FaHeart } from "react-icons/fa";
import { MdClose, MdInventory } from "react-icons/md";
import { ImUser } from "react-icons/im";
import { RiLogoutBoxFill } from "react-icons/ri";

const account = ({ userStatus, defaultAddress }) => {
  const {
    appState: { cart },
    tabbed,
    setTabbed,
    userInfo,
    setUserInfo,
  } = useAppContext();

  const handleSignOut = () => {
    window.localStorage.removeItem("UserData");
    setUserInfo(null);
    signOut({ callbackUrl: "/register" });
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
      // if (window.localStorage.getItem("UserData")) {
      //   console.log("From Backend", userStatus);
      // }
    }
  }, []);

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>Mercurius | Account | Best Thrift Store in Nigeria</title>
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
                {/* grid place-items-center sm2:hidden w-[40px] h-[40px] absolute
                -top-[40px] left-[8px] font-bold duration-300 cursor-pointer */}
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
              {/* whitespace-nowrap overflow-x-scroll scrollbar-none */}
              <section className="w-full sticky top-0 left-0 bg-black px-4 py-3 md:px-6 md:py-4 mb-5 md:mb-8">
                <h3 className="text-xl text-white">Account</h3>
              </section>

              <section
                className={`w-full h-fit flex flex-col items-center justify-center px-4 py-3 md:px-6 md:py-4 ${
                  asideOpen ? "" : ""
                } overflow-x-hidden scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-primary scroll-smooth space-y-3 duration-500`}
              >
                <section className="w-full bg-white rounded-md p-4">
                  <section className="flex items-start justify-between mb-6">
                    <h3 className="text-lg text-black font-semibold">
                      Account Details
                    </h3>
                    <Link
                      href="/account/account-details"
                      className="cursor-pointer hover:text-primary duration-300"
                    >
                      <FiEdit size={25} className="p-0 m-0" />
                    </Link>
                  </section>

                  <section className="flex flex-col items-start text-[#868686] space-y-1 w-full">
                    <p>{userStatus.fullname}</p>
                    <p>{userStatus.email}</p>
                    <p>{userStatus.phone}</p>
                  </section>
                </section>
              </section>

              <section
                className={`w-full h-fit flex flex-col items-center justify-center px-4 py-3 md:px-6 md:py-4 ${
                  asideOpen ? "" : ""
                } overflow-x-hidden scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-primary scroll-smooth space-y-3 duration-500`}
              >
                <section className="w-full bg-white rounded-md p-4">
                  <section className="flex items-start justify-between mb-6">
                    <h3 className="text-lg text-black font-semibold">
                      Shipping Address
                    </h3>
                    <Link
                      href="/account/addresses"
                      className="cursor-pointer hover:text-primary duration-300"
                    >
                      <FiEdit size={25} className="p-0 m-0" />
                    </Link>
                  </section>

                  {defaultAddress.length !== 0 ? (
                    <section className="flex flex-col items-start text-[#868686] space-y-1 w-full sm:w-[50%] md:w-[35%]">
                      <p>
                        No. {defaultAddress.house_no},{" "}
                        {defaultAddress.street_name}, {defaultAddress.bus_stop},{" "}
                        {defaultAddress.lga} {defaultAddress.postal_code},{" "}
                        {defaultAddress.state}, {defaultAddress.country}.
                      </p>
                    </section>
                  ) : (
                    <section className="flex flex-col items-start text-[#868686] space-y-1 w-full sm:w-[50%] md:w-[35%]">
                      <p>No default shipping address set</p>
                    </section>
                  )}
                </section>
              </section>

              <section
                className={`w-full h-fit flex flex-col items-center justify-center px-4 py-3 md:px-6 md:py-4 ${
                  asideOpen ? "" : ""
                } overflow-x-hidden scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-primary scroll-smooth space-y-3 duration-500`}
              >
                <section className="w-full bg-white rounded-md p-4">
                  <section className="flex items-start justify-between mb-0">
                    <h3 className="text-lg text-black font-semibold">
                      Change Password
                    </h3>
                    <Link
                      href="/account/change-password"
                      className="cursor-pointer hover:text-primary duration-300"
                    >
                      <FiEdit size={25} className="p-0 m-0" />
                    </Link>
                  </section>
                </section>
              </section>

              <section
                className={`w-full h-fit flex flex-col items-center justify-center px-4 py-3 md:px-6 md:py-4 ${
                  asideOpen ? "" : ""
                } overflow-x-hidden scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-primary scroll-smooth space-y-3 duration-500`}
              >
                <section className="w-full bg-white rounded-md p-4">
                  <section className="flex items-start justify-between mb-0">
                    <h3 className="text-lg text-black font-semibold">
                      Select Currency
                    </h3>

                    <p className="text-primary">Nigeria (NGN)</p>
                    {/* <FiEdit size={25} className="p-0 m-0" /> */}
                  </section>
                </section>
              </section>
            </section>
          </section>
        </section>
      )}
    </section>
  );
};

export default account;

export const getServerSideProps = async ({ req }) => {
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

    const allAddresses = await fetch(
      "https://mercurius-api-production.up.railway.app/api/addresses/"
    ).then((res) => res.json());

    let addresses = [];
    let defaultAddressArr = [];
    let defaultAddress = [];

    if (allAddresses.length !== 0) {
      addresses = allAddresses.filter(
        (address) => address.user === userStatus.id
      );
    }

    if (addresses.length !== 0) {
      defaultAddressArr = await addresses.filter(
        (address) => address.is_default === true
      );
    }

    if (defaultAddressArr.length !== 0) {
      defaultAddress = await defaultAddressArr[0];
    }

    // Data received from Webhook is:

    const data = {
      event: "charge.success",
      data: {
        id: 2441889752,
        domain: "test",
        status: "success",
        reference: "T390117421361611",
        amount: 5641000,
        message: None,
        gateway_response: "Successful",
        paid_at: "2023-01-12T06:17:20.000Z",
        created_at: "2023-01-12T06:16:37.000Z",
        channel: "card",
        currency: "NGN",
        ip_address: "102.89.32.203",
        metadata: {
          name: "Onimisea Tijani",
          phone: "+2348034023720",
          email: "onimisea@gmail.com",
          paymentType: "Instant Shipping",
          cart: [
            {
              id: 1,
              category: "Luxury",
              subcategory: {
                id: 1,
                category: "Luxury",
                name: "Luxury Men",
                description: "",
                slug: "luxury-men",
                lowersubcategories: [
                  {
                    id: 1,
                    subcategory: "Luxury Men",
                    name: "T-Shirts",
                    slug: "t-shirts",
                    lowersubcategory_icon:
                      "image/upload/v1673455851/Product Type Icons/uigievs3mweqwumdjsut.png",
                    is_active: True,
                    created_at: "2023-01-11T17:50:52.259936+01:00",
                    updated_at: "2023-01-11T17:50:52.259988+01:00",
                  },
                  {
                    id: 2,
                    subcategory: "Luxury Men",
                    name: "Shorts",
                    slug: "shorts",
                    lowersubcategory_icon:
                      "image/upload/v1673456214/Product Type Icons/a3vx49gdbtfbprceoahv.png",
                    is_active: True,
                    created_at: "2023-01-11T17:56:54.380052+01:00",
                    updated_at: "2023-01-11T17:56:54.380122+01:00",
                  },
                  {
                    id: 3,
                    subcategory: "Luxury Men",
                    name: "Jackets",
                    slug: "jackets",
                    lowersubcategory_icon:
                      "image/upload/v1673456259/Product Type Icons/lpc0sueeulcamd3j9cjl.png",
                    is_active: True,
                    created_at: "2023-01-11T17:57:39.549552+01:00",
                    updated_at: "2023-01-11T17:57:39.549602+01:00",
                  },
                  {
                    id: 4,
                    subcategory: "Luxury Men",
                    name: "Footwear",
                    slug: "footwear",
                    lowersubcategory_icon:
                      "image/upload/v1673456293/Product Type Icons/yutciefsucc6pb7ywka9.png",
                    is_active: True,
                    created_at: "2023-01-11T17:58:14.038212+01:00",
                    updated_at: "2023-01-11T17:58:14.038264+01:00",
                  },
                  {
                    id: 5,
                    subcategory: "Luxury Men",
                    name: "Trousers",
                    slug: "trousers",
                    lowersubcategory_icon:
                      "image/upload/v1673456330/Product Type Icons/c16yw1egrko18frrm7k1.png",
                    is_active: True,
                    created_at: "2023-01-11T17:58:50.896868+01:00",
                    updated_at: "2023-01-11T17:58:50.896917+01:00",
                  },
                  {
                    id: 6,
                    subcategory: "Luxury Men",
                    name: "Cologne",
                    slug: "cologne",
                    lowersubcategory_icon:
                      "image/upload/v1673456354/Product Type Icons/ttdyvu3rv8oqjjyc1bxz.png",
                    is_active: True,
                    created_at: "2023-01-11T17:59:14.941361+01:00",
                    updated_at: "2023-01-11T17:59:14.941423+01:00",
                  },
                  {
                    id: 7,
                    subcategory: "Luxury Men",
                    name: "Accessories",
                    slug: "accessories",
                    lowersubcategory_icon:
                      "image/upload/v1673456383/Product Type Icons/kpsrt7xcehxkgrbzwile.png",
                    is_active: True,
                    created_at: "2023-01-11T17:59:44.314627+01:00",
                    updated_at: "2023-01-11T17:59:44.314678+01:00",
                  },
                ],
              },
              lowersubcategory: {
                id: 1,
                subcategory: "Luxury Men",
                name: "T-Shirts",
                slug: "t-shirts",
                lowersubcategory_icon:
                  "image/upload/v1673455851/Product Type Icons/uigievs3mweqwumdjsut.png",
                is_active: True,
                created_at: "2023-01-11T17:50:52.259936+01:00",
                updated_at: "2023-01-11T17:50:52.259988+01:00",
              },
              product_type: { id: 1, name: "T-Shirts" },
              name: "Fine Shirt",
              slug: "fine-shirt-67819",
              description: "A very very fine shirt from Qees Signatures",
              price: 56300,
              flashsale_price: 50670,
              flashsale: 10,
              is_onFlashsale: True,
              weight: 0.12,
              in_stock: True,
              product_stock: None,
              attribute_value: [
                { attribute: "T-Shirts : Size", value: "L" },
                { attribute: "T-Shirts : Size", value: "M" },
                { attribute: "T-Shirts : Size", value: "XL" },
                { attribute: "T-Shirts : Size", value: "XXL" },
              ],
              product_images: [
                {
                  product: "Fine Shirt",
                  product_images:
                    "image/upload/v1673461520/Product Images/np9sgwyfnapu4wc6gjhy.jpg",
                  alt_text: "Fine Shirt",
                  is_feature: True,
                },
                {
                  product: "Fine Shirt",
                  product_images:
                    "image/upload/v1673461741/Product Images/gl1ckwb3py4cb8rcxc7l.jpg",
                  alt_text: "Fine Shirt",
                  is_feature: False,
                },
                {
                  product: "Fine Shirt",
                  product_images:
                    "image/upload/v1673461767/Product Images/ww4ivkgicdrakxg5tlts.jpg",
                  alt_text: "Fine Shirt",
                  is_feature: False,
                },
                {
                  product: "Fine Shirt",
                  product_images:
                    "image/upload/v1673461804/Product Images/m4gzhihtneclabxz97zj.jpg",
                  alt_text: "Fine Shirt",
                  is_feature: False,
                },
                {
                  product: "Fine Shirt",
                  product_images:
                    "image/upload/v1673461856/Product Images/gcqj6ubtpab5qbis2qwl.jpg",
                  alt_text: "Fine Shirt",
                  is_feature: False,
                },
                {
                  product: "Fine Shirt",
                  product_images:
                    "image/upload/v1673461906/Product Images/suwnkha4oubmatgxle3n.jpg",
                  alt_text: "Fine Shirt",
                  is_feature: False,
                },
              ],
              qty: 1,
            },
          ],
          totalPrice: 56300,
          shippingFee: 100,
          salesTax: 10,
          shippingAddress: {
            id: 1,
            user: 3,
            house_no: "8",
            street_name: "Silicon Valley Street",
            bus_stop: "Silly Bus Stop",
            lga: "Corn Valley",
            postal_code: "125204",
            state: "Lagos State",
            country: "Nigeria",
            is_default: True,
          },
          referrer: "https://mercurius-production.up.railway.app/checkout",
        },
        fees_breakdown: None,
        log: None,
        fees: 94615,
        fees_split: None,
        authorization: {
          authorization_code: "AUTH_o1oihcpbnh",
          bin: "408408",
          last4: "4081",
          exp_month: "12",
          exp_year: "2030",
          channel: "card",
          card_type: "visa ",
          bank: "TEST BANK",
          country_code: "NG",
          brand: "visa",
          reusable: True,
          signature: "SIG_q1rtButlSlqg4jDmV9Qb",
          account_name: None,
          receiver_bank_account_number: None,
          receiver_bank: None,
        },
        customer: {
          id: 105166315,
          first_name: "",
          last_name: "",
          email: "onimisea@gmail.com",
          customer_code: "CUS_rezm8abb899pdb3",
          phone: "",
          metadata: None,
          risk_action: "default",
          international_format_phone: None,
        },
        plan: {},
        subaccount: {},
        split: {},
        order_id: None,
        paidAt: "2023-01-12T06:17:20.000Z",
        requested_amount: 5641000,
        pos_transaction_data: None,
        source: {
          type: "web",
          source: "checkout",
          entry_point: "request_inline",
          identifier: None,
        },
      },
      headers: {
        Host: "mercurius-api-production.up.railway.app",
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "User-Agent": "Paystack/2.0",
        "X-Paystack-Signature":
          "56a009308d7a3d1f7aa6851575c9a4c0e9a9918a6f73a5b368cfd1bef3573f1ceb4fafedd6369a9d3b563ff970de82fc1f59f06ffa393f5c8b20f79fd5f6a9f8",
        "Content-Length": "5469",
        "X-Datadog-Trace-Id": "864374866069784545",
        "X-Datadog-Parent-Id": "4352646219327325582",
        "X-Datadog-Sampled": "1",
        "X-Datadog-Sampling-Priority": "0",
        "X-Forwarded-For": "52.214.14.220",
        "X-Forwarded-Proto": "https",
        "X-Envoy-External-Address": "52.214.14.220",
        "X-Request-Id": "17f2d1d9-725b-489f-81d0-738d72222844",
      },
    };

    return {
      props: { session, userStatus, defaultAddress },
    };
  }
};
