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
    <section className="w-full p-6 sm:p-8 lg:p-12 bg-neutral-100">
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
              <div className="w-full grid grid-cols-3 gap-2">
                {/* Row 1 */}
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-gray-100 border border-neutral-200" />
                
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
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-gray-100 border border-neutral-200" />
                
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
              <div className="flex-1 p-6 bg-white rounded-2xl shadow-lg flex flex-col justify-end gap-3">
                <div className="w-full aspect-video bg-neutral-100 rounded-lg border border-neutral-200 relative overflow-hidden">
                  {/* Placeholder for competition visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-400 text-sm">Competition Visual</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h4 className="text-neutral-900 text-base font-semibold font-[var(--font-instrument)] leading-normal">
                    Engaging Competitions & Workshops
                  </h4>
                  <p className="text-gray-600 text-sm font-normal font-[var(--font-instrument)] leading-normal">
                    Feel the thrill of our island-wide robotics challenge,{' '}
                    <span className="font-bold">Xbotix</span>, test your skills in the{' '}
                    <span className="font-bold">MathQuest</span> mathematical challenge, or watch innovators pitch their startups at the{' '}
                    <span className="font-bold">Pitch Arena</span>. Participate in hands-on workshops and gain new skills.
                  </p>
                </div>
              </div>

              {/* Card 3: Inspiring Talks */}
              <div className="flex-1 p-6 bg-white rounded-2xl shadow-lg flex flex-col justify-end gap-3">
                <div className="w-full aspect-video bg-neutral-100 rounded-lg border border-neutral-200 relative overflow-hidden">
                  {/* Register button */}
                  <Link
                    href="/register"
                    className="absolute bottom-4 right-4 px-4 py-2 bg-gray-800 hover:bg-gray-900 rounded-full shadow-lg flex items-center gap-2 transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M3 8h10M8 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-white text-sm font-medium font-[var(--font-instrument)]">
                      Register here
                    </span>
                  </Link>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h4 className="text-neutral-900 text-base font-semibold font-[var(--font-instrument)] leading-normal">
                    Inspiring Talks & Lectures
                  </h4>
                  <p className="text-gray-600 text-sm font-normal font-[var(--font-instrument)] leading-normal">
                    Engage with industry leaders, pioneering engineers, and successful alumni through our Guest Lecture and Webinar Series. Hear insights on cutting-edge topics from global experts shaping the future of technology.
                  </p>
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
              <div className="flex-1 bg-neutral-50 rounded-xl border border-zinc-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatToExpect;
