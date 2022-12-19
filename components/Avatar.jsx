import React, { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const Avatar = ({ src, alt, isHeader }) => {
  const [userInitials, setUserInitials] = useState("");

  const { userInfo } = useAppContext();

  useEffect(() => {
    let userInitialsOld = "";

    if (userInfo) {
      const rawUserData = userInfo;

      let username = "";

      if (rawUserData.fullname) {
        username = rawUserData.fullname;
      } else if (rawUserData.name) {
        username = rawUserData.name;
      } else {
        username = "Mercurius";
      }

      const userInitialsArr =
        username.length > 1 ? username.split(" ") : username;

      if (userInitialsArr.length > 1) {
        userInitialsOld = userInitialsArr[0][0] + userInitialsArr[1][0];
      } else if (userInitialsArr.length == 1) {
        userInitialsOld = userInitialsArr[0][0];
      } else {
        userInitialsOld = "M";
      }

      setUserInitials(userInitialsOld);
    }
  }, []);

  return (
    <section className={`flex items-center justify-center`}>
      {isHeader && (
        <p className="w-[40px] h-[40px] rounded-full shadow-md mr-1 border-[1px] border-primary grid place-items-center text-[15px] font-dalek bg-gray-50">
          {userInitials}
        </p>
      )}

      {isHeader && <FaCaretDown size={20} />}
    </section>
  );
};

export default Avatar;
