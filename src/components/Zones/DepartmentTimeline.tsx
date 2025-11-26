"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { departments } from '@/lib/zonesData';

gsap.registerPlugin(ScrollTrigger);

const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
      onEnded={() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

const DepartmentTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Animations
      gsap.to(glow1Ref.current, {
        x: '30vw',
        y: '20vh',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to(glow2Ref.current, {
        x: '-30vw',
        y: '-20vh',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Star animation
      const stars = starsRef.current?.children;
      if (stars) {
        Array.from(stars).forEach((star, i) => {
           gsap.to(star, {
             opacity: 0.8,
             scale: 1.5,
             y: -30, // Float up
             x: (i % 2 === 0 ? 15 : -15), // Slight horizontal drift
             duration: 4 + (i % 4), // Slow duration (4-7s)
             repeat: -1,
             yoyo: true,
             ease: "sine.inOut",
             delay: i * 0.2
           });
        });
      }

      // Animate the central line
      gsap.fromTo(lineRef.current, 
        { height: 0 },
        {
          height: '100%',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          }
        }
      );

      // Animate items
      const items = document.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        const direction = index % 2 === 0 ? -100 : 100;
        
        gsap.fromTo(item,
          { opacity: 0, x: direction },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-black overflow-hidden py-20">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Moving Glows */}
        <div ref={glow1Ref} className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]" />
        <div ref={glow2Ref} className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />

        {/* Star Particles */}
        <div ref={starsRef} className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              style={{
                left: `${(i * 17) % 100}%`,
                top: `${(i * 23) % 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div ref={timelineRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Central Line */}
        <div 
          ref={lineRef}
          className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent -translate-x-1/2 hidden sm:block"
        />

        <div className="space-y-24">
          {departments.map((dept, index) => (
            <div 
              key={dept.id}
              className={`timeline-item relative flex flex-col sm:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'sm:flex-row-reverse' : ''
              }`}
            >
              {/* Content Side */}
              <div className="w-full sm:w-1/2 flex flex-col items-start sm:items-end text-left sm:text-right px-4">
                 {index % 2 !== 0 && (
                    <div className="w-full flex flex-col items-start text-left">
                      <span className="text-sm font-mono text-cyan-400 mb-2">0{index + 1}</span>
                      <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">{dept.name}</h3>
                      <p className="text-zinc-400 mb-6 max-w-md">{dept.description}</p>
                      <Link 
                        href={`/zones/${dept.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all group"
                      >
                        <span className="text-sm font-medium text-white">Explore Zones</span>
                        <svg className="w-4 h-4 text-cyan-400 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                 )}
                 {index % 2 === 0 && (
                    <div className="w-full flex flex-col items-start sm:items-end text-left sm:text-right">
                      <span className="text-sm font-mono text-cyan-400 mb-2">0{index + 1}</span>
                      <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">{dept.name}</h3>
                      <p className="text-zinc-400 mb-6 max-w-md">{dept.description}</p>
                      <Link 
                        href={`/zones/${dept.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all group"
                      >
                        <span className="text-sm font-medium text-white">Explore Zones</span>
                        <svg className="w-4 h-4 text-cyan-400 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                 )}
              </div>

              {/* Center Point */}
              <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-black border-2 border-cyan-500 rounded-full -translate-x-1/2 z-10 hidden sm:block shadow-[0_0_10px_rgba(6,182,212,0.5)]" />

              {/* Video Side */}
              <div className="w-full sm:w-1/2 px-4 mt-8 sm:mt-0">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group-hover:border-cyan-500/30 transition-all duration-500">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <VideoPlayer src={dept.videoSrc} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentTimeline;
