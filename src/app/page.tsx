import About from "@/components/Homepage/About";
import ExploreZones from "@/components/Homepage/ExploreZones";
import Sponsors from "@/components/Homepage/Sponsors";
import WhatToExpect from "@/components/Homepage/WhatToExpect";
import MobileApp from "@/components/Homepage/MobileApp";
import Footer from "@/components/Homepage/Footer";
import HeroSection from "@/components/Homepage/HeroSection";
import PostponeModal from "@/components/Homepage/PostponeModal";
import Image from "next/image";
import SilverJubileeBanner from "@/components/Homepage/SilverJubileeBanner";
import { isEventEnded } from "@/lib/constants";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-instrument-sans)] pt-28">
      <PostponeModal />
      <HeroSection />
      <About />
      <WhatToExpect />
      <ExploreZones />
      <Sponsors />
      {isEventEnded() ? <SilverJubileeBanner /> : <MobileApp />}
      <Footer />
    </div>
  );
}
