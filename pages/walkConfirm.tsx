import React, { useState } from "react";
import { Map, LogoImage, Avatar1, Avatar2 } from "../public/assets/images";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/layout";
import { ethers } from "ethers";

const WalkConfirm = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  async function HandleCreateOrder() {
    const contractAddress = "0x4EeFA835A807c36DD0a643A7D97cD6E2b8Ca29c2";
    const guardians = ["0xE1e5E0b3830454d68aE7B8926540a8AC0FdcabC0"];

    // Check if Ethereum is available in the browser
    if (!window.ethereum) {
      console.error(
        "Error: Ethereum provider not found. Please install MetaMask or another Ethereum wallet."
      );
      return;
    }

    // Request access to the user's Ethereum account and signature
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (error) {
      console.error("Error requesting Ethereum account access:", error);
      return;
    }

    // Use the injected provider from MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get the signer
    const signer = provider.getSigner();

    // Instantiate the contract
    const buddyGuardAbi = [
      "function createOrder(address[] memory _guardians) public",
    ];
    const buddyGuardContract = new ethers.Contract(
      contractAddress,
      buddyGuardAbi,
      signer
    );

    console.log(`Creating order ...`);

    try {
      // Send the transaction
      const tx = await buddyGuardContract.createOrder(guardians);
      await tx.wait();
      console.log(`Order created successfully. Transaction hash: ${tx.hash}`);
      router.push("/walkStatus"); // Redirect to walkStatus page after order creation
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle error here, e.g., display an error message to the user
    }
  }

  return (
    <Layout>
      <div className="bg-white min-h-screen flex flex-col items-center justify-center">
        <div className="p-4 flex w-full flex-col space-y-2">
          {/* Top Section */}
          <div className="flex flex-col space-y-2">
            <h1 className="text-gray-900 font-medium text-lg">
              Where Do You Wanna Go?
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
            {/* Choose Your Buddy */}
            <div className="flex flex-col space-y-2">
              {/* Choose Options */}
              <button
                className={`flex items-center space-x-4 border-[#4F9171] border-2 rounded-lg py-2 px-6 ${
                  selectedOption === "buddyGuard" ? "bg-[#4F9171]" : ""
                }`}
                onClick={() => setSelectedOption("buddyGuard")}
              >
                <Image
                  className="w-11 h-12 rounded-full"
                  src={LogoImage}
                  alt="Buddy Guard"
                />
                <div className="flex flex-col">
                  <span className="text-md font-semibold text-left">
                    Buddy-Guard(Local)
                  </span>
                  <div className="flex flex-row space-x-2">
                    <span>Near 200m</span>
                    <span className="font-medium text-[#FF5757]">
                      High Reputation
                    </span>
                  </div>
                </div>
              </button>
              {/* Add similar buttons for other options */}
              <button
                className={`flex items-center space-x-4 border-[#4F9171] border-2 rounded-lg py-2 px-6 ${
                  selectedOption === "julietK" ? "bg-[#4F9171]" : ""
                }`}
                onClick={() => setSelectedOption("julietK")}
              >
                <Image
                  className="w-12 h-12 rounded-full"
                  src={Avatar1}
                  alt="Juliet K"
                />
                <div className="flex flex-col">
                  <span className="text-md font-semibold text-left">
                    Juliet K
                  </span>
                  <div className="flex flex-row space-x-2">
                    <span>Near 200m</span>
                    <span className="font-medium text-[#FF5757]">
                      High Reputation
                    </span>
                  </div>
                </div>
              </button>
              {/* Add similar buttons for other options */}
              <button
                className={`flex items-center space-x-4 border-[#4F9171] border-2 rounded-lg py-2 px-6 ${
                  selectedOption === "jamesLee" ? "bg-[#4F9171]" : ""
                }`}
                onClick={() => setSelectedOption("jamesLee")}
              >
                <Image
                  className="w-12 h-12 rounded-full"
                  src={Avatar2}
                  alt="James Lee"
                />
                <div className="flex flex-col">
                  <span className="text-md font-semibold text-left">
                    James Lee
                  </span>
                  <div className="flex flex-row space-x-2">
                    <span>Near 200m</span>
                    <span className="font-medium text-[#FF5757]">
                      Med Reputation
                    </span>
                  </div>
                </div>
              </button>
            </div>
            {/* Total and duration */}
            <div className="flex flex-col space-y-2">
              <div className="flex justify-end items-center space-x-4">
                <span className="font-bold text-2xl text-red-500">Total</span>
                <span className="font-bold text-lg">25 Buddy Token</span>
              </div>
              <span className="font-bold text-red-500 text-right">
                15 mins Away to Your Destination
              </span>
            </div>
            {/* Confirm Button */}
            <button
              className="bg-[#4F9171] px-4 py-3 w-full flex items-center justify-center text-white font-bold text-2xl rounded-xl"
              onClick={async () => {
                await HandleCreateOrder();
              }}
            >
              Confirm Buddy Guard
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WalkConfirm;
