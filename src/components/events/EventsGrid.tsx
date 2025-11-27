"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { MapPin, Clock, Users } from 'lucide-react';
import { getCategoryLabel, type EventData } from '@/lib/eventData';

gsap.registerPlugin(ScrollTrigger);

interface EventGridProps {
  events: EventData[];
  onEventClick: (event: EventData) => void;
  theme?: 'light' | 'dark';
}

const EventsGrid: React.FC<EventGridProps> = ({ events, onEventClick, theme = 'light' }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.event-grid-card');

      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: (idx % 3) * 0.1,
          }
        );
      });
    }
  }, [events]);

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => onEventClick(event)}
          theme={theme}
        />
      ))}

      {events.length === 0 && (
        <div className="col-span-full text-center py-24">
          <div className="text-6xl mb-4">🔍</div>
          <p className={`text-xl mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>No events found</p>
          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-600'}`}>Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

interface EventCardProps {
  event: EventData;
  onClick: () => void;
  theme?: 'light' | 'dark';
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick, theme = 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <div className="event-grid-card group">
      <div
        onClick={onClick}
        className={`w-full h-full text-left p-6 rounded-2xl border transition-all duration-300 flex flex-col cursor-pointer relative shadow-sm ${
          isDark 
            ? 'bg-zinc-900 border-white/10 hover:bg-zinc-800 hover:border-white/20' 
            : 'bg-white border-black/5 hover:bg-gray-50 hover:border-black/10'
        }`}
      >
        {/* Event Logo if available */}
        {event.image && (
          <div className="mb-4 flex justify-center">
            <div className={`relative w-24 h-24 rounded-lg overflow-hidden border p-3 ${
              isDark ? 'bg-black/20 border-white/10' : 'bg-gray-50 border-black/5'
            }`}>
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-mono ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>
                Day {event.day} • {event.startTime}
              </span>
            </div>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs border mb-3 ${
              isDark 
                ? 'border-white/10 text-zinc-400 bg-white/5' 
                : 'border-black/10 text-gray-600 bg-gray-100'
            }`}>
              {getCategoryLabel(event.category)}
            </span>
          </div>

          {/* Status Badge */}
          {event.registrationStatus && event.registrationStatus !== 'soon' && (
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              event.registrationStatus === 'open'
                ? isDark ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-green-50 text-green-700 border border-green-200'
                : event.registrationStatus === 'full'
                ? isDark ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-red-50 text-red-700 border border-red-200'
                : isDark ? 'bg-zinc-800 text-zinc-400 border border-zinc-700' : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}>
              {event.registrationStatus === 'open' ? 'Open' :
               event.registrationStatus === 'full' ? 'Full' : 'Closed'}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className={`text-xl font-semibold mb-3 transition-colors ${
          isDark 
            ? 'text-white' 
            : 'text-gray-900'
        }`}>
          {event.title}
        </h3>

        {/* Description */}
        <p className={`text-sm mb-4 line-clamp-2 flex-grow ${
          isDark ? 'text-zinc-400' : 'text-gray-600'
        }`}>
          {event.description}
        </p>

        {/* Speaker */}
        {event.speaker && (
          <div className={`mb-4 p-3 rounded-lg border ${
            isDark ? 'border-white/10 bg-white/5' : 'border-black/5 bg-gray-50'
          }`}>
            <div className={`text-xs mb-1 ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>Speaker</div>
            <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{event.speaker.name}</div>
            <div className={`text-xs ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>{event.speaker.organization}</div>
          </div>
        )}

        {/* Details */}
        <div className={`space-y-2 mb-6 text-sm ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>
          {event.zoneName && (
            <div className={`mb-2 px-3 py-2 rounded-lg border ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'
            }`}>
              <div className={`text-xs mb-1 ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>Zone</div>
              <div className={`text-sm font-medium ${isDark ? 'text-zinc-300' : 'text-gray-900'}`}>{event.zoneName}</div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className={`flex-1 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
              isDark 
                ? 'border-white/10 text-zinc-300 hover:bg-white/10' 
                : 'border-black/10 text-gray-700 hover:bg-gray-100'
            }`}
          >
            View Details
          </button>
          {event.category === 'zone-session' && event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all text-center ${
                isDark
                  ? 'bg-white text-black hover:bg-zinc-200'
                  : 'bg-white text-gray-950 hover:bg-white/90' // Wait, light mode register button was white? Let's check original. It was bg-white text-gray-950.
              }`}
            >
              Register
            </a>
          )}
        </div>

        {/* Hover Arrow */}
        <div className={`absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ${
          isDark ? 'text-zinc-500' : 'text-gray-400'
        }`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default EventsGrid;
