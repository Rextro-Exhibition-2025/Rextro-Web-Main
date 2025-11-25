"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
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
  );
};

export default AnimatedBackground;
