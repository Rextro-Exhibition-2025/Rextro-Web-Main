import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const EventsTitleSvg = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const texts = svgRef.current?.querySelectorAll('.events-title-text');
      
      // 1. Initial State
      if (texts) {
        texts.forEach((text: any) => {
          // Use a static large value to ensure coverage
          const length = 3000;
          const fillColor = text.getAttribute('fill') || '#ffffff';
          
          gsap.set(text, {
            strokeDasharray: length,
            strokeDashoffset: length,
            fillOpacity: 0,
            stroke: fillColor, // Use the fill color for the stroke
            strokeWidth: 1.5,
            autoAlpha: 1
          });
        });
      }

      // Hide extrusion initially
      gsap.set('.events-title-extrusion', { autoAlpha: 0 });

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
        duration: 2.5,
        ease: 'power2.out'
      }, '<')
      // 4. Fade in Extrusion (Concurrent)
      .to('.events-title-extrusion', {
        autoAlpha: 1,
        duration: 2.5,
        ease: 'power2.out'
      }, '<');

    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full relative mb-8">
      <svg
        ref={svgRef}
        viewBox="0 0 900 400"
        className="w-full h-auto overflow-visible"
        style={{ filter: 'drop-shadow(0 10px 20px rgba(185, 28, 28, 0.4))' }}
      >
        <defs>
          {/* Top Text Gradient (White/Silver/Blue Tint) */}
          <linearGradient id="eventsTopFaceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" /> {/* Slate 300 */}
          </linearGradient>

          {/* Bottom Text Gradient (Cyan/Blue) */}
          <linearGradient id="eventsBottomFaceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan 400 */}
            <stop offset="50%" stopColor="#0ea5e9" /> {/* Sky 500 */}
            <stop offset="100%" stopColor="#2563eb" /> {/* Blue 600 */}
          </linearGradient>

          {/* 3D Extrusion Gradient (Dark Navy) */}
          <linearGradient id="eventsExtrusionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" /> {/* Slate 900 */}
            <stop offset="100%" stopColor="#1e3a8a" /> {/* Blue 900 */}
          </linearGradient>
        </defs>

        {/* --- TOP TEXT: EVENTS --- */}
        <g transform="translate(450, 120)">
          {/* Extrusion */}
          <g transform="translate(0, 0)">
            {[...Array(12)].map((_, i) => (
              <text
                key={`top-ext-${i}`}
                className="events-title-extrusion"
                textAnchor="middle"
                fontFamily="var(--font-orbitron), sans-serif"
                fontWeight="900"
                fontStyle="italic"
                fontSize="130"
                fill="url(#eventsExtrusionGradient)"
                stroke="#1e3a8a"
                strokeWidth="2"
                transform={`translate(${i * -0.5}, ${i * 0.8})`}
                style={{ letterSpacing: '0.05em' }}
              >
                EVENTS &
              </text>
            ))}
          </g>
          {/* Face */}
          <text
            className="events-title-text"
            textAnchor="middle"
            fontFamily="var(--font-orbitron), sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="130"
            fill="url(#eventsTopFaceGradient)"
            stroke="#94a3b8" // Slate 400 outline
            strokeWidth="1"
            style={{ letterSpacing: '0.05em' }}
          >
            EVENTS &
          </text>
        </g>

        {/* --- BOTTOM TEXT: PROGRAMS --- */}
        <g transform="translate(450, 280)">
          {/* Extrusion */}
          <g transform="translate(0, 0)">
            {[...Array(16)].map((_, i) => (
              <text
                key={`bot-ext-${i}`}
                className="events-title-extrusion"
                textAnchor="middle"
                fontFamily="var(--font-orbitron), sans-serif"
                fontWeight="900"
                fontStyle="italic"
                fontSize="140"
                fill="url(#eventsExtrusionGradient)"
                stroke="#1e3a8a"
                strokeWidth="2"
                transform={`translate(${i * -0.5}, ${i * 0.8})`}
                style={{ letterSpacing: '0.05em' }}
              >
                PROGRAMS
              </text>
            ))}
          </g>
          {/* Face */}
          <text
            className="events-title-text"
            textAnchor="middle"
            fontFamily="var(--font-orbitron), sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="140"
            fill="url(#eventsBottomFaceGradient)"
            stroke="#0284c7" // Sky 600 outline
            strokeWidth="2"
            style={{ letterSpacing: '0.05em' }}
          >
            PROGRAMS
          </text>
          {/* Inner Highlight (Subtle - kept static) */}
          <text
            textAnchor="middle"
            fontFamily="var(--font-orbitron), sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="140"
            fill="white"
            fillOpacity="0.2"
            stroke="none"
            transform="translate(-2, -2)"
            style={{ letterSpacing: '0.05em', mixBlendMode: 'overlay' }}
          >
            PROGRAMS
          </text>
        </g>
      </svg>
    </div>
  );
};

export default EventsTitleSvg;
