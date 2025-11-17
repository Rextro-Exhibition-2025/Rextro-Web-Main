import About from "@/components/Homepage/About";
import ExploreZones from "@/components/Homepage/ExploreZones";
import Sponsors from "@/components/Homepage/Sponsors";
import WhatToExpect from "@/components/Homepage/WhatToExpect";
import MobileApp from "@/components/Homepage/MobileApp";
import Footer from "@/components/Homepage/Footer";
import HeroSection from "@/components/Homepage/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-instrument-sans)] pt-28">
      <HeroSection />
      <About />
      <WhatToExpect />
      <ExploreZones />
      <Sponsors />
      <MobileApp />
      <Footer />
    </div>
  );
}
