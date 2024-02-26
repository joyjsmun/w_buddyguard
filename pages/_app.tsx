import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
  rainbowWallet,
  lightTheme,
  ThirdwebProvider,
} from "@thirdweb-dev/react";
import { ArbitrumGoerli } from "@thirdweb-dev/chains";

export default function App({ Component, pageProps }: AppProps) {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  const { locale } = useRouter() as { locale: Locale };

  return (
    <ThirdwebProvider
      activeChain={ArbitrumGoerli}
      clientId="833996b2d080980da3975eb07563f830"
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
