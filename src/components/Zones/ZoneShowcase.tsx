"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ZoneData } from '@/components/Zones/ZoneModal';

gsap.registerPlugin(ScrollTrigger);

interface ZoneShowcaseProps {
  zones: ZoneData[];
  onZoneClick: (zone: ZoneData) => void;
}

const ZoneShowcase: React.FC<ZoneShowcaseProps> = ({ zones, onZoneClick }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.zone-card');

      // Animate cards on scroll
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: (idx % 3) * 0.1,
          }
        );
      });
    }
  }, [zones]);

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {zones.map((zone, idx) => (
        <ZoneCard
          key={zone.id}
          zone={zone}
          index={idx}
          onClick={() => onZoneClick(zone)}
        />
      ))}
    </div>
  );
};

interface ZoneCardProps {
  zone: ZoneData;
  index: number;
  onClick: () => void;
}

const ZoneCard: React.FC<ZoneCardProps> = ({ zone, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;

    if (!card || !image) return;

    // Hover animation
    const handleMouseEnter = () => {
      gsap.to(image, {
        scale: 1.1,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.to(card.querySelector('.zone-card-overlay'), {
        opacity: 1,
        duration: 0.4,
      });

      gsap.to(card.querySelector('.zone-card-content'), {
        y: -10,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.to(card.querySelector('.zone-card-overlay'), {
        opacity: 0.5,
        duration: 0.4,
      });

      gsap.to(card.querySelector('.zone-card-content'), {
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="zone-card group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <Image
          src={zone.image}
          alt={zone.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="zone-card-overlay absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-50 transition-opacity duration-400" />

      {/* Colored Border Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to bottom, ${zone.color}00, ${zone.color}40)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Border */}
      <div
        className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ borderColor: zone.color }}
      />

      {/* Content */}
      <div className="zone-card-content absolute inset-0 p-6 flex flex-col justify-end">
        {/* Category Badge */}
        <div className="mb-4">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: `${zone.color}30`,
              color: zone.color,
              border: `1px solid ${zone.color}`,
            }}
          >
            {zone.category}
          </span>
        </div>

        {/* Zone Name */}
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
          {zone.name}
        </h3>

        {/* Tagline */}
        <p className="text-sm sm:text-base text-zinc-300 mb-4 leading-relaxed">
          {zone.tagline}
        </p>

        {/* Stats Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
              style={{ backgroundColor: `${zone.color}30` }}
            >
              🚀
            </div>
            <div>
              <div className="text-white font-bold text-sm">{zone.projects}</div>
              <div className="text-zinc-500 text-xs">Projects</div>
            </div>
          </div>

          {/* Explore Button */}
          <button
            className="px-4 py-2 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${zone.color}cc, ${zone.color}99)`,
              boxShadow: `0 4px 12px ${zone.color}40`,
            }}
          >
            Explore →
          </button>
        </div>
      </div>

      {/* Decorative Corner Accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: zone.color }}
      />
    </div>
  );
};

export default ZoneShowcase;
