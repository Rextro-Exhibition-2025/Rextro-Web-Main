"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Timer from "@/components/Homepage/Timer";
import { FlipWords } from "@/components/Homepage/FlipWords";
import MeteorAnimation, { HERO_METEORS, HERO_METEORS_ALT } from "@/components/Homepage/MeteorAnimation";

const EventsHero = () => {
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
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 text-center flex flex-col items-center">
        
        {/* Badge */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white/50 backdrop-blur-md mb-8 shadow-sm"
        >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-sm text-gray-700 font-medium tracking-wide">December 5-7, 2025</span>
        </motion.div>

        {/* Heading */}
        <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.1]"
        >
            <span className="block text-neutral-900">
                Explore Our
            </span>
            <span className="block pb-2">
                <FlipWords 
                  words={["Events", "Workshops", "Competitions", "Webinars"]} 
                  className="text-blue-900 font-bold" 
                />
            </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
            Join us for three days of innovation, learning, and competition. Discover the future of engineering at ReXtro 2025.
        </motion.p>

        {/* Timer */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mb-12 w-full max-w-3xl"
        >
            <Timer theme="light" />
        </motion.div>

        {/* CTAs */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
            <button
              onClick={() => {
                document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-8 py-3 rounded-full bg-neutral-900 text-white font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg overflow-hidden"
            >
              <span className="relative z-10">View Schedule</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <Link
              href="https://silver-jubilee.eng.ruh.ac.lk/events"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-3 rounded-full bg-white border border-gray-200 text-neutral-900 font-semibold text-sm transition-all hover:bg-gray-50 hover:border-gray-300 hover:scale-105 hover:shadow-md"
            >
              Register Now
            </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsHero;
