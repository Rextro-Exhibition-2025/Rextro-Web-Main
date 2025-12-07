"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AIExpoBanner() {
  return (
    <div className="w-full p-4 md:p-8 lg:p-16 inline-flex flex-col justify-start items-start gap-2 font-[family-name:var(--font-space-grotesk)]">
      <div className="self-stretch p-6 md:p-10 bg-[#0000FE] flex flex-col justify-start items-start gap-6 md:gap-10">
        {/* Header */}
        <div className="self-stretch px-4 md:px-10 inline-flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-28 h-16 md:w-44 md:h-24 flex-shrink-0">
            <Image
              src="/aiexpoLogo.png"
              alt="AI Expo Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="justify-start text-white text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight md:leading-[52.80px] tracking-wide">
            Southern AI Expo and<br/>Conference - ReXtro 2025
          </div>
        </div>

        {/* Date, Time, Venue */}
        <div className="self-stretch px-4 md:px-10 inline-flex flex-col md:flex-row justify-start items-start gap-6 md:gap-10">
          <div className="inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-[#49F91D] text-base font-bold uppercase leading-4 tracking-tight">Date: </div>
            <div className="self-stretch justify-start text-white text-2xl md:text-3xl font-medium uppercase leading-8 tracking-tight">December 14th</div>
          </div>
          <div className="inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-[#49F91D] text-base font-bold uppercase leading-4 tracking-tight">time: </div>
            <div className="self-stretch justify-start text-white text-2xl md:text-3xl font-medium uppercase leading-8 tracking-tight">from 8.30 am onwards</div>
          </div>
          <div className="inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-[#49F91D] text-base font-bold uppercase leading-4 tracking-tight">venue:</div>
            <div className="self-stretch justify-start text-white text-2xl md:text-3xl font-medium uppercase leading-8 tracking-tight">
              Auditorium, Faculty of Engineering,<br/>University of Ruhuna, Galle
            </div>
          </div>
        </div>

        {/* Robot Image and Content Box */}
        <div className="self-stretch inline-flex flex-col lg:flex-row justify-start items-end gap-6 md:gap-10">
          {/* Robot Image */}
          <div className="w-full lg:w-60 h-64 lg:h-80 max-h-[380px] flex justify-start items-center gap-1">
            <div className="relative w-full h-full">
              <Image
                src="/AI Expo robo.png"
                alt="AI Robot"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Content Box */}
          <div 
            className="flex-1 bg-[#49F91D] p-[4px] inline-flex flex-col justify-start items-start"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%)" }}
          >
            <div 
              className="w-full h-full bg-[#0000FE] flex flex-col justify-start items-start"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
            >
              {/* Event Details */}
              <div className="self-stretch p-6 md:p-10 flex flex-col justify-center items-start gap-4">
              <div className="self-stretch justify-start text-[#49F91D] text-base font-bold uppercase leading-4 tracking-tight">Event includes:</div>
              <ul className="self-stretch text-justify justify-start list-disc pl-5 text-white text-xs md:text-sm font-normal space-y-1">
                <li>
                  5 keynote speeches
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>AI Careers & Skills for the Next Decade</li>
                    <li>Agentic AI in Telecommunications: Building Autonomous, Intelligent Networks for the Future</li>
                    <li>Empowering Ruhuna: AI as a Tool for Inclusive Prosperity</li>
                    <li>AI and Entrepreneurship: Turning Ideas into Impact</li>
                    <li>The Role of AI in Building a Smarter Sri Lanka</li>
                  </ul>
                </li>
                <li>Workshop - Hands on with Gemini and Google Agent Development Kit</li>
                <li>A panel discussion on "AI Across Industries: Transforming Key Sectors in Sri Lanka"</li>
              </ul>
            </div>

            {/* Free Entry and Register Button Row */}
            <div className="self-stretch w-full flex flex-col md:flex-row justify-start items-start gap-1 md:gap-10">
              {/* Free Entry */}
              <div className="w-full md:flex-1 px-2 py-6 outline outline-4 outline-offset-[4px] outline-[#49F91D] flex justify-center items-center gap-2">
                <div className="flex-1 text-center justify-start text-[#49F91D] text-2xl md:text-3xl lg:text-4xl font-bold uppercase leading-tight md:leading-9 tracking-tight">Free entry</div>
              </div>

              {/* Register Button */}
              <div className="flex-1 self-stretch">
                <Link
                  href="https://forms.gle/VjtgfQZHMW2YQyyo8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full min-h-[72px] relative bg-white group hover:bg-[#49F91D] transition-colors duration-300 flex items-center justify-center"
                  style={{
                    clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)"
                  }}
                >
                  <div className="text-center justify-start text-[#0000FE] text-2xl md:text-3xl lg:text-4xl font-bold uppercase leading-tight md:leading-10 tracking-tight px-4">Register Now</div>
                </Link>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
