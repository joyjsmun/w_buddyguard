import React from "react";

import { Map, coin, group, group2, pin2 } from "../public/assets/images";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/layout";

const AcceptRequest = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className="bg-white min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col w-full space-y-4 p-4">
          {/* Top Section */}
          <div className="flex flex-col space-y-2">
            <button onClick={() => router.push("Hangout")}>
              <Image className="w-full h-40 rounded-lg" src={Map} alt="Map" />
            </button>
          </div>
          {/* Card Section */}
          <div className="bg-[#F2F2F2] p-4 rounded-lg flex flex-col  space-y-6 ">
            <h1 className="text-[#121418] font-robotoBold text-xl mt-2">
              Accept Buddy-Guard Request
            </h1>
            <div className="rounded-lg bg-[#F2F2F2] p-4 flex flex-col space-y-6">
              {/* Card Section */}
              {/* User Info */}
              <div className="flex flex-col items-center ml-2">
                <div className="flex flex-row w-full">
                  <div className="flex flex-col space-y-2">
                    <h2 className="font-robotoBold text-base">User Info</h2>
                    <div className="w-full h-16 flex flex-row justify-start items-center">
                      <Image src={group2} className="w-12 h-12" alt="Group2" />
                      <span className="text-base font-lato ml-4">
                        ZuSocial Group
                      </span>
                    </div>
                    <h2 className="font-robotoBold text-base">Reward</h2>
                    <div className="w-full h-16 flex flex-row justify-start items-center">
                      <Image src={coin} className="w-12 h-12" alt="Coin" />
                      <span className="text-base font-lato ml-4">
                        10 BG token / 20 mins duration
                      </span>
                    </div>
                    <h2 className="font-robotoBold text-base">Location</h2>
                    <div className="w-full h-16 flex flex-row justify-start items-center">
                      <Image src={pin2} className="w-12 h-12" alt="Pin2" />
                      <span className="text-base font-lato ml-4">
                        C/ de Mallorca, 401, Eixample, 08013 Barcelona, Spain
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Next Button */}
              <button onClick={() => router.push("home")}>
                <div className="bg-[#3998FF] w-98% h-16 flex justify-center items-center rounded-xl">
                  <span className="text-white font-latoBlack text-2xl">
                    ACCEPT REQUEST
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AcceptRequest;
