"use client";

import React, { useState, useEffect } from 'react';
import Footer from '@/components/Homepage/Footer';
import MapHeroSection from '@/components/map/MapHeroSection';
import ZoneGallery from '@/components/map/ZoneGallery';
import InteractiveMapCanvas from '@/components/map/InteractiveMapCanvas';

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
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
            <InteractiveMapCanvas 
              imageSrc="/map.png"
              altText="Interactive Faculty Map"
            />
          </div>
        </div>
      </section>

      {/* Zone Gallery */}
      <ZoneGallery />

      {/* Footer */}
      <Footer />
    </div>
  );
}
