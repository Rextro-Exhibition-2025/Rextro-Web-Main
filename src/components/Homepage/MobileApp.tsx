"use client";

import Image from "next/image";
import Link from "next/link";

const MobileApp = () => {
  return (
    <section className="w-full h-[482px] p-8 sm:p-12 lg:p-20 bg-white flex flex-col justify-start items-center gap-2">
      <div className="w-full max-w-screen-2xl p-8 sm:p-10 lg:p-14 relative bg-[radial-gradient(ellipse_88.00%_100.00%_at_50.00%_0.00%,_white_0%,_rgba(255,_255,_255,_0)_100%)] rounded-2xl shadow-[0px_24px_108px_0px_rgba(47,48,55,0.10)] shadow-[0px_4px_6px_0px_rgba(34,42,53,0.08)] shadow-[0px_0px_0px_1px_rgba(34,42,53,0.05)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05)] shadow-[0px_10px_32px_0px_rgba(34,42,53,0.12)] flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12 overflow-hidden">
        
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
        <div className="relative w-full max-w-[300px] lg:max-w-[380px] h-[600px] lg:h-[300px] self-stretch relative shrink-0 shadow-[0px_4px_40px_0px_rgba(0,0,0,0.5) z-10">
          <Image
            src="/mobile app.png"
            alt="ReXtro 2025 Mobile App"
            fill
            priority
          />
        </div>

        {/* Content Section - Right Side */}
        <div className="flex-1 w-full max-w-[560px] flex flex-col justify-start items-start gap-6 px-4 lg:px-0 z-10">
          {/* Heading */}
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <div className="w-full text-black text-sm sm:text-base font-normal font-[var(--font-instrument)] uppercase tracking-wide">
              Your Event Navigator:
            </div>
            <div className="w-full">
              <span className="text-black text-2xl sm:text-3xl font-bold font-[var(--font-instrument)] uppercase">
                Download the{" "}
              </span>
              <span className="text-blue-900 text-2xl sm:text-3xl font-bold font-[var(--font-instrument)] uppercase">
                ReXtro 2025 App
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="w-full text-gray-600 text-sm sm:text-base font-normal font-[var(--font-instrument)] leading-6">
            Download the official app for instant access to the full exhibition directory, 
            project summaries, and personalized schedules. Navigate, connect, and learn 
            without missing a beat.
          </div>

          {/* App Store Badges */}
          <div className="flex flex-wrap justify-start items-center gap-4 sm:gap-6">
            {/* App Store Badge */}
            <Link
              href="#"
              className="relative w-32 sm:w-36 h-10 sm:h-[44px] hover:opacity-80 transition-opacity"
            >
              <div>
                  <Image
                    src="/livetype.svg"
                    alt="Download on App Store"
                    fill
                    className="object-contain"
                  />
              </div>
            </Link>

            {/* Google Play Badge */}
            <Link
              href="#"
              className="relative w-32 sm:w-36 h-10 sm:h-[48px] hover:opacity-80 transition-opacity"
            >
              <Image
                src="/GetItOnGooglePlay_Badge_Web_color_English-01 1.svg"
                alt="Get it on Google Play"
                fill
                className="object-contain"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;
