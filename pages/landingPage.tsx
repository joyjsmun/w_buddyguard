import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { LogoImage } from "../public/assets/images";
import BottomTab from "@/components/BottomTab";

const LandingPage = () => {
  const router = useRouter();

  // Check if the current route is the landing page
  const isLandingPage = router.pathname === "/";

  const handleButtonClick = () => {
    router.push("/onBoarding");
  };

  return (
    <div className="bg-[#F6D268] flex  justify-center h-screen relative">
      <Head>
        <title>Landing Page</title>
        <meta name="landing" />
      </Head>
      {/* loading page start */}
      <div className="flex flex-col items-center mt-[15rem] space-y-2">
        <Image className="w-20 h-22 mb-2" src={LogoImage} alt="Logo" />
        <h1 className="text-center text-3xl font-extrabold text-orange-500">
          Buddy Guard
        </h1>
        <p className="text-center text-base font-bold text-gray-800">
          Safety Social dApp
        </p>
      </div>
      <button
        onClick={handleButtonClick}
        className=" absolute bottom-60 w-24 h-24 border-r-2 border-l-2 border-t-4 border-orange-500 rounded-full items-center justify-center"
      >
        <div className="w-20 h-20 flex flex-col ml-[0.4rem] items-center justify-center rounded-full bg-orange-500 animate-pulse">
          <p className="text-white font-semibold text-xl">Go</p>
        </div>
      </button>
    </div>
  );
};

export default LandingPage;
