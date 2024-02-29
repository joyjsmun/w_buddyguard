import React, { useState } from "react";
import {
  Avatar1,
  Avatar2,
  LogoImage,
  Map,
  talk,
} from "../public/assets/images";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/layout";

const SupportConfirm = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Specify the type explicitly

  return (
    <Layout>
      <div className="bg-white min-h-screen flex flex-col items-center space-y-8">
        <div className="flex flex-col w-full ">
          <div className="pt-4 px-4 flex flex-col space-y-4 w-full">
            {/* Top Section */}
            <div className="flex flex-col space-y-2 mt-12">
              <button onClick={() => router.push("hangout")}>
                <Image className="w-full h-48 rounded-lg" src={Map} alt="Map" />
              </button>
            </div>
            {/* Card Section */}
            <div className="flex flex-col space-y-2">
              <div className="rounded-lg bg-[#fff]  flex flex-col space-y-2">
                <div className="flex flex-row items-center w-[98%]">
                  <div className="flex flex-col space-y-2 w-full">
                    <span className="font-bold mb-2 span-lg">
                      I lost my passport. Anyone can help me?
                    </span>
                    <span className="font-robotoBold mb-1">
                      Choose Your Buddy
                    </span>
                    {/* Choose Options */}
                    <div className="flex flex-col space-y-4">
                      <button
                        onClick={() => setSelectedOption("Buddy-Guard(Local)")}
                        className={`w-76 py-2 flex flex-row justify-start px-2 items-center border-[#1B75BC] border-2 rounded-lg ${
                          selectedOption === "Buddy-Guard(Local)"
                            ? "bg-[#1B75BC]"
                            : ""
                        }`}
                      >
                        <Image
                          className="w-10 h-12 rounded-full relative"
                          src={LogoImage}
                          alt="LogoImage"
                        />
                        <div className="flex flex-col space-y-1">
                          <span className="text-md font-semibold text-left ml-4">
                            Buddy-Guard(Local)
                          </span>
                          <div className="flex flex-row justify-between">
                            <span className="span-sm ml-4">Near 200m</span>
                            <span className="span-sm ml-4 font-medium span-[#FF5757]">
                              High Reputation
                            </span>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => setSelectedOption("JulietK")}
                        className={`w-76 py-2  flex flex-row justify-start items-center px-2 border-[#1B75BC] border-2 rounded-lg ${
                          selectedOption === "JulietK" ? "bg-[#1B75BC]" : ""
                        }`}
                      >
                        <Image
                          className="w-11 h-11 rounded-full relative"
                          src={Avatar1}
                          alt="Avatar1"
                        />
                        <div className="flex flex-col space-y-1">
                          <span className="text-md font-semibold text-left ml-4">
                            Juliet K
                          </span>
                          <div className="flex flex-row justify-between">
                            <span className="span-sm ml-4">Near 200m</span>
                            <span className="span-sm ml-4 font-medium span-[#FF5757]">
                              High Reputation
                            </span>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => setSelectedOption("James Lee")}
                        className={`w-76 py-2  flex flex-row justify-start items-center px-2 border-[#1B75BC] border-2 rounded-lg ${
                          selectedOption === "James Lee" ? "bg-[#1B75BC]" : ""
                        }`}
                      >
                        <Image
                          className="w-11 h-11 rounded-full relative"
                          src={Avatar2}
                          alt="Avatar2"
                        />
                        <div className="flex flex-col space-y-1">
                          <span className="text-md font-semibold text-left ml-4">
                            James Lee
                          </span>
                          <div className="flex flex-row justify-around">
                            <span className="span-sm ml-4">Near 200m</span>
                            <span className="span-sm ml-4 font-medium span-[#FF5757]">
                              Medium Reputation
                            </span>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div>
                      <div className="flex flex-row justify-end items-center space-x-2">
                        <span className="font-bold span-2xl span-red-500">
                          Total
                        </span>
                        <span className="font-bold text-lg">2 Buddy Token</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Support confirm button */}
                <div className="flex flex-row w-full justify-between">
                  <div>
                    <Image src={talk} className="w-16 h-16" alt="talk" />
                  </div>
                  <button onClick={() => router.push("supportStatus")}>
                    <div className="bg-[#1B75BC] w-72 h-16 flex flex-col justify-center items-center rounded-lg">
                      <span className="text-white font-latoBlack text-lg">
                        SUPPORT REQUEST
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupportConfirm;
