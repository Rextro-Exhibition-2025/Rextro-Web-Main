"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MobileApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the component is visible
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before reaching viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="w-full lg:max-h-[640px] self-stretch px-4 sm:p-8 lg:p-20 bg-white inline-flex flex-col justify-start items-center gap-2"
    >
      <div className={`self-stretch px-4 py-8 sm:px-8 sm:py-10 lg:px-14 lg:py-14 bg-[radial-gradient(ellipse_88.00%_100.00%_at_50.00%_0.00%,_white_0%,_rgba(255,_255,_255,_0)_100%)] rounded-2xl shadow-[0px_24px_108px_0px_rgba(47,48,55,0.10)] shadow-[0px_4px_6px_0px_rgba(34,42,53,0.08)] shadow-[0px_0px_0px_1px_rgba(34,42,53,0.05)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] shadow-[0px_10px_32px_0px_rgba(34,42,53,0.12)] flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12 overflow-hidden relative transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}>
        
        {/* Circuit Background Images */}
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          {/* Circuit Lines */}
          <Image
            src="/circuit-lines@2xl.ee1ad3dd.webp"
            alt=""
            fill
            className="object-cover"
          />
          {/* Circuit Components */}
          <Image
            src="/circuit-components@2xl.288e1b6c.webp"
            alt=""
            fill
            className="object-cover mix-blend-multiply"
          />
        </div>

        {/* Mobile Phone Mockup - Left Side */}
        <div className="w-full sm:w-80 lg:w-96 inline-flex flex-col justify-start items-start gap-2 z-10">
          <div className="self-stretch relative aspect-[384/640]">
            <Image
              src="/mobile app.png"
              alt="ReXtro 2025 Mobile App"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Content Section - Right Side */}
        <div className="w-full lg:w-[560px] inline-flex flex-col justify-center items-start gap-4 sm:gap-6 z-10">
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center px-3 py-1.5 bg-blue-50 rounded-[4px] border border-blue-200">
            <span className="text-blue-700 text-xs sm:text-sm font-semibold font-[var(--font-instrument)] uppercase tracking-wide">
              Coming Soon
            </span>
          </div>

          {/* Heading */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="self-stretch justify-center text-black text-sm sm:text-base font-normal font-[var(--font-instrument)] uppercase">
              Your Event Navigator:
            </div>
            <div className="self-stretch justify-center">
              <span className="text-black text-2xl sm:text-3xl font-bold font-[var(--font-instrument)] uppercase">
                Download the{" "}
              </span>
              <span className="text-blue-900 text-2xl sm:text-3xl font-bold font-[var(--font-instrument)] uppercase">
                ReXtro 2025 App
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="self-stretch justify-center text-gray-600 text-sm sm:text-base font-normal font-[var(--font-instrument)] leading-6">
            Download the official app for instant access to the full exhibition directory, 
            project summaries, and personalized schedules. Navigate, connect, and learn 
            without missing a beat.
          </div>

          {/* App Store Badges - Grayed Out */}
          <div className="inline-flex justify-start items-start gap-4 sm:gap-6">
            {/* App Store Badge */}
            <div className="relative w-28 sm:w-32 lg:w-36 h-9 sm:h-10 lg:h-[44px] opacity-40 grayscale cursor-not-allowed">
              <Image
                src="/livetype.svg"
                alt="Download on App Store - Coming Soon"
                fill
                className="object-contain"
              />
            </div>

            {/* Google Play Badge */}
            <div className="relative w-28 sm:w-32 lg:w-36 h-9 sm:h-10 lg:h-[48px] opacity-40 grayscale cursor-not-allowed">
              <Image
                src="/GetItOnGooglePlay_Badge_Web_color_English-01 1.svg"
                alt="Get it on Google Play - Coming Soon"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="self-stretch justify-center text-gray-500 text-sm sm:text-base font-normal font-[var(--font-instrument)] leading-6">
            *The app is currently under development and will be available soon.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
