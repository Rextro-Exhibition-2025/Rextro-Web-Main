"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Zone {
  id: string;
  name: string;
  type: 'exhibition' | 'competition' | 'lab' | 'stage' | 'facility';
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface ZoneCardProps {
  zone: Zone;
  onClose: () => void;
}

const typeLabels = {
  exhibition: 'Exhibition Zone',
  competition: 'Competition Area',
  lab: 'Innovation Lab',
  stage: 'Main Stage',
  facility: 'Facility',
};

const typeIcons = {
  exhibition: '🔬',
  competition: '🏆',
  lab: '⚙️',
  stage: '🎤',
  facility: '🏢',
};

const ZoneCard: React.FC<ZoneCardProps> = ({ zone, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
        }
      );
    }
  }, [zone.id]);

  const handleClose = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        y: 10,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: onClose,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 overflow-hidden"
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-20 blur-3xl"
        style={{ backgroundColor: zone.color }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${zone.color}30`, border: `2px solid ${zone.color}` }}
            >
              {typeIcons[zone.type]}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{zone.name}</h3>
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: zone.color }}
              >
                {typeLabels[zone.type]}
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 4L12 12M12 4L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-zinc-300 text-sm mb-6">{zone.description}</p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-xs text-zinc-500 mb-1">Location</div>
            <div className="text-sm font-semibold text-white">
              Section {zone.id.toUpperCase()}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-xs text-zinc-500 mb-1">Area Size</div>
            <div className="text-sm font-semibold text-white">
              {Math.round((zone.width * zone.height) / 100)} m²
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-white mb-3">Available Features</h4>
          <div className="space-y-2">
            {[
              'Live Demonstrations',
              'Interactive Displays',
              'Expert Guidance',
              'Hands-on Experience',
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-zinc-300">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: zone.color }}
                />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${zone.color}dd, ${zone.color}99)`,
              boxShadow: `0 4px 12px ${zone.color}40`,
            }}
          >
            Get Directions
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 font-semibold text-sm text-white transition-all">
            Share
          </button>
        </div>

        {/* Schedule Indicator */}
        <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500">
            <div className="w-full h-full rounded-full animate-ping bg-green-500 opacity-75" />
          </div>
          <span className="text-xs text-green-400 font-medium">Open Now • 9:00 AM - 6:00 PM</span>
        </div>
      </div>

      {/* Decorative Corner Accents */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl"
        style={{ backgroundColor: zone.color }}
      />
      <div
        className="absolute bottom-0 left-0 w-24 h-24 opacity-10 blur-2xl"
        style={{ backgroundColor: zone.color }}
      />
    </div>
  );
};

export default ZoneCard;
