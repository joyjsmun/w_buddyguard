import React from "react";
import { ConnectWallet, useAddress, useAuth } from "@thirdweb-dev/react";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { signInWithCustomToken } from "firebase/auth";
import initializeFirebaseClient from "../lib/initFirebase";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { LogoImage } from "@/public/assets/images";

export default function Login() {
  const thirdwebAuth = useAuth();
  const address = useAddress();
  const { auth, db } = initializeFirebaseClient();
  const router = useRouter();

  async function signIn() {
    const payload = await thirdwebAuth?.login();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload }),
      });

      const { token } = await res.json();

      const userCredential = await signInWithCustomToken(auth, token);
      const user = userCredential.user;

      const usersRef = doc(db, "users", user.uid!);
      const userDoc = await getDoc(usersRef);

      if (!userDoc.exists()) {
        setDoc(
          usersRef,
          {
            createdAt: serverTimestamp(),
            groupName: "Add Your BuddyGuard Group Info",
            groupContractAddress: "",
            totalRewards: 0,
            totalReputation: 0,
            personalInfo: "",
            verified: false,
            waltIdCertification: "",
          },
          { merge: true }
        );
      }

      // Navigate to the home page after successful sign-in
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-[#F6D268] flex flex-col space-y-10 items-center justify-center h-screen relative">
      <Head>
        <title>Login Page</title>
        <meta name="login" />
      </Head>
      {/* loading page start */}
      <div className="flex flex-col items-center justify-center space-y-2">
        <Image className="w-20 h-22 mb-2" src={LogoImage} alt="Logo" />
        <h1 className="text-center text-3xl font-extrabold text-orange-500">
          Buddy Guard
        </h1>
        <p className="text-center text-base font-bold text-gray-800">
          Safety Social dApp
        </p>
      </div>
      <div>
        {address ? (
          <button
            className="rounded-lg bg-blue-500 w-full p-4 font-bold text-white"
            onClick={() => signIn()}
          >
            Join Buddy Guard Member
          </button>
        ) : (
          <ConnectWallet />
        )}
      </div>
    </div>
  );
}
