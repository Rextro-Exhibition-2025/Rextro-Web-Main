"use client";

import React from 'react';
import MeteorAnimation, { HERO_METEORS, HERO_METEORS_ALT } from '@/components/Homepage/MeteorAnimation';

interface MapHeroSectionProps {
  className?: string;
}

const MapHeroSection = ({ className = '' }: MapHeroSectionProps) => {
  return (
    <div className={`relative isolate overflow-hidden bg-black h-[60vh] sm:h-[70vh] mt-20 ${className}`}>
      {/* Background Layer */}
      <div className="absolute inset-0 -z-10">
        {/* Left Circuit Board */}
        <div className="absolute -top-8 right-1/2 sm:top-5 aspect-[969/887] w-[969px] opacity-30">
          <picture>
            <source srcSet="/circuit-components@2xl.webp" type="image/webp" />
            <img
              alt=""
              width={1938}
              height={1774}
              decoding="async"
              data-nimg="1"
              className="absolute inset-0 h-full w-full opacity-20"
              style={{ color: 'transparent' }}
              src="/circuit-components@2xl.webp"
            />
          </picture>
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

          {/* Left Meteor Animation Overlay */}
          <div className="absolute inset-0">
            <MeteorAnimation
              meteors={HERO_METEORS}
              stops="dark"
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
        <div className="absolute -top-8 right-1/2 origin-right -scale-x-100 sm:top-5 aspect-[969/887] w-[969px] opacity-30">
          <picture>
            <source srcSet="/circuit-components@2xl.webp" type="image/webp" />
            <img
              alt=""
              width={1938}
              height={1774}
              decoding="async"
              data-nimg="1"
              className="absolute inset-0 h-full w-full opacity-20"
              style={{ color: 'transparent' }}
              src="/circuit-components@2xl.webp"
            />
          </picture>
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
              stops="dark"
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

      {/* Gradient Overlays */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />

      {/* Content Container */}
      <div className="relative mx-auto w-full h-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
        <div className="relative w-full h-full px-4 sm:px-8 lg:px-20 flex flex-col justify-center items-center gap-4 sm:gap-6 lg:gap-8">
          <div className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center gap-6">
            {/* Hero Content */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                Faculty <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Map</span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
                Navigate through innovation zones and discover the future of engineering
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapHeroSection;
