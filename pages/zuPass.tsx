import React from "react";
import { devcon, vitalia, zuberlin, zuzalu1 } from "../public/assets/images";
import Image from "next/image";

export default function ZuPass() {
  return (
    <div className="h-56 w-full p-2 border-2 border-blue-500 rounded-lg ">
      <p className="font-bold">Choose Your Zuzalu Pass Event</p>
      <div className="flex flex-col justify-between items-center">
        <button className="rounded-md w-60 h-12 px-4 flex items-start justify-center">
          <div className="flex flex-row space-x-3">
            <Image src={zuzalu1} className="w-32 h-8" alt="ZuConnect" />
            <span className="self-center font-bold">ZuConnect</span>
          </div>
        </button>
        <button className="rounded-md w-60 h-12 px-4 flex items-start justify-center">
          <div className="flex flex-row space-x-3">
            <Image src={vitalia} className="w-32 h-8" alt="Vitalia" />
            <span className="self-center font-bold">Vitalia</span>
          </div>
        </button>
        <button className="rounded-md w-64 h-12 px-4 flex items-start justify-center">
          <div className="flex flex-row space-x-3">
            <Image src={devcon} className="w-32 h-8" alt="Devcon 2024" />
            <span className="self-center font-bold">Devcon 2024</span>
          </div>
        </button>
        <button className="rounded-md w-64 h-12 px-4 flex items-start justify-center">
          <div className="flex flex-row space-x-3">
            <Image src={zuberlin} className="w-32 h-8" alt="ZuBerlin" />
            <span className="self-center font-bold">ZuBerlin</span>
          </div>
        </button>
      </div>
    </div>
  );
}
