import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Head from "next/head";
import Image from "next/image";
import { useAppContext } from "../context/AppContext";
import Link from "next/link";
import loginImage from "../public/assets/page-imgs/login_image.jpg";
import glassImg from "../public/assets/page-imgs/auth_bg.png";
import { AiFillGoogleCircle } from "react-icons/ai";
import { BsEnvelopeFill, BsEye, BsEyeSlashFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { getSession, signIn } from "next-auth/react";
// import { getSession, useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const { showPassword, setShowPassword } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // const status = signIn("credentials", {
    //   redirect: false,
    //   email: data.email,
    //   password: data.password,
    //   callbackUrl: "/",
    // }).then(({ ok, url }) => {
    //   if (ok) {
    //     const options = {
    //       method: "POST",
    //       headers: { "Content-type": "application/json" },
    //       body: JSON.stringify(data),
    //     };
    //     const user = fetch(
    //       "https://mercurius-api-production.up.railway.app/api/users/verify/",
    //       options
    //     )
    //       .then((res) => res.json())
    //       .then((userData) => {
    //         window.localStorage.setItem("UserData", JSON.stringify(userData));
    //       });
    //     toast.success("Login Successful");
    //     router.push(url);
    //   } else {
    //     toast.error("Invalid email or password");
    //   }
    // });
  };

  const handleGoogleLogin = async () => {
    signIn("google", { callbackUrl: "/" });
  };

  if (session && session.user) {
    window.localStorage.setItem("UserData", JSON.stringify(session.user));
  }

  return (
    <>
      <Head>
        <title>Mercurius | Login | Best Thrift Store in Nigeria</title>
      </Head>

      <section className="w-[85%] mx-auto max-w-screen-xl flex flex-col md2:flex-row font-poppins my-12">
        <section className="w-full md2:w-[50%] bg-black px-4 py-6 sm:p-8 md:p-12 md2:px-6 md2:py-10 md3:p-12 text-white grid place-items-center">
          <section className="w-[90%]">
            <h3 className="text-2xl font-semibold">Welcome back!</h3>
            <p className="mt-2 mb-10">
              Kindly enter the information below to Sign In
            </p>

            <section className="">
              <form
                className="flex flex-col space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                          className="absolute right-0 z-50 mr-4 text-black cursor-pointer"
                          onClick={() =>
                            setShowPassword({
                              ...showPassword,
                              password: !showPassword.password,
                            })
                          }
                        />
                      ) : (
                        <BsEyeSlashFill
                          className="absolute right-0 z-50 mr-4 text-black cursor-pointer"
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
                </section>

                <section className="flex items-center">
                  <input
                    {...register("rememberMe", {
                      required: false,
                    })}
                    className="appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white
              checked:bg-primary checked:border-primary focus:outline-none
              transition duration-300 mr-3 cursor-pointer"
                    type="checkbox"
                    value=""
                    name="rememberMe"
                    id="rememberMe"
                  />
                  <label
                    className="inline-block text-gray-300 mt-1"
                    htmlFor="rememberMe"
                  >
                    Remember Me
                  </label>
                </section>

                <button
                  type="submit"
                  className="bg-primary text-white rounded-md px-6 py-3 flex items-center justify-center w-full cursor-pointer hover:bg-white hover:text-black duration-300"
                >
                  <span>Log In</span>
                </button>
              </form>

              <button
                className="bg-white text-black rounded-md px-6 py-3 flex items-center justify-center w-full cursor-pointer hover:bg-primary hover:text-white duration-300 mt-4"
                onClick={handleGoogleLogin}
              >
                <AiFillGoogleCircle className="mr-3" />{" "}
                <span>Login with Google</span>
              </button>
            </section>

            <p className="mt-10 text-center">
              Don&apos;t have an account?{" "}
              <span className="text-primary">
                <Link href="/register">Create Account</Link>
              </span>
            </p>
          </section>
        </section>

        <section className="w-full md2:h-[750px] md2:w-[50%] relative hidden md2:flex">
          <Image
            src={loginImage}
            alt="Mercurius Login"
            width={0}
            height={0}
            className="w-full h-[750px] object-cover"
          />

          <section className="absolute top-0 right-0 w-full h-full flex items-end justify-center">
            <section className="w-[80%] h-[200px] relative mb-16 rounded-xl">
              <Image
                src={glassImg}
                alt=""
                width={0}
                height={0}
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

export default Login;

export const getServerSideProps = async ({ req }) => {
  // if (userInfo) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
};
