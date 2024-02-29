import React, { useState } from "react";
import { useRouter } from "next/router";
import Modal from "../components/modal";
import MapImage from "../public/assets/images/map_example.png";

import InboxIcon from "../public/assets/images/Icons/inbox.png";
import Image from "next/image";

import Layout from "@/components/layout";
import { Hangout1, Hangout4, Hangout5 } from "@/public/assets/images";
import { ConnectWallet, useSigner } from "@thirdweb-dev/react";

// import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { useWalletClient } from "wagmi";
import { PushAPI } from "@pushprotocol/restapi";

const Home = () => {
  const router = useRouter();
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);

  const handleSosRequestModal = () => {
    setIsSosModalOpen(!isSosModalOpen);
  };

  const signer = useSigner();

  const handleSendMessage = async (signer) => {
    // Initialize wallet user, pass 'prod' instead of 'staging' for mainnet apps
    const userAlice = await PushAPI.initialize(signer, { env: "staging" });

    const messageContent = `Emergency Situation\nSOS User: Vitalik J\nSOS Location Link: La Sagrada Familia, Barcelona, Spain\nPersonal Contact Number: 987-232-1829`;

    // Send a message to Bob
    await userAlice.chat.send("0x7C81461eE3EfEc10CC6BB3A3DbBA3CCA9B0EF127", {
      content: messageContent,
    });
  };

  const handleSendSOSMessage = async (signer) => {
    try {
      await handleSendMessage(signer); // Call handleSendMessage function
      console.log("SOS message sent successfully");
    } catch (error) {
      console.error("Error sending SOS message:", error);
    }
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen flex flex-col ">
        <div className="pt-9 px-4 flex justify-between items-center mt-8">
          <ConnectWallet theme={"light"} modalSize={"compact"} />
          <div className="flex flex-row space-x-1">
            <button onClick={() => router.push("/acceptRequest")}>
              <Image src={InboxIcon} className="w-12 h-12 mr-1" alt="Inbox" />
            </button>
            <button onClick={handleSosRequestModal}>
              <div className="w-12 h-12 ml-1 bg-[#FF5757] rounded-2xl flex justify-center items-center">
                <span className="text-white font-latoBlack">SOS</span>
              </div>
            </button>
          </div>
        </div>
        <div
          className="overflow-y-auto pt-4 px-4 flex flex-col space-y-4"
          style={{ paddingBottom: "60px" }}
        >
          <div className="flex flex-col space-y-2">
            <h2 className="text-[#121418] font-robotoBold text-lg">
              Explore Your Neighborhood
            </h2>
            <button onClick={() => router.push("/map")}>
              <Image
                src={MapImage}
                className="w-full h-40 rounded-lg"
                alt="Map"
              />
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="text-[#121418] font-robotoBold text-lg">
              Upcoming Events
            </h2>
            <div className="flex flex-row items-center space-x-2">
              <div className="flex flex-col w-full space-y-12">
                {[Hangout5, Hangout4].map((image, index) => (
                  <button
                    key={index}
                    onClick={() => router.push("/hangout")}
                    className="w-[95%] h-24"
                  >
                    <Image
                      src={image}
                      className="w-full h-32 rounded-lg"
                      alt={`Hangout ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center pt-12">
            <button className="bg-[#FF5757] px-4 py-3 w-full flex items-center justify-center text-white font-latoBlack text-2xl rounded-lg">
              SWIPE HANGOUT
            </button>
          </div>
        </div>

        {isSosModalOpen && (
          <Modal onClickToggleModal={handleSosRequestModal}>
            <h3 className="font-robotoBold text-lg pb-2">SOS Message</h3>
            <p className="mb-3 font-lato">
              We Will Send This Msg to the Buddy Guard :
            </p>
            <div className="bg-red-500 w-30 h-34 mb-3 flex flex-col justify-center space-y-2 p-3 rounded-lg">
              <p className="font-robotoBold text-white text-center">
                **Emergency Situation**
              </p>

              <p className="font-lato text-white">SOS User : Joe</p>
              <p className="font-lato text-white">
                SOS Location Link : 1212st, Barcelona, Spain
              </p>
              <p className="font-lato text-white">
                Personal Contact Number : 987-232-1829
              </p>
            </div>
            <p className="text-red-500 font-latoLight leading-5">
              Help will be on the way soon. If possible, provide any additional
              information or updates to the Buddy Guard Group once they arrive
            </p>
            <button
              onClick={() => handleSendSOSMessage(signer)}
              className="bg-red-500 text-white font-latoBlack py-4 px-6 rounded-lg mt-4 w-full"
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
