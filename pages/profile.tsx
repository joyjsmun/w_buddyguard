import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Modal from "../components/modal";
import {
  BarcodeImg,
  ProfileImg,
  verified,
  group2,
  lock,
  coin,
  reputationImg,
  poap1,
  poap2,
  poap3,
  poap4,
  nft1,
  nft2,
  nft3,
  nft4,
} from "../public/assets/images";

import Layout from "@/components/layout";

import initializeFirebaseClient from "../lib/initFirebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

const Profile = () => {
  const router = useRouter();
  const [isOpenBarcodeModal, setOpenBarcodeModal] = useState(false);
  const [isOpenPersonalInfoModal, setOpenPersonalInfoModal] = useState(false);
  const [isPersonalInfoSaved, setPersonalInfoSaved] = useState(false);
  const [isRewardsInfoModal, setIsRewardsInfoModal] = useState(false);
  const [isGroupInfoModal, setIsGroupInfoModal] = useState(false);
  const [isVerifiedModal, setIsVerifiedModal] = useState(false);

  const [rewards, setRewards] = useState(0); // State to store total rewards score
  const [reputation, setReputation] = useState(0); // State to store total reputation score
  const [rewardRecords, setRewardRecords] = useState([]);
  const [groupContractAddress, setGroupContractAddress] = useState(""); // State to store group contract address
  const [groupInfo, setGroupInfo] = useState({
    groupName: "",
    groupContractAddress: "",
  });

  const randomPOAPAddress = "0x1234567890123456789012345678901234567890"; // Example POAP contract address
  const randomNFTAddress = "0x0987654321098765432109876543210987654321"; // Example NFT contract address

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { auth, db } = initializeFirebaseClient();
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userRef);
          const userData = userSnapshot.data();
          console.log("userData:", userData); // Add this logging statement
          if (userData) {
            setRewards(userData.totalRewards || 0);
            setReputation(userData.totalReputation || 0);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchRewardRecords = async () => {
      try {
        const { db, auth } = initializeFirebaseClient();
        const user = auth.currentUser;

        if (user) {
          const recordsRef = collection(db, `users/${user.uid}/rewardRecords`);
          const querySnapshot = await getDocs(
            query(recordsRef, orderBy("rewardReceivedAt", "desc"))
          );
          const recordsData = querySnapshot.docs.map((doc) => doc.data());
          setRewardRecords(recordsData);
        }
      } catch (error) {
        console.error("Error fetching reward records:", error);
      }
    };

    if (isRewardsInfoModal) {
      fetchRewardRecords();
    }
  }, [isRewardsInfoModal]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { auth, db } = initializeFirebaseClient();
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userRef);
          const userData = userSnapshot.data();
          if (userData) {
            setGroupInfo({
              groupName: userData.groupName || "",
              groupContractAddress: userData.groupContractAddress || "",
            });
            setGroupContractAddress(userData.groupContractAddress || "");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const saveGroupInfoToFirebase = useCallback(async () => {
    try {
      const { auth, db } = initializeFirebaseClient();
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        // Update the user document with the new group name
        await updateDoc(userRef, {
          groupName: groupInfo.groupName,
          groupContractAddress: groupContractAddress,
        });
        setIsGroupInfoModal(false); // Close the modal after saving
      }
    } catch (error) {
      console.error("Error saving group info:", error);
    }
  }, [groupInfo, groupContractAddress]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setGroupInfo((prevGroupInfo) => ({
      ...prevGroupInfo,
      [name]: value,
    }));
  }, []);

  const onClickToggleBarcodeModal = useCallback(() => {
    setOpenBarcodeModal(!isOpenBarcodeModal);
  }, [isOpenBarcodeModal]);

  const onClickTogglePersonalInfoModal = useCallback(() => {
    setOpenPersonalInfoModal(!isOpenPersonalInfoModal);
  }, [isOpenPersonalInfoModal]);

  const onClickToggleRewardsInfoModal = useCallback(() => {
    setIsRewardsInfoModal(!isRewardsInfoModal);
  }, [isRewardsInfoModal]);

  const onClickToggleGroupInfoModal = useCallback(() => {
    setIsGroupInfoModal(!isGroupInfoModal);
  }, [isGroupInfoModal]);

  const onClickToggleVerifiedModal = useCallback(() => {
    setIsVerifiedModal(!isVerifiedModal);
  }, [isVerifiedModal]);

  const onSaveAndEncrypt = useCallback(() => {
    setPersonalInfoSaved(true);
    setOpenPersonalInfoModal(false);
  }, []);

  // Group Creation
  const handlePOAPClick = () => {
    setGroupContractAddress(randomPOAPAddress);
  };

  const handleNFTClick = () => {
    setGroupContractAddress(randomNFTAddress);
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen relative mt-12">
        <div className="pt-3 px-4 space-y-4">
          {/* Top Section */}
          <div className="space-y-2">
            <div className="flex flex-col justify-center items-center w-100 h-50 px-8 py-4 bg-[#F2F2F2] rounded-xl relative">
              <button
                className="absolute top-2 right-3"
                onClick={onClickToggleBarcodeModal}
              >
                <Image src={BarcodeImg} className="w-12 h-12" alt="Barcode" />
              </button>
              {isOpenBarcodeModal && (
                <Modal onClickToggleModal={onClickToggleBarcodeModal}>
                  <Image src={BarcodeImg} className="w-48 h-48" alt="Barcode" />
                </Modal>
              )}
              <div className="flex justify-center items-center border-4 border-[#022952] rounded-full h-24 w-24">
                <Image
                  src={ProfileImg}
                  className="w-20 h-20 rounded-full"
                  alt="Profile"
                />
              </div>
              <div className="text-center">
                <div className="flex items-center">
                  <p className="font-bold text-2xl">Vita C</p>
                  {isPersonalInfoSaved && (
                    <Image src={verified} className="w-9 h-9" alt="Verified" />
                  )}
                </div>
                <p className="font-bold text-base">0x123412312</p>
              </div>
            </div>
          </div>
          {/* Info Section */}
          <div className="space-y-4">
            {/* Verified User Info */}
            <div>
              <p className="font-bold mb-1">
                Please Verify Your Wallet with WaltID
              </p>
              <div className="flex space-x-2">
                <div className="flex flex-row pl-5 justify-start items-center space-x-5 rounded-lg bg-[#F2F2F2] w-[80%] h-16">
                  <Image src={verified} className="w-11 h-11" alt="Group" />
                  {/* default - Hasn't verified Yet*/}
                  <p className="font-medium text-base">
                    Please Click Verify Button
                  </p>
                </div>
                <button
                  onClick={onClickToggleVerifiedModal}
                  className="rounded-2xl bg-blue-500 w-16 h-16 flex justify-center items-center"
                >
                  <p className="font-medium text-white">Verify</p>
                </button>
                {/* WaltID Verification Modal */}

                {isVerifiedModal && (
                  <Modal onClickToggleModal={onClickToggleVerifiedModal}>
                    {/* Save button */}

                    <button className="bg-blue-500 rounded-lg p-3 mt-2 flex justify-center items-center  w-full">
                      <p className="text-white font-bold text-lg ">
                        Request WaltID Verification
                      </p>
                    </button>
                  </Modal>
                )}
              </div>
            </div>

            {/* Group Info */}
            <div>
              <p className="font-bold mb-1">Group Info</p>
              <div className="flex space-x-2">
                <div className="flex flex-row pl-5 justify-start items-center space-x-5 rounded-lg bg-[#F2F2F2] w-[80%] h-16">
                  <Image src={group2} className="w-11 h-11" alt="Group" />
                  {/* default - Team Buddy Guard*/}
                  <p className="font-medium text-base">
                    {groupInfo.groupName || "Team Buddy Guard"}
                  </p>
                </div>
                <button
                  onClick={onClickToggleGroupInfoModal}
                  className="rounded-2xl bg-blue-500 w-16 h-16 flex justify-center items-center"
                >
                  <p className="font-medium text-white">Edit</p>
                </button>
                {/* Group Info Modal */}

                {isGroupInfoModal && (
                  <Modal onClickToggleModal={onClickToggleGroupInfoModal}>
                    {/* Save button */}
                    <div className="h-auto w-full p-2 border-2 border-[#1B75BC] rounded-lg">
                      <div className="flex flex-col">
                        <span className="font-bold mb-4">
                          Choose Your Group Name
                        </span>
                        <input
                          name="groupName"
                          placeholder="Your Group Name"
                          value={groupInfo.groupName}
                          onChange={handleInputChange}
                          className="p-4 border-2 border-[#1B75BC] rounded-lg mb-2"
                        />
                        <span className="font-bold mb-4">
                          Group Contract Address
                        </span>
                        <input
                          name="groupContractAddress"
                          value={groupInfo.groupContractAddress}
                          onChange={handleInputChange}
                          placeholder={groupContractAddress || "0x..."}
                          className="p-4 border-2 border-[#1B75BC] rounded-lg"
                        />
                        {/* POAP list */}

                        <span className="font-bold my-4">
                          Choose POAP Group
                        </span>
                        <div className="flex flex-row justify-between">
                          {/* Example POAP buttons */}
                          <button
                            onClick={handlePOAPClick}
                            className="rounded-full w-16 h-16 border-2 border-gray-400 flex justify-center items-center"
                          >
                            <Image
                              src={poap1}
                              className="w-14 h-14"
                              alt="poap1"
                            />
                          </button>
                          <button
                            onClick={handlePOAPClick}
                            className="rounded-full w-16 h-16 border-2 border-gray-400 flex justify-center items-center"
                          >
                            <Image
                              src={poap2}
                              className="w-14 h-14"
                              alt="poap1"
                            />
                          </button>
                          <button
                            onClick={handlePOAPClick}
                            className="rounded-full w-16 h-16 border-2 border-gray-400 flex justify-center items-center"
                          >
                            <Image
                              src={poap3}
                              className="w-14 h-14"
                              alt="poap1"
                            />
                          </button>
                          <button
                            onClick={handlePOAPClick}
                            className="rounded-full w-16 h-16 border-2 border-gray-400 flex justify-center items-center"
                          >
                            <Image
                              src={poap4}
                              className="w-14 h-14"
                              alt="poap1"
                            />
                          </button>
                          {/* Add more POAP buttons as needed */}
                        </div>
                        {/* NFT list */}
                        <div>
                          <p className="font-bold my-4">
                            Choose NFT Collection Group
                          </p>
                          <div className="flex flex-row justify-between">
                            {/* Example NFT buttons */}
                            <button
                              onClick={handleNFTClick}
                              className="rounded-md w-16 h-16 border-2 border-gray-400 flex justify-center items-center"
                            >
                              <Image
                                src={nft1}
                                className="w-14 h-14"
                                alt="nft1"
                              />
                            </button>
                            <button
                              onClick={handleNFTClick}
                              className="rounded-md w-16 h-16 border-2 border-gray-400 flex justify-center items-center"
                            >
                              <Image
                                src={nft2}
                                className="w-14 h-14"
                                alt="nft1"
                              />
                            </button>
                            <button
                              onClick={handleNFTClick}
                              className="rounded-md w-16 h-16 border-2 border-gray-400 flex justify-center items-center"
                            >
                              <Image
                                src={nft3}
                                className="w-14 h-14"
                                alt="nft1"
                              />
                            </button>
                            <button
                              onClick={handleNFTClick}
                              className="rounded-md w-16 h-16 border-2 border-gray-400 flex justify-center items-center"
                            >
                              <Image
                                src={nft4}
                                className="w-14 h-14"
                                alt="nft1"
                              />
                            </button>
                            {/* Add more NFT buttons as needed */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={saveGroupInfoToFirebase}
                      className="bg-blue-500 rounded-lg p-3 mt-2 flex justify-center items-center  w-full"
                    >
                      <p className="text-white font-bold text-lg ">
                        Save Group
                      </p>
                    </button>
                  </Modal>
                )}
              </div>
            </div>

            {/* Personal Info */}
            <div className="">
              <p className="font-bold mb-1">S0S Private Info</p>
              <div className="flex space-x-2">
                <div className="flex flex-row pl-5 justify-start items-center space-x-5 rounded-lg bg-[#F2F2F2] w-[80%] h-16">
                  <Image src={lock} className="w-10 h-10" alt="Lock" />
                  <p className="font-medium text-base">
                    Encrypted Personal Info
                  </p>
                </div>
                <button
                  onClick={onClickTogglePersonalInfoModal}
                  className="rounded-2xl w-16 h-16 flex justify-center items-center bg-blue-500"
                >
                  <p className="font-medium text-white">Add</p>
                </button>
                {/* Personal Information Modal */}
                {isOpenPersonalInfoModal && (
                  <Modal onClickToggleModal={onClickTogglePersonalInfoModal}>
                    <p className="font-bold text-lg pb-2">
                      Type Your Personal Information for SOS
                    </p>
                    <p className="font-semibold">Your Personal Name</p>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="p-4 my-2 border-2 border-blue-500 rounded-lg w-full"
                    />
                    <p className="font-semibold">SOS Contact Name</p>
                    <input
                      type="text"
                      placeholder="SOS Contact Name"
                      className="p-4 my-2 border-2 border-blue-500 rounded-lg  w-full"
                    />
                    <p className="font-semibold">SOS Contact Number</p>
                    <input
                      type="text"
                      placeholder="SOS Contact Number"
                      className="p-4 my-2 border-2 border-blue-500 rounded-lg  w-full"
                    />
                    {/* Save button */}
                    <button
                      onClick={onSaveAndEncrypt}
                      className="bg-blue-500 rounded-lg p-3 mt-2 flex justify-center items-center  w-full"
                    >
                      <p className="text-white font-bold text-lg ">
                        Save & Encrypt
                      </p>
                    </button>
                  </Modal>
                )}
              </div>
            </div>
            {/* Reward Info */}
            <div>
              <div
                className="flex flex-row justify-between items-center pt-4  mb-4 space-x-6
              "
              >
                <p className="font-bold mb-1">Rewards & Reputation</p>
                <button
                  onClick={onClickToggleRewardsInfoModal}
                  className="rounded-xl bg-blue-500 w-full h-12 flex justify-center items-center"
                >
                  <p className="font-medium text-white">Show Records</p>
                </button>
              </div>
              <div className="flex flex-row justify-between space-x-2 ">
                <div className="flex space-x-2">
                  <div className="flex flex-row pl-2  justify-between items-center space-x-5 rounded-lg bg-[#F2F2F2] w-[100%] h-16 px-2">
                    <Image src={coin} className="w-12 h-12" alt="Coin" />
                    <p className="font-bold text-base text-center pr-2">
                      {rewards} BG Token
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex flex-row pl-2  justify-between items-center space-x-5 rounded-lg bg-[#F2F2F2] w-[100%] h-16 px-2">
                    <Image
                      src={reputationImg}
                      className="w-12 h-12"
                      alt="Coin"
                    />
                    <p className="font-bold text-base pr-4 text-center ">
                      {reputation} High
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Rewards Information Modal */}
            {isRewardsInfoModal && (
              <Modal onClickToggleModal={onClickToggleRewardsInfoModal}>
                <p className="font-bold text-lg pb-2 w-full">
                  Your Buddy Guard Records
                </p>
                <div>
                  {/* list of records */}
                  {rewardRecords.map((record, index) => (
                    <div key={index} className="border-b-2 pb-2 mb-2">
                      <p className="font-bold"># {record.orderNumber}</p>
                      <p>Type: {record.type}</p>
                      <p>
                        Date:{" "}
                        {record.rewardReceivedAt.toDate().toLocaleString()}
                      </p>

                      <p>Reward Amount: {record.rewardAmount}</p>
                      <p>Total Repuation: {record.totalReputation}</p>
                      <p>Total Rewards: {record.totalRewards}</p>
                    </div>
                  ))}
                </div>
                {/* Save button */}
              </Modal>
            )}

            {/* Social Graph */}
            {/* <div>
              <p className="font-bold mb-1">Social Graph</p>
              <div className="flex space-x-2">
                <div className="rounded-xl bg-[#F2F2F2] w-full h-40 flex justify-center items-center"></div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
