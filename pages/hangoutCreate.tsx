import React, { useState } from "react";

import poap from "./poap";
//import zuPass from "./zuPass";
import nft from "./nft";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import NFT from "./nft";
import ZuPass from "./zuPass";
import POAP from "./poap";
//import { firebase } from '@react-native-firebase/database';

const HangoutCreate = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("poap"); // Default active tab
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [create, setCreated] = useState(false);

  function createWritePlan() {
    console.log("Attempting to create new plan with data:");

    // Reference to the 'plan' node directly, using the default database URL from Firebase configuration
    // const newPlanRef = firebase
    //   .app()
    //   .database(
    //     'https://buddyguardapp-default-rtdb.europe-west1.firebasedatabase.app/'
    //   )
    //   .ref('/plan/3')
    //   .push();

    // newPlanRef
    //   .set({
    //     eventName: eventName,
    //     date: date,
    //     location: location,
    //     description: description,
    //     numberOfPeople: numberOfPeople,
    //   })
    //   .then(() => console.log('New plan data pushed to Firebase!'))
    //   .catch((error) =>
    //     console.error('Error pushing plan data to Firebase:', error)
    //   );
  }

  const handleTabPress = (tab: any) => {
    setActiveTab(tab);
  };

  const handleCreateEvent = () => {
    // Update the state to indicate that the user has joined the event
    setCreated(true);
    createWritePlan();
  };

  return (
    <Layout>
      <div className="bg-white flex flex-col">
        <div className="flex flex-col w-full ">
          <div className=" px-4 flex flex-col ">
            {/* Top Section */}
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-gray-800">
                Create Your Hangout
              </h1>
            </div>
            {/* Card Section */}
            <div className="flex-1">
              <div className="bg-white rounded-lg py-2 mt-6">
                {/* Create Hangout Detail*/}
                <div className="mb-2">
                  <label htmlFor="eventName" className="font-bold mb-1 block">
                    Hangout Event Name
                  </label>
                  <input
                    type="text"
                    id="eventName"
                    placeholder="Event Name"
                    className="border-2 border-blue-500 rounded px-3 py-2 w-full"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="date" className="font-bold mb-1 block">
                    Date
                  </label>
                  <input
                    type="text"
                    id="date"
                    placeholder="Date"
                    className="border-2 border-blue-500 rounded px-3 py-2 w-full"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="location" className="font-bold mb-1 block">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="Choose Location"
                    className="border-2 border-blue-500 rounded px-3 py-2 w-full"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="description" className="font-bold mb-1 block">
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Description"
                    className="border-2 border-blue-500 rounded px-3 py-2 w-full"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="numberOfPeople"
                    className="font-bold mb-1 block"
                  >
                    Number of People
                  </label>
                  <input
                    type="text"
                    id="numberOfPeople"
                    placeholder="Limit of Number"
                    className="border-2 border-blue-500 rounded px-3 py-2 w-full"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(e.target.value)}
                  />
                </div>
                {/* Group Tab Filter Menu */}
                <div className="mb-2">
                  <label htmlFor="groupTabs" className="font-bold mb-1 block">
                    Group Tabs
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleTabPress("poap")}
                      className={`py-2 px-4 rounded ${
                        activeTab === "poap"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      POAP
                    </button>
                    <button
                      onClick={() => handleTabPress("nft")}
                      className={`py-2 px-4 rounded ${
                        activeTab === "nft"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      NFT
                    </button>
                    <button
                      onClick={() => handleTabPress("zuPass")}
                      className={`py-2 px-4 rounded ${
                        activeTab === "zuPass"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      ZuPass
                    </button>
                  </div>
                </div>
                {/* Render content based on active tab */}
                {activeTab === "poap" && <POAP />}
                {activeTab === "nft" && <NFT />}
                {activeTab === "zuPass" && <ZuPass />}
              </div>
              {/* Next Button */}
              {create && (
                <div className="bg-red-400 w-full h-12 rounded-md flex justify-center items-center mb-2">
                  <p className="font-bold text-lg text-white ">
                    You successfully created !!!
                  </p>
                </div>
              )}
              <button
                onClick={handleCreateEvent}
                className="bg-blue-500 w-full py-3 rounded text-white font-semibold"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HangoutCreate;
