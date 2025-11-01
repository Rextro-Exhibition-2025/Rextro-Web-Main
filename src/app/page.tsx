import About from "@/components/Homepage/About";
import ExploreZones from "@/components/Homepage/ExploreZones";
import Hero from "@/components/Homepage/Hero";
import Sponsors from "@/components/Homepage/Sponsors";
import WhatToExpect from "@/components/Homepage/WhatToExpect";
import Footer from "@/components/Homepage/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-instrument-sans)] pt-24">
      <Hero />
      <About />
      <WhatToExpect />
      <ExploreZones />
      <Sponsors />
      <Footer />
    </div>
  );
}
