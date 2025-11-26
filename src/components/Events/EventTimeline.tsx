"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MapPin, User, Users, Calendar } from 'lucide-react';
import { getAvailableEventsByDay, getCategoryLabel, type EventData } from '@/lib/eventData';

interface EventTimelineProps {
  activeDay: 1 | 2 | 3;
  onDayChange: (day: 1 | 2 | 3) => void;
  onEventClick: (event: EventData) => void;
}

const dayLabels = {
  1: { date: 'Dec 05', day: 'Day 1', theme: 'Opening Day' },
  2: { date: 'Dec 06', day: 'Day 2', theme: 'Innovation Day' },
  3: { date: 'Dec 07', day: 'Day 3', theme: 'Finals Day' },
};

const EventTimeline: React.FC<EventTimelineProps> = ({ activeDay, onDayChange, onEventClick }) => {
  const eventsRef = useRef<HTMLDivElement>(null);

  const dayEvents = getAvailableEventsByDay(activeDay);

  useEffect(() => {
    if (eventsRef.current) {
      const eventItems = eventsRef.current.querySelectorAll('.timeline-event-item');

      gsap.fromTo(
        eventItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out',
        }
      );
    }
  }, [activeDay]);

  const handleDayChange = (day: 1 | 2 | 3) => {
    if (day !== activeDay) {
      if (eventsRef.current) {
        gsap.to(eventsRef.current.querySelectorAll('.timeline-event-item'), {
          opacity: 0,
          y: -10,
          duration: 0.2,
          onComplete: () => onDayChange(day),
        });
      } else {
        onDayChange(day);
      }
    }
  };

  return (
    <div className="space-y-12">
      {/* Day Tabs - Minimal Underline Style */}
      <div className="flex gap-8 border-b border-black/10">
        {([1, 2, 3] as const).map((day) => {
          const isActive = activeDay === day;
          const label = dayLabels[day];

          return (
            <button
              key={day}
              onClick={() => handleDayChange(day)}
              className={`relative pb-4 transition-all duration-300 ${
                isActive ? 'text-black' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="text-left">
                <div className="text-sm font-medium mb-1">{label.day}</div>
                <div className="text-2xl font-bold mb-1">{label.date}</div>
                <div className="text-xs text-gray-500">{label.theme}</div>
              </div>

              {/* Active Indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
          );
        })}
      </div>

      {/* Events List - Clean Cards */}
      <div ref={eventsRef} className="space-y-3">
        {dayEvents.map((event) => (
          <button
            key={event.id}
            onClick={() => onEventClick(event)}
            className="timeline-event-item group w-full text-left p-6 rounded-2xl border border-black/10 bg-gray-50 hover:bg-gray-100 hover:border-black/20 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Left: Event Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {/* Time */}
                  <span className="text-sm text-gray-600 font-mono">
                    {event.startTime} - {event.endTime}
                  </span>

                  {/* Category */}
                  <span className="px-2 py-0.5 rounded-full text-xs border border-black/10 text-gray-600 bg-white">
                    {getCategoryLabel(event.category)}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2 text-black group-hover:text-gray-800 transition-colors">
                  {event.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.venue}</span>
                  {event.speaker && (
                    <span className="flex items-center gap-1"><User className="w-4 h-4" /> {event.speaker.name}</span>
                  )}
                  {event.capacity && (
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {event.capacity}</span>
                  )}
                </div>
              </div>

              {/* Right: Arrow */}
              <div className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {dayEvents.length === 0 && (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            <Calendar className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-500">No events scheduled for this day</p>
        </div>
      )}
    </div>
  );
};

export default EventTimeline;
