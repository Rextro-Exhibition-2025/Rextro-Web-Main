"use client";

import React, { useState, useEffect } from 'react';
import Footer from '@/components/Homepage/Footer';
import MapHeroSection from '@/components/map/MapHero';
import InteractiveMapCanvas from '../../components/map/InteractiveMapCanvas';
import AnimatedBackground from '@/components/common/AnimatedBackground';
import FooterTab from '@/components/common/FooterTab';

import ParkingInfoModal from '@/components/map/ParkingInfoModal';

export default function MapPage() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-[family-name:var(--font-instrument-sans)] bg-black min-h-screen flex flex-col">
      <ParkingInfoModal />
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
            
            {/* Map Legend Overlay */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[20] flex flex-col gap-2 sm:gap-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 sm:p-4 shadow-xl">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                <span className="text-white text-[10px] sm:text-xs font-medium tracking-wide">Zone</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                <span className="text-white text-[10px] sm:text-xs font-medium tracking-wide">Main Zone</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
                <span className="text-white text-[10px] sm:text-xs font-medium tracking-wide">Parkings</span>
              </div>
            </div>
          </div>
          


          {/* Parking & App Info */}
          <div className="mt-12 max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm text-center space-y-3 opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm">
              <p className="text-zinc-300">
                <span className="text-purple-400 font-semibold">🅿️ Real-time Parking:</span> Click on the parking dots to view available slots.
              </p>
              <div className="hidden sm:block w-px h-4 bg-white/20" />
              <p className="text-zinc-300">
                Need directions? Use the{' '}
                <a href="/mobile-app" className="text-cyan-400 hover:text-cyan-300 font-medium underline decoration-cyan-400/30 underline-offset-4 transition-all hover:decoration-cyan-400" target='_blank'>
                  Rextro Mobile App
                </a>
              </p>
            </div>
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
