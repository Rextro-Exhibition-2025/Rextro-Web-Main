"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
export interface ZoneData {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  color: string;
  stats: {
    visitors: string;
    exhibits: string;
    rating: string;
  };
  highlights: string[];
  projects: string;
}

interface ZoneModalProps {
  zone: ZoneData;
  onClose: () => void;
}

const ZoneModal: React.FC<ZoneModalProps> = ({ zone, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'highlights' | 'projects'>('overview');

  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Entrance animation
    const tl = gsap.timeline();

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    ).fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.9, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' },
      '-=0.2'
    );

    // Animate content items
    const items = contentRef.current?.querySelectorAll('.modal-animate-item');
    if (items) {
      gsap.fromTo(
        items,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, delay: 0.3 }
      );
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose,
    });

    tl.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      y: 50,
      duration: 0.3,
      ease: 'power2.in',
    }).to(
      overlayRef.current,
      { opacity: 0, duration: 0.2 },
      '-=0.1'
    );
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto"
      style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
    >
      <div className="min-h-full flex items-center justify-center p-4">
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl rounded-2xl bg-gradient-to-br from-[#131316] to-[#0A0A0C] border border-white/10 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="pb-8">
          {/* Header Section with Image */}
          <div className="relative h-64 sm:h-80">
            <Image
              src={zone.image}
              alt={zone.name}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-[#131316]/60 to-transparent" />

            {/* Zone Title on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="mb-3">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${zone.color}30`,
                    color: zone.color,
                    border: `1px solid ${zone.color}`,
                  }}
                >
                  {zone.category}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                {zone.name}
              </h2>
              <p className="text-lg sm:text-xl text-zinc-300">
                {zone.tagline}
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div ref={contentRef} className="p-6 sm:p-8">
            {/* Tabs */}
            <div className="flex gap-2 mb-8 border-b border-white/10 pb-2">
              {[
                { id: 'overview', label: 'Overview', icon: '📋' },
                { id: 'highlights', label: 'Highlights', icon: '⭐' },
                { id: 'projects', label: 'Projects', icon: '🚀' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                  }`}
                  style={
                    activeTab === tab.id
                      ? {
                          background: `linear-gradient(135deg, ${zone.color}cc, ${zone.color}99)`,
                          boxShadow: `0 4px 12px ${zone.color}40`,
                        }
                      : {}
                  }
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="modal-animate-item">
                  <h3 className="text-xl font-bold text-white mb-3">About This Zone</h3>
                  <p className="text-zinc-300 leading-relaxed text-base">
                    {zone.description}
                  </p>
                </div>

                <div className="modal-animate-item grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Active Projects', value: zone.projects, icon: '🚀' },
                    { label: 'Research Teams', value: '12+', icon: '👥' },
                    { label: 'Innovations', value: '50+', icon: '💡' },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{ color: zone.color }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'highlights' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Key Features & Technologies</h3>
                <div className="grid gap-3">
                  {zone.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="modal-animate-item flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: `${zone.color}30` }}
                      >
                        ✓
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">{highlight}</h4>
                        <p className="text-sm text-zinc-400">
                          Cutting-edge implementation showcasing innovation and practical applications.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Featured Projects</h3>
                <div className="grid gap-4">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="modal-animate-item p-5 rounded-xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                            style={{ backgroundColor: `${zone.color}30` }}
                          >
                            🔬
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">Project Title {idx + 1}</h4>
                            <p className="text-sm text-zinc-500">Research Team Alpha</p>
                          </div>
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: `${zone.color}20`,
                            color: zone.color,
                          }}
                        >
                          Active
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        Innovative solution addressing real-world engineering challenges through advanced research and development.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="modal-animate-item mt-8 p-6 rounded-xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-white font-bold mb-1">Ready to Explore?</h4>
                  <p className="text-sm text-zinc-400">
                    Visit this zone during Rextro 2025 to experience innovation firsthand
                  </p>
                </div>
                <button
                  className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 whitespace-nowrap"
                  style={{
                    background: `linear-gradient(135deg, ${zone.color}dd, ${zone.color}99)`,
                    boxShadow: `0 4px 16px ${zone.color}50`,
                  }}
                >
                  View on Map →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Accents */}
        <div
          className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl pointer-events-none"
          style={{ backgroundColor: zone.color }}
        />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: zone.color }}
          />
        </div>
      </div>
    </div>
  );
};

export default ZoneModal;
