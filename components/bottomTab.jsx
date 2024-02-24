import { useRouter } from "next/router";
import Image from "next/image";
import React from "react";
import {
  home,
  home1,
  search,
  search1,
  walk,
  walk2,
  hand,
  hand1,
  profile,
  profile1,
} from "../public/assets/images";

const BottomTab = ({ location }) => {
  const router = useRouter();

  return (
    <div className="fixed top-[90vh] w-full">
      <div className="bg-[#231f20] px-4 py-6 flex flex-around justify-around">
        <div onClick={() => router.push("/home")}>
          {location === "home" ? (
            <Image src={home1} className="w-11 h-11" alt="Home Active" />
          ) : (
            <Image src={home} className="w-10 h-10" alt="Home" />
          )}
        </div>
        <div onClick={() => router.push("/hangout")}>
          {location === "hangout" ? (
            <Image src={search1} className="w-11 h-11" alt="Hangout Active" />
          ) : (
            <Image src={search} className="w-10 h-10" alt="Hangout" />
          )}
        </div>
        <div onClick={() => router.push("/walkRequestInfo")}>
          {location === "walkRequestInfo" ? (
            <Image src={walk2} className="w-11 h-11" alt="Walk Active" />
          ) : (
            <Image src={walk} className="w-10 h-10" alt="Walk" />
          )}
        </div>
        <div onClick={() => router.push("/supportRequestInfo")}>
          {location === "supportRequestInfo" ? (
            <Image src={hand1} className="w-11 h-11" alt="Support Active" />
          ) : (
            <Image src={hand} className="w-10 h-10" alt="Support" />
          )}
        </div>
        <div onClick={() => router.push("/profile")}>
          {location === "profile" ? (
            <Image src={profile1} className="w-11 h-11" alt="Profile Active" />
          ) : (
            <Image src={profile} className="w-11 h-11" alt="Profile" />
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomTab;
