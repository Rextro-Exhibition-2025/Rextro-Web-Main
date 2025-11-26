import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const EventTitleSvg = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const texts = svgRef.current?.querySelectorAll('.events-title-text');
      
      // 1. Initial State
      if (texts) {
        texts.forEach((text: any) => {
          const length = 3000; // Approximate length for text path
          const fillColor = text.getAttribute('fill') || '#ffffff';
          
          gsap.set(text, {
            strokeDasharray: length,
            strokeDashoffset: length,
            fillOpacity: 0,
            stroke: fillColor, 
            strokeWidth: 1.5,
            autoAlpha: 1,
            filter: "drop-shadow(0 0 1px rgba(255,255,255,0.8)) drop-shadow(0 0 3px currentColor)"
          });
        });
      }

      const tl = gsap.timeline({ delay: 0.5 });

      // 2. Draw Stroke Animation
      tl.to('.events-title-text', {
        strokeDashoffset: 0,
        duration: 2.5,
        stagger: 0.05,
        ease: 'power2.inOut'
      })
      // 3. Fill and remove stroke (Concurrent)
      .to('.events-title-text', {
        fillOpacity: 1,
        strokeWidth: 0,
        filter: "none",
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.5');

    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full relative mb-8">
      <svg
        ref={svgRef}
        viewBox="0 0 900 400"
        className="w-full h-auto overflow-visible"
        style={{ filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))' }}
      >
        <defs>
          {/* Gradient 0: Red to Navy (Matches logo paint0) */}
          <linearGradient id="eventsGradient0" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D40000" />
            <stop offset="100%" stopColor="#000080" />
          </linearGradient>

          {/* Gradient 1: Dark Navy -> Mid Blue -> Light Navy (Matches logo paint1) */}
          <linearGradient id="eventsGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#002255" />
            <stop offset="45%" stopColor="#0044AA" />
            <stop offset="100%" stopColor="#213F6B" />
          </linearGradient>
        </defs>

        {/* --- TOP TEXT: EVENTS --- */}
        <g transform="translate(450, 140)">
          <text
            className="events-title-text"
            textAnchor="middle"
            fontFamily="var(--font-orbitron), sans-serif"
            fontWeight="900"
            fontSize="130"
            fill="url(#eventsGradient0)"
            stroke="url(#eventsGradient0)"
            strokeWidth="1.5"
            style={{ letterSpacing: '0.05em' }}
          >
            EVENTS &
          </text>
        </g>

        {/* --- BOTTOM TEXT: PROGRAMS --- */}
        <g transform="translate(450, 300)">
          <text
            className="events-title-text"
            textAnchor="middle"
            fontFamily="var(--font-orbitron), sans-serif"
            fontWeight="900"
            fontSize="140"
            fill="url(#eventsGradient1)"
            stroke="url(#eventsGradient1)"
            strokeWidth="1.5"
            style={{ letterSpacing: '0.05em' }}
          >
            PROGRAMS
          </text>
        </g>
      </svg>
    </div>
  );
};

export default EventTitleSvg;
