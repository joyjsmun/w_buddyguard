import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import {
  Avatar1,
  Avatar2,
  LogoImage,
  Map,
  pin,
  pin2,
} from "../public/assets/images";
import Modal from "../components/modal";
import Layout from "@/components/layout";

import {
  doc,
  query,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  increment,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { ethers } from "ethers";
import initializeFirebaseClient from "../lib/initFirebase";

const WalkStatus = () => {
  const router = useRouter();
  const [isSosModal, setIsSosModal] = useState(false);

  async function handleChangeGuardians() {
    // Check if Ethereum is available in the browser
    if (!window.ethereum) {
      console.error(
        "Error: Ethereum provider not found. Please install MetaMask or another Ethereum wallet."
      );
      return;
    }

    // Request access to the user's Ethereum account and signature
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error("Error requesting Ethereum account access:", error);
      return;
    }

    // Use the injected provider from MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get the current user's wallet
    const userWallet = provider.getSigner();

    // Get the address of the BuddyGuard contract from environment variables
    const buddyGuardAddress = "0x4EeFA835A807c36DD0a643A7D97cD6E2b8Ca29c2";

    // ABI for the BuddyGuard contract's `changeGuardians` function
    const buddyGuardABI = [
      "function changeGuardians(uint256 _orderId, address[] calldata _guardiansToAdd, address[] calldata _guardiansToRemove) external",
    ];

    // Connect to the BuddyGuard contract using the user's wallet
    const buddyGuardContract = new ethers.Contract(
      buddyGuardAddress,
      buddyGuardABI,
      userWallet
    );

    // Specify the order ID and guardians to add/remove
    const orderId = 13;
    const guardiansToAdd = ["0x97d7a75Bec591698e7FAd02c2e89f6b1E79D343C"];
    const guardiansToRemove = [];

    try {
      // Call the `changeGuardians` function on the BuddyGuard contract
      const tx = await buddyGuardContract.changeGuardians(
        orderId,
        guardiansToAdd,
        guardiansToRemove,
        {
          gasLimit: 10000000, // Specify your desired gas limit here
        }
      );

      await tx.wait(); // Wait for the transaction to be mined

      console.log("Guardians changed successfully");
    } catch (error) {
      console.error("Error changing guardians:", error);
    }
  }

  async function handleCompleteOrder() {
    try {
      // The address of the deployed buddyGuard contract
      const contractAddress = "0x4EeFA835A807c36DD0a643A7D97cD6E2b8Ca29c2";

      // The ID of the order to complete
      const orderId = 10; // Example order ID, replace with actual order ID

      // Check if Ethereum is available in the browser
      if (!window.ethereum) {
        throw new Error(
          "Ethereum provider not found. Please install MetaMask or another Ethereum wallet."
        );
      }

      // Request access to the user's Ethereum account and signature
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Use the injected provider from MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Get the signer
      const signer = provider.getSigner();

      // The ABI for the buddyGuard contract's `completeOrder` function
      const contractABI = ["function completeOrder(uint256 _orderId) external"];

      // Connect to the buddyGuard contract
      const buddyGuard = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Call the `completeOrder` function
      console.log(`Completing order with ID: ${orderId}`);
      const tx = await buddyGuard.completeOrder(orderId, {
        gasLimit: 10000000, // Specify your desired gas limit here
      });
      await tx.wait(); // Wait for the transaction to be mined

      console.log(
        `Order with ID ${orderId} completed successfully. Transaction Hash: ${tx.hash}`
      );
    } catch (error) {
      console.error("Error completing order:", error);
    }
  }

  const handleArrive = async () => {
    try {
      const { auth, db } = initializeFirebaseClient();

      // Get the current user
      const user = auth.currentUser;

      if (user) {
        // Update user document in Firestore
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          totalRewards: increment(5000),
          totalReputation: increment(100), // Increment reputation by 1
        });
        // Get the updated totalRewards from the user document
        const userSnapshot = await getDoc(userRef);
        const totalRewards = userSnapshot.data().totalRewards;
        const totalReputation = userSnapshot.data().totalReputation;

        // Get the last orderNumber
        const recordsRef = collection(db, `users/${user.uid}/rewardRecords`);
        const querySnapshot = await getDocs(
          query(collection(db, `users/${user.uid}/rewardRecords`))
        );
        const lastRecord = querySnapshot.docs[querySnapshot.docs.length - 1];
        const lastOrderNumber = lastRecord ? lastRecord.data().orderNumber : 0;

        // Add record to the user's reward_records subcollection
        await addDoc(recordsRef, {
          orderNumber: increment(lastOrderNumber + 1), // Increment from the last orderNumber
          type: "Buddy Guard Service Reward",
          rewardAmount: 5000, // Assuming you're rewarding 10 tokens
          totalRewards: totalRewards,
          totalReputation: totalReputation,
          rewardReceivedAt: serverTimestamp(),
        });

        console.log("Successfully updated user data and added record.");
        // Navigate to home page after successful update
        router.push("/home");
      } else {
        console.error("User not found.");
        // Display an error message to the user, indicating that they need to sign in first
        // For example:
        // setError("User not found. Please sign in first.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      // You can handle errors here, such as displaying an error message to the user
      // For example:
      // setError("Error updating user data. Please try again later.");
    }
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.push("/safetyTimer");
  //   }, 7000);
  //   return () => clearTimeout(timer);
  // }, [router]);

  return (
    <Layout>
      <div className="bg-white min-h-screen flex flex-col items-center justify-center">
        <div className="p-4 flex w-full flex-col space-y-2">
          {/* Top Section */}
          <div className="flex flex-col space-y-2">
            <h1 className="text-gray-900 font-medium text-lg">
              Where Do You Wanna Go?
            </h1>
            <button
              onClick={async () => {
                await handleChangeGuardians();
              }}
            >
              add
            </button>
            <button onClick={() => router.push("/hangout")}>
              <Image
                className="w-full h-40 mb-2 rounded-lg"
                src={Map}
                alt="Map"
              />
            </button>
          </div>
          <div className="rounded-lg bg-gray-200 p-4 flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <p className="font-bold">Status</p>
              <p>Buddy-Guard(Local) has been walking with you about 7mins.</p>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row justify-between">
                <p className="font-bold">Current Location</p>
                <p className="font-bold text-red-500">1 min left</p>
              </div>
              <div className="rounded-3xl bg-gray-300 px-4 py-4 flex flex-row items-center space-x-2">
                <Image src={pin2} className="w-10 h-10" alt="Pin" />
                <p className="text-base">
                  C/ de Mallorca, 401, Eixample, 08013 Barcelona, Spain
                </p>
              </div>
            </div>
            {isSosModal && (
              <Modal onClickToggleModal={() => setIsSosModal(!isSosModal)}>
                <p className="font-bold text-lg pb-2">SOS Message</p>
                <p className="font-semibold">
                  We Will Send This Msg to the Buddy Guard :
                </p>
                <div className="bg-yellow-400 w-30 h-34 mb-3 flex justify-center space-y-2 p-3 rounded-lg">
                  <p className="font-bold">
                    SOS Time: 21:34, February 21st, 2024
                  </p>
                  <p className="font-bold">
                    SOS Location Link : 1212st, Bogota, Colombia
                  </p>
                  <p className="font-bold">
                    Personal Contact Number : 987-232-1829
                  </p>
                </div>
                <div className="my-3">
                  <p className="text-red-500 font-bold leading-5">
                    Help will be on the way soon. If possible, provide any
                    additional information or updates to the Buddy Guard Group
                    once they arrive
                  </p>
                </div>
                <button className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg">
                  Send SOS Message Now
                </button>
              </Modal>
            )}
            <div className="flex justify-between">
              <div className="flex flex-col space-y-2">
                <p className="font-bold mb-2">Buddy Guards Near By You</p>
                <div className="w-full flex flex-row justify-around">
                  <button>
                    <Image
                      className="w-14 h-14 rounded-full relative"
                      src={LogoImage}
                      alt="Buddy Guard"
                    />
                  </button>
                  <button>
                    <Image
                      className="w-14 h-14 rounded-full relative"
                      src={Avatar1}
                      alt="Avatar 1"
                    />
                  </button>
                  <button>
                    <Image
                      className="w-14 h-14 rounded-full relative"
                      src={Avatar2}
                      alt="Avatar 2"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-around items-center space-x-3">
              <button
                onClick={() => setIsSosModal(true)}
                className="bg-[#FF5757] text-white font-bold py-3 w-full rounded-lg"
              >
                Send SOS
              </button>
              <button
                onClick={async () => {
                  await handleCompleteOrder();
                  //await handleArrive();

                  //router.push("/home");
                }}
                className="bg-[#4F9171] text-white font-bold py-3 w-full rounded-lg"
              >
                Arrived
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WalkStatus;
