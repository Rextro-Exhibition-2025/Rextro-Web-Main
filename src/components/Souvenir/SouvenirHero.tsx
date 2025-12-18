'use client';

import React from 'react';
import MeteorAnimation, { HERO_METEORS, HERO_METEORS_ALT } from '@/components/Homepage/MeteorAnimation';

const SouvenirHero = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-50 h-[50vh] sm:h-[60vh]">
      {/* Background Layer */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 -translate-y-1/2 right-1/2 aspect-[969/887] w-[969px]">
          <picture>
            <source srcSet="/circuit-lines@2xl.webp" type="image/webp" />
            <img
              alt=""
              className="absolute inset-0 h-full w-full opacity-60"
              style={{ color: 'transparent' }}
              src="/circuit-lines@2xl.webp"
            />
          </picture>
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

        <div className="absolute top-1/2 -translate-y-1/2 right-1/2 origin-right -scale-x-100 aspect-[969/887] w-[969px]">
          <picture>
            <source srcSet="/circuit-lines@2xl.webp" type="image/webp" />
            <img
              alt=""
              className="absolute inset-0 h-full w-full opacity-60"
              style={{ color: 'transparent' }}
              src="/circuit-lines@2xl.webp"
            />
          </picture>
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
      <div className="absolute bottom-0 left-0 right-0 z-10 transition-transform duration-300">
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

      {/* Content Container */}
      <div className="relative mx-auto w-full h-full px-6 flex flex-col justify-center items-center">
        <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-900 via-gray-800 to-gray-500 mb-6 drop-shadow-sm">
                SOUVENIR
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                A journey through our memories and milestones.
            </p>
        </div>
      </div>
    </div>
  );
};

export default SouvenirHero;
