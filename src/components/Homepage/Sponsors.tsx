"use client";

import React from "react";
import Image from "next/image";

interface Company {
  name: string;
  logo: string;
  tier: string;
}

const sponsors: Company[] = [
  // Emerald
  { name: "A Letter Tech", logo: "/Sponsor logo/Emerald/A letter tech logo (1).png", tier: "Emerald" },
  { name: "Emerald Sponsor", logo: "/Sponsor logo/Emerald/Logo.jpg", tier: "Emerald" },
  // Ruby
  { name: "Ruby Sponsor", logo: "/Sponsor logo/Ruby/LOGO FINAL.png", tier: "Ruby" },
  // Sapphire
  { name: "Sapphire Sponsor", logo: "/Sponsor logo/Sapphire/IMG-20251111-WA0032.jpg", tier: "Sapphire" },
  // Silver
  { name: "S-lon", logo: "/Sponsor logo/Silver/S-lon.png", tier: "Silver" },
  { name: "Kevilton", logo: "/Sponsor logo/Silver/kevilton.png", tier: "Silver" },
  { name: "Peplus", logo: "/Sponsor logo/Silver/peplus.png", tier: "Silver" },
  // Additional Sponsors
  { name: "LTL", logo: "/Sponsor logo/LTL.jpg", tier: "Partner" },
  { name: "SLT", logo: "/Sponsor logo/SLT_logo.svg", tier: "Partner" },
  { name: "CHEC", logo: "/Sponsor logo/chec vector.svg", tier: "Partner" },
];

export default function Sponsors() {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Our Partners
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Collaborating with industry leaders to bring Rextro 2025 to life.
        </p>
      </div>

      <div className="relative w-full">
        {/* Gradient Masks - White */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {/* First Set */}
          <div className="flex gap-12 md:gap-24 px-6 md:px-12">
            {sponsors.map((sponsor, idx) => (
              <div 
                key={`s1-${idx}`} 
                className="relative flex items-center justify-center min-w-[150px] md:min-w-[200px]"
              >
                <div className="relative h-16 md:h-20 w-full">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Second Set (Duplicate) */}
          <div className="flex gap-12 md:gap-24 px-6 md:px-12">
            {sponsors.map((sponsor, idx) => (
              <div 
                key={`s2-${idx}`} 
                className="relative flex items-center justify-center min-w-[150px] md:min-w-[200px]"
              >
                <div className="relative h-16 md:h-20 w-full">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}