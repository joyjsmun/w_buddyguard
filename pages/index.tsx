import { Inter } from "next/font/google";
import LandingPage from "./landingPage";
import Layout from "@/components/layout";
import BottomTab from "@/components/BottomTab";

const inter = Inter({ subsets: ["latin"] });

export default function App() {
  return (
    <div className="relative">
      <LandingPage />
    </div>
  );
}
