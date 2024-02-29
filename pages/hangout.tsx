import React, { useLayoutEffect } from "react";
import {
  pin,
  plus,
  Hangout1,
  Hangout2,
  Hangout3,
  Hangout4,
  Hangout5,
} from "../public/assets/images";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/layout";
const Hangout = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className="bg-white  min-h-screen flex flex-col pb-20 ">
        <div className="pt-9  flex justify-between items-center">
          <div className="pt-9 px-4 flex flex-col space-y-4">
            <div className="flex flex-row justify-between items-center">
              <p className="text-[#121418] font-bold font-latoBold">Gm, Joy</p>
              <button
                className="flex flex-row"
                onClick={() => router.push("Setting")}
              >
                <div className="flex flex-row items-center">
                  <Image src={pin} alt="Pin" className="w-6 h-6 mr-2" />
                  <p className="text-[#121418] font-latoBold text-base">
                    Current Location : Barcelona
                  </p>
                </div>
              </button>
            </div>
            {/* Popular Hangout*/}
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row justify-between">
                <p className="text-[#121418] font-robotoBold  text-lg">
                  Popular Hangout
                </p>
                <button
                  onClick={() => router.push("hangoutCreate")}
                  className="flex flex-row items-center"
                >
                  <Image src={plus} alt="Plus" className="w-6 h-6 mr-2" />
                  <p className="font-lato text-blue-500">Create Hangout</p>
                </button>
              </div>

              <button onClick={() => router.push("hangoutDetail")}>
                <Image
                  src={Hangout4}
                  alt="Hangout"
                  className="w-full h-40  mb-2 rounded-lg"
                />
              </button>
            </div>
            {/* Gated Hangout*/}
            <div style={{ marginBottom: 20 }}>
              <p className="text-[#121418] font-robotoBold  text-lg mb-4">
                Your NFT/POAP can attend these
              </p>
              <div className="flex-row flex-wrap space-x-1">
                <button
                  style={{ width: "49%", marginBottom: 4 }}
                  onClick={() => router.push("hangoutDetail")}
                >
                  <Image
                    src={Hangout1}
                    alt="Hangout"
                    style={{ width: "100%", height: 200, borderRadius: 10 }}
                  />
                </button>
                <button
                  style={{ width: "49%", marginBottom: 4 }}
                  onClick={() => router.push("hangoutDetail")}
                >
                  <Image
                    src={Hangout5}
                    alt="Hangout"
                    style={{ width: "100%", height: 200, borderRadius: 10 }}
                  />
                </button>
                <button
                  style={{ width: "48%", marginBottom: 4 }}
                  onClick={() => router.push("hangoutDetail")}
                >
                  <Image
                    src={Hangout3}
                    alt="Hangout"
                    style={{ width: "100%", height: 200, borderRadius: 10 }}
                  />
                </button>
                <button
                  style={{ width: "48%", marginBottom: 4 }}
                  onClick={() => router.push("hangoutDetail")}
                >
                  <Image
                    src={Hangout4}
                    alt="Hangout"
                    style={{ width: "100%", height: 200, borderRadius: 10 }}
                  />
                </button>
              </div>
            </div>
            {/* <SwipeButton /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Hangout;
