"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import MeteorAnimation, { HERO_METEORS, HERO_METEORS_ALT } from '@/components/Homepage/MeteorAnimation';
import InteractiveMap from '@/components/Map/InteractiveMap';
import MapLegend from '@/components/Map/MapLegend';
import Footer from '@/components/Homepage/Footer';

export default function MapPage() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-[family-name:var(--font-instrument-sans)] bg-[#131316]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden h-[60vh] sm:h-[70vh] -mt-16 flex items-center justify-center"
      >
        {/* Background Layer - Circuit Pattern */}
        <div className="absolute inset-0 -z-10 bg-[#131316]">
          {/* Left Circuit Board */}
          <div className="absolute -top-8 right-1/2 sm:top-5 aspect-[969/887] w-[969px] opacity-30">
            <picture>
              <source srcSet="/circuit-lines@2xl.webp" type="image/webp" />
              <img
                alt=""
                width={1938}
                height={1774}
                className="absolute inset-0 h-full w-full"
                src="/circuit-lines@2xl.webp"
              />
            </picture>
            <div className="absolute inset-0">
              <MeteorAnimation
                meteors={HERO_METEORS}
                stops="dark"
                speed={0.4}
                style={{
                  left: 'calc(504 / 16 * 1rem)',
                  top: 'calc(25 / 16 * 1rem)',
                  width: 'calc(403 / 16 * 1rem)',
                  height: 'calc(363 / 16 * 1rem)',
                }}
              />
            </div>
          </div>

          {/* Right Circuit Board (Mirrored) */}
          <div className="absolute -top-8 right-1/2 origin-right -scale-x-100 sm:top-5 aspect-[969/887] w-[969px] opacity-30">
            <picture>
              <source srcSet="/circuit-lines@2xl.webp" type="image/webp" />
              <img
                alt=""
                width={1938}
                height={1774}
                className="absolute inset-0 h-full w-full"
                src="/circuit-lines@2xl.webp"
              />
            </picture>
            <div className="absolute inset-0">
              <MeteorAnimation
                meteors={HERO_METEORS_ALT}
                stops="dark"
                speed={0.4}
                style={{
                  left: 'calc(504 / 16 * 1rem)',
                  top: 'calc(25 / 16 * 1rem)',
                  width: 'calc(403 / 16 * 1rem)',
                  height: 'calc(363 / 16 * 1rem)',
                }}
              />
            </div>
          </div>

          {/* Grid Overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#131316] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#131316] to-transparent" />

        {/* Hero Content */}
        <div className={`relative z-10 text-center px-4 sm:px-8 transition-all duration-1000 ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Faculty <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Map</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
            Navigate through innovation zones and discover the future of engineering
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-20 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Map Container */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Legend / Filters - Left Sidebar on Desktop, Top on Mobile */}
            <div className="lg:col-span-1">
              <MapLegend
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                selectedZone={selectedZone}
              />
            </div>

            {/* Interactive Map - Main Area */}
            <div className="lg:col-span-3">
              <InteractiveMap
                selectedZone={selectedZone}
                onZoneSelect={setSelectedZone}
                activeFilter={activeFilter}
              />
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16">
            {[
              { label: 'Exhibition Zones', value: '12', color: 'from-cyan-500 to-blue-600' },
              { label: 'Competition Areas', value: '5', color: 'from-purple-500 to-pink-600' },
              { label: 'Innovation Labs', value: '8', color: 'from-orange-500 to-red-600' },
              { label: 'Main Stages', value: '3', color: 'from-green-500 to-emerald-600' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
              >
                <div className="relative z-10">
                  <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-400 font-medium">
                    {stat.label}
                  </div>
                </div>
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
