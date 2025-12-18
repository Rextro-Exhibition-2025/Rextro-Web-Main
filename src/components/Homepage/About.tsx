"use client";

import Timer from "@/components/Homepage/Timer";
import { useEffect, useRef, useState } from "react";
import ScrollTriggeredLottie from "@/components/common/ScrollTriggeredLottie";
import { isEventStarted as checkEventStarted, isEventEnded as checkEventEnded } from '@/lib/constants';
import Link from 'next/link';



const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);
  const [highlightProgress, setHighlightProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Animate line progress
          let progress = 0;
          const interval = setInterval(() => {
            progress += 2;
            setLineProgress(progress);
            if (progress >= 100) {
              clearInterval(interval);
            }
          }, 20);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    const contentObserver = new IntersectionObserver(
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
      { threshold: 0.2 }
    );

    if (contentRef.current) {
      contentObserver.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        contentObserver.unobserve(contentRef.current);
      }
    };
  }, [highlightProgress]);

  return (
    <section id="about" className="w-full flex flex-col">
      <div className="relative">
        <div className="absolute inset-x-0 -top-11 mt-[calc(-3/16*1rem)] flex items-end">
          <div className="mr-[calc(-1*(2rem-0.375rem))] h-11 flex-auto bg-black"></div>
          <div className="flex justify-between mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
            <svg viewBox="0 0 56 48" aria-hidden="true" className="-ml-1.5 mb-[calc(-1/16*1rem)] w-14 flex-none overflow-visible fill-black">
              <path d="M 2.686 3 H -4 V 48 H 56 V 47 H 53.314 A 8 8 0 0 1 47.657 44.657 L 8.343 5.343 A 8 8 0 0 0 2.686 3 Z"></path>
            </svg>
            <svg viewBox="0 0 56 48" aria-hidden="true" className="-mr-1.5 mb-[calc(-1/16*1rem)] w-14 flex-none overflow-visible fill-black">
              <path d="M 53.314 3 H 60 V 48 H 0 V 47 H 2.686 A 8 8 0 0 0 8.343 44.657 L 47.657 5.343 A 8 8 0 0 1 53.314 3 Z"></path>
            </svg>
          </div>
          <div className="ml-[calc(-1*(2rem-0.375rem))] h-11 flex-auto bg-black"></div>
        </div>
      </div>
      <div className="relative w-full py-8 sm:py-10 lg:py-12 lg:pb-24 flex flex-col gap-6 sm:gap-8 lg:gap-10 overflow-hidden" style={{ backgroundColor: '#131316' }}>
        
        {/* Lottie Confetti Background */}
        {checkEventStarted() && (
            <div className="absolute inset-x-0 top-0 h-full pointer-events-none z-0 overflow-visible flex items-center justify-center">
                <div className="w-full h-full max-w-none opacity-80">
                <ScrollTriggeredLottie 
                  src="/lotties/Confetti.lottie"
                  className="w-full h-full"
                />
                </div>
            </div>
        )}

        {/* Fixed Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Edge fade overlay - all sides */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at center, transparent 20%, rgba(23, 23, 23, 0.5) 60%, rgba(0, 0, 0, 0.9) 100%),
              linear-gradient(to bottom, rgba(23, 23, 23, 0.8) 0%, transparent 15%, transparent 85%, rgba(23, 23, 23, 0.8) 100%)
            `,
          }}
        />

        {/* Content Section */}
        <div ref={contentRef} className="relative w-full px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-8 lg:gap-16">
          {/* About Text */}
          <div className="flex-1 min-w-0 px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-center items-center lg:items-start gap-6 sm:gap-8">
            <h2 className={`text-white text-2xl sm:text-3xl font-semibold font-[var(--font-instrument)] leading-tight text-center lg:text-left transition-all duration-700 ${
              highlightProgress > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              About ReXtro: The Silver Jubilee Celebration
            </h2>
            <div className={`w-full max-w-[570px] text-white text-sm sm:text-base font-normal font-[var(--font-instrument)] leading-relaxed text-center lg:text-left transition-all duration-700 delay-200 ${
              highlightProgress > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              The{" "}
              <span className="font-bold">
                Faculty of Engineering, University of Ruhuna
              </span>
              , proudly presents its{" "}
              <span className="font-bold">Silver Jubilee Exhibition: ReXtro 2025</span>. Step
              into the Engineering Village, a three day showcase featuring over
              a hundred pioneering student projects, interactive zones, and
              industry collaborations. This is where innovation, inspiration, and impact converge.
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex-1 w-full lg:w-auto flex justify-center items-center relative">
            <Timer />
          </div>
        </div>

        {/* Event Details Section */}
        <div ref={sectionRef} className="relative w-full px-4 sm:px-8 lg:px-20 py-6 sm:py-8 lg:py-10 flex flex-col lg:flex-row justify-start items-center lg:items-start gap-8 lg:gap-16">
          {/* Event Date Card */}
          <div className="flex-1 min-w-0 p-4 sm:p-6 bg-neutral-800 rounded-2xl border border-white/5 flex flex-col gap-4 overflow-hidden w-full h-full">
            <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-4 sm:gap-6">
              <h3 className="text-white text-xl sm:text-2xl font-bold font-[var(--font-instrument)] uppercase tracking-tight">
                December
              </h3>
              <div className="flex-1 h-px border-t border-white/20 relative overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-1000"
                  style={{ width: `${lineProgress}%` }}
                />
              </div>
              <div className="flex justify-center sm:justify-start items-center gap-3 sm:gap-6">
                {["13", "14", "15"].map((day, index) => (
                  <div
                    key={day}
                    className={`py-2 px-3 bg-neutral-900 rounded-md shadow-lg border border-white/5 flex items-center justify-center relative overflow-hidden transition-all duration-700 ${
                      isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
                    }`}
                    style={{ 
                      transitionDelay: `${800 + index * 200}ms`,
                    }}
                  >
                    {/* Border shine effect */}
                    <div 
                      className={`absolute inset-0 rounded-md border-2 border-transparent ${
                        isVisible ? 'animate-border-shine' : ''
                      }`}
                      style={{ 
                        animationDelay: `${1500 + index * 200}ms`,
                        animationDuration: '1.5s',
                        animationIterationCount: '1',
                      }}
                    />
                    <span className="text-white text-2xl sm:text-3xl font-bold font-[var(--font-instrument)] uppercase tracking-tight relative z-10">
                      {day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center sm:justify-start items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 1.25049C8.17727 1.25256 6.42979 1.97755 5.14092 3.26641C3.85206 4.55528 3.12707 6.30276 3.125 8.12549C3.125 14.0083 9.375 18.4513 9.64141 18.6372C9.74649 18.7108 9.87169 18.7503 10 18.7503C10.1283 18.7503 10.2535 18.7108 10.3586 18.6372C10.625 18.4513 16.875 14.0083 16.875 8.12549C16.8729 6.30276 16.1479 4.55528 14.8591 3.26641C13.5702 1.97755 11.8227 1.25256 10 1.25049ZM10 5.62549C10.4945 5.62549 10.9778 5.77211 11.3889 6.04681C11.8 6.32152 12.1205 6.71196 12.3097 7.16878C12.4989 7.6256 12.5484 8.12826 12.452 8.61321C12.3555 9.09817 12.1174 9.54362 11.7678 9.89326C11.4181 10.2429 10.9727 10.481 10.4877 10.5775C10.0028 10.6739 9.50011 10.6244 9.04329 10.4352C8.58648 10.246 8.19603 9.92554 7.92133 9.51441C7.64662 9.10329 7.5 8.61994 7.5 8.12549C7.5 7.46245 7.76339 6.82656 8.23223 6.35772C8.70107 5.88888 9.33696 5.62549 10 5.62549Z" fill="white"/>
              </svg>

              <p className="text-neutral-400 text-sm sm:text-base font-semibold font-[var(--font-instrument)] text-center sm:text-left">
                Faculty of Engineering, University of Ruhuna
              </p>
            </div>

            <p className="text-zinc-400 text-sm sm:text-base font-normal font-[var(--font-instrument)] leading-normal text-center sm:text-left">
              The Three Days That Will Shape the Future.
            </p>
          </div>

          {/* Right Text */}
          <div className="flex-1 flex flex-col justify-start items-center lg:items-center w-full">
            <div className="flex flex-col items-center w-full max-w-[500px] h-full">
              {checkEventEnded() ? (
                <div className={`relative w-full h-full p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden group transition-all duration-700 delay-500 flex flex-col justify-center ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  {/* Glassmorphism Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <h3 className="relative z-10 w-full text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 text-xl sm:text-2xl lg:text-3xl font-semibold font-[var(--font-instrument)] leading-tight text-center lg:text-left drop-shadow-sm">
                    The event successfully concluded with great participation and impact.
                  </h3>
                  <p className="relative z-10 mt-4 text-white text-lg sm:text-xl font-medium font-[var(--font-instrument)] text-center lg:text-left">
                    Discover the story behind our{" "}
                    <Link 
                      href="/souvenir" 
                      className="group inline-flex items-baseline gap-1 hover:gap-2 transition-all"
                    >
                      <span 
                        className="font-bold text-transparent bg-clip-text animate-gold-shine underline decoration-amber-500/50 underline-offset-4 group-hover:decoration-amber-400"
                        style={{
                          backgroundImage: 'linear-gradient(90deg, rgba(186,148,62,1) 0%, rgba(236,172,32,1) 20%, rgba(186,148,62,1) 39%, rgba(249,244,180,1) 50%, rgba(186,148,62,1) 60%, rgba(236,172,32,1) 80%, rgba(186,148,62,1) 100%)'
                        }}
                      >
                        souvenir
                      </span>
                      <svg className="w-4 h-4 text-amber-400 self-center" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </p>
                </div>
              ) : (
                <h3 className={`w-full text-white text-xl sm:text-2xl lg:text-3xl font-semibold font-[var(--font-instrument)] leading-tight text-center lg:text-left transition-all duration-700 delay-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  {checkEventStarted() ? "Experience the Silver Jubilee Exhibition Live!" : "Mark Your Calendar for the Silver Jubilee Exhibition."}
                </h3>
              )}
              
              {checkEventStarted() && !checkEventEnded() && (
                <a 
                  href="/events" 
                  className={`mt-6 px-6 py-3 bg-white text-black text-sm sm:text-base font-semibold rounded-full hover:bg-zinc-200 transition-all duration-300 flex items-center gap-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: '700ms' }}
                >
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  Watch Live Stream
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Elements */}

      <div className="relative">
        <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
          <div className="relative -mx-2.5 flex -bottom-1 -mt-12">
            <svg viewBox="0 0 64 48" className="w-16 flex-none fill-[#F7F7F8]" aria-hidden="true">
              <path d="M51.657 2.343 12.343 41.657A8 8 0 0 1 6.686 44H0v4h64V0h-6.686a8 8 0 0 0-5.657 2.343Z"></path>
              </svg><div className="-mx-px flex-auto bg-[#F7F7F8]"></div>
              <svg viewBox="0 0 64 48" className="w-16 flex-none fill-[#F7F7F8]" aria-hidden="true">
                <path d="m12.343 2.343 39.314 39.314A8 8 0 0 0 57.314 44H64v4H0V0h6.686a8 8 0 0 1 5.657 2.343Z"></path>
                </svg>
              </div>
        </div>
      </div>
    </section>
  );
};

export default About;
