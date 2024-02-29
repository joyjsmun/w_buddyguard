import React, { useState } from "react";
import {
  Avatar1,
  Hangout5,
  Map,
  group,
  outdoor,
  sports,
  talk,
  verified,
} from "../public/assets/images"; // Ensure these image imports are correctly set up
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/layout";

const HangoutDetail = () => {
  const router = useRouter();
  const [joined, setJoined] = useState(false); // State to track if user joined the event

  const handleJoinEvent = () => {
    // Update the state to indicate that the user has joined the event
    setJoined(true);
  };

  return (
    <Layout>
      <div className="bg-white flex flex-col  justify-center">
        <div className="flex flex-col w-full space-y-4 p-3 mt-12">
          {/* Hangout detail */}
          <div className="flex flex-col space-y-2 relative">
            <button onClick={() => router.push("Hangout")}>
              <Image
                className="mb-2 h-52 rounded-lg relative "
                src={Hangout5}
                alt="Hangout image"
              />
              <div className="absolute bottom-0 w-full">
                <div className="flex flex-row items-center w-full ">
                  {/* title and date */}
                  <div className="absolute left-3 bottom-3">
                    <span className="text-white font-robotoBlack text-4xl">
                      Tennis Night
                    </span>
                  </div>
                  <div className="absolute right-3 bottom-5 flex flex-col  ">
                    <span className="text-white span-xs font-base font-robotoMedium">
                      2024/02/21
                    </span>
                    <span className="text-white span-xs font-base font-robotoMedium">
                      5/10 People
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>
          {/* description box */}
          <div className="rounded-lg bg-[#F2F2F2] p-4 flex flex-col space-y-4 ">
            {/* tags */}
            <div className="flex flex-row justify-around items-center">
              <div className="flex flex-row bg-yellow-400 py-1 px-2 justify-center items-center rounded-2xl ">
                <Image src={sports} className="w-8 h-8" alt="Sports icon" />
                <span className="text-white ml-1 font-lato">Sports</span>
              </div>
              <div className="flex flex-row bg-green-700 py-1 px-2 justify-center items-center rounded-2xl">
                <Image src={group} className="w-8 h-8" alt="Group icon" />
                <span className="text-white ml-1 font-lato">Group</span>
              </div>
              <div className="flex flex-row bg-red-600 py-1 px-2 justify-center items-center rounded-2xl">
                <Image src={outdoor} className="w-8 h-8" alt="Outdoor icon" />
                <span className="text-white ml-1 font-lato">Outdoor</span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-robotoBold">Description</span>
              <span className="font-latoLight">
                Hi! I am Coach Criss. I have a small group of beginners looking
                to have some fun on Friday nights.
              </span>
            </div>
            {/* Location */}
            <div className="flex flex-col space-y-2">
              <span className="font-robotoBold">Location</span>
              <span className="font-latoLight">Hawaii, Waikiki Island</span>
            </div>
            {/* Organizer */}
            <div className="flex flex-row justify-between">
              <div className="flex flex-col space-y-2">
                <span className="font-robotoBold">Organizer</span>
                <div className="flex flex-row items-end relative">
                  <Image
                    className="w-14 h-14 rounded-full border-gray-200 border-2 relative"
                    src={Avatar1}
                    alt="Organizer avatar"
                  />
                  <div className="absolute left-11 bottom-1">
                    <Image
                      src={verified}
                      className="w-7 h-7"
                      alt="Verified icon"
                    />
                    <span className="font-latoBold span-sm text-blue-400">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="font-robotoBold">Event Ends</span>
                <span className="font-latoLight">2hr 14mins</span>
              </div>
            </div>
            {/* Bottom Menu */}
            <div className="flex flex-row justify-between items-center">
              <div>
                <Image src={talk} className="w-16 h-16" alt="Talk icon" />
              </div>
              <button
                className="bg-[#1B75BC] w-3/4 h-12 justify-center items-center rounded-lg"
                onClick={handleJoinEvent}
              >
                <span className="text-white font-latoBlack span-2xl">
                  JOIN EVENT
                </span>
              </button>
            </div>
            {joined && (
              <div className=" bg-red-400 w-full h-12 rounded-md flex justify-center items-center">
                <span className="font-bold span-lg text-white ">
                  You successfully joined !!!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HangoutDetail;
