"use client";

import React, { useState } from 'react';

interface MapLegendProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  selectedZone: string | null;
}

const filterCategories = [
  { id: 'all', label: 'All Zones', icon: '🗺️', color: 'from-white to-zinc-300' },
  { id: 'exhibition', label: 'Exhibitions', icon: '🔬', color: 'from-cyan-400 to-blue-500' },
  { id: 'competition', label: 'Competitions', icon: '🏆', color: 'from-purple-400 to-pink-500' },
  { id: 'lab', label: 'Innovation Labs', icon: '⚙️', color: 'from-orange-400 to-red-500' },
  { id: 'stage', label: 'Stages', icon: '🎤', color: 'from-green-400 to-emerald-500' },
  { id: 'facility', label: 'Facilities', icon: '🏢', color: 'from-slate-400 to-zinc-500' },
];

const MapLegend: React.FC<MapLegendProps> = ({ activeFilter, onFilterChange, selectedZone }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="sticky top-24 space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Navigate</h2>
        <p className="text-sm text-zinc-400">Filter zones and explore the faculty</p>
      </div>

      {/* Search Box */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search zones..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-11 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-all"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Filter Categories */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Filter by Type</h3>
        {filterCategories.map((category) => {
          const isActive = activeFilter === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onFilterChange(category.id)}
              className={`group w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                isActive
                  ? 'bg-white/10 border border-white/20 shadow-lg'
                  : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10'
              }`}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-xl transition-transform duration-300 ${
                isActive ? 'scale-110' : 'group-hover:scale-105'
              }`}>
                {category.icon}
              </div>

              {/* Label */}
              <div className="flex-1 text-left">
                <div className={`text-sm font-semibold transition-colors ${
                  isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                }`}>
                  {category.label}
                </div>
              </div>

              {/* Active Indicator */}
              {isActive && (
                <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${category.color}`}>
                  <div className="w-full h-full rounded-full animate-ping bg-gradient-to-br opacity-75" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Color Legend */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Color Guide</h3>
        <div className="space-y-2">
          {[
            { color: '#5CE3FF', label: 'Exhibition Zones' },
            { color: '#6C47FF', label: 'Competition Areas' },
            { color: '#FF6B35', label: 'Innovation Labs' },
            { color: '#10B981', label: 'Main Stages' },
            { color: '#94A3B8', label: 'Facilities' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-zinc-400">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Quick Tip</h3>
            <p className="text-xs text-zinc-400">
              Click on any zone to view detailed information. Use scroll to zoom and drag to explore different areas.
            </p>
          </div>
        </div>
      </div>

      {/* Download Map Button */}
      <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Download Map
      </button>
    </div>
  );
};

export default MapLegend;
