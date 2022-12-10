import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";

const Avatar = ({ src, alt, isHeader }) => {
  const [userInitials, setUserInitials] = useState("");

  useEffect(() => {
    setTimeout(() => {
      let userInitialsOld = "";

      if (window.localStorage.getItem("UserData")) {
        const { fullname } = JSON.parse(
          window.localStorage.getItem("UserData")
        );
        const userInitialsArr = fullname.split(" ");

        if (userInitialsArr.length >= 2) {
          userInitialsOld = userInitialsArr[0][0] + userInitialsArr[1][0];
        } else if (userInitialsArr.length == 1) {
          userInitialsOld = userInitialsArr[0][0];
        } else {
          userInitialsOld = "M";
        }

        return setUserInitials(userInitialsOld);
      }
    }, 1000);
  }, [userInitials]);

  // const getAi = () => {
  //   if (window.localStorage.getItem("UserData")) {
  //     const { fullname } = JSON.parse(window.localStorage.getItem("UserData"));
  //     const userInitialsArr = fullname.split(" ");
  //     const userInitials =
  //       userInitialsArr.length >= 2
  //         ? userInitialsArr[0][0] + userInitialsArr[1][0]
  //         : "M";

  //     return userInitials;
  //   }
  // };

  return (
    <section className={`flex items-center justify-center`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          className={`${
            isHeader
              ? "w-[40px] h-[40px] object-contain rounded-full shadow-md mr-1 border-[1px] border-primary"
              : "w-full h-full object-cover rounded-full shadow-lg m-0 border-[1px] border-primary"
          }`}
        />
      ) : (
        isHeader && (
          <p className="w-[40px] h-[40px] rounded-full shadow-md mr-1 border-[1px] border-primary grid place-items-center text-[15px] font-dalek bg-gray-50">
            {userInitials}
          </p>
        )
      )}

      {isHeader && <FaCaretDown size={20} />}
    </section>
  );
};

export default Avatar;
