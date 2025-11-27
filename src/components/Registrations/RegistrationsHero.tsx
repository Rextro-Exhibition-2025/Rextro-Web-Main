"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Timer from "@/components/Homepage/Timer";
import MeteorAnimation, { HERO_METEORS, HERO_METEORS_ALT } from "@/components/Homepage/MeteorAnimation";

const RegistrationsHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-50 -mt-16 pt-16"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full bg-gray-50 isolate z-0">
         {/* Left Circuit Board */}
         <div className="absolute -top-8 right-1/2 sm:top-5 aspect-[969/887] w-[969px] opacity-60 mix-blend-multiply">
          <picture>
            <source srcSet="/circuit-lines@2xl.webp" type="image/webp" />
            <img
              alt=""
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
            <img
              alt=""
              className="absolute inset-0 h-full w-full"
              style={{ color: 'transparent' }}
              src="/circuit-components@2xl.webp"
            />
          </picture>
        </div>

        {/* Right Circuit Board (Mirrored) */}
        <div className="absolute -top-8 right-1/2 origin-right -scale-x-100 sm:top-5 aspect-[969/887] w-[969px] opacity-60 mix-blend-multiply">
          <picture>
            <source srcSet="/circuit-lines@2xl.webp" type="image/webp" />
            <img
              alt=""
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
            <img
              alt=""
              className="absolute inset-0 h-full w-full"
              style={{ color: 'transparent' }}
              src="/circuit-components@2xl.webp"
            />
          </picture>
        </div>
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-4 rounded-md border border-black/10 bg-white/50 backdrop-blur-sm mb-8 shadow-sm">
          <div className="size-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
          <span className="text-sm text-gray-600 font-medium">Zone Sessions - Registration Open</span>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
            Registrations
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto rounded-full" />
        </div>

        <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto mb-12 leading-tight font-light">
          Register for interactive zone sessions and workshops throughout the exhibition
        </p>

        {/* Timer */}
        <div className="mb-12">
          <Timer theme="light" />
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-24 relative z-50">
          <button
            onClick={() => {
              document.getElementById('registrations-list')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] rounded-md shadow-sm text-sm h-[2.5rem] px-6 ring-1 bg-black text-white ring-black hover:bg-gray-800"
          >
            <span className="relative z-10">Browse Sessions</span>
          </button>
          <Link
            href="/events"
            className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] rounded-md shadow-sm text-sm h-[2.5rem] px-6 ring-1 bg-white text-gray-900 ring-gray-200 hover:bg-gray-50"
          >
            <span className="relative z-10">View All Events</span>
          </Link>
        </div>

        {/* Separator to Dark Section */}
        <div className="relative">
          <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
             <div className="relative -mx-2.5 flex -bottom-1 -mt-12">
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
    </section>
  );
};

export default RegistrationsHero;
