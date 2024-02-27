import React from "react";
import { ConnectWallet, useAddress, useAuth } from "@thirdweb-dev/react";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { signInWithCustomToken } from "firebase/auth";
import initializeFirebaseClient from "../lib/initFirebase";

export default function Login() {
  const thirdwebAuth = useAuth();
  const address = useAddress();
  const { auth, db } = initializeFirebaseClient();

  // Note: This function lives inside the Login component above.
  async function signIn() {
    // Use the same address as the one specified in _app.tsx.
    const payload = await thirdwebAuth?.login();

    try {
      // Make a request to the API with the payload.
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload }),
      });

      // Get the returned JWT token to use it to sign in with
      const { token } = await res.json();

      // Sign in with the token.
      const userCredential = await signInWithCustomToken(auth, token);
      // On success, we have access to the user object.
      const user = userCredential.user;

      // If this is a new user, we create a new document in the database.
      const usersRef = doc(db, "users", user.uid!);
      const userDoc = await getDoc(usersRef);

      if (!userDoc.exists()) {
        // User now has permission to update their own document outlined in the Firestore rules.
        // Add necessary columns for the new user with empty values
        setDoc(
          usersRef,
          {
            createdAt: serverTimestamp(),
            groupName: "Team Buddy Guard",
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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {address ? (
        <button onClick={() => signIn()}>Sign in with Wallet</button>
      ) : (
        <ConnectWallet />
      )}
    </div>
  );
}
