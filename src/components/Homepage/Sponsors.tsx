"use client";

import React from "react";
import { motion } from "framer-motion";

interface Company {
  name: string;
  logo: {
    src: string;
    height: number;
    width: number;
  };
}

interface AnimatedCompanyColumnProps {
  companies: Company[];
  delay: number;
}

const AnimatedCompanyColumn: React.FC<AnimatedCompanyColumnProps> = ({
  companies,
  delay,
}) => {
  // Create duplicated array for seamless loop
  const duplicatedCompanies = [...companies, ...companies];
  
  // Calculate keyframes for smooth animation with pauses
  const createKeyframes = () => {
    const keyframes: number[] = [];
    const totalLogos = companies.length;
    
    for (let i = 0; i <= totalLogos; i++) {
      keyframes.push(-(i * 100));
    }
    
    return keyframes;
  };
  
  // Calculate times for each keyframe (includes 3s pause per logo)
  const createTimes = () => {
    const times: number[] = [];
    const totalLogos = companies.length;
    const pauseTime = 3; // 3 seconds pause
    const transitionTime = 0.8; // 0.8 seconds for transition
    const segmentDuration = pauseTime + transitionTime;
    const totalDuration = totalLogos * segmentDuration;
    
    for (let i = 0; i <= totalLogos; i++) {
      if (i === 0) {
        times.push(0);
      } else {
        const time = (i * segmentDuration) / totalDuration;
        times.push(time);
      }
    }
    
    return times;
  };
  
  return (
    <div className="relative h-full overflow-hidden">
      <motion.ul
        role="list"
        className="flex flex-col"
        animate={{
          y: createKeyframes().map(k => `${k}%`),
        }}
        transition={{
          duration: companies.length * 3.8, // Total cycle duration
          delay: delay,
          repeat: Infinity,
          ease: "easeInOut",
          times: createTimes(),
          repeatType: "loop",
        }}
      >
        {duplicatedCompanies.map((company, index) => (
          <motion.li
            key={`${company.name}-${index}`}
            className="px-7 py-3 md:px-12 lg:px-6 xl:px-10 flex items-center justify-center"
          >
            <img
              alt={company.name}
              loading="lazy"
              width={144}
              height={32}
              decoding="async"
              className="w-32 xl:w-36"
              src={company.logo.src}
            />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default function Sponsors() {
  // Diamond Tier Sponsors
  const diamond: Company[] = [];

  // Emerald Tier Sponsors
  const emerald: Company[] = [
    {
      name: "A Letter Tech",
      logo: {
        src: "/Sponsor logo/Emerald/A letter tech logo (1).png",
        height: 32,
        width: 144,
      },
    },
    {
      name: "Emerald Sponsor",
      logo: {
        src: "/Sponsor logo/Emerald/Logo.jpg",
        height: 32,
        width: 144,
      },
    },
  ];

  // Gold Tier Sponsors
  const gold: Company[] = [];

  // Platinum Tier Sponsors
  const platinum: Company[] = [];

  // Ruby Tier Sponsors
  const ruby: Company[] = [
    {
      name: "Ruby Sponsor",
      logo: {
        src: "/Sponsor logo/Ruby/LOGO FINAL.png",
        height: 32,
        width: 144,
      },
    },
  ];

  // Sapphire Tier Sponsors
  const sapphire: Company[] = [
    {
      name: "Sapphire Sponsor",
      logo: {
        src: "/Sponsor logo/Sapphire/IMG-20251111-WA0032.jpg",
        height: 32,
        width: 144,
      },
    },
  ];

  // Silver Tier Sponsors
  const silver: Company[] = [
    {
      name: "S-lon",
      logo: {
        src: "/Sponsor logo/Silver/S-lon.png",
        height: 32,
        width: 144,
      },
    },
    {
      name: "Kevilton",
      logo: {
        src: "/Sponsor logo/Silver/kevilton.png",
        height: 32,
        width: 144,
      },
    },
    {
      name: "Peplus",
      logo: {
        src: "/Sponsor logo/Silver/peplus.png",
        height: 32,
        width: 144,
      },
    },
  ];

  return (
    <div className="relative overflow-hidden bg-white border-gray-950/5 outline outline-1 outline-offset-[-1px] outline-gray-950/5 mt-20">
      <div className="border-b border-gray-950/5">
        <div className="sm:flex mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
          {/* Header Text */}
          <p className="flex-auto self-center text-bold text-balance py-8 text-center text-base/6 font-book text-gray-950 sm:pr-10 sm:text-left xl:py-10">
            The official sponsors and collaborators of ReXtro 2025.
          </p>

          {/* Logo Grid */}
          <ul
            role="list"
            className="-mx-6 grid flex-none grid-cols-2 sm:mx-0 sm:border-l sm:border-gray-950/5 lg:flex"
          >
            {/* Emerald Tier */}
            {emerald.length > 0 && (
              <li className="relative isolate flex flex-none justify-center overflow-hidden border-t border-gray-950/5 sm:border-t-0 border-r">
                <div
                  className="flex items-center justify-center py-3 h-[200px]"
                  style={{
                    mask: "linear-gradient(transparent calc(50% - 2.5rem), black calc(50% - 1rem), black calc(50% + 1rem), transparent calc(50% + 2.5rem))",
                  }}
                >
                  <AnimatedCompanyColumn companies={emerald} delay={0} />
                </div>
              </li>
            )}

            {/* Ruby Tier */}
            {ruby.length > 0 && (
              <li className="relative isolate flex flex-none justify-center overflow-hidden border-t border-gray-950/5 sm:border-t-0 sm:border-r">
                <div
                  className="flex items-center justify-center py-3 h-[200px]"
                  style={{
                    mask: "linear-gradient(transparent calc(50% - 2.5rem), black calc(50% - 1rem), black calc(50% + 1rem), transparent calc(50% + 2.5rem))",
                  }}
                >
                  <AnimatedCompanyColumn companies={ruby} delay={0.7} />
                </div>
              </li>
            )}

            {/* Sapphire Tier */}
            {sapphire.length > 0 && (
              <li className="relative isolate flex flex-none justify-center overflow-hidden border-t border-gray-950/5 lg:border-t-0 border-r">
                <div
                  className="flex items-center justify-center py-3 h-[200px]"
                  style={{
                    mask: "linear-gradient(transparent calc(50% - 2.5rem), black calc(50% - 1rem), black calc(50% + 1rem), transparent calc(50% + 2.5rem))",
                  }}
                >
                  <AnimatedCompanyColumn companies={sapphire} delay={1.4} />
                </div>
              </li>
            )}

            {/* Silver Tier */}
            {silver.length > 0 && (
              <li className="relative isolate flex flex-none justify-center overflow-hidden border-t border-gray-950/5 lg:border-t-0 sm:border-r">
                <div
                  className="flex items-center justify-center py-3 h-[200px]"
                  style={{
                    mask: "linear-gradient(transparent calc(50% - 2.5rem), black calc(50% - 1rem), black calc(50% + 1rem), transparent calc(50% + 2.5rem))",
                  }}
                >
                  <AnimatedCompanyColumn companies={silver} delay={2.1} />
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}