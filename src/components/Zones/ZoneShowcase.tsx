"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zone } from '@/lib/zonesData';
import { ArrowRight } from 'lucide-react';

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
      <div ref={triggerRef} className="min-h-screen py-20 md:py-0 md:h-screen flex items-center md:overflow-hidden">
        <div 
          ref={sectionRef} 
          className="flex flex-col md:flex-row gap-8 md:gap-12 px-6 md:px-20 items-start md:items-center w-full md:w-max h-auto md:h-full"
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
              className="relative w-full md:w-[60vw] lg:w-[45vw] aspect-[4/3] shrink-0 group rounded-3xl overflow-hidden bg-zinc-900 border border-white/10"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                </div>
              )}

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 md:group-hover:-translate-y-4">
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-xs font-mono mb-4 border border-white/20 bg-black/50 backdrop-blur-sm"
                    style={{ color: color, borderColor: `${color}40` }}
                  >
                    ZONE {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4 leading-tight">
                    {zone.name}
                  </h3>
                  
                  {zone.description && (
                    <p className="text-base md:text-lg text-zinc-300 max-w-xl line-clamp-3 md:group-hover:line-clamp-none transition-all duration-300">
                      {zone.description}
                    </p>
                  )}
                </div>

                {/* Hover Reveal Details Button */}
                <div className="mt-4 md:mt-6 md:opacity-0 transform md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <button 
                    className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
                    style={{ color: color }}
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
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
