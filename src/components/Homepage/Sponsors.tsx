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
  // New Sponsors from public/sponsors
  { name: "ACCELR", logo: "/sponsors/ACCELR.jpg", tier: "Partner" },
  { name: "Bigbell Engineering", logo: "/sponsors/Bigbell engineering.jpg", tier: "Partner" },
  { name: "Daily FT", logo: "/sponsors/Daily FT Logo.jpg", tier: "Partner" },
  { name: "Daily Lankadeepa", logo: "/sponsors/Daily Lankadeepa Logo_page-0001 1.png", tier: "Partner" },
  { name: "DeMEP", logo: "/sponsors/DeMEP-A5- Front Inner.png", tier: "Partner" },
  { name: "Dimo", logo: "/sponsors/Dimo-logo-1.png", tier: "Partner" },
  { name: "EPC", logo: "/sponsors/EPC.JPG", tier: "Partner" },
  { name: "Leco", logo: "/sponsors/Leco.png", tier: "Partner" },
  { name: "HL", logo: "/sponsors/Logo 1 HL New Logo [Final].jpg", tier: "Partner" },
  { name: "LTL", logo: "/sponsors/Logo 2 LTL.jpg", tier: "Partner" },
  { name: "Magic Ice Cream", logo: "/sponsors/MAGIC ICE CREAM.jpg", tier: "Partner" },
  { name: "NERDC", logo: "/sponsors/NERDC LOGO-1.png", tier: "Partner" },
  { name: "PWA", logo: "/sponsors/PWA2.jpg", tier: "Partner" },
  { name: "Pepsi", logo: "/sponsors/Pepsi_2023.svg.png", tier: "Partner" },
  { name: "SAW Engineering", logo: "/sponsors/SAW Engineering.jpg", tier: "Partner" },
  { name: "SLBC", logo: "/sponsors/SLBC.jpg", tier: "Partner" },
  { name: "Synergen", logo: "/sponsors/Synergen_TL_CMYK.png", tier: "Partner" },
  { name: "TUA Consultants", logo: "/sponsors/TUA consultants.jpg", tier: "Partner" },
  { name: "Abans", logo: "/sponsors/abans.png", tier: "Partner" },
  { name: "Ada Derana", logo: "/sponsors/adaderana.png", tier: "Partner" },
  { name: "Amavi Auto Trading", logo: "/sponsors/amavi auto trading.jpg", tier: "Partner" },
  { name: "BYD", logo: "/sponsors/byd-logo-png_seeklogo-496457.png", tier: "Partner" },
  { name: "CECB", logo: "/sponsors/cecb.png", tier: "Partner" },
  { name: "CESL", logo: "/sponsors/central engineering services cesl_logo_new.png", tier: "Partner" },
  { name: "Ceylon Steel Corporation", logo: "/sponsors/ceylon steel corporation.png", tier: "Partner" },
  { name: "DeMEP", logo: "/sponsors/demep-logo.png", tier: "Partner" },
  { name: "Derana", logo: "/sponsors/derana.webp", tier: "Partner" },
  { name: "Insee", logo: "/sponsors/insee-corp.png", tier: "Partner" },
  { name: "Mastery Engineering", logo: "/sponsors/mastery engineering.jpg", tier: "Partner" },
  { name: "Native Way", logo: "/sponsors/native way.png", tier: "Partner" },
  { name: "Nexteq Solutions", logo: "/sponsors/nexteq solutions.jpg", tier: "Partner" },
  { name: "Orel", logo: "/sponsors/orel.jpg", tier: "Partner" },
  { name: "Pinnacle Engineering", logo: "/sponsors/pinnacle engineering.jpg", tier: "Partner" },
  { name: "Ruhuna FM", logo: "/sponsors/ruhuna fm.jpg", tier: "Partner" },
  { name: "SLBC", logo: "/sponsors/slbc.png", tier: "Partner" },
  { name: "Smart Tech", logo: "/sponsors/smart tech.jpg", tier: "Partner" },
  { name: "Statewide Geotechnicals", logo: "/sponsors/statewide geotechnicals.svg", tier: "Partner" },
  { name: "Symsyn", logo: "/sponsors/symsyn.png", tier: "Partner" },
  { name: "Wijeya", logo: "/sponsors/wijeya_logo.png", tier: "Partner" },
  { name: "SLIC", logo: "/sponsors/slic.png", tier: "Partner" },
  { name: "DreamX", logo: "/sponsors/DreamX.png", tier: "Partner" },
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