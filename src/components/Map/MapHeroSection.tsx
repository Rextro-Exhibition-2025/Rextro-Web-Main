"use client";

import React from 'react';
import MeteorAnimation, { HERO_METEORS, HERO_METEORS_ALT } from '@/components/Homepage/MeteorAnimation';
import MapTitleSvg from '@/components/map/MapTitleSvg';

interface MapHeroSectionProps {
  className?: string;
}

const MapHeroSection = ({ className = '' }: MapHeroSectionProps) => {
  return (
    <div className={`relative isolate overflow-hidden bg-gray-50 h-[60vh] sm:h-[70vh] ${className}`}>
      {/* Background Layer */}
      <div className="absolute inset-0 -z-10">
        {/* Left Circuit Board - Subtle on Light */}
        <div className="absolute -top-8 right-1/2 sm:top-5 aspect-[969/887] w-[969px]">
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
        <div className="absolute -top-8 right-1/2 origin-right -scale-x-100 sm:top-5 aspect-[969/887] w-[969px]">
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

      {/* Bottom Separator */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-[1px] z-10">
        <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
          <div className="relative -mx-2.5 flex">
            <svg viewBox="0 0 64 48" className="w-16 flex-none fill-black" aria-hidden="true">
              <path d="M51.657 45.657 12.343 6.343A8 8 0 0 0 6.686 4H0V0h64v48h-6.686a8 8 0 0 1-5.657-2.343Z"></path>
            </svg>
            <div className="-mx-px flex-auto bg-black"></div>
            <svg viewBox="0 0 64 48" className="w-16 flex-none fill-black" aria-hidden="true">
              <path d="M12.343 45.657 51.657 6.343A8 8 0 0 1 57.314 4H64V0H0v48h6.686a8 8 0 0 0 5.657-2.343Z"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative mx-auto w-full h-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
        <div className="relative w-full h-full px-4 sm:px-8 lg:px-20 flex flex-col justify-center items-center gap-4 sm:gap-6 lg:gap-8">
          <div className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center gap-6">
            {/* Hero Content */}
            <div className="text-center w-full flex flex-col items-center" style={{ perspective: '1000px' }}>
              <div 
                className="w-full max-w-xl transform-style-3d transition-transform duration-500"
                style={{ transform: 'rotateX(5deg)' }}
              >
                <MapTitleSvg />
              </div>
              <p 
                className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium mt-8"
                style={{ transform: 'translateZ(30px)' }}
              >
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
