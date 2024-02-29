import React, { useState } from "react";
import { Router } from "react-router-dom"; // Use useHistory instead of useNavigation
import { Map, help, when, where } from "../public/assets/images";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
//import AutoComplete from "../components/AutoComplete";

const SupportRequestInfo = () => {
  const router = useRouter();
  const [requestDescription, setRequestDescription] = useState("");
  const [whenNeeded, setWhenNeeded] = useState("");
  const [location, setLocation] = useState("");

  return (
    <Layout>
      <div className="bg-white min-h-screen flex flex-col items-center justify-center">
        <div className="p-4 flex w-full flex-col space-y-4">
          {/* Top Section */}
          <div className="flex flex-col space-y-2">
            <h1 className="text-[#121418] font-robotoBold text-lg">
              Do You Need Some Help?
            </h1>
            <button onClick={() => router.push("/hangout")}>
              <Image
                className="w-full h-40 mb-2 rounded-lg"
                src={Map}
                alt="Map"
              />
            </button>
          </div>
          {/* Card Section */}
          <div className="rounded-lg bg-[#F2F2F2] p-4 flex flex-col space-y-6">
            {/* Request Description */}
            <div className="flex flex-row items-center ml-2">
              <div className="flex flex-col space-y-2 w-full font-robotoBold">
                <label htmlFor="requestDescription" className="font-robotoBold">
                  Request Description
                </label>
                <div className="relative">
                  <textarea
                    id="requestDescription"
                    placeholder="Type what you need"
                    className="w-full p-3 pl-14 border-[#1B75BC] border-2 tex-lg rounded-lg flex justify-center "
                    value={requestDescription}
                    onChange={(e) => setRequestDescription(e.target.value)}
                  />
                  <Image
                    src={help}
                    className="w-10 h-10 absolute left-2 top-3"
                    alt="Help"
                  />
                </div>
              </div>
            </div>
            {/* When Needed */}
            <div className="flex flex-row items-center ml-2">
              <div className="flex flex-col space-y-2  w-full">
                <label htmlFor="whenNeeded" className="font-robotoBold mb-2 ">
                  When Do You Need This Help?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="whenNeeded"
                    placeholder="Type when do you need this help"
                    className="w-full p-5 pl-12 border-[#1B75BC] border-2 tex-lg rounded-lg"
                    value={whenNeeded}
                    onChange={(e) => setWhenNeeded(e.target.value)}
                  />
                  <Image
                    src={when}
                    className="w-10 h-10 absolute left-3 top-3"
                    alt="When"
                  />
                </div>
              </div>
            </div>
            {/* Location */}
            <div className="flex flex-row items-center ml-2">
              <div className="flex flex-col space-y-2">
                <label htmlFor="location" className="font-robotoBold">
                  Where Do You Need Help?
                </label>
                <div className="w-72 p-1 pl-12 border-[#1B75BC] border-2 tex-lg rounded-lg">
                  {/* autocomplete */}
                  <Image
                    src={where}
                    className="w-10 h-10 absolute left-2 top-7"
                    alt="Where"
                  />
                </div>
              </div>
            </div>
            {/* Next Button */}
            <button
              onClick={() => router.push("supportConfirm")}
              className="bg-[#1B75BC] px-4 py-3 w-full flex items-center justify-center text-white font-latoBlack text-2xl rounded-lg"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupportRequestInfo;
