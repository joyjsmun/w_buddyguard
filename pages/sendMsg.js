// Import Push SDK & Ethers
import { PushAPI } from "@pushprotocol/restapi";
import { useWalletClient } from "wagmi";

const SendMsg = async () => {
  // Using random signer from a wallet, ideally this is the wallet you will connect
  const signer = useWalletClient();
  console.log(signer);

  // Initialize wallet user, pass 'prod' instead of 'staging' for mainnet apps
  const userAlice = await PushAPI.initialize(signer, { env: "staging" });

  // Send a message to Bob
  const aliceMessagesBob = await userAlice.chat.send(
    "0x97d7a75Bec591698e7FAd02c2e89f6b1E79D343C",
    { content: "Gm gm! SOS!!" }
  );

  console.log("Message sent successfully:", aliceMessagesBob);
};

export default SendMsg;
