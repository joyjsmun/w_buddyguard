import React from "react";
import Image from "next/image";
import LogoImage from "../public/assets/images/logo.png";

const TopLogo = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white p-4 flex items-center justify-center">
      <div className="flex flex-row items-center justify-center ">
        <Image src={LogoImage} alt="Logo" className="w-6 h-7" />
        <span className="text-orange-500 text-base font-blackHans ml-1 mt-2">
          Buddy Guard
        </span>
      </div>
    </div>
  );
};

export default TopLogo;
