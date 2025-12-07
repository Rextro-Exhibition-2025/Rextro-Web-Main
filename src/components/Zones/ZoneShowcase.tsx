"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zone } from '@/lib/zonesData';
import { ArrowRight } from 'lucide-react';
import AnimatedBackground from '@/components/common/AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

interface ZoneShowcaseProps {
  zones: Zone[];
  color: string;
}

const ZoneShowcase: React.FC<ZoneShowcaseProps> = ({ zones, color }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;

    if (!section || !trigger) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Calculate total width needed for horizontal scroll
      // (width of all cards + gaps) - viewport width
      const scrollWidth = section.scrollWidth - window.innerWidth;

      gsap.fromTo(
        section,
        {
          x: 0,
        },
        {
          x: -scrollWidth,
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: `+=${scrollWidth + 2000}`, // Add extra scroll distance for smoother feel
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, [zones]);

  return (
    <section className="overflow-hidden bg-black relative">
      <div ref={triggerRef} className="min-h-screen py-20 md:py-0 md:h-screen flex items-center md:overflow-hidden relative">
        <AnimatedBackground />
        <div 
          ref={sectionRef} 
          className="flex flex-col md:flex-row gap-8 md:gap-12 px-6 md:px-20 items-start md:items-center w-full md:w-max h-auto md:h-full relative z-10"
        >
          {/* Intro Card */}
          <div className="w-full md:w-[30vw] shrink-0 md:pr-12 mb-8 md:mb-0">
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Explore <br />
              <span style={{ color: color }}>Our Zones</span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 max-w-md">
              Discover the specialized areas where innovation meets application.
              <span className="hidden md:inline"> Scroll to explore.</span>
            </p>
            <div className="mt-8 hidden md:flex items-center gap-2 text-white/50 animate-pulse">
              <span>Scroll</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          {/* Zone Cards */}
          {zones.map((zone, index) => (
            <div
              key={zone.id}
              className="relative w-full md:w-[50vw] lg:w-[40vw] h-[65vh] md:h-[75vh] shrink-0 group rounded-3xl overflow-hidden bg-zinc-900 border border-white/10"
            >
              {/* Image Background */}
              {zone.image && (
                <div className="absolute inset-0">
                  <Image
                    src={zone.image}
                    alt={zone.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />
                </div>
              )}

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end overflow-y-auto no-scrollbar">
                <div className="transform transition-transform duration-500 md:group-hover:-translate-y-2">
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-xs font-mono mb-4 border border-white/20 bg-black/50 backdrop-blur-sm"
                    style={{ color: color, borderColor: `${color}40` }}
                  >
                    ZONE {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {zone.name}
                  </h3>

                  {/* Location Info */}
                  {(zone.location || zone.highLevelLocation) && (
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6 text-xs md:text-sm font-mono text-zinc-400">
                      {zone.highLevelLocation && (
                        <span className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded border border-white/10">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                          {zone.highLevelLocation}
                        </span>
                      )}
                      {zone.location && (
                        <span className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded border border-white/10">
                           <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                          {zone.location}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {zone.description && (
                    <p className="text-sm md:text-lg text-zinc-300 max-w-xl transition-all duration-300 bg-black/20 md:bg-transparent p-2 md:p-0 rounded-lg backdrop-blur-sm md:backdrop-blur-none leading-relaxed">
                      {zone.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* End Spacer */}
          <div className="hidden md:block w-[10vw] shrink-0" />
        </div>
      </div>
    </section>
  );
};

export default ZoneShowcase;
