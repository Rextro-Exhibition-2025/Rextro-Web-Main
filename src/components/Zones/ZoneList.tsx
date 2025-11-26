"use client";

import React from 'react';
import { Zone } from '@/lib/zonesData';

interface ZoneListProps {
  zones: Zone[];
  color: string;
}

const ZoneList: React.FC<ZoneListProps> = ({ zones, color }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zones.map((zone, index) => (
            <div 
              key={zone.id}
              className="group relative p-8 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }}
              />
              
              {/* Accent Line */}
              <div 
                className="absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: color }}
              />

              <div className="relative z-10">
                <span className="text-xs font-mono text-zinc-500 mb-4 block">ZONE {index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
                  {zone.name}
                </h3>
                {zone.description && (
                  <p className="text-sm text-zinc-400 line-clamp-3">
                    {zone.description}
                  </p>
                )}
              </div>

              {/* Corner Decoration */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  style={{ color: color }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZoneList;
