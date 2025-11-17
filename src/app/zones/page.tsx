"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MeteorAnimation, { HERO_METEORS, HERO_METEORS_ALT } from '@/components/Homepage/MeteorAnimation';
import ZoneShowcase from '@/components/Zones/ZoneShowcase';
import ZoneModal from '@/components/Zones/ZoneModal';
import Footer from '@/components/Homepage/Footer';

gsap.registerPlugin(ScrollTrigger);

export interface ZoneData {
  id: string;
  name: string;
  category: 'technology' | 'innovation' | 'sustainability' | 'competition';
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  projects: number;
  color: string;
  gradient: string;
}

const zones: ZoneData[] = [
  {
    id: 'ai-cv',
    name: 'AI & Computer Vision',
    category: 'technology',
    tagline: 'Intelligence Meets Vision',
    description: 'Explore groundbreaking artificial intelligence and computer vision projects that push the boundaries of machine learning, neural networks, and visual computing.',
    image: '/AI and Computer Vision.png',
    highlights: ['Machine Learning Models', 'Object Detection Systems', 'Facial Recognition', 'Deep Learning Applications'],
    projects: 24,
    color: '#5CE3FF',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'robotics',
    name: 'Robotics',
    category: 'technology',
    tagline: 'Engineering the Future of Automation',
    description: 'Discover autonomous systems, robotic manipulators, and intelligent machines designed to revolutionize industries and everyday life.',
    image: '/Robotics.png',
    highlights: ['Autonomous Robots', 'Drone Systems', 'Industrial Automation', 'Bio-inspired Robotics'],
    projects: 18,
    color: '#6C47FF',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'ar-vr',
    name: 'AR & VR',
    category: 'technology',
    tagline: 'Immersive Reality Experiences',
    description: 'Step into virtual worlds and augmented realities that blend digital innovation with physical experiences through cutting-edge XR technologies.',
    image: '/AR and VR.png',
    highlights: ['Virtual Reality Apps', 'Augmented Reality Tools', 'Mixed Reality Solutions', '360� Experiences'],
    projects: 15,
    color: '#FF6B35',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'renewable-energy',
    name: 'Renewable Energy',
    category: 'sustainability',
    tagline: 'Powering a Sustainable Tomorrow',
    description: 'Witness innovative solutions in solar, wind, and alternative energy systems designed to combat climate change and ensure energy security.',
    image: '/Renewable Energy.png',
    highlights: ['Solar Power Systems', 'Wind Energy Solutions', 'Energy Storage', 'Smart Grid Technology'],
    projects: 20,
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 'iot',
    name: 'IoT & Smart Systems',
    category: 'innovation',
    tagline: 'Connected Intelligence',
    description: 'Experience the Internet of Things ecosystem with smart devices, sensor networks, and connected systems that make life more efficient.',
    image: '/AI and Computer Vision.png',
    highlights: ['Smart Home Systems', 'Industrial IoT', 'Sensor Networks', 'Edge Computing'],
    projects: 22,
    color: '#F59E0B',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    category: 'technology',
    tagline: 'Defending the Digital Frontier',
    description: 'Explore advanced security systems, encryption technologies, and ethical hacking solutions protecting our digital world.',
    image: '/Robotics.png',
    highlights: ['Network Security', 'Encryption Systems', 'Penetration Testing', 'Secure Communications'],
    projects: 16,
    color: '#EF4444',
    gradient: 'from-red-500 to-rose-600'
  },
  {
    id: 'biomedical',
    name: 'Biomedical Engineering',
    category: 'innovation',
    tagline: 'Innovation for Healthcare',
    description: 'Discover medical devices, diagnostic tools, and healthcare technologies transforming patient care and medical research.',
    image: '/AR and VR.png',
    highlights: ['Medical Devices', 'Diagnostic Tools', 'Prosthetics', 'Health Monitoring'],
    projects: 19,
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    id: 'competitions',
    name: 'Competition Zones',
    category: 'competition',
    tagline: 'Where Brilliance Competes',
    description: 'Join us in MathQuest, Pitch Arena, and other competitive events where innovation meets challenge.',
    image: '/Renewable Energy.png',
    highlights: ['MathQuest Arena', 'Pitch Competitions', 'Hackathons', 'Design Challenges'],
    projects: 12,
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600'
  },
];

export default function ZonesPage() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedZone, setSelectedZone] = useState<ZoneData | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Animate stats on scroll
    if (statsRef.current) {
      const statsElements = statsRef.current.querySelectorAll('.stat-item');

      gsap.fromTo(
        statsElements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  const filteredZones = activeFilter === 'all'
    ? zones
    : zones.filter(zone => zone.category === activeFilter);

  const totalProjects = zones.reduce((acc, zone) => acc + zone.projects, 0);

  return (
    <div className="font-[family-name:var(--font-instrument-sans)] bg-[#0A0A0C]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden min-h-screen -mt-16 flex items-center justify-center"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          {/* Circuit Pattern */}
          <div className="absolute -top-8 right-1/2 sm:top-5 aspect-[969/887] w-[969px] opacity-20">
            <picture>
              <source srcSet="/circuit-lines@2xl.webp" type="image/webp" />
              <img
                alt=""
                width={1938}
                height={1774}
                className="absolute inset-0 h-full w-full"
                src="/circuit-lines@2xl.webp"
              />
            </picture>
            <div className="absolute inset-0">
              <MeteorAnimation
                meteors={HERO_METEORS}
                stops="dark"
                speed={0.3}
                style={{
                  left: 'calc(504 / 16 * 1rem)',
                  top: 'calc(25 / 16 * 1rem)',
                  width: 'calc(403 / 16 * 1rem)',
                  height: 'calc(363 / 16 * 1rem)',
                }}
              />
            </div>
          </div>

          <div className="absolute -top-8 right-1/2 origin-right -scale-x-100 sm:top-5 aspect-[969/887] w-[969px] opacity-20">
            <picture>
              <source srcSet="/circuit-lines@2xl.webp" type="image/webp" />
              <img
                alt=""
                width={1938}
                height={1774}
                className="absolute inset-0 h-full w-full"
                src="/circuit-lines@2xl.webp"
              />
            </picture>
            <div className="absolute inset-0">
              <MeteorAnimation
                meteors={HERO_METEORS_ALT}
                stops="dark"
                speed={0.3}
                style={{
                  left: 'calc(504 / 16 * 1rem)',
                  top: 'calc(25 / 16 * 1rem)',
                  width: 'calc(403 / 16 * 1rem)',
                  height: 'calc(363 / 16 * 1rem)',
                }}
              />
            </div>
          </div>

          {/* Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0C_100%)]" />
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-20 text-center transition-all duration-1000 ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-semibold uppercase tracking-wider">
              Engineering Village
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Explore Innovation
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Zones
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Journey through specialized zones showcasing cutting-edge projects, groundbreaking research, and revolutionary engineering solutions
          </p>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm text-zinc-500 uppercase tracking-wider">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-zinc-600 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-cyan-500 rounded-full animate-bounce" />
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0C] to-transparent" />
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="relative w-full px-4 sm:px-8 lg:px-20 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'Innovation Zones', value: zones.length, icon: '<�' },
              { label: 'Active Projects', value: totalProjects, icon: '=�' },
              { label: 'Student Researchers', value: '500+', icon: '=e' },
              { label: 'Industry Partners', value: '25+', icon: '>' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="stat-item group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-400 font-medium">
                    {stat.label}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { id: 'all', label: 'All Zones', icon: '=�' },
              { id: 'technology', label: 'Technology', icon: '=�' },
              { id: 'innovation', label: 'Innovation', icon: '=�' },
              { id: 'sustainability', label: 'Sustainability', icon: '<1' },
              { id: 'competition', label: 'Competitions', icon: '<�' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`group px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <span className={`text-lg transition-transform duration-300 ${
                  activeFilter === filter.id ? 'scale-110' : 'group-hover:scale-110'
                }`}>
                  {filter.icon}
                </span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Zones Showcase */}
      <section className="relative w-full px-4 sm:px-8 lg:px-20 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <ZoneShowcase
            zones={filteredZones}
            onZoneClick={setSelectedZone}
          />
        </div>
      </section>

      {/* Zone Modal */}
      {selectedZone && (
        <ZoneModal
          zone={selectedZone}
          onClose={() => setSelectedZone(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
