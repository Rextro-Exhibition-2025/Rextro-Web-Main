"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Timer from '@/components/Homepage/Timer';
import EventTimeline from '@/components/events/EventTimeline';
import EventGrid from '@/components/events/EventsGrid';
import EventModal from '@/components/events/EventsModal';
import Footer from '@/components/Homepage/Footer';
import { events, type EventData } from '@/lib/eventData';
import EventsTitleSvg from '@/components/events/EventTitleSvg';
import MeteorAnimation, { HERO_METEORS, HERO_METEORS_ALT } from '@/components/Homepage/MeteorAnimation';
import AnimatedBackground from '@/components/common/AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

export default function EventsPage() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) * 100;
        const y = (clientY / window.innerHeight) * 100;
        glowRef.current.style.background = `radial-gradient(circle 800px at ${x}% ${y}%, rgba(24, 204, 252, 0.08), transparent 60%)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter(event => event.category === activeFilter);

  const totalEvents = events.length;

  return (
    <div className="font-[family-name:var(--font-instrument-sans)] bg-white min-h-screen flex flex-col relative antialiased">
      {/* Global Glow Effect - Adjusted for Light Theme */}
      <div
        ref={glowRef}
        className="fixed inset-0 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] mix-blend-multiply opacity-30"
        style={{ zIndex: 1 }}
      />

      {/* Hero Section - Light Theme */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50"
        style={{ zIndex: 2 }}
      >
        {/* Background Layer (Circuit + Meteors) */}
        <div className="absolute inset-0 -z-10">
          {/* Left Circuit Board */}
          <div className="absolute top-1/2 -translate-y-1/2 right-1/2 aspect-[969/887] w-[969px]">
            <picture>
              <source srcSet="/circuit-lines@2xl.webp" type="image/webp" />
              <img
                alt=""
                width={1938}
                height={1774}
                decoding="async"
                data-nimg="1"
                className="absolute inset-0 h-full w-full"
                style={{ color: 'transparent' }}
                src="/circuit-lines@2xl.webp"
              />
            </picture>
            <div className="absolute inset-0">
              <MeteorAnimation 
                meteors={HERO_METEORS} 
                stops="light" 
                speed={0.4} 
                style={{
                  left: 'calc(504 / 16 * 1rem)',
                  top: 'calc(25 / 16 * 1rem)',
                  width: 'calc(403 / 16 * 1rem)',
                  height: 'calc(363 / 16 * 1rem)',
                }}
              />
            </div>
          </div>

          {/* Right Circuit Board (Mirrored) */}
          <div className="absolute top-1/2 -translate-y-1/2 right-1/2 origin-right -scale-x-100 aspect-[969/887] w-[969px]">
            <picture>
              <source srcSet="/circuit-lines@2xl.webp" type="image/webp" />
              <img
                alt=""
                width={1938}
                height={1774}
                decoding="async"
                data-nimg="1"
                className="absolute inset-0 h-full w-full"
                style={{ color: 'transparent' }}
                src="/circuit-lines@2xl.webp"
              />
            </picture>
            <div className="absolute inset-0">
              <MeteorAnimation 
                meteors={HERO_METEORS_ALT} 
                stops="light" 
                speed={0.4} 
                style={{
                  left: 'calc(504 / 16 * 1rem)',
                  top: 'calc(25 / 16 * 1rem)',
                  width: 'calc(403 / 16 * 1rem)',
                  height: 'calc(363 / 16 * 1rem)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`relative z-30 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-32 text-center transition-all duration-1000 ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-4 rounded-md border border-black/10 bg-white/50 backdrop-blur-sm mb-8 shadow-sm">
            <div className="size-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
            <span className="text-sm text-gray-600 font-medium">December 5-7, 2025</span>
          </div>

          {/* Main Heading */}
          <div className="w-full max-w-xl mx-auto transform-style-3d transition-transform duration-500" style={{ transform: 'rotateX(5deg)' }}>
             <EventsTitleSvg />
          </div>

          <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto mb-12 leading-tight font-light">
            Three days of workshops, talks, and competitions shaping the future of engineering
          </p>

          {/* Timer */}
          <div className="mb-12">
            <Timer theme="light" />
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-24 relative z-50">
            <button
              onClick={() => {
                document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] rounded-md shadow-sm text-sm h-[2.5rem] px-6 ring-1 bg-black text-white ring-black hover:bg-gray-800"
            >
              <span className="relative z-10">View Schedule</span>
            </button>
            <Link
              href="https://silver-jubilee.eng.ruh.ac.lk/events"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] rounded-md shadow-sm text-sm h-[2.5rem] px-6 ring-1 bg-white text-gray-900 ring-gray-200 hover:bg-gray-50"
            >
              <span className="relative z-10">Register Now</span>
            </Link>
          </div>

          {/* Separator to Dark Section */}
          <div className="relative">
            <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
               <div className="relative -mx-2.5 flex -bottom-1 -mt-12">
                <svg viewBox="0 0 64 48" className="w-16 flex-none fill-black" aria-hidden="true">
                  <path d="M51.657 2.343 12.343 41.657A8 8 0 0 1 6.686 44H0v4h64V0h-6.686a8 8 0 0 0-5.657 2.343Z"></path>
                </svg>
                <div className="-mx-px flex-auto bg-black"></div>
                <svg viewBox="0 0 64 48" className="w-16 flex-none fill-black" aria-hidden="true">
                  <path d="m12.343 2.343 39.314 39.314A8 8 0 0 0 57.314 44H64v4H0V0h6.686a8 8 0 0 1 5.657 2.343Z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Day Timeline Section - Dark Theme */}
      <section id="schedule" className="relative pt-24 px-6 sm:px-12 bg-black lg:px-20 overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
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
        
        {/* Bottom Decorative Separator to Light Section */}
        <div className="relative mt-24 transform scale-y-[-1] -mb-1">
          <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
            <div className="relative -mx-2.5 flex">
              <svg viewBox="0 0 64 48" className="w-16 flex-none fill-white" aria-hidden="true">
                <path d="M51.657 45.657 12.343 6.343A8 8 0 0 0 6.686 4H0V0h64v48h-6.686a8 8 0 0 1-5.657-2.343Z"></path>
              </svg>
              <div className="-mx-px flex-auto bg-white"></div>
              <svg viewBox="0 0 64 48" className="w-16 flex-none fill-white" aria-hidden="true">
                <path d="M12.343 45.657 51.657 6.343A8 8 0 0 1 57.314 4H64V0H0v48h6.686a8 8 0 0 0 5.657-2.343Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid - Light Theme */}
      <section className="relative py-24 px-6 sm:px-12 lg:px-20 bg-white overflow-hidden">

        
        {/* Glow Effect */}
        <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
              All Events
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mb-8">
              Explore our complete event catalog
            </p>

            {/* Integrated Filter */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All', gradient: 'from-cyan-400 to-blue-500' },
                { id: 'competition', label: 'Competitions', gradient: 'from-purple-400 to-pink-500' },
                { id: 'webinar', label: 'Webinars', gradient: 'from-orange-400 to-red-500' },
                { id: 'workshop', label: 'Workshops', gradient: 'from-green-400 to-emerald-500' },
                { id: 'panel', label: 'Panels', gradient: 'from-yellow-400 to-orange-500' },
                { id: 'interactive', label: 'Interactive', gradient: 'from-pink-400 to-rose-500' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity rounded-full text-sm h-[2rem] px-4 whitespace-nowrap ${
                    activeFilter === filter.id
                      ? `shadow-sm ring-1 text-white`
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 border border-transparent'
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
            <div className="mt-4 text-sm text-gray-500">
              Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
            </div>
          </div>

          <EventGrid
            events={filteredEvents}
            onEventClick={setSelectedEvent}
          />
        </div>
        
        {/* Bottom Separator to Dark CTA */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
                <div className="relative -mx-2.5 flex -bottom-1">
                    <svg viewBox="0 0 64 48" className="w-16 flex-none fill-black" aria-hidden="true">
                        <path d="M51.657 2.343 12.343 41.657A8 8 0 0 1 6.686 44H0v4h64V0h-6.686a8 8 0 0 0-5.657 2.343Z"></path>
                    </svg>
                    <div className="-mx-px flex-auto bg-black"></div>
                    <svg viewBox="0 0 64 48" className="w-16 flex-none fill-black" aria-hidden="true">
                        <path d="m12.343 2.343 39.314 39.314A8 8 0 0 0 57.314 44H64v4H0V0h6.686a8 8 0 0 1 5.657 2.343Z"></path>
                    </svg>
                </div>
            </div>
        </div>
      </section>
      
      {/* Registration CTA - Dark Theme */}
      <section className="relative py-32 px-6 sm:px-12 lg:px-20 overflow-hidden bg-black">
        {/* Animated Background */}
        <AnimatedBackground />

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
                  href="https://silver-jubilee.eng.ruh.ac.lk/events"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity rounded-md shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_rgba(0,0,0,0.2)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:from-white/20 before:opacity-50 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:from-white/10 after:from-[46%] after:to-[54%] after:mix-blend-overlay text-sm h-[2.5rem] px-6 ring-1 bg-white text-gray-950 ring-white"
                >
                  <span className="relative z-10">Register for Events</span>
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
      {/* Decorative Separator to Footer (White) */}
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
