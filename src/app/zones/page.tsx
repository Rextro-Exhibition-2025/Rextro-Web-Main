"use client";

import React from 'react';
import Footer from '@/components/Homepage/Footer';
import MapHeroSection from '@/components/Map/MapHeroSection'; // Reusing for consistency
import DepartmentTimeline from '@/components/Zones/DepartmentTimeline';
import MeteorAnimation, { HERO_METEORS, HERO_METEORS_ALT } from '@/components/Homepage/MeteorAnimation';

export default function ZonesPage() {
  return (
    <div className="font-[family-name:var(--font-instrument-sans)] bg-black min-h-screen flex flex-col">
      {/* Hero Section - Reusing MapHeroSection but could be customized */}
      <div className="relative isolate overflow-hidden bg-gray-50 min-h-[85vh] flex items-center justify-center">
        {/* Background Layer */}
        <div className="absolute inset-0 -z-10">
          {/* Left Circuit Board - Subtle on Light */}
          <div className="absolute top-1/2 -translate-y-1/2 right-1/2 aspect-[969/887] w-[969px] opacity-40">
            <picture>
              <source srcSet="/circuit-lines@2xl.webp" type="image/webp" />
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

            {/* Left Meteor Animation Overlay - Light Theme */}
            <div className="absolute inset-0">
              <MeteorAnimation
                meteors={HERO_METEORS}
                stops="light"
                speed={0.4}
                style={{
                  left: 'calc(504 / 16 * 1rem)',
                  top: 'calc(25 / 16 * 1rem)',
                  width: 'calc(403 / 16 * 1rem)',
                  height: 'calc(363 / 16 * 1rem)',
                }}
              />
            </div>
          </div>

          {/* Right Circuit Board (Mirrored) */}
          <div className="absolute top-1/2 -translate-y-1/2 right-1/2 origin-right -scale-x-100 aspect-[969/887] w-[969px] opacity-40">
            <picture>
              <source srcSet="/circuit-lines@2xl.webp" type="image/webp" />
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
                speed={0.4}
                style={{
                  left: 'calc(504 / 16 * 1rem)',
                  top: 'calc(25 / 16 * 1rem)',
                  width: 'calc(403 / 16 * 1rem)',
                  height: 'calc(363 / 16 * 1rem)',
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
                Exhibition <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Zones</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                Explore 5 departments and over 20 innovation zones showcasing the future of engineering.
            </p>
        </div>
        
        {/* Bottom Separator - Events Page Style */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
                <div className="relative -mx-2.5 flex -bottom-1">
                    <svg viewBox="0 0 64 48" className="w-16 flex-none fill-black" aria-hidden="true">
                        <path d="M51.657 2.343 12.343 41.657A8 8 0 0 1 6.686 44H0v4h64V0h-6.686a8 8 0 0 0-5.657 2.343Z"></path>
                    </svg>
                    <div className="-mx-px flex-auto bg-black"></div>
                    <svg viewBox="0 0 64 48" className="w-16 flex-none fill-black" aria-hidden="true">
                        <path d="m12.343 2.343 39.314 39.314A8 8 0 0 0 57.314 44H64v4H0V0h6.686a8 8 0 0 1 5.657 2.343Z"></path>
                    </svg>
                </div>
            </div>
        </div>
      </div>

      {/* Timeline Section */}
      <DepartmentTimeline />

      {/* Footer */}
      <Footer />
    </div>
  );
}
