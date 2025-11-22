"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MeteorAnimation, { HERO_METEORS, HERO_METEORS_ALT } from '@/components/Homepage/MeteorAnimation';
import Footer from '@/components/Homepage/Footer';
import GameSelectionGrid from '@/components/GameZone/GameSelectionGrid';
import Leaderboard from '@/components/GameZone/Leaderboard';
import { games } from '@/config/gameConfig';

gsap.registerPlugin(ScrollTrigger);

export default function GameZonePage() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [leaderboardKey, setLeaderboardKey] = useState(0);
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

  return (
    <div className="font-[family-name:var(--font-instrument-sans)] bg-gray-50 min-h-screen">
      {/* Hero Section - Light */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden min-h-screen -mt-16 flex items-center justify-center bg-gray-50"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          {/* Circuit Pattern */}
          <div className="absolute -top-8 right-1/2 sm:top-5 aspect-[969/887] w-[969px] opacity-30">
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
                stops="light"
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

          <div className="absolute -top-8 right-1/2 origin-right -scale-x-100 sm:top-5 aspect-[969/887] w-[969px] opacity-30">
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
                stops="light"
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#f9fafb_100%)]" />
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-20 text-center transition-all duration-1000 ${
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-600 text-sm font-semibold uppercase tracking-wider">
              Game Zone
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Challenge Your
            <br />
            <span className="bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-sm">
              Skills
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Test your problem-solving abilities and compete for the top spot on our leaderboard
          </p>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm text-gray-500 uppercase tracking-wider">Scroll to play</span>
            <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-purple-600 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Dark */}
      <section ref={statsRef} className="relative w-full px-4 sm:px-8 lg:px-20 py-12 sm:py-16 bg-[#131316]">
        {/* SVG Separator */}
        <div className="absolute inset-x-0 -top-11 mt-[calc(-3/16*1rem)] flex items-end z-20 pointer-events-none">
          <div className="mr-[calc(-1*(2rem-0.375rem))] h-11 flex-auto bg-[#131316]"></div>
          <div className="flex justify-between mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
            <svg viewBox="0 0 56 48" aria-hidden="true" className="-ml-1.5 mb-[calc(-1/16*1rem)] w-14 flex-none overflow-visible fill-[#131316]">
              <path d="M 2.686 3 H -4 V 48 H 56 V 47 H 53.314 A 8 8 0 0 1 47.657 44.657 L 8.343 5.343 A 8 8 0 0 0 2.686 3 Z"></path>
            </svg>
            <svg viewBox="0 0 56 48" aria-hidden="true" className="-mr-1.5 mb-[calc(-1/16*1rem)] w-14 flex-none overflow-visible fill-[#131316]">
              <path d="M 53.314 3 H 60 V 48 H 0 V 47 H 2.686 A 8 8 0 0 0 8.343 44.657 L 47.657 5.343 A 8 8 0 0 1 53.314 3 Z"></path>
            </svg>
          </div>
          <div className="ml-[calc(-1*(2rem-0.375rem))] h-11 flex-auto bg-[#131316]"></div>
        </div>

        {/* Background Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { label: 'Games Available', value: games.length, icon: '🎮' },
              { label: 'Players', value: '100+', icon: '👥' },
              { label: 'High Score', value: '2,500', icon: '🏆' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="stat-item group relative p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500 overflow-hidden text-center"
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
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Games Section - Dark */}
      <section className="w-full flex flex-col bg-[#F7F7F8]">
        {/* Inner Dark Content Div */}
        <div
          className="relative w-full px-4 sm:px-8 lg:px-20 py-12 sm:py-16 bg-neutral-900 flex flex-col gap-4 overflow-hidden"
          style={{
            backgroundImage: "url(/zones/zones-background.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#131316] to-neutral-900/90 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10 mb-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Choose Your <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Challenge</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Select a game, enter your name, and compete for the highest score!
              </p>
            </div>

            <GameSelectionGrid games={games} />
          </div>
        </div>

        {/* Bottom Decorative Border for Transition to Leaderboard */}
        <div className="relative">
          <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
            <div className="relative -mx-2.5 flex -bottom-1 -mt-12">
              <svg viewBox="0 0 64 48" className="w-16 flex-none fill-[#F7F7F8]" aria-hidden="true">
                <path d="M51.657 2.343 12.343 41.657A8 8 0 0 1 6.686 44H0v4h64V0h-6.686a8 8 0 0 0-5.657 2.343Z"></path>
              </svg>
              <div className="-mx-px flex-auto bg-[#F7F7F8]"></div>
              <svg viewBox="0 0 64 48" className="w-16 flex-none fill-[#F7F7F8]" aria-hidden="true">
                <path d="m12.343 2.343 39.314 39.314A8 8 0 0 0 57.314 44H64v4H0V0h6.686a8 8 0 0 1 5.657 2.343Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section - Light */}
      <section className="relative w-full px-4 sm:px-8 lg:px-20 py-12 sm:py-16 bg-[#F7F7F8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">Leaderboard</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Top 50 players across all games
            </p>
          </div>

          <Leaderboard key={leaderboardKey} />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
