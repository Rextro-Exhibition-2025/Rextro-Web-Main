"use client";

import React, { useState, useEffect } from 'react';
import Footer from '@/components/Homepage/Footer';
import MapHeroSection from '@/components/map/MapHero';
import InteractiveMapCanvas from '../../components/map/InteractiveMapCanvas';
import AnimatedBackground from '@/components/common/AnimatedBackground';
import FooterTab from '@/components/common/FooterTab';

export default function MapPage() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-[family-name:var(--font-instrument-sans)] bg-black min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className={`transition-all duration-1000 ${
        isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <MapHeroSection />
      </div>

      {/* Map Interactive Canvas Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-20 -mt-20 z-10 pb-20">
        {/* Animated Background for the dark section */}
        <AnimatedBackground className="top-20" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="relative w-full aspect-9/16 md:aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
            <InteractiveMapCanvas />
          </div>
        </div>
      </section>

     
      {/* Footer Decoration */}
      <FooterTab />

      {/* Footer */}
      <Footer />
    </div>
  );
}
