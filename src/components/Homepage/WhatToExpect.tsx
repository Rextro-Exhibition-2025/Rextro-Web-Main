'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const WhatToExpect = () => {
  const [highlightProgress, setHighlightProgress] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);
  
  // Interactive zones state
  const [activeZone, setActiveZone] = useState(0);
  const zones = [
    { name: 'Robotics', image: '/Robotics.png' },
    { name: 'AI and Computer Vision', image: '/AI and Computer Vision.png' },
    { name: 'AR and VR', image: '/AR and VR.png' },
    { name: 'Renewable Energy', image: '/Renewable Energy.png' }
  ];
  
  // Auto-cycle through zones
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveZone((prev) => (prev + 1) % zones.length);
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && highlightProgress === 0) {
          // Animate highlight progress
          let progress = 0;
          const highlightInterval = setInterval(() => {
            progress += 1;
            setHighlightProgress(progress);
            if (progress >= 100) {
              clearInterval(highlightInterval);
            }
          }, 15);
        }
      },
      { threshold: 0.3 }
    );

    if (quoteRef.current) {
      observer.observe(quoteRef.current);
    }

    return () => {
      if (quoteRef.current) {
        observer.unobserve(quoteRef.current);
      }
    };
  }, [highlightProgress]);

  return (
    <section className="w-full p-6 sm:p-8 lg:p-12 bg-[#F7F7F8]">
      <div className="w-full p-4 sm:p-6 lg:p-12 rounded-xl border border-black/10 flex flex-col gap-10 lg:gap-16">
        {/* Header Section */}
        <div className="w-full flex flex-col gap-8 lg:gap-10">
          {/* Title */}
          <div className="w-full flex flex-col gap-2">
            <p className="text-black text-sm sm:text-base font-normal font-[var(--font-instrument)] uppercase">
              We invite you to step into the
            </p>
            <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold font-[var(--font-instrument)] uppercase">
              Engineering <span className="text-blue-900">Village</span>
            </h2>
          </div>

          {/* Description & Quote */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8">
            {/* Left Description */}
            <div className="flex-1 max-w-full lg:max-w-[570px]">
              <p className="text-gray-600 text-sm sm:text-base font-normal font-[var(--font-instrument)] leading-normal">
                Our campus will transform into an "Engineering Village", a dynamic space designed to bridge the gap between academia, industry, and society. We are dedicated to advancing academic excellence, fostering innovation, and strengthening industry collaboration. This event is a platform for our brightest minds—graduating students, undergraduates, and faculty clubs—to present groundbreaking research, cutting-edge ideas, and impactful engineering solutions.
              </p>
            </div>

            {/* Right Quote */}
            <div ref={quoteRef} className="flex-1 max-w-full lg:max-w-[624px] lg:pl-8 relative lg:border-l border-black/20">
              <div className="relative">
                <p className="text-gray-600 text-lg sm:text-xl lg:text-2xl font-normal font-[var(--font-instrument)] leading-normal relative z-10">
                  "Whether you are a student, an industry professional, or simply{' '}
                  <span className="text-black relative inline-block">
                    <span className="relative z-10">curious about the future of technology,</span>
                    <span
                      className="absolute left-0 bottom-1 h-[28px] transition-all duration-1500 ease-out"
                      style={{
                        width: `${highlightProgress}%`,
                        backgroundColor: '#FFF700',
                        zIndex: -1
                      }}
                    />
                  </span>{' '}
                  ReXtro offers a unique opportunity for learning, networking, and inspiration."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What to Expect Cards */}
        <div className="w-full flex flex-col gap-8 lg:gap-10">
          <h3 className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold font-[var(--font-instrument)] uppercase">
            What to Expect at <span className="text-blue-900">ReXtro 2025</span>
          </h3>

          {/* Cards Grid */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-2">
            {/* Card 1: 25+ Interactive Zones */}
            <div className="p-6 bg-white rounded-2xl shadow-lg flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <h4 className="text-neutral-900 text-base font-semibold font-[var(--font-instrument)] leading-normal">
                  25+ Interactive Zones
                </h4>
                <p className="text-gray-600 text-sm font-normal font-[var(--font-instrument)] leading-normal">
                  Explore more than 25 distinct zones, each showcasing a unique facet of engineering and technology. Immerse yourself in the world of{' '}
                  <span className="font-bold">AR/VR</span>, see the latest in{' '}
                  <span className="font-bold">drone technology</span>, or explore advancements in{' '}
                  <span className="font-bold">marine engineering</span>.
                </p>
              </div>

              {/* Interactive Image Grid - 3x3 Layout with 4:5 ratio cells */}
              <div className="w-full sm:p-4 lg:p-12 grid grid-cols-3 gap-2">
                {/* Row 1 */}
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-gray-300 border border-neutral-200" />
                
                {/* Row 1, Col 2 - AI and Computer Vision */}
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 transition-all duration-700 ease-in-out">
                  <Image
                    src="/AI and Computer Vision.png"
                    alt="AI and Computer Vision"
                    fill
                    className={`object-cover transition-all duration-700 ${
                      activeZone === 1 ? 'mix-blend-normal' : 'mix-blend-luminosity'
                    }`}
                    sizes="(max-width: 768px) 33vw, 11vw"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-purple-500/20 via-yellow-200/15 to-cyan-400/10 transition-opacity duration-700 ${
                      activeZone === 1 ? 'opacity-0' : 'opacity-70'
                    }`}
                  />
                  <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5" />
                </div>
                
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-gray-100 border border-neutral-200" />

                {/* Row 2, Col 1 - Robotics */}
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 transition-all duration-700 ease-in-out">
                  <Image
                    src="/Robotics.png"
                    alt="Robotics"
                    fill
                    className={`object-cover transition-all duration-700 ${
                      activeZone === 0 ? 'mix-blend-normal' : 'mix-blend-luminosity'
                    }`}
                    sizes="(max-width: 768px) 33vw, 11vw"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-purple-500/20 via-yellow-200/15 to-cyan-400/10 transition-opacity duration-700 ${
                      activeZone === 0 ? 'opacity-0' : 'opacity-70'
                    }`}
                  />
                  <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5" />
                </div>
                
                {/* Row 2 */}
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-gray-200 border border-neutral-200" />
                
                {/* Row 2, Col 3 - AR and VR */}
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 transition-all duration-700 ease-in-out">
                  <Image
                    src="/AR and VR.png"
                    alt="AR and VR"
                    fill
                    className={`object-cover transition-all duration-700 ${
                      activeZone === 2 ? 'mix-blend-normal' : 'mix-blend-luminosity'
                    }`}
                    sizes="(max-width: 768px) 33vw, 11vw"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-purple-500/20 via-yellow-200/15 to-cyan-400/10 transition-opacity duration-700 ${
                      activeZone === 2 ? 'opacity-0' : 'opacity-70'
                    }`}
                  />
                  <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5" />
                </div>

                {/* Row 3 */}
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-gray-100 border border-neutral-200" />
                
                {/* Row 3, Col 2 - Renewable Energy */}
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 transition-all duration-700 ease-in-out">
                  <Image
                    src="/Renewable Energy.png"
                    alt="Renewable Energy"
                    fill
                    className={`object-cover transition-all duration-700 ${
                      activeZone === 3 ? 'mix-blend-normal' : 'mix-blend-luminosity'
                    }`}
                    sizes="(max-width: 768px) 33vw, 11vw"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-purple-500/20 via-yellow-200/15 to-cyan-400/10 transition-opacity duration-700 ${
                      activeZone === 3 ? 'opacity-0' : 'opacity-70'
                    }`}
                  />
                  <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5" />
                </div>
                
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-gray-100 border border-neutral-200" />
              </div>

              {/* Interactive Tags - Single Line */}
              <div className="flex justify-start items-center gap-2 overflow-x-auto">
                {zones.map((zone, index) => (
                  <button
                    key={zone.name}
                    onClick={() => setActiveZone(index)}
                    className={`px-3 py-2 rounded-full border border-neutral-300 text-xs sm:text-sm font-medium font-[var(--font-instrument)] whitespace-nowrap transition-all duration-300 ${
                      index === activeZone
                        ? 'bg-gray-200 text-black'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {zone.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Card 2 & 3 Column */}
            <div className="flex flex-col gap-4 lg:gap-2">
              {/* Card 2: Engaging Competitions */}
              <div className="group isolate flex flex-col flex-1 rounded-2xl bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] overflow-hidden">
                
                {/* Text Content - Positioned at bottom */}
                <div className="relative z-10 flex-none px-6 order-last pb-6">
                  <h3 className="text-sm font-medium text-gray-950 font-[var(--font-instrument)]">
                    Engaging Competitions & Workshops
                  </h3>
                  <p className="mt-2 text-pretty text-sm/5 text-gray-600 font-[var(--font-instrument)]">
                    Feel the thrill of our island-wide robotics challenge, <span className="font-bold">Xbotix</span>, test your skills in the <span className="font-bold">MathQuest</span> mathematical challenge, or watch innovators pitch their startups at the <span className="font-bold">Pitch Arena</span>.
                  </p>
                </div>

                {/* Visual Content - Interactive Area */}
                <div className="pointer-events-none relative flex-auto select-none" style={{ minHeight: '10.25rem' }} aria-hidden="true">
                  <div className="relative flex h-full flex-col items-center justify-center">
                    
                    {/* Concentric Circles Background */}
                    <div className="absolute -z-10 mt-[-6.75rem] blur-[1px]">
                      <div className="absolute left-1/2 top-1/2 ml-[-6.75rem] mt-[-6.75rem] size-[13.5rem] rounded-full border border-gray-400 opacity-15 transition-all duration-700 group-hover:border-blue-500 group-hover:opacity-40 group-hover:scale-110" />
                      <div className="absolute left-1/2 top-1/2 ml-[-8.75rem] mt-[-8.75rem] size-[17.5rem] rounded-full border border-gray-400 opacity-[0.125] transition-all duration-700 delay-100 group-hover:border-blue-500 group-hover:opacity-30 group-hover:scale-110" />
                      <div className="absolute left-1/2 top-1/2 ml-[-10.75rem] mt-[-10.75rem] size-[21.5rem] rounded-full border border-gray-400 opacity-10 transition-all duration-700 delay-200 group-hover:border-blue-500 group-hover:opacity-20 group-hover:scale-110" />
                      <div className="absolute left-1/2 top-1/2 ml-[-12.75rem] mt-[-12.75rem] size-[25.5rem] rounded-full border border-gray-400 opacity-[0.075] transition-all duration-700 delay-300 group-hover:border-blue-500 group-hover:opacity-15 group-hover:scale-110" />
                    </div>

                    {/* Competition Logo Badges */}
                    <div className="flex gap-4">
                      {/* Xbotix */}
                      <div className="transition duration-1000 opacity-100 group-hover:scale-110">
                        <div className="size-10 rounded-lg shadow-[0_2px_3px_rgba(0,0,0,0.04),0_24px_68px_rgba(47,48,55,0.05),0_4px_6px_rgba(34,42,53,0.04),0_1px_1px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 group-hover:ring-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] flex items-center justify-center">
                          <Image
                            src="/Xbotix.svg"
                            alt="Xbotix"
                            width={32}
                            height={32}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Pitch Arena */}
                       <div className="transition duration-1000 opacity-100 group-hover:scale-110">
                        <div className="size-10 rounded-lg shadow-[0_2px_3px_rgba(0,0,0,0.04),0_24px_68px_rgba(47,48,55,0.05),0_4px_6px_rgba(34,42,53,0.04),0_1px_1px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 group-hover:ring-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] flex items-center justify-center">
                           <Image
                            src="/Pitch arena.svg"
                            alt="Pitch Arena"
                            width={32}
                            height={32}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* MathQuest */}
                      <div className="transition duration-1000 opacity-100 group-hover:scale-110">
                        <div className="size-10 rounded-lg shadow-[0_2px_3px_rgba(0,0,0,0.04),0_24px_68px_rgba(47,48,55,0.05),0_4px_6px_rgba(34,42,53,0.04),0_1px_1px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 group-hover:ring-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] flex items-center justify-center">
                           <Image
                            src="/MathQuest.svg"
                            alt="MathQuest"
                            width={32}
                            height={32}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Connection Lines */}
                    <div className="relative aspect-[128/55] w-32">
                      <svg viewBox="0 0 128 55" fill="none" aria-hidden="true" className="absolute inset-0 size-full stroke-gray-950/10 transition-all duration-500 group-hover:stroke-blue-500/50">
                        <path d="M64 0v25M8 0v8c0 8.837 7.163 16 16 16h24c8.837 0 16 7.163 16 16v15M120 0v8c0 8.837-7.163 16-16 16H80c-5.922 0-11.093 3.218-13.86 8" />
                      </svg>
                    </div>

                    {/* Join Badge with Gradient Glow */}
                    <div className="relative mt-px flex items-center gap-1.5 rounded-lg bg-white py-1 pl-1.5 pr-2 text-2xs font-medium text-gray-950 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] ring-1 ring-gray-950/5 font-[var(--font-instrument)] transition-all duration-500 group-hover:ring-blue-500/50">
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 transition-colors duration-500 group-hover:stroke-blue-500">
                        <g stroke="#9394A1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" className="group-hover:stroke-blue-500">
                          <circle cx="8" cy="8" r="6.25" />
                          <path d="M8 5v6m3-3H5" />
                        </g>
                      </svg>
                      Competitions
                      {/* Gradient Glow Effect */}
                      <div className="absolute -bottom-1.5 left-1/2 -z-10 -ml-10 h-6 w-20 transform-gpu rounded-[50%] bg-gradient-to-r from-purple-500 from-25% to-sky-300 to-75% blur-sm opacity-0 transition-opacity duration-700 group-hover:opacity-25" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Inspiring Talks */}
              <div className="group isolate flex flex-col flex-1 rounded-2xl bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] overflow-hidden">
                {/* Text Content - Order last */}
                <div className="relative z-10 flex-none px-6 order-last pb-6">
                  <h4 className="text-sm font-medium text-gray-950 font-[var(--font-instrument)]">
                    Inspiring Talks & Lectures
                  </h4>
                  <p className="mt-2 text-pretty text-sm/5 text-gray-600 font-[var(--font-instrument)]">
                    Engage with industry leaders, pioneering engineers, and successful alumni through our Guest Lecture and Webinar Series. Hear insights on cutting-edge topics from global experts shaping the future of technology.
                  </p>
                </div>

                {/* Visual Content - Interactive Area */}
                <div className="pointer-events-none relative flex-auto select-none" style={{ minHeight: '10.25rem' }} aria-hidden="true">
                  <div className="flex h-full items-center justify-center [mask:linear-gradient(black_66%,transparent)]">
                    {/* Register Button */}
                    <Link
                      href="https://silver-jubilee.eng.ruh.ac.lk/events"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto relative flex items-center gap-1.5 rounded-full bg-gray-800 px-2 py-1 text-2xs font-medium text-white shadow-[0_2px_13px_rgba(0,0,0,0.2),0_2px_4px_rgba(47,48,55,0.3)] ring-1 ring-gray-800 font-[var(--font-instrument)] hover:bg-gray-900 transition-colors"
                    >
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
                        <g stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2">
                          <rect width="12.5" height="10.5" x="1.75" y="2.75" rx="2" />
                          <path d="M4.75 5.75 8 8.25l3.25-2.5" />
                        </g>
                      </svg>
                      Register here
                      
                      {/* Ripple effects */}
                      <div className="absolute inset-0 -z-10 rounded-full bg-gray-950/5 opacity-0 group-hover:animate-[ripple_2s_ease-out]" />
                      <div className="absolute inset-0 -z-10 rounded-full bg-gray-950/5 opacity-0 group-hover:animate-[ripple_2s_ease-out_0.5s]" />
                      <div className="absolute inset-0 -z-10 rounded-full bg-gray-950/5 opacity-0 group-hover:animate-[ripple_2s_ease-out_1s]" />
                      
                      {/* Vector.svg path */}
                      <div className="absolute left-1/2 top-1/2 -z-10 -ml-36 -mt-32 aspect-[288/256] w-72">
                        <Image
                          src="/Vector.svg"
                          alt="Connection paths"
                          fill
                          className="object-contain opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Groundbreaking Projects */}
            <div className="p-6 bg-white rounded-2xl shadow-lg flex flex-col gap-6">
              <div className="flex flex-col gap-2.5">
                <h4 className="text-neutral-900 text-base font-semibold font-[var(--font-instrument)] leading-normal">
                  Groundbreaking Projects
                </h4>
                <p className="text-gray-600 text-sm font-normal font-[var(--font-instrument)] leading-normal">
                  Discover over <span className="font-bold">100 innovative projects</span> from our final year students, undergraduates, and university clubs. From{' '}
                  <span className="font-bold">AI</span> and{' '}
                  <span className="font-bold">robotics</span> to{' '}
                  <span className="font-bold">sustainable energy</span> and{' '}
                  <span className="font-bold">biomedical engineering</span>, witness ideas that are shaping the future.
                </p>
              </div>
              <div className="flex-1 bg-neutral-50 rounded-xl border border-zinc-200 overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dCnH8OUU-UQ?si=Rc0Mz4Jb30Gi0rmO"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatToExpect;
