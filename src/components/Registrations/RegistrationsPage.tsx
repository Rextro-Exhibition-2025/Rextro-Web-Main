"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import RegistrationsHero from './RegistrationsHero';
import EventsGrid from '@/components/events/EventsGrid';
import EventModal from '@/components/events/EventsModal';
import Footer from '@/components/Homepage/Footer';
import AnimatedBackground from '@/components/common/AnimatedBackground';
import type { EventData } from "@/lib/eventData";

gsap.registerPlugin(ScrollTrigger);

interface RegistrationsPageProps {
  initialEvents: EventData[];
}

const RegistrationsPage = ({ initialEvents }: RegistrationsPageProps) => {
  const glowRef = useRef<HTMLDivElement>(null);
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const zones = useMemo(() => {
    const set = new Set<string>();
    initialEvents.forEach((e) => {
      if (e.zoneName) set.add(e.zoneName);
    });
    return Array.from(set).sort();
  }, [initialEvents]);

  const filtered = useMemo(() => {
    if (selectedZone === "all") return initialEvents;
    return initialEvents.filter((e) => e.zoneName === selectedZone);
  }, [initialEvents, selectedZone]);

  return (
    <div className="font-[family-name:var(--font-instrument-sans)] bg-white min-h-screen flex flex-col relative antialiased">
      {/* Global Glow Effect */}
      <div
        ref={glowRef}
        className="fixed inset-0 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] mix-blend-multiply opacity-30"
        style={{ zIndex: 1 }}
      />

      {/* Hero Section */}
      <RegistrationsHero />

      {/* Zone Sessions Grid - Light Theme */}
      <section id="registrations-list" className="relative pt-24 px-6 sm:px-12 lg:px-20 bg-black overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              Available Zone Sessions
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mb-8">
              Register for interactive workshops and sessions across different engineering zones
            </p>

            {/* Zone Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedZone("all")}
                className={`group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity rounded-full text-sm h-[2rem] px-4 whitespace-nowrap ${
                  selectedZone === "all"
                    ? 'shadow-sm ring-1 text-black bg-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-transparent'
                }`}
              >
                <span className="relative z-10">All Zones</span>
              </button>
              {zones.map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity rounded-full text-sm h-[2rem] px-4 whitespace-nowrap ${
                    selectedZone === zone
                      ? 'shadow-sm ring-1 text-black bg-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-transparent'
                  }`}
                >
                  <span className="relative z-10">{zone}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 text-sm text-zinc-400">
              Showing {filtered.length} {filtered.length === 1 ? 'session' : 'sessions'}
            </div>
          </div>

          <EventsGrid
            events={filtered}
            onEventClick={setSelectedEvent}
            theme="dark"
          />
        </div>

        {/* Bottom Separator to Light CTA */}
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
      
      {/* More Events CTA - Light Theme */}
      <section className="relative py-24 px-6 sm:px-12 lg:px-20 overflow-hidden bg-white">
        {/* Glow Effect */}
        <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="relative rounded-lg border border-black/10 bg-gradient-to-br from-gray-50 to-transparent p-12 sm:p-16 overflow-hidden backdrop-blur-md shadow-sm">
            {/* Inner Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/5 blur-3xl rounded-full" />

            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
                Explore More Events
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                View our complete schedule of competitions, workshops, and talks
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/events"
                  className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] rounded-md shadow-sm text-sm h-[2.5rem] px-6 ring-1 bg-black text-white ring-black hover:bg-gray-800"
                >
                  <span className="relative z-10">View All Events</span>
                </Link>
                <Link
                  href="https://tickets.rextro.lk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] rounded-md shadow-sm text-sm h-[2.5rem] px-6 ring-1 bg-white text-gray-900 ring-gray-200 hover:bg-gray-50"
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RegistrationsPage;
