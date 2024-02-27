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
import { useAuth } from "@thirdweb-dev/react";
import initializeFirebaseClient from "../lib/initFirebase";

const WalkStatus = () => {
  const router = useRouter();
  const [isSosModal, setIsSosModal] = useState(false);

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
                <button
                  onClick={() => {
                    // Handle SOS message sending
                  }}
                  className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg"
                >
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
                  await handleArrive();
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
