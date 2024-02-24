import React, { useCallback, useLayoutEffect, useState } from "react";
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
} from "../public/assets/images";
import Layout from "@/components/layout";

const Profile = () => {
  const router = useRouter();
  const [isOpenBarcodeModal, setOpenBarcodeModal] = useState(false);
  const [isOpenPersonalInfoModal, setOpenPersonalInfoModal] = useState(false);
  const [isPersonalInfoSaved, setPersonalInfoSaved] = useState(false);

  const onClickToggleBarcodeModal = useCallback(() => {
    setOpenBarcodeModal(!isOpenBarcodeModal);
  }, [isOpenBarcodeModal]);

  const onClickTogglePersonalInfoModal = useCallback(() => {
    setOpenPersonalInfoModal(!isOpenPersonalInfoModal);
  }, [isOpenPersonalInfoModal]);

  const onSaveAndEncrypt = useCallback(() => {
    setPersonalInfoSaved(true);
    setOpenPersonalInfoModal(false);
  }, []);

  return (
    <Layout>
      <div className="bg-white min-h-screen relative mt-12">
        <div className="pt-4 px-4 space-y-4">
          {/* Top Section */}
          <div className="space-y-2">
            <div className="flex flex-col justify-center items-center w-100 h-50 px-8 py-12 bg-[#F2F2F2] rounded-xl relative">
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
          <div className="space-y-5">
            {/* Group Info */}
            <div>
              <p className="font-bold mb-1">Group Info</p>
              <div className="flex space-x-2">
                <div className="flex flex-row pl-5 justify-start items-center space-x-5 rounded-lg bg-[#F2F2F2] w-[80%] h-16">
                  <Image src={group2} className="w-11 h-11" alt="Group" />
                  <p className="font-medium text-base">Team Buddy Guard</p>
                </div>
                <button className="rounded-2xl bg-green-500 w-16 h-16 flex justify-center items-center">
                  <p className="font-medium text-white">Edit</p>
                </button>
              </div>
            </div>
            {/* Personal Info */}
            <div>
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
                  className="rounded-2xl w-16 h-16 flex justify-center items-center bg-green-500"
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
                      className="p-4 my-2 border-2 border-green-600 rounded-lg w-full"
                    />
                    <p className="font-semibold">SOS Contact Name</p>
                    <input
                      type="text"
                      placeholder="SOS Contact Name"
                      className="p-4 my-2 border-2 border-green-600 rounded-lg  w-full"
                    />
                    <p className="font-semibold">SOS Contact Number</p>
                    <input
                      type="text"
                      placeholder="SOS Contact Number"
                      className="p-4 my-2 border-2 border-green-600 rounded-lg  w-full"
                    />
                    {/* Save button */}
                    <button
                      onClick={onSaveAndEncrypt}
                      className="bg-green-600 rounded-lg p-4 mt-2 flex justify-center items-center  w-full"
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
              <p className="font-bold mb-1">Reward & Reputation Info</p>
              <div className="flex space-x-2">
                <div className="flex flex-row pl-4 pr-10 justify-between items-center space-x-5 rounded-lg bg-[#F2F2F2] w-[80%] h-16">
                  <Image src={coin} className="w-12 h-12" alt="Coin" />
                  <p className="font-medium text-base">188 BG Token</p>
                </div>
                <button className="rounded-2xl bg-green-500 w-16 h-16 flex justify-center items-center">
                  <p className="font-medium text-white">Show</p>
                </button>
              </div>
            </div>
            {/* Social Graph */}
            <div>
              <p className="font-bold mb-1">Social Graph</p>
              <div className="flex space-x-2">
                <div className="rounded-xl bg-[#F2F2F2] w-full h-40 flex justify-center items-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
