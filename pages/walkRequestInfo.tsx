import React, { useState } from "react";

import { Map, live, timer } from "../public/assets/images";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
//import AutoComplete from '../components/AutoComplete';

const WalkRequestInfo = () => {
  const [address, setAddress] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();

  return (
    <Layout>
      <div className="bg-white min-h-screen flex flex-col items-center ">
        <div className="flex flex-col w-full space-y-4 p-4 mt-12">
          {/* Top Section */}
          <div className="flex flex-col space-y-2">
            <h1 className="text-[#121418] font-bold text-xl mb-4">
              Where Do You Wanna Go?
            </h1>
            <button>
              <Image
                className="w-full h-40 mb-2 rounded-lg"
                src={Map}
                alt="Map"
              />
            </button>
          </div>
          {/* Card Section */}
          <div className="bg-[#F2F2F2] p-4 rounded-lg flex flex-col  space-y-6 ">
            {/* Choose Buddy */}
            <div className="flex flex-row items-center ml-2 ">
              <div className="flex flex-col space-y-2 w-full">
                <label htmlFor="address" className="font-bold">
                  Address
                </label>
                <textarea
                  id="address"
                  placeholder="Type what you need"
                  className="w-full pl-2 pt-1  border-[#1B75BC] border-2 tex-lg rounded-lg flex justify-center "
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            {/* Choose Options */}
            <div className="flex flex-row items-center ml-2">
              <div className="flex flex-col space-y-2  w-full">
                <h2 className="font-bold mb-2">Choose Your Buddy</h2>
                <div className="flex flex-col justify-between ">
                  <button
                    className={` flex items-center justify-start px-4 py-3 border-2 border-[#4F9171] rounded-3xl mb-3 ${
                      selectedOption === "timer"
                        ? "bg-[#4F9171] "
                        : "border-[#4F9171]"
                    }`}
                    onClick={() => setSelectedOption("timer")}
                  >
                    <Image src={timer} className="w-10 h-10" alt="Timer" />
                    <span className="text-md font-semibold ml-4">
                      Set Safety Timer
                    </span>
                  </button>
                  <button
                    className={`flex items-center justify-start px-4 py-3 border-2 border-[#4F9171] rounded-3xl ${
                      selectedOption === "live"
                        ? "bg-[#4F9171]"
                        : " border-[#4F9171]"
                    }`}
                    onClick={() => setSelectedOption("live")}
                  >
                    <Image src={live} className="w-10 h-10" alt="Live" />
                    <span className="text-md font-semibold ml-2">
                      Request Live Monitoring
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => router.push("walkConfirm")}
              className="bg-[#4F9171] px-4 py-3 w-full flex items-center justify-center text-white font-bold text-2xl rounded-xl"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WalkRequestInfo;
