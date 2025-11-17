"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Timer from '@/components/Homepage/Timer';
import EventTimeline from '@/components/Events/EventTimeline';
import EventGrid from '@/components/Events/EventGrid';
import EventModal from '@/components/Events/EventModal';
import Footer from '@/components/Homepage/Footer';
import { events, type EventData } from '@/lib/eventData';

gsap.registerPlugin(ScrollTrigger);

export default function EventsPage() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter(event => event.category === activeFilter);

  const totalEvents = events.length;

  return (
    <div className="font-[family-name:var(--font-instrument-sans)] bg-black text-white">
      {/* Hero Section - Modern Minimal */}
      <section
        ref={heroRef}
        className="relative min-h-screen -mt-16 flex items-center justify-center overflow-hidden"
      >
        {/* Subtle Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        </div>

        {/* Content */}
        <div className={`relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-32 text-center transition-all duration-1000 ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-zinc-400">December 5-7, 2025</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="block text-white">Events &</span>
            <span className="block bg-gradient-to-r from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
              Programs
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-zinc-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Three days of workshops, talks, and competitions shaping the future of engineering
          </p>

          {/* Timer - Minimal Style */}
          <div className="mb-12">
            <Timer />
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20"
            >
              <span className="relative z-10">View Schedule</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <Link
              href="https://silver-jubilee.eng.ruh.ac.lk/events"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/20 rounded-full font-semibold text-base hover:bg-white/5 transition-all duration-300"
            >
              Register Now
            </Link>
          </div>

          {/* Quick Stats - Minimal */}
          <div className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'Events', value: totalEvents },
              { label: 'Days', value: '3' },
              { label: 'Speakers', value: '15+' },
              { label: 'Attendees', value: '500+' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-zinc-600 uppercase tracking-wider">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-zinc-600 to-transparent" />
        </div>
      </section>

      {/* Filter Section - Minimal Pills */}
      <section className="sticky top-16 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-6">
          <div className="flex items-center justify-between gap-4 overflow-x-auto">
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'competition', label: 'Competitions' },
                { id: 'webinar', label: 'Webinars' },
                { id: 'workshop', label: 'Workshops' },
                { id: 'panel', label: 'Panels' },
                { id: 'interactive', label: 'Interactive' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeFilter === filter.id
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="text-sm text-zinc-500">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
            </div>
          </div>
        </div>
      </section>

      {/* Day Timeline Section */}
      <section id="schedule" className="relative py-24 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Schedule</h2>
            <p className="text-lg text-zinc-500 max-w-2xl">
              Browse through our comprehensive three-day program
            </p>
          </div>

          <EventTimeline
            activeDay={activeDay}
            onDayChange={setActiveDay}
            onEventClick={setSelectedEvent}
          />
        </div>
      </section>

      {/* Events Grid */}
      <section className="relative py-24 px-6 sm:px-12 lg:px-20 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">All Events</h2>
            <p className="text-lg text-zinc-500 max-w-2xl">
              Explore our complete event catalog
            </p>
          </div>

          <EventGrid
            events={filteredEvents}
            onEventClick={setSelectedEvent}
          />
        </div>
      </section>

      {/* Registration CTA - Minimal */}
      <section className="relative py-32 px-6 sm:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-12 sm:p-16 overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/5 blur-3xl rounded-full" />

            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Join?
              </h3>
              <p className="text-lg text-zinc-400 mb-8">
                Secure your spot at ReXtro 2025
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="https://silver-jubilee.eng.ruh.ac.lk/events"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-all duration-300"
                >
                  Register for Events
                </Link>
                <Link
                  href="https://tickets.rextro.lk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 border border-white/20 rounded-full font-semibold hover:bg-white/5 transition-all duration-300"
                >
                  Buy Tickets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
