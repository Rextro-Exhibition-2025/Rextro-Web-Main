"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SilverJubileeBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the component is visible
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before reaching viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="w-full lg:max-h-[640px] self-stretch px-4 sm:p-8 lg:p-20 bg-white inline-flex flex-col justify-start items-center gap-2"
    >
      <div className={`self-stretch px-4 py-8 sm:px-8 sm:py-10 lg:px-14 lg:py-14 bg-gradient-to-br from-[#001f3f] to-[#003366] rounded-2xl shadow-[0px_24px_108px_0px_rgba(47,48,55,0.10)] shadow-[0px_4px_6px_0px_rgba(34,42,53,0.08)] flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12 overflow-hidden relative transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}>
        
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute inset-0 bg-[url('/circuit-lines@2xl.webp')] bg-cover bg-center mix-blend-overlay"></div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-[60%] inline-flex flex-col justify-center items-start gap-4 sm:gap-6 z-10 text-white">

          {/* Heading */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="self-stretch justify-center text-cyan-400 text-sm sm:text-base font-normal font-[var(--font-instrument)] uppercase tracking-wider">
              A Legacy of Engineering Excellence
            </div>
            <div className="self-stretch justify-center">
              <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold font-[var(--font-instrument)] uppercase leading-tight">
                Visit the Original <br/>
                <span className="text-cyan-200">Silver Jubilee Site</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="self-stretch justify-center text-gray-300 text-sm sm:text-base font-normal font-[var(--font-instrument)] leading-6 max-w-xl">
            Explore the history, previous announcements, and the journey leading up to this monumental event. The legacy site remains available for archival and informational purposes.
          </div>

          {/* CTA Button */}
          <Link 
            href="https://silver-jubilee.eng.ruh.ac.lk/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#001f3f] font-semibold hover:bg-cyan-50 transition-all duration-300 shadow-lg hover:scale-105"
          >
            <span>Visit Legacy Site</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>

         {/* Decorative Right Side (Abstract/Logo) */}
         <div className="w-full lg:w-[35%] flex justify-center items-center z-10 relative h-64 lg:h-full">
            <div className="relative w-48 h-48 lg:w-64 lg:h-64 opacity-80 animate-pulse-slow">
               {/* Using the Faculty Logo or a relevant placeholder if available, otherwise abstract circles */}
               <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
               <div className="absolute inset-4 border-4 border-white/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white/10">25</span>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};

export default SilverJubileeBanner;
