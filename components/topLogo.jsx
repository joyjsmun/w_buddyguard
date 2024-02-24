import React from "react";
import Image from "next/image";
import LogoImage from "../public/assets/images/logo.png";

const TopLogo = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white p-4 flex items-center justify-center">
      <div className="flex items-center ">
        <Image src={LogoImage} width={20} height={24} alt="Logo" />
        <span className="text-orange-500 text-base font-bold ml-1">
          Buddy Guard
        </span>
      </div>
    </div>
  );
};

export default TopLogo;
