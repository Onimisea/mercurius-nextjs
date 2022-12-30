import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { getSession, useSession, signOut } from "next-auth/react";
import { Sidebar } from "../../components";
import { FiMenu, FiPackage, FiEdit } from "react-icons/fi";
import { FaEnvelope, FaHeart } from "react-icons/fa";
import { MdClose, MdInventory } from "react-icons/md";
import { ImUser } from "react-icons/im";
import { RiLogoutBoxFill } from "react-icons/ri";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";

const AccountDetails = ({ userStatus }) => {
  const router = useRouter();

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
    signOut({ callbackUrl: "/login" });
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
      name: "Inventory",
      url: "/inventory",
      icon: <MdInventory size={20} className="mr-2" />,
    },
    {
      name: "Log Out",
      url: null,
      icon: <RiLogoutBoxFill size={20} className="mr-2" />,
    },
  ];

  const [asideOpen, setAsideOpen] = useState(false);

  // Form Dependencies
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
    },
  });

  const onSubmit = async (data) => {
    if (userStatus) {
      const nameArr = data.fullname.split(" ");
      if (nameArr.length < 2 || nameArr.length > 3) {
        setError(
          "fullname",
          {
            type: "invalidNames",
            message: "Please enter your Firstname and Lastname!",
          },
          { shouldFocus: true }
        );
      }

      data.phone = "+234" + data.phone;

      try {
        const options = {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        };

        await fetch(
          `https://mercurius-api-production.up.railway.app/api/users/update/${userStatus.id}/`,
          options
        )
          .then((res) => res.json())
          .then((resData) => {
            if (resData.errors) {
              toast.error(resData.errors[0]);
            } else {
              console.log(resData);
              toast.success(resData.success);
              window.localStorage.setItem(
                "UserData",
                JSON.stringify(resData.data)
              );
              setUserInfo(resData.data);
              router.reload(window.location.pathname);
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

  const [userProfile, setUserProfile] = useState(userStatus);

  const handleChange = () => {};

  return (
    <section className="w-[85%] mx-auto max-w-screen-xl">
      <Head>
        <title>
          Mercurius | Account Details | Best Thrift Store in Nigeria
        </title>
      </Head>

      {userStatus.error ? (
        <section className="w-full p-12 grid place-items-center text-center">
          <h4 className="text-xl text-primary text-center">
            Please, complete your Account registration!
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

            {/* Main Section */}
            <section
              className={`bg-[#F1F1F1] w-[100%] flex flex-col items-center justify-center scroll-smooth duration-500`}
            >
              {/* Header */}
              <section className="w-full sticky top-0 left-0 bg-black text-white px-4 py-3 md:px-6 md:py-4 mb-5 md:mb-8 flex items-center justify-start z-50">
                <Link href="/account">
                  <BsArrowLeft
                    size={25}
                    className="p-0 m-0 mr-4 cursor-pointer hover:text-primary duration-300"
                  />
                </Link>
                <h3 className="text-xl">Account Details</h3>
              </section>

              {/* Content Start */}
              <section
                className={`w-full h-fit flex flex-col items-center justify-center px-4 py-3 md:px-6 md:py-4 z-20 ${
                  asideOpen ? "" : ""
                } overflow-x-hidden scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-primary scroll-smooth space-y-2 duration-500`}
              >
                <form
                  className="grid grid-cols-1 grid-rows-6 md2:grid-cols-2 md2:grid-rows-3 md2:gap-8 space-y-3 md2:space-y-0 w-full"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <section className="col-span-full">
                    <label htmlFor="fullname">Fullname</label>
                    <section className="flex items-center justify-between relative mt-1">
                      <input
                        {...register("fullname", {
                          required: {
                            value: true,
                            message: "Firstname and Lastname is required",
                          },
                          pattern: {
                            value: /^[A-Za-z ]*$/,
                            message: "Please enter valid names",
                          },
                        })}
                        type="text"
                        name="fullname"
                        placeholder={
                          userInfo.fullname
                            ? userInfo.fullname
                            : "Firstname Lastname"
                        }
                        className={`appearance-none rounded-sm py-3 pl-5 w-full placeholder-[#868686] pr-12 text-black outline-none ${
                          errors.fullname &&
                          "border-2 border-red-500 text-red-500 bg-black"
                        }`}
                      />
                    </section>

                    {errors.fullname && errors.fullname.type === "pattern" && (
                      <span className="text-red-500 block mt-2">
                        {errors.fullname.message}
                      </span>
                    )}
                    {errors.fullname && errors.fullname.type === "required" && (
                      <span className="text-red-500 block mt-2">
                        {errors.fullname.message}
                      </span>
                    )}
                    {errors.fullname &&
                      errors.fullname.type === "invalidNames" && (
                        <span className="text-red-500 block mt-2">
                          {errors.fullname.message}
                        </span>
                      )}
                  </section>

                  <section className="">
                    <label htmlFor="email">Email</label>
                    <section className="flex items-center justify-between relative mt-2">
                      <input
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Email is required",
                          },
                          pattern: {
                            value:
                              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Please enter a valid email",
                          },
                          maxLength: {
                            value: 60,
                            message: "Email is longer than 60 characters",
                          },
                        })}
                        type="email"
                        name="email"
                        placeholder={
                          userInfo.email
                            ? userInfo.email
                            : "johndoe@company.com"
                        }
                        className={`appearance-none rounded-sm py-3 pl-5 w-full placeholder-[#868686] pr-12 text-black outline-none ${
                          errors.email && "border-2 border-red-500 text-red-500"
                        }`}
                      />
                    </section>

                    {errors.email && errors.email.type === "pattern" && (
                      <span className="text-red-500 block mt-2">
                        {errors.email.message}
                      </span>
                    )}

                    {errors.email && errors.email.type === "maxLength" && (
                      <span className="text-red-500 block mt-2">
                        {errors.email.message}
                      </span>
                    )}

                    {errors.email && errors.email.type === "required" && (
                      <span className="text-red-500 block mt-2">
                        {errors.email.message}
                      </span>
                    )}
                  </section>

                  <section className="">
                    <label htmlFor="phone">Phone Number</label>
                    <section className="flex items-center justify-start relative mt-2">
                      <section className="rounded-sm py-2 px-3 md:py-3 md:px-5 w-fit text-white bg-black">
                        +234
                      </section>
                      <input
                        {...register("phone", {
                          required: {
                            value: true,
                            message: "Phone number is required",
                          },
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Please enter valid phone number",
                          },
                          maxLength: {
                            value: 10,
                            message:
                              "Phone number is more than 10 digits. Remove the first Zero",
                          },
                        })}
                        type="text"
                        name="phone"
                        placeholder={userInfo.phone ? userInfo.phone.replace(
                          "+234",
                          ""
                        ) : "801234568"}
                        className={`appearance-none rounded-sm py-3 pl-5 w-full placeholder-[#868686] pr-12 text-black outline-none ${
                          errors.phone && "border-2 border-red-500 text-red-500"
                        }`}
                      />
                    </section>

                    {errors.phone && errors.phone.type === "pattern" && (
                      <span className="text-red-500 block mt-2">
                        {errors.phone.message}
                      </span>
                    )}

                    {errors.phone && errors.phone.type === "required" && (
                      <span className="text-red-500 block mt-2">
                        {errors.phone.message}
                      </span>
                    )}

                    {errors.phone && errors.phone.type === "maxLength" && (
                      <span className="text-red-500 block mt-2">
                        {errors.phone.message}
                      </span>
                    )}
                  </section>

                  <section className="">
                    <label htmlFor="gender">Gender</label>
                    <section className="flex items-center justify-between relative mt-0">
                      <input
                        {...register("gender", {
                          required: {
                            value: true,
                            message: "Your gender is required",
                          },
                          pattern: {
                            value: /^[A-Za-z ]*$/,
                            message: "Please enter a valid gender",
                          },
                          maxLength: {
                            value: 6,
                            message: "Gender cannot be more than 6 digits",
                          },
                        })}
                        type="text"
                        name="gender"
                        placeholder={userInfo.gender ? userInfo.gender : "Male or Female"}
                        className={`appearance-none rounded-sm py-3 pl-5 w-full placeholder-[#868686] pr-12 text-black outline-none ${
                          errors.gender &&
                          "border-2 border-red-500 text-red-500"
                        }`}
                      />
                    </section>

                    {errors.gender && errors.gender.type === "pattern" && (
                      <span className="text-red-500 block mt-2">
                        {errors.gender.message}
                      </span>
                    )}

                    {errors.gender && errors.gender.type === "required" && (
                      <span className="text-red-500 block mt-2">
                        {errors.gender.message}
                      </span>
                    )}

                    {errors.gender && errors.gender.type === "maxLength" && (
                      <span className="text-red-500 block mt-2">
                        {errors.gender.message}
                      </span>
                    )}
                  </section>

                  <section className="">
                    <label htmlFor="dob">Date of Birth</label>
                    <section
                      {...register("dob")}
                      className="datepicker flex items-center justify-between relative mt-2"
                      data-mdb-toggle-button="false"
                    >
                      <input
                        type="text"
                        name="dob"
                        placeholder={userInfo.dob ? userInfo.dob : "31/12/1975"}
                        className={`form-control appearance-none rounded-sm py-3 pl-5 w-full placeholder-[#868686] pr-12 text-black outline-none transition ease-in-out ${
                          errors.phone && "border-2 border-red-500 text-red-500"
                        }  focus:border-white focus:outline-white`}
                        data-mdb-toggle="datepicker"
                      />
                    </section>
                  </section>

                  <section className="flex items-center justify-start md2:justify-end md2:col-start-2">
                    <button className="bg-black text-white rounded-sm px-8 py-4 grid place-items-center w-fit cursor-pointer hover:bg-primary duration-300">
                      <span>Save Changes</span>
                    </button>
                  </section>
                </form>
              </section>

              {/* Content End */}
            </section>
          </section>
        </section>
      )}
    </section>
  );
};

export default AccountDetails;

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

    return {
      props: { session, userStatus },
    };
  }
};
