"use client";

import React, { useState } from 'react';
import MapHeroSection from '../../components/map/MapHeroSection';
import InteractiveMap from '../../components/map/InteractiveMap';
import MapLegend from '../../components/map/MapLegend';
import Footer from '../../components/Homepage/Footer';

export default function MapPage() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  return (
    <div className="font-[family-name:var(--font-instrument-sans)] bg-black">
      {/* Hero Section */}
      <MapHeroSection />

      {/* Map Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-20 pb-12 sm:pb-16 lg:pb-24">
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
