"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import DynamicDepartmentTitleSvg from '@/components/Zones/DynamicDepartmentTitleSvg';

interface DepartmentHeroProps {
  title: string;
  description: string;
  videoSrc: string;
}

const DepartmentHero: React.FC<DepartmentHeroProps> = ({ title, description, videoSrc }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
        isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="w-full max-w-4xl flex flex-col items-center" style={{ perspective: '1000px' }}>
          <div 
            className="w-full transform-style-3d transition-transform duration-500"
            style={{ transform: 'rotateX(5deg)' }}
          >
            <DynamicDepartmentTitleSvg title={title} />
          </div>
          <p 
            className="text-xl sm:text-2xl text-zinc-300 max-w-2xl mx-auto font-light mt-8"
            style={{ transform: 'translateZ(30px)' }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default DepartmentHero;
