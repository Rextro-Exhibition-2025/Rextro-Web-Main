"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Timer from '@/components/Homepage/Timer';
import EventsHero from '@/components/Events/EventsHero';
import EventTimeline from '@/components/Events/EventTimeline';
import EventGrid from '@/components/Events/EventGrid';
import EventModal from '@/components/Events/EventModal';
import Footer from '@/components/Homepage/Footer';
import { getAvailableEvents, type EventData } from '@/lib/eventData';

gsap.registerPlugin(ScrollTrigger);

export default function EventsPage() {
  const glowRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  useEffect(() => {
    setIsHeroVisible(true);
  }, []);

  const availableEvents = getAvailableEvents();
  const filteredEvents = activeFilter === 'all'
    ? availableEvents
    : availableEvents.filter(event => event.category === activeFilter);

  return (
    <div className="font-[family-name:var(--font-instrument-sans)] bg-black text-white relative antialiased">
      {/* Global Glow Effect */}
      <div
        ref={glowRef}
        className="fixed inset-0 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.4,0.36,0,1)]"
        style={{ zIndex: 1 }}
      />

      {/* Hero Section - Enhanced with Glow */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ zIndex: 2 }}
      >
        {/* Radial Glow Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[1280px] h-[800px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, rgba(24, 204, 252, 0.4) 0%, rgba(24, 204, 252, 0) 100%)',
              filter: 'blur(80px)'
            }}
          />
        </div>

        {/* Subtle Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-100"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950" />
        </div>

        {/* Content */}
        <div className={`relative z-30 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-32 text-center transition-all duration-1000 ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>

          {/* Main Heading with Enhanced Gradient */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">Events &</span>
            <span className="block pb-8 text-zinc-400">
              Programs
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-tight font-light">
            Three days of workshops, talks, and competitions shaping the future of engineering
          </p>

          {/* Timer - Minimal Style */}
          <div className="mb-12">
            <Timer />
          </div>

          {/* CTA with Enhanced Hover */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-24 relative z-50">
            <button
              onClick={() => {
                document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity rounded-md shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_rgba(0,0,0,0.2)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:from-white/20 before:opacity-50 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:from-white/10 after:from-[46%] after:to-[54%] after:mix-blend-overlay text-sm h-[2.5rem] px-6 ring-1 bg-white text-gray-950 ring-white"
            >
              <span className="relative z-10">View Schedule</span>
            </button>
          </div>
          <div className="relative">
            <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
               <div className="relative -mx-2.5 flex -bottom-1 -mt-12">
                <svg viewBox="0 0 64 48" className="w-16 flex-none fill-white" aria-hidden="true">
              <path d="M51.657 2.343 12.343 41.657A8 8 0 0 1 6.686 44H0v4h64V0h-6.686a8 8 0 0 0-5.657 2.343Z"></path>
              </svg><div className="-mx-px flex-auto bg-white"></div>
              <svg viewBox="0 0 64 48" className="w-16 flex-none fill-white" aria-hidden="true">
                <path d="m12.343 2.343 39.314 39.314A8 8 0 0 0 57.314 44H64v4H0V0h6.686a8 8 0 0 1 5.657 2.343Z"></path>
                </svg>
              </div>
        </div>
        </div>
        </div>
      </section>
      

      {/* Day Timeline Section - Enhanced */}
      <section id="schedule" className="relative pt-24 px-6 sm:px-12 bg-white lg:px-20 overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(24, 204, 252, 0.4) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-black">
              Schedule
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl">
              Browse through our comprehensive three-day program
            </p>
          </div>

          <EventTimeline
            activeDay={activeDay}
            onDayChange={setActiveDay}
            onEventClick={setSelectedEvent}
          />
        </div>
        
        {/* Bottom Decorative Separator */}
        <div className="relative mt-24 transform scale-y-[-1] -mb-1">
          <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
            <div className="relative -mx-2.5 flex">
              <svg viewBox="0 0 64 48" className="w-16 flex-none fill-black" aria-hidden="true">
                <path d="M51.657 45.657 12.343 6.343A8 8 0 0 0 6.686 4H0V0h64v48h-6.686a8 8 0 0 1-5.657-2.343Z"></path>
              </svg>
              <div className="-mx-px flex-auto bg-black"></div>
              <svg viewBox="0 0 64 48" className="w-16 flex-none fill-black" aria-hidden="true">
                <path d="M12.343 45.657 51.657 6.343A8 8 0 0 1 57.314 4H64V0H0v48h6.686a8 8 0 0 0 5.657-2.343Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>



      {/* Events Grid - Enhanced */}
      <section className="relative py-24 px-6 sm:px-12 lg:px-20 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              All Events
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mb-8">
              Explore our complete event catalog
            </p>

            {/* Integrated Filter */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All', gradient: 'from-cyan-400 to-blue-500' },
                { id: 'zone-session', label: 'Zone Sessions', gradient: 'from-purple-400 to-pink-500' },
                { id: 'competition', label: 'Competitions', gradient: 'from-purple-400 to-pink-500' },
                //{ id: 'workshop', label: 'Workshops', gradient: 'from-green-400 to-emerald-500' },
                { id: 'interactive', label: 'Interactive', gradient: 'from-pink-400 to-rose-500' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity rounded-full text-sm h-[2rem] px-4 whitespace-nowrap ${
                    activeFilter === filter.id
                      ? `shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_rgba(0,0,0,0.2)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-b before:from-white/20 before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-full after:bg-white  after:from-[46%] after:to-[54%] after:mix-blend-overlay ring-1 text-gray-950`
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
                  }`}
                  style={activeFilter === filter.id ? {
                    background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                    '--tw-gradient-from': filter.gradient.includes('cyan') ? '#22d3ee' : 
                                         filter.gradient.includes('purple') ? '#c084fc' :
                                         filter.gradient.includes('orange') ? '#fb923c' :
                                         filter.gradient.includes('green') ? '#34d399' :
                                         filter.gradient.includes('yellow') ? '#facc15' : '#f472b6',
                    '--tw-gradient-to': filter.gradient.includes('cyan') ? '#3b82f6' :
                                       filter.gradient.includes('purple') ? '#ec4899' :
                                       filter.gradient.includes('orange') ? '#ef4444' :
                                       filter.gradient.includes('green') ? '#10b981' :
                                       filter.gradient.includes('yellow') ? '#f97316' : '#e11d48'
                  } as any : {}}
                >
                  <span className="relative z-10">{filter.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 text-sm text-zinc-500">
              Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
            </div>
          </div>

          <EventGrid
            events={filteredEvents}
            onEventClick={setSelectedEvent}
          />
        </div>
      </section>
      

      {/* Registration CTA - Enhanced with Glow */}
      <section className="relative py-32 px-6 sm:px-12 lg:px-20 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(24, 204, 252, 0.6) 0%, transparent 70%)',
              filter: 'blur(120px)'
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="relative rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-12 sm:p-16 overflow-hidden backdrop-blur-md shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_rgba(0,0,0,0.2)] ring-1 ring-white/5">
            {/* Inner Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-400/10 blur-3xl rounded-full" />

            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                Ready to Join?
              </h3>
              <p className="text-lg text-zinc-300 mb-8">
                Secure your spot at ReXtro 2025
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="https://forms.gle/aEQJi6Vujufb2DAD6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity rounded-md shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_rgba(0,0,0,0.2)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:from-white/20 before:opacity-50 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:from-white/10 after:from-[46%] after:to-[54%] after:mix-blend-overlay text-sm h-[2.5rem] px-6 ring-1 bg-white text-gray-950 ring-white"
                >
                  <span className="relative z-10">Register for Workshops</span>
                </Link>
                <Link
                  href="https://tickets.rextro.lk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity rounded-md shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_rgba(0,0,0,0.2)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:from-white/20 before:opacity-50 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:from-white/10 after:from-[46%] after:to-[54%] after:mix-blend-overlay text-sm h-[2.5rem] px-6 ring-1 bg-gray-800 text-white ring-gray-800"
                >
                  <span className="relative z-10">Buy Tickets</span>
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
      {/* Decorative Separator */}
      <div className="relative">
        <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
          <div className="relative -mx-2.5 flex -bottom-1 -mt-12">
            <svg viewBox="0 0 64 48" className="w-16 flex-none fill-white" aria-hidden="true">
              <path d="M51.657 2.343 12.343 41.657A8 8 0 0 1 6.686 44H0v4h64V0h-6.686a8 8 0 0 0-5.657 2.343Z"></path>
              </svg><div className="-mx-px flex-auto bg-white"></div>
              <svg viewBox="0 0 64 48" className="w-16 flex-none fill-white" aria-hidden="true">
                <path d="m12.343 2.343 39.314 39.314A8 8 0 0 0 57.314 44H64v4H0V0h6.686a8 8 0 0 1 5.657 2.343Z"></path>
                </svg>
              </div>
        </div>
      </div>


      {/* Footer */}
      <Footer />
    </div>
  );
}
