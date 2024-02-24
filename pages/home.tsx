import React, { useState } from "react";
import { useRouter } from "next/router";
import Modal from "../components/modal";
import MapImage from "../public/assets/images/map_example.png";
import Hangout1 from "../public/assets/images/hangout1.png";
import Hangout3 from "../public/assets/images/hangout3.png";
import InboxIcon from "../public/assets/images/Icons/inbox.png";
import SOSIcon from "../public/assets/images/sos.png";
import Image from "next/image";
import SwipeButton from "@/components/swipeButton";
import Layout from "@/components/layout";
import { Hangout2, Hangout4 } from "@/public/assets/images";

const Home = () => {
  const router = useRouter();
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);

  const handleSosRequestModal = () => {
    setIsSosModalOpen(!isSosModalOpen);
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen flex flex-col relative ">
        <div className="pt-9 px-4 flex justify-between items-center mt-8">
          <h1 className="text-[#121418] font-semibold text-base ">
            Gm, Joy Mun
          </h1>
          <div className="flex flex-row space-x-3">
            <button onClick={() => router.push("/acceptRequest")}>
              <Image src={InboxIcon} className="w-12 h-12 mr-1" alt="Inbox" />
            </button>
            <button onClick={handleSosRequestModal}>
              <div className="w-12 h-12 ml-3 bg-red-500 rounded-2xl flex justify-center items-center">
                <span className="text-white font-bold">SOS</span>
              </div>
            </button>
          </div>
        </div>
        <div
          className="overflow-y-auto pt-4 px-4 flex flex-col space-y-4"
          style={{ paddingBottom: "60px" }}
        >
          <div className="flex flex-col space-y-2">
            <h2 className="text-[#121418] font-medium text-lg">
              Explore Your Neighborhood
            </h2>
            <button onClick={() => router.push("/Map")}>
              <Image
                src={MapImage}
                className="w-full h-40 rounded-lg"
                alt="Map"
              />
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="text-[#121418] font-medium text-lg">
              Upcoming Events
            </h2>
            <div className="flex flex-row items-center space-x-2">
              <div className="flex flex-col w-full space-y-12">
                {[Hangout1, Hangout4].map((image, index) => (
                  <button
                    key={index}
                    onClick={() => router.push("/Hangout")}
                    className="w-[95%] h-20"
                  >
                    <Image
                      src={image}
                      className="w-full h-28 rounded-lg"
                      alt={`Hangout ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mb-10">
            <button className="bg-[#4F9171] px-4 py-3 w-full flex items-center justify-center text-white font-bold text-2xl rounded-xl">
              Swipe Hangout
            </button>
          </div>
        </div>

        {isSosModalOpen && (
          <Modal onClickToggleModal={handleSosRequestModal}>
            <h3 className="font-bold text-lg pb-2">SOS Message</h3>
            <p className="mb-3">We Will Send This Msg to the Buddy Guard :</p>
            <div className="bg-red-400 w-30 h-34 mb-3 flex flex-col justify-center space-y-2 p-3 rounded-lg">
              <p className="font-bold">
                **Emergency Situation! Please Help Me!
              </p>
              <p className="font-bold">SOS User : Joy M</p>
              <p className="font-bold">
                SOS Location Link : 1212st, Bogota, Colombia
              </p>
              <p className="font-bold">
                Personal Contact Number : 987-232-1829
              </p>
            </div>
            <p className="text-red-500 font-bold leading-5">
              Help will be on the way soon. If possible, provide any additional
              information or updates to the Buddy Guard Group once they arrive
            </p>
            <button
              onClick={() => router.push("/home")}
              className="bg-red-500 text-white py-3 px-6 rounded-lg mt-4 w-full"
            >
              Send SOS Message Now
            </button>
          </Modal>
        )}
      </div>
    </Layout>
  );
};

export default Home;
