import React from "react";
import { nft1, nft2, nft3, nft4 } from "../public/assets/images";
import Image from "next/image";

export default function NFT() {
  return (
    <div className="h-56 w-full p-1 border-2 border-blue-500 rounded-lg ">
      <div className="flex flex-col">
        <p className="font-bold mb-4">Search NFT</p>
        <input
          placeholder="Search Name or Paste NFT Address"
          className="p-4 border-2 border-blue-500 rounded-lg"
          // value={numberOfPeople}
          // onChangespan={setNumberOfPeople}
        />
        {/* NFT list */}
        <div>
          <p className="font-bold my-4">Choose NFT in the list</p>
          <div className="flex flex-row justify-between">
            <button className="rounded-md w-16 h-16 border-2 border-gray-400 flex justify-center items-center">
              <Image src={nft1} className="w-14 h-14" alt="nft1" />
            </button>
            <button className="rounded-md w-16 h-16 border-2 border-gray-400 flex justify-center items-center">
              <Image src={nft2} className="w-14 h-14" alt="nft2" />
            </button>
            <button className="rounded-md w-16 h-16 border-2 border-gray-400 flex justify-center items-center">
              <Image src={nft3} className="w-14 h-14" alt="nft3" />
            </button>
            <button className="rounded-md w-16 h-16 border-2 border-gray-400 flex justify-center items-center">
              <Image src={nft4} className="w-14 h-14" alt="nft4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
