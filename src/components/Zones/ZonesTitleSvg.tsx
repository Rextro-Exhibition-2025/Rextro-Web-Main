import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ZonesTitleSvg = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const texts = svgRef.current?.querySelectorAll('.zones-title-text');
      
      // 1. Initial State
      if (texts) {
        texts.forEach((text: any) => {
          const length = 3000;
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
      tl.to('.zones-title-text', {
        strokeDashoffset: 0,
        duration: 2.5,
        stagger: 0.05,
        ease: 'power2.inOut'
      })
      // 3. Fill and remove stroke (Concurrent)
      .to('.zones-title-text', {
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
    <div className="w-full relative">
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-auto overflow-visible"
        style={{ filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))' }}
      >
        <defs>
          {/* Gradient 0: Red to Navy */}
          <linearGradient id="zonesGradient0" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D40000" />
            <stop offset="100%" stopColor="#000080" />
          </linearGradient>

          {/* Gradient 1: Dark Navy -> Mid Blue -> Light Navy */}
          <linearGradient id="zonesGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#002255" />
            <stop offset="45%" stopColor="#0044AA" />
            <stop offset="100%" stopColor="#213F6B" />
          </linearGradient>
        </defs>

        {/* --- TOP TEXT: EXHIBITION --- */}
        <g transform="translate(400, 120)">
          <text
            className="zones-title-text"
            textAnchor="middle"
            fontFamily="var(--font-orbitron), sans-serif"
            fontWeight="900"
            fontSize="100"
            fill="url(#zonesGradient0)"
            stroke="url(#zonesGradient0)"
            strokeWidth="1.5"
            style={{ letterSpacing: '0.05em' }}
          >
            EXHIBITION
          </text>
        </g>

        {/* --- BOTTOM TEXT: ZONES --- */}
        <g transform="translate(400, 280)">
          <text
            className="zones-title-text"
            textAnchor="middle"
            fontFamily="var(--font-orbitron), sans-serif"
            fontWeight="900"
            fontSize="160"
            fill="url(#zonesGradient1)"
            stroke="url(#zonesGradient1)"
            strokeWidth="1.5"
            style={{ letterSpacing: '0.05em' }}
          >
            ZONES
          </text>
        </g>
      </svg>
    </div>
  );
};

export default ZonesTitleSvg;
