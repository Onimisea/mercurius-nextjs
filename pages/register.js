import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useAppContext } from "../context/AppContext";
import Link from "next/link";
import glassImg from "../public/assets/page-imgs/auth_bg.png";
import registerImage from "../public/assets/page-imgs/register_image.jpg";
import { AiFillGoogleCircle } from "react-icons/ai";
import {
  BsEnvelopeFill,
  BsEye,
  BsEyeSlashFill,
  BsPhoneFill,
} from "react-icons/bs";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { getSession, signIn, useSession } from "next-auth/react";

const Register = () => {
  const { showPassword, setShowPassword } = useAppContext();

  const router = useRouter();

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
      password: "",
      confirm_password: "",
    },
  });

  let userInfo = {};

  const onSubmit = async (data) => {
    if (data.password === data.confirm_password) {
      try {
        const options = {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        };

        await fetch(
          "https://mercurius-api-production.up.railway.app/api/users/register/",
          options
        )
          .then((res) => res.json())
          .then((resData) => {
            if (resData.errors) {
              toast.error(resData.errors[0]);
            } else {
              toast.success(resData.message);
              router.push("/login");
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
  };

  useEffect(() => {
    if (typeof window !== "undefined" || typeof window !== null) {
      if (window.localStorage.getItem("UserData")) {
        userInfo = JSON.parse(window.localStorage.getItem("wishlist"));
      }
    }
  }, []);

  const handleGoogleSignIn = async () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <>
      <Head>
        <title>Mercurius | Create Account | Best Thrift Store in Nigeria</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="w-[85%] mx-auto max-w-screen-xl flex flex-col md2:flex-row items-center justify-center font-poppins my-12 bg-black">
        <section className="w-full md2:w-[50%] px-4 py-6 sm:p-8 md:p-12 md2:px-6 md2:py-10 md3:p-12 text-white grid place-items-center">
          <section className="w-[90%] ">
            <h3 className="text-2xl font-semibold">Create Account</h3>
            <p className="mt-2 mb-10">
              Kindly enter the information below to Create your Account
            </p>

            <section className="">
              <form
                className="flex flex-col space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <section className="">
                  <label htmlFor="fullname">Fullname</label>
                  <section className="flex items-center justify-between relative mt-2">
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
                      placeholder="Firstname Lastname"
                      className={`appearance-none rounded-md py-3 pl-5 w-full placeholder-black pr-12 text-black outline-none ${
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
                      placeholder="Email"
                      className={`appearance-none rounded-md py-3 pl-5 w-full placeholder-black pr-12 text-black outline-none ${
                        errors.email &&
                        "border-2 border-red-500 text-red-500 bg-black"
                      }`}
                    />
                    <BsEnvelopeFill className="absolute right-0 z-50 mr-4 text-black" />
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
                  <section className="flex items-center justify-between relative mt-2">
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
                          value: 11,
                          message: "Phone number is more than 11 digits",
                        },
                      })}
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      className={`appearance-none rounded-md py-3 pl-5 w-full placeholder-black pr-12 text-black outline-none ${
                        errors.phone &&
                        "border-2 border-red-500 text-red-500 bg-black"
                      }`}
                    />
                    <BsPhoneFill className="absolute right-0 z-50 mr-4 text-black" />
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
                  <label htmlFor="password">Password</label>
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
                        type={`${showPassword.password ? "text" : "password"}`}
                        name="password"
                        placeholder="Password"
                        className={`appearance-none rounded-md py-3 pl-5 w-full placeholder-black pr-12 text-black outline-none ${
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
                  <label htmlFor="confirm_password">Confirm Password</label>
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
                        placeholder="Confirm Password"
                        className={`appearance-none rounded-md py-3 pl-5 w-full placeholder-black pr-12 text-black outline-none ${
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
                              confirm_password: !showPassword.confirm_password,
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
                              confirm_password: !showPassword.confirm_password,
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

                <button className="bg-primary text-white rounded-md px-6 py-3 flex items-center justify-center w-full cursor-pointer hover:bg-white hover:text-black duration-300">
                  <span>Create Account</span>
                </button>
              </form>
            </section>

            <button
              className="bg-white text-black rounded-md px-6 py-3 flex items-center justify-center w-full cursor-pointer hover:bg-primary hover:text-white duration-300 mt-4"
              onClick={handleGoogleSignIn}
            >
              <AiFillGoogleCircle className="mr-3" />{" "}
              <span>Sign In with Google</span>
            </button>
            <p className="mt-10 text-center">
              Already have an account?{" "}
              <span className="text-primary">
                <Link href="/login">Log In</Link>
              </span>
            </p>
          </section>
        </section>

        <section className="w-full h-full md2:w-[50%] relative hidden md2:flex">
          <Image
            src={registerImage}
            alt="Mercurius Login"
            className="w-full h-[750px] object-cover"
          />

          <section className="absolute top-0 right-0 w-full h-full flex items-end justify-center">
            <section className="w-[80%] h-[200px] relative mb-16 rounded-xl">
              <Image
                src={glassImg}
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
              <section className="absolute top-0 right-0 w-full h-full p-4 grid items-center">
                <h3 className="font-semibold text-2xl text-white">
                  The best wares
                </h3>
                <p className="text-md text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  );
};

export default Register;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
