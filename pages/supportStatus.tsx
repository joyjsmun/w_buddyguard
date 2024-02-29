import React from "react";
import { useRouter } from "next/router";
import { Avatar2, Map, pin2 } from "../public/assets/images";
import Image from "next/image";
import Layout from "@/components/layout";

const SupportStatus = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className="bg-white min-h-screen flex flex-col">
        <div className="pt-9 px-4 flex flex-col justify-between items-center mt-8 ">
          <div className="px-4 flex flex-col space-y-4">
            {/* Hangout detail */}
            <div className="flex flex-col">
              <button onClick={() => router.push("Hangout")}>
                <Image
                  className="w-full h-52 mb-2 rounded-lg"
                  src={Map}
                  alt="Map"
                />
              </button>
            </div>
            {/* Card Section */}
            {/* Status */}
            <div className="rounded-lg bg-[#F2F2F2] p-4 mb-12 ">
              {/* tags */}
              <div className="mb-4 flex flex-col space-y-2 ">
                <span className="font-bold">Status</span>
                <span>
                  Buddy-Guard(Local) has been helping you about 7mins.
                </span>
              </div>
              {/* Buddy Guard Near User */}
              <div className="flex flex-col items-center mb-4">
                <div className="flex  flex-col space-y-2">
                  <span className="font-bold mb-2">
                    Currently Buddy Guard is helping you{" "}
                  </span>
                  <div className="w-14 h-14">
                    <button>
                      <Image
                        className="w-full h-full rounded-full"
                        src={Avatar2}
                        alt="Avatar2"
                      />
                    </button>
                  </div>
                </div>
              </div>
              {/* Current Location */}
              <div className="mb-4">
                <div className="flex flex-row justify-between">
                  <span className="font-bold">Current Location</span>
                  <span className="font-bold text-red-500">8 mins left</span>
                </div>
                <div className="bg-gray-300 rounded-3xl px-4 py-2 flex items-center mt-2">
                  <Image className="w-10 h-10" src={pin2} alt="Pin" />
                  <span className="text-base ml-2">
                    2321st, Bogota, Columbia
                  </span>
                </div>
              </div>
              {/* Bottom Menu */}
              <div className="flex justify-around items-center mt-8">
                <button
                  onClick={() => router.push("supportRequestInfo")}
                  className="bg-red-500 text-white font-bold text-lg py-3 px-10 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => router.push("home")}
                  className="bg-[#1B75BC] text-white font-bold text-lg py-3 px-10 rounded-lg"
                >
                  Finished
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupportStatus;
