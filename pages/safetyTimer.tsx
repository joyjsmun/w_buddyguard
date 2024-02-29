import React, {
  useLayoutEffect,
  useCallback,
  useState,
  useEffect,
} from "react";

import Modal from "../components/modal";
// import pin1 from "../assets/images/Icons/pin1.png";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@/components/layout";

const SafetyTimer = () => {
  const router = useRouter();
  const [isSafetyTimeModal, setIsSafetyTimeModal] = useState(false);
  const [circle3Scale] = useState(1); // No need for Animated in this example
  const [timer, setTimer] = useState(10);

  const handleArrivedButton = async () => {
    // Your handleArrivedButton logic here
  };

  const onSafetyTimeModal = useCallback(() => {
    setIsSafetyTimeModal(!isSafetyTimeModal);
  }, [isSafetyTimeModal]);

  return (
    <Layout>
      <div className="bg-white min-h-screen flex flex-col items-center justify-center">
        <div className="p-4 flex w-full flex-col">
          <div className="flex flex-row justify-center">
            <div className="h-56 w-56 border-4 border-blue-500 rounded-full flex justify-center items-center">
              <div className="transform" style={{ scale: circle3Scale }}>
                <div className="h-44 w-44 border-4 border-green-500 rounded-full flex justify-center items-center">
                  <div className="h-32 w-32 bg-red-500 rounded-full flex justify-center items-center">
                    <p className="text-3xl font-bold text-white">
                      {timer < 10 ? `00:0${timer}` : `00:${timer}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 rounded-lg bg-[#F2F2F2] p-4 flex flex-col space-y-6">
            <div className="rounded-lg bg-gray-200 p-4">
              <p className="font-bold">Status</p>
              <p className="font-bold text-red-600">
                Please tap the timer if you have already arrived home safely.
              </p>
            </div>
            <div className="rounded-lg bg-gray-200 p-4 mt-4">
              <div className="flex justify-between">
                <p className="font-bold">User Last Location</p>
                <p className="font-bold text-red-600">
                  {timer < 10 ? `00:0${timer}` : `00:${timer}`} left
                </p>
              </div>
              <div className="rounded-lg bg-gray-300 p-4 mt-4 flex items-center">
                {/* <Image src={pin1} alt="User location pin" className="w-10 h-10" /> */}
                <p className="text-base">
                  C/ de Mallorca, 401, Eixample, 08013 Barcelona, Spain
                </p>
              </div>
            </div>
          </div>
          {isSafetyTimeModal && (
            <Modal
              onClickToggleModal={onSafetyTimeModal}
              // visible={isSafetyTimeModal}
              // onRequestClose={onSafetyTimeModal}
              // title="User Personal Information"
              // buttonText="Close"
              //onButtonPress={onSafetyTimeModal}
            >
              <p className="font-bold text-lg pb-2">
                Your safety timer has expired. Your personal information has
                been sent to the Buddy Guard to help with your rescue.
              </p>
              <p className="font-bold text-red-600">
                Help will be on the way soon. If you are safe, please contact
                your buddy group to inform them of your status!
              </p>
              <div className="bg-yellow-400 p-4 rounded-lg mt-4">
                <p className="font-bold">Full Name : Nadia Lee</p>
                <p className="font-bold">Contact Number : 987-232-1829</p>
                <p className="font-bold">
                  Last Location: Carrer de la Marina, 19, 21, Ciutat Vella,
                  08005 Barcelona, Spain
                </p>
                <p className="font-bold">
                  Friend, Personal Contact: +82-10-1877-2322
                </p>
              </div>
            </Modal>
          )}
        </div>
        <div className="flex justify-around fixed bottom-0 left-0 w-full bg-white p-4">
          <button
            onClick={() => router.push("home")}
            className="bg-red-600 text-white font-bold text-2xl py-2 px-6 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              await handleArrivedButton();
              router.push("WalkStatus");
            }}
            className="bg-green-600 text-white font-bold text-2xl py-2 px-6 rounded-lg"
          >
            Arrived
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SafetyTimer;
