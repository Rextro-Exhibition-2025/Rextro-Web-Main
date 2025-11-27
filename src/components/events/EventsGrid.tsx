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
}

const EventsGrid: React.FC<EventGridProps> = ({ events, onEventClick }) => {
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
        />
      ))}

      {events.length === 0 && (
        <div className="col-span-full text-center py-24">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-zinc-500 mb-2">No events found</p>
          <p className="text-sm text-zinc-600">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

interface EventCardProps {
  event: EventData;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  return (
    <div className="event-grid-card group">
      <div
        onClick={onClick}
        className="w-full h-full text-left p-6 rounded-2xl border border-black/5 bg-white hover:bg-gray-50 hover:border-black/10 transition-all duration-300 flex flex-col cursor-pointer relative shadow-sm"
      >
        {/* Event Logo if available */}
        {event.image && (
          <div className="mb-4 flex justify-center">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-50 border border-black/5 p-3">
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
              <span className="text-xs text-gray-500 font-mono">
                Day {event.day} • {event.startTime}
              </span>
            </div>
            <span className="inline-block px-2 py-0.5 rounded-full text-xs border border-black/10 text-gray-600 mb-3 bg-gray-100">
              {getCategoryLabel(event.category)}
            </span>
          </div>

          {/* Status Badge */}
          {event.registrationStatus && event.registrationStatus !== 'soon' && (
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              event.registrationStatus === 'open'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : event.registrationStatus === 'full'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}>
              {event.registrationStatus === 'open' ? 'Open' :
               event.registrationStatus === 'full' ? 'Full' : 'Closed'}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-black transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
          {event.description}
        </p>

        {/* Speaker */}
        {event.speaker && (
          <div className="mb-4 p-3 rounded-lg border border-black/5 bg-gray-50">
            <div className="text-xs text-gray-500 mb-1">Speaker</div>
            <div className="text-sm text-gray-900 font-medium">{event.speaker.name}</div>
            <div className="text-xs text-gray-500">{event.speaker.organization}</div>
          </div>
        )}

        {/* Details */}
        <div className="space-y-2 mb-6 text-sm text-gray-500">
          {event.zoneName && (
            <div className="mb-2 px-3 py-2 rounded-lg bg-gray-100 border border-gray-200">
              <div className="text-xs text-gray-500 mb-1">Zone</div>
              <div className="text-sm text-gray-900 font-medium">{event.zoneName}</div>
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
            className="flex-1 px-4 py-2 rounded-lg border border-black/10 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-all"
          >
            View Details
          </button>
          {event.category === 'zone-session' && event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 px-4 py-2 rounded-lg bg-white text-gray-950 text-sm font-semibold hover:bg-white/90 transition-all text-center"
            >
              Register
            </a>
          )}
        </div>

        {/* Hover Arrow */}
        <div className="absolute top-6 right-6 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default EventsGrid;
