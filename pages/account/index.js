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
        id: 2441723399,
        domain: "test",
        status: "success",
        reference: "T259686032519843",
        amount: 5641000,
        message: None,
        gateway_response: "Successful",
        paid_at: "2023-01-12T04:57:10.000Z",
        created_at: "2023-01-12T04:56:59.000Z",
        channel: "card",
        currency: "NGN",
        ip_address: "102.89.34.245",
        metadata: {
          name: "Onimisea Tijani",
          phone: "+2348034023720",
          paymentType: "Instant Shipping",
          referrer: "https://mercurius-production.up.railway.app/checkout",
        },
        fees_breakdown: None,
        log: None,
        fees: 94615,
        fees_split: None,
        authorization: {
          authorization_code: "AUTH_brbwxwxnz4",
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
        paidAt: "2023-01-12T04:57:10.000Z",
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
          "558ad28867639a0b7ae9b88a2251fcf29c9f9dd937e8784b7fb2414691cc1b76072ed9cd7e72dd5754313b123b9d3b08f5ed59e03df2f05784176718bb2744a0",
        "Content-Length": "1340",
        "X-Datadog-Trace-Id": "6828656436936665279",
        "X-Datadog-Parent-Id": "4772476638621897470",
        "X-Datadog-Sampled": "1",
        "X-Datadog-Sampling-Priority": "0",
        "X-Forwarded-For": "52.214.14.220",
        "X-Forwarded-Proto": "https",
        "X-Envoy-External-Address": "52.214.14.220",
        "X-Request-Id": "bd2aa794-5c20-405a-855e-bdfc05efbfd4",
      },
    };

    return {
      props: { session, userStatus, defaultAddress },
    };
  }
};
