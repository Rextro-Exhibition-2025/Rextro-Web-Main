"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { getCategoryIcon, getCategoryLabel, type EventData } from '@/lib/eventData';

interface EventModalProps {
  event: EventData;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    ).fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' },
      '-=0.2'
    );

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });

    tl.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      y: 30,
      duration: 0.3,
      ease: 'power2.in',
    }).to(overlayRef.current, { opacity: 0, duration: 0.2 }, '-=0.1');
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const dayLabels = {
    1: 'December 05, 2025',
    2: 'December 06, 2025',
    3: 'December 07, 2025',
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
          className="relative w-full max-w-4xl rounded-2xl bg-gradient-to-br from-[#131316] to-[#0A0A0C] border border-white/10 shadow-2xl"
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
          {/* Header Section */}
          <div className="relative p-8 sm:p-10 border-b border-white/10">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Icon */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                style={{
                  backgroundColor: `${event.color}30`,
                  border: `2px solid ${event.color}`,
                  boxShadow: `0 8px 24px ${event.color}40`,
                }}
              >
                {getCategoryIcon(event.category)}
              </div>

              {/* Title Section */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${event.color}20`,
                      color: event.color,
                      border: `1px solid ${event.color}`,
                    }}
                  >
                    {getCategoryLabel(event.category)}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white">
                    Day {event.day}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      event.registrationStatus === 'open'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : event.registrationStatus === 'full'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : event.registrationStatus === 'closed'
                        ? 'bg-zinc-500/20 text-zinc-400 border border-zinc-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    {event.registrationStatus === 'open' ? '✓ Registration Open' :
                     event.registrationStatus === 'full' ? '⊗ Event Full' :
                     event.registrationStatus === 'closed' ? '⊗ Registration Closed' : '⏳ Coming Soon'}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
                  {event.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">📅</span>
                    <span>{dayLabels[event.day]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">🕐</span>
                    <span>{event.startTime} - {event.endTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 sm:p-10 space-y-8">
            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">About This Event</h3>
              <p className="text-zinc-300 leading-relaxed text-base">
                {event.description}
              </p>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📍</span>
                  <span className="text-sm text-zinc-500 uppercase tracking-wider">Venue</span>
                </div>
                <div className="text-white font-semibold">{event.venue}</div>
              </div>

              {event.capacity && (
                <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">👥</span>
                    <span className="text-sm text-zinc-500 uppercase tracking-wider">Capacity</span>
                  </div>
                  <div className="text-white font-semibold">{event.capacity} Attendees</div>
                </div>
              )}

              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">⏰</span>
                  <span className="text-sm text-zinc-500 uppercase tracking-wider">Duration</span>
                </div>
                <div className="text-white font-semibold">
                  {(() => {
                    const start = event.startTime.split(':').map(Number);
                    const end = event.endTime.split(':').map(Number);
                    const duration = (end[0] * 60 + end[1]) - (start[0] * 60 + start[1]);
                    const hours = Math.floor(duration / 60);
                    const minutes = duration % 60;
                    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes} minutes`;
                  })()}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🎯</span>
                  <span className="text-sm text-zinc-500 uppercase tracking-wider">Type</span>
                </div>
                <div className="text-white font-semibold">{getCategoryLabel(event.category)}</div>
              </div>
            </div>

            {/* Speaker Info */}
            {event.speaker && (
              <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>👤</span> Speaker / Organizer
                </h3>
                <div className="space-y-2">
                  <div className="text-xl font-bold text-white">{event.speaker.name}</div>
                  <div className="text-cyan-400 font-semibold">{event.speaker.title}</div>
                  <div className="text-zinc-400">{event.speaker.organization}</div>
                </div>
              </div>
            )}

            {/* Highlights */}
            {event.highlights.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">What You'll Learn</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                        style={{ backgroundColor: `${event.color}30`, color: event.color }}
                      >
                        ✓
                      </div>
                      <span className="text-zinc-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Registration CTA */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">
                    {event.registrationStatus === 'open' ? 'Secure Your Spot' :
                     event.registrationStatus === 'full' ? 'Event is Full' :
                     event.registrationStatus === 'closed' ? 'Registration Closed' : 'Opening Soon'}
                  </h4>
                  <p className="text-sm text-zinc-400">
                    {event.registrationStatus === 'open' ? 'Register now to reserve your seat at this event' :
                     event.registrationStatus === 'full' ? 'This event has reached maximum capacity' :
                     event.registrationStatus === 'closed' ? 'Registration period has ended' : 'Registration will open soon'}
                  </p>
                </div>
                {event.registrationStatus === 'open' && event.registrationLink && (
                  <Link
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 whitespace-nowrap"
                    style={{
                      background: `linear-gradient(135deg, ${event.color}dd, ${event.color}99)`,
                      boxShadow: `0 4px 16px ${event.color}50`,
                    }}
                  >
                    Register Now →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

          {/* Decorative Accents */}
          <div
            className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: event.color }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: event.color }}
          />
        </div>
      </div>
    </div>
  );
};

export default EventModal;
