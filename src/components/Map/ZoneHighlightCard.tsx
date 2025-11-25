"use client";

import React from 'react';
import Image from 'next/image';

interface ZoneHighlightCardProps {
  title: string;
  description: string;
  imageSrc: string;
  color: string;
  features: string[];
}

const ZoneHighlightCard: React.FC<ZoneHighlightCardProps> = ({
  title,
  description,
  imageSrc,
  color,
  features,
}) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-sm hover:border-white/30 transition-all duration-500 hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative h-48 sm:h-64 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
            {title}
          </h3>
          <div className="h-1 w-12 rounded-full transition-all duration-500 group-hover:w-full" style={{ backgroundColor: color }} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 relative">
        {/* Background Glow */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: color }}
        />

        <p className="text-zinc-400 text-sm mb-6 line-clamp-3 group-hover:text-zinc-300 transition-colors">
          {description}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              {feature}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button 
          className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          style={{ 
            background: `linear-gradient(135deg, ${color}20, ${color}10)`,
            border: `1px solid ${color}30`
          }}
        >
          <span>Explore Zone</span>
          <svg 
            className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ZoneHighlightCard;
