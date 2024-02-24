import React, { useState } from "react";
// import { CovalentClient } from '@covalenthq/client-sdk';
import { poap1, poap2, poap3, poap4 } from "../public/assets/images";
import Image from "next/image";

export default function POAP() {
  const [responseData, setResponseData] = useState({});

  //   const ApiServices = async () => {
  //     const client = new CovalentClient('cqt_rQVHbKdXh4dCVhvPBx8fXtWgBPCB');
  //     const resp = await client.BalanceService.getTokenBalancesForWalletAddress(
  //       'eth-mainnet',
  //       'raigal.eth'
  //     );
  //     setResponseData(resp.data);
  //     console.log(resp.data);
  //   };

  return (
    <div className="h-56 w-full p-2 border-2 border-[#1B75BC] rounded-lg">
      <div className="flex flex-col">
        <span className="font-bold mb-4">Search POAP</span>
        <input
          placeholder="Search Name or Paste POAP Address"
          className="p-4 border-2 border-[#1B75BC] rounded-lg"
          // value={numberOfPeople}
          // onChangespan={setNumberOfPeople}
        />
        {/* POAP list */}
        <div>
          <span className="font-bold my-4">Choose POAP in the list</span>
          <div className="flex flex-row justify-between">
            <button className="rounded-full w-16 h-16 border-2 border-gray-400 flex justify-center items-center">
              <Image src={poap1} className="w-14 h-14" alt="poap1" />
            </button>
            <button
              className="rounded-full w-16 h-16 border-2 border-gray-400 flex justify-center items-center"
              //   onClick={() => ApiServices()}
            >
              <Image src={poap2} className="w-14 h-14" alt="poap2" />
            </button>
            <button className="rounded-full w-16 h-16 border-2 border-gray-400 flex justify-center items-center">
              <Image src={poap3} className="w-14 h-14" alt="poap3" />
            </button>
            <button className="rounded-full w-16 h-16 border-2 border-gray-400 flex justify-center items-center">
              <Image src={poap4} className="w-14 h-14" alt="poap4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
