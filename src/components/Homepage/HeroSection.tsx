"use client";

import React, { useRef } from 'react';
import MeteorAnimation, { HERO_METEORS, HERO_METEORS_ALT } from './MeteorAnimation';
import Image from "next/image";
import { FlipWords } from "@/components/Homepage/FlipWords";


interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const words = ["INNOVATION", "BREAKTHROUGH", "NEXT GENERATION", "VISION", "IMPOSSIBLE", "SUSTAINABILITY"];

  return (
    <div className={`relative isolate overflow-hidden bg-gray-50 h-[90vh] -mt-16 ${className}`}>
      {/* Background Layer */}
      <div className="absolute inset-0 -z-10">
        {/* Left Circuit Board */}
        <div className="absolute -top-8 right-1/2 sm:top-5 aspect-[969/887] w-[969px]">
          <picture>
            <source srcSet="/circuit-lines@2xl.webp" type="image/webp" />
            <source srcSet="/circuit-lines@2xr.png" type="image/png" />
            <img
              alt=""
              width={1938}
              height={1774}
              decoding="async"
              data-nimg="1"
              className="absolute inset-0 h-full w-full"
              style={{ color: 'transparent' }}
              src="/circuit-lines@2xl.webp"
            />
          </picture>

          {/* Left Meteor Animation Overlay */}
          <div className="absolute inset-0">
            <MeteorAnimation
              meteors={HERO_METEORS}
              stops="light"
              speed={0.3}
              style={{
                left: 'calc(504 / 16 * 1rem)',
                top: 'calc(25 / 16 * 1rem)',
                width: 'calc(403 / 16 * 1rem)',
                height: 'calc(363 / 16 * 1rem)',
              }}
            />
          </div>

          {/* Circuit Components Overlay */}
          <picture>
            <source srcSet="/circuit-components@2xl.webp" type="image/webp" />
            <source srcSet="/circuit-components@2xr.png" type="image/png" />
            <img
              alt=""
              width={1938}
              height={1774}
              decoding="async"
              data-nimg="1"
              className="absolute inset-0 h-full w-full"
              style={{ color: 'transparent' }}
              src="/circuit-components@2xl.webp"
            />
          </picture>
        </div>

        {/* Right Circuit Board (Mirrored) */}
        <div className="absolute -top-8 right-1/2 origin-right -scale-x-100 sm:top-5 aspect-[969/887] w-[969px]">
          <picture>
            <source srcSet="/circuit-lines@2xl.webp" type="image/webp" />
            <source srcSet="/circuit-lines@2xr.png" type="image/png" />
            <img
              alt=""
              width={1938}
              height={1774}
              decoding="async"
              data-nimg="1"
              className="absolute inset-0 h-full w-full"
              style={{ color: 'transparent' }}
              src="/circuit-lines@2xl.webp"
            />
          </picture>

          {/* Right Meteor Animation Overlay */}
          <div className="absolute inset-0">
            <MeteorAnimation
              meteors={HERO_METEORS_ALT}
              stops="light"
              speed={0.3}
              style={{
                left: 'calc(504 / 16 * 1rem)',
                top: 'calc(25 / 16 * 1rem)',
                width: 'calc(403 / 16 * 1rem)',
                height: 'calc(363 / 16 * 1rem)',
              }}
            />
          </div>

          {/* Circuit Components Overlay */}
          <picture>
            <source srcSet="/circuit-components@2xl.webp" type="image/webp" />
            <source srcSet="/circuit-components@2xr.png" type="image/png" />
            <img
              alt=""
              width={1938}
              height={1774}
              decoding="async"
              data-nimg="1"
              className="absolute inset-0 h-full w-full"
              style={{ color: 'transparent' }}
              src="/circuit-components@2xl.webp"
            />
          </picture>
        </div>
      </div>

      {/* Gradient Overlay at Bottom */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-gray-50 via-gray-50/5" />

      {/* Content Container */}
      <div className="relative mx-auto w-full h-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
        <div className="relative w-full h-full px-4 sm:px-8 lg:px-20 flex flex-col justify-center items-center gap-4 sm:gap-6 lg:gap-8 ">
                <div className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center gap-8 sm:gap-10 lg:gap-12">
                  {/* Logo and Tagline Container */}
                  <div className="w-full max-w-[900px] flex flex-col justify-start items-center gap-12 sm:gap-16 lg:gap-20">
                    {/* Logo */}
                    <div className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[696px] h-32 sm:h-40 md:h-48 lg:h-60">
                      <Image
                        src="/Hero/logo.svg"
                        alt="Faculty of Engineering Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
        
                    {/* Tagline */}
                    <div className="w-full flex justify-center items-center">
                      <h1 className="text-center text-black text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-[var(--font-instrument)] tracking-tight leading-tight px-4">
                        THE{" "}
                        <FlipWords 
                          words={words} 
                          duration={3000}
                          className="inline-block  font-bold"
                        />
                        {" "}IS ENGINEERED HERE.
                      </h1>
                    </div>
                  </div>
        
                  {/* CTA Buttons */}
                  <div className="w-full sm:w-auto p-3 sm:p-4  rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] border border-black/5 backdrop-blur-[1.5px] flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                    {/* Explore Button - scroll to About section */}
                    <button
                      type="button"
                      onClick={() => {
                          const target = document.getElementById('about');
                          if (target) {
                            // Try to detect a nav/header height so we stop a bit before the section
                            const nav = document.querySelector('nav') || document.querySelector('header');
                            const navHeight = nav ? (nav as HTMLElement).getBoundingClientRect().height : 0;
                            const extraOffset = 24; // extra breathing room so content isn't hidden
                            const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - extraOffset;
                            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
                          } else {
                            // fallback: navigate to /#about if not present
                            window.location.href = '/#about';
                          }
                        }}
                      aria-label="Explore more (scroll to About)"
                      className="w-full sm:w-auto h-10 sm:h-8 px-6 sm:px-4 pt-2 sm:pt-1.5 pb-2.5 sm:pb-2 bg-gradient-to-b from-blue-900 to-sky-950 rounded-md shadow-[0px_1px_3px_0px_rgba(33,33,38,0.20),0px_0px_0px_1px_rgba(73,120,190,1.00),0px_4px_12px_0px_rgba(0,0,0,0.35)] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.07)] hover:from-blue-800 hover:to-sky-900 transition-all flex justify-center items-center"
                    >
                      <span className="text-white text-sm font-medium font-[var(--font-instrument)]">
                        Explore more
                      </span>
                    </button>
        
                    {/* Watch Video Button - opens YouTube in new tab */}
                    <a
                      href="https://youtu.be/pMPGkfB3cXc?si=kPPvAQot0qEsqMrN"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto p-1 sm:p-0.5 rounded-3xl flex justify-center sm:justify-start items-center gap-3 hover:bg-black/5 transition-colors"
                    >
                      <div className="relative w-6 h-6 flex-shrink-0">
                        {/* Play button circle */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black to-black/0 rounded-full" />
                        <div className="absolute inset-[2px] bg-white rounded-full" />
                        {/* Play icon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                            className="ml-0.5"
                          >
                            <path
                              d="M1.5 1L6.5 4L1.5 7V1Z"
                              fill="#171717"
                              stroke="#171717"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        <span className="text-black text-sm font-medium font-[var(--font-instrument)]">
                          Watch
                        </span>
                        <span className="text-gray-600 text-xs font-medium font-[var(--font-instrument)]">
                          3 min
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
      </div>
    </div>
  );
};

export default HeroSection;
