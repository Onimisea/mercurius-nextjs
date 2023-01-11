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
import { BsArrowLeft, BsEye, BsEyeSlashFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const change_password = ({ userStatus }) => {
  const router = useRouter();

  const { showPassword, setShowPassword, setUserInfo } = useAppContext();

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
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    if (userStatus) {
      if (data.password === data.confirm_password) {
        const new_data = {
          password: data.password,
          password2: data.confirm_password,
        };

        try {
          const options = {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(new_data),
          };

          await fetch(
            `https://mercurius-api-production.up.railway.app/api/users/${userStatus.id}/change-password/`,
            options
          )
            .then((res) => res.json())
            .then((resData) => {
              if (resData.errors) {
                toast.error(resData.errors[0]);
              } else {
                toast.success(resData.success);
                router.push("/account");
              }
            });
        } catch (err) {
          console.log(err);
          // toast.error(err);
        }
      } else {
        setError(
          "password",
          { type: "unmatchPassword", message: "Passwords do not match!" },
          { shouldFocus: false }
        );
        setError(
          "confirm_password",
          { type: "unmatchPassword", message: "Passwords do not match!" },
          { shouldFocus: true }
        );
        toast.error("Passwords do not match!");
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
    }
  }, []);

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>
          Mercurius | Change Password | Best Thrift Store in Nigeria
        </title>
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
              <section className="w-full sticky top-0 left-0 bg-black text-white px-4 py-3 md:px-6 md:py-4 mb-5 md:mb-8 flex items-center justify-start z-10">
                <Link href="/account">
                  <BsArrowLeft
                    size={25}
                    className="p-0 m-0 mr-4 cursor-pointer hover:text-primary duration-300"
                  />
                </Link>
                <h3 className="text-lg">Change Password</h3>
              </section>

              <section
                className={`w-full h-fit flex flex-col items-center justify-center px-4 py-3 md:px-6 md:py-4 z-10 ${
                  asideOpen ? "" : ""
                } overflow-x-hidden scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-primary scroll-smooth space-y-3 duration-500`}
              >
                <form
                  className="grid grid-cols-1 grid-rows-3 md2:gap-8 space-y-3 md2:space-y-0 w-full"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <section className="">
                    <label htmlFor="password">New Password</label>
                    <section className="flex items-center justify-between relative mt-2">
                      <>
                        <input
                          {...register("password", {
                            required: {
                              value: true,
                              message: "Password is required",
                            },
                            pattern: {
                              value:
                                /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                              message:
                                "The password length must be greater than or equal to 8, must contain at least 1 uppercase, 1 lowercase, 1 number and must contain 1 special character",
                            },
                          })}
                          type={`${
                            showPassword.password ? "text" : "password"
                          }`}
                          name="password"
                          placeholder="New Password"
                          className={`appearance-none rounded-md py-3 pl-5 w-full placeholder-[#868686] pr-12 text-black outline-none ${
                            errors.password &&
                            "border-2 border-red-500 text-red-500 bg-black"
                          }`}
                        />

                        {showPassword.password ? (
                          <BsEye
                            className={`absolute right-0 z-50 mr-4 ${
                              errors.password && "text-red-500"
                            } text-black cursor-pointer`}
                            onClick={() =>
                              setShowPassword({
                                ...showPassword,
                                password: !showPassword.password,
                              })
                            }
                          />
                        ) : (
                          <BsEyeSlashFill
                            className={`absolute right-0 z-50 mr-4 ${
                              errors.password && "text-red-500"
                            } text-black cursor-pointer`}
                            onClick={() =>
                              setShowPassword({
                                ...showPassword,
                                password: !showPassword.password,
                              })
                            }
                          />
                        )}
                      </>
                    </section>

                    {errors.password && errors.password.type === "pattern" && (
                      <span className="text-red-500 block mt-2">
                        {errors.password.message}
                      </span>
                    )}
                    {errors.password && errors.password.type === "required" && (
                      <span className="text-red-500 block mt-2">
                        {errors.password.message}
                      </span>
                    )}
                    {errors.confirm_password &&
                      errors.confirm_password.type === "unmatchPassword" && (
                        <span className="text-red-500 block mt-2">
                          {errors.confirm_password.message}
                        </span>
                      )}
                  </section>

                  <section className="">
                    <label htmlFor="confirm_password">
                      Confirm New Password
                    </label>
                    <section className="flex items-center justify-between relative mt-2">
                      <>
                        <input
                          {...register("confirm_password", {
                            required: {
                              value: true,
                              message: "Please confirm your password",
                            },
                            pattern: {
                              value:
                                /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                              message:
                                "The password length must be greater than or equal to 8, must contain at least 1 uppercase, 1 lowercase, 1 number and must contain 1 special character",
                            },
                          })}
                          type={`${
                            showPassword.confirm_password ? "text" : "password"
                          }`}
                          name="confirm_password"
                          placeholder="Confirm New Password"
                          className={`appearance-none rounded-md py-3 pl-5 w-full placeholder-[#868686] pr-12 text-black outline-none ${
                            errors.confirm_password &&
                            "border-2 border-red-500 text-red-500 bg-black"
                          }`}
                        />

                        {showPassword.confirm_password ? (
                          <BsEye
                            className={`absolute right-0 z-50 mr-4 ${
                              errors.confirm_password && "text-red-500"
                            } text-black cursor-pointer`}
                            onClick={() =>
                              setShowPassword({
                                ...showPassword,
                                confirm_password:
                                  !showPassword.confirm_password,
                              })
                            }
                          />
                        ) : (
                          <BsEyeSlashFill
                            className={`absolute right-0 z-50 mr-4 ${
                              errors.confirm_password && "text-red-500"
                            } text-black cursor-pointer`}
                            onClick={() =>
                              setShowPassword({
                                ...showPassword,
                                confirm_password:
                                  !showPassword.confirm_password,
                              })
                            }
                          />
                        )}
                      </>
                    </section>

                    {errors.confirm_password &&
                      errors.confirm_password.type === "pattern" && (
                        <span className="text-red-500 block mt-2">
                          {errors.confirm_password.message}
                        </span>
                      )}
                    {errors.confirm_password &&
                      errors.confirm_password.type === "required" && (
                        <span className="text-red-500 block mt-2">
                          {errors.confirm_password.message}
                        </span>
                      )}
                    {errors.confirm_password &&
                      errors.confirm_password.type === "unmatchPassword" && (
                        <span className="text-red-500 block mt-2">
                          {errors.confirm_password.message}
                        </span>
                      )}
                  </section>

                  <section className="flex items-center justify-start md2:justify-end md2:col-start-1">
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

export default change_password;

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
    await fetch("https://mercurius-api-production.up.railway.app/api/users/verify/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(session.user),
    })
      .then((res) => res.json())
      .then((userStatusRes) => {
        userStatus = userStatusRes;
        return userStatus;
      });

    return {
      props: { session, userStatus },
    };
  }
};
