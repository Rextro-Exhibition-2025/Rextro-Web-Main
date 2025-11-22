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
    <div className="font-[family-name:var(--font-instrument-sans)] bg-[#0A0A0C] min-h-screen">
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
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 text-sm font-semibold uppercase tracking-wider">
              Game Zone
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Challenge Your
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Test your problem-solving abilities and compete for the top spot on our leaderboard
          </p>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm text-zinc-500 uppercase tracking-wider">Scroll to play</span>
            <div className="w-6 h-10 rounded-full border-2 border-zinc-600 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-purple-500 rounded-full animate-bounce" />
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0C] to-transparent" />
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="relative w-full px-4 sm:px-8 lg:px-20 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { label: 'Games Available', value: games.length, icon: '🎮' },
              { label: 'Players', value: '100+', icon: '👥' },
              { label: 'High Score', value: '2,500', icon: '🏆' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="stat-item group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden text-center"
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

      {/* Games Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-20 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
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
      </section>

      {/* Leaderboard Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-20 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">Leaderboard</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
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
