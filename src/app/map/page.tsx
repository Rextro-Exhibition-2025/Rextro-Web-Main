"use client";

import React from 'react';
import Footer from '@/components/Homepage/Footer';
import MapHeroSection from '@/components/Map/MapHeroSection';
import ZoneGallery from '@/components/Map/ZoneGallery';
import InteractiveMapCanvas from '@/components/Map/InteractiveMapCanvas';

export default function MapPage() {
  return (
    <div className="font-[family-name:var(--font-instrument-sans)] bg-black min-h-screen flex flex-col">
      {/* Hero Section */}
      <MapHeroSection />

      {/* Map Interactive Canvas Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-20 -mt-20 z-10 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
            <InteractiveMapCanvas 
              imageSrc="/map-placeholder.png"
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
