import React, { useEffect } from "react";
import Head from "next/head";
import { useAppContext } from "../context/AppContext";
import Link from "next/link";
import { PaystackButton } from "react-paystack";
import toast from "react-hot-toast";
import { getSession, useSession, signOut } from "next-auth/react";

const Checkout = ({ userStatus }) => {
  const {
    appState: { cart },
    totalPrice,
    shipping,
    setShipping,
    salesTax,
    setSalesTax,
    numbersWithCommas,
    tabbed,
    setTabbed,
    paymentPropsSts,
    paymentPropsIs,
  } = useAppContext();

  const { data: session } = useSession();


  const handleSignOut = () => {
    window.localStorage.removeItem("UserData");
    signOut({ callbackUrl: "/register" });
  };

  const shippingCost = cart.length * 100;
  const salesTaxCost = cart.length * 10;

  setShipping(shippingCost);
  setSalesTax(salesTaxCost);

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>Mercurius | Checkout | Best Thrift Store in Nigeria</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {userStatus.error ? (
        <section className="w-full p-12 grid place-items-center">
          <h4 className="text-xl text-primary">Please, complete your Account registration using your Google email!</h4>
          <Link href="/register">
            <button className="bg-black rounded-md mt-5 px-5 py-3 text-white hover:bg-primary cursor-pointer w-fit" onClick={handleSignOut}>
              Register
            </button>
          </Link>
        </section>
      ) : (
        <section className="my-16">
          <h1 className="text-3xl lg:text-4xl font-dalek text-primary ">
            Checkout
          </h1>

          <section className="my-10 flex flex-col items-center space-y-6 md3:space-y-0">
            <section className="w-full flex flex-col">
              {cart.length === 0 ? (
                <section className="w-full p-6 grid place-items-center">
                  <h4 className="text-xl font-dalek text-primary">
                    Nothing To Checkout
                  </h4>
                  <Link href="/">
                    <button className="bg-black rounded-md mt-5 px-5 py-3 text-white hover:bg-primary cursor-pointer w-fit">
                      Back to Shopping
                    </button>
                  </Link>
                </section>
              ) : (
                <section className=" px-3 md:p-6 space-y-6 md:space-y-0 md:flex md:flex-row md:items-start md:justify-between">
                  <section className="md:w-[55%]">
                    {cart.map((item) => {
                      const fi = item.product_images.filter(
                        (image) => image.is_feature == true
                      );

                      const fiUrl =
                        "https://res.cloudinary.com/dxhq8jlxf/" +
                        fi[0].product_images.replace(/ /g, "%20");

                      return (
                        <section
                          key={item.id}
                          className="flex items-start justify-start space-x-5 mb-3 md:mb-5 md:w-full"
                        >
                          <section className="w-[50px] h-[50px] rounded-md">
                            <img
                              src={fiUrl}
                              alt={item.name}
                              className="w-[50px] h-[50px] object-contain rounded-md"
                            />
                          </section>

                          <section className="w-full">
                            <section className="">{item.name}</section>
                            <section className="mt-1 font-semibold">
                              Qty: {item.qty}, Subtotal: ₦
                              {numbersWithCommas(item.price * item.qty)}
                            </section>
                          </section>
                        </section>
                      );
                    })}
                  </section>

                  <section className="mt-2 py-2 px-2 md:mt-0 md:py-2 md:px-6 border-t-2 md:border-t-0 border-gray-300 md:w-[38%] md:bg-gray-100">
                    <section className="flex items-center justify-between my-1">
                      <span>Subtotal</span>
                      <span className="font-semibold">
                        ₦{numbersWithCommas(totalPrice)}
                      </span>
                    </section>

                    <section className="flex items-center justify-between my-1">
                      <span>Shipping Fee</span>
                      <span className="font-semibold">
                        ₦{numbersWithCommas(shipping)}
                      </span>
                    </section>

                    <section className="flex items-center justify-between my-1">
                      <span>Sales Tax</span>
                      <span className="font-semibold">
                        ₦{numbersWithCommas(salesTax)}
                      </span>
                    </section>

                    <section className="border-t-2 border-b-2 border-black mt-2 md:mt-6 py-2 md:py-4 flex items-center justify-between">
                      <span>Total</span>
                      <span className="font-semibold">
                        ₦{numbersWithCommas(totalPrice + shipping + salesTax)}
                      </span>
                    </section>

                    <Link href="/cart" className="flex justify-end">
                      <button className="bg-black rounded-md mt-5 px-3 py-2 text-white hover:bg-primary cursor-pointer w-fit">
                        Back to Cart
                      </button>
                    </Link>
                  </section>
                </section>
              )}
            </section>

            {cart.length > 0 && (
              <section className="w-full md:w-[100%] border-4 border-gray-100 rounded-xl">
                {tabbed ? (
                  <>
                    <section className="flex flex-col justify-center max-w-xl mx-auto mb-6 border-b md:space-x-10 md:flex-row">
                      <section
                        className="flex justify-center text-center text-black border-b md:border-b-0 hover:text-primary hover:font-bold cursor-pointer md:w-1/2 tab"
                        data-target="panel-1"
                      >
                        <section
                          className="py-3"
                          onClick={() => setTabbed(false)}
                        >
                          Save to Storehouse
                        </section>
                      </section>

                      <section
                        className="flex justify-center text-center text-black border-b md:border-b-0 hover:text-primary hover:font-bold cursor-pointer md:w-1/2 tab"
                        data-target="panel-2"
                      >
                        <section
                          className="py-3 border-b-4 border-primary"
                          onClick={() => setTabbed(true)}
                        >
                          Instant Shipping
                        </section>
                      </section>
                    </section>

                    <section id="panels" className="mx-auto">
                      <section className="flex flex-col py-5 panel panel-2 text-center items-center justify-center">
                        <p className=" mb-5">
                          Your items will be shipped to you AS SOON AS your
                          order is received.
                        </p>
                        <PaystackButton
                          className="bg-primary rounded-md flex items-center justify-center px-3 py-2 text-white hover:bg-black cursor-pointer w-fit mt-5"
                          {...paymentPropsIs}
                        />
                      </section>
                    </section>
                  </>
                ) : (
                  <>
                    <section className="flex flex-col justify-center max-w-xl mx-auto mb-6 border-b md:space-x-10 md:flex-row">
                      <section
                        className="flex justify-center text-center text-black border-b md:border-b-0 hover:text-primary hover:font-bold cursor-pointer md:w-1/2 tab"
                        data-target="panel-1"
                      >
                        <section
                          className="py-3 border-b-4 border-primary"
                          onClick={() => setTabbed(false)}
                        >
                          Save to Storehouse
                        </section>
                      </section>

                      <section
                        className="flex justify-center text-center text-black border-b md:border-b-0 hover:text-primary hover:font-bold cursor-pointer md:w-1/2 tab"
                        data-target="panel-2"
                      >
                        <section
                          className="py-3"
                          onClick={() => setTabbed(true)}
                        >
                          Instant Shipping
                        </section>
                      </section>
                    </section>
                    <section id="panels" className="mx-auto">
                      <section className="flex flex-col py-5 panel panel-2 text-center items-center justify-center">
                        <p className=" mb-5">
                          You can buy as many items as you want, pay for them,
                          keep them in our Storehouse and shipped all of them at
                          once whenever you're ready.
                        </p>
                        <p className="">
                          <span className="text-red-600 font-bold mr-3">
                            PLEASE NOTE:
                          </span>
                          <span className="text-red-500">
                            It is{" "}
                            <span className="text-primary font-semibold mr-1">
                              FREE for 14 days
                            </span>
                            after which you{" "}
                            <span className="text-red-600 font-bold mr-1">
                              WILL be charged ₦100
                            </span>
                            per item every day until you request for your
                            shipment.
                          </span>
                        </p>

                        <PaystackButton
                          className="bg-primary rounded-md flex items-center justify-center px-3 py-2 text-white hover:bg-black cursor-pointer w-fit mt-5"
                          {...paymentPropsSts}
                        />
                      </section>
                    </section>
                  </>
                )}
              </section>
            )}
          </section>
        </section>
      )}
    </section>
  );
};

export default Checkout;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let userStatus = {};

  if (session.user) {
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
  }

  return {
    props: { session, userStatus },
  };
};
