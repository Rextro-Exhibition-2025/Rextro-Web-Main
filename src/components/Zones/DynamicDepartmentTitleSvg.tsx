import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';

interface DynamicDepartmentTitleSvgProps {
  title: string;
}

const DynamicDepartmentTitleSvg: React.FC<DynamicDepartmentTitleSvgProps> = ({ title }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Split title into two lines logic
  const { line1, line2 } = useMemo(() => {
    const upperTitle = title.toUpperCase();
    if (upperTitle.includes('&')) {
      const parts = upperTitle.split('&');
      return { line1: `${parts[0].trim()} &`, line2: parts[1].trim() };
    }
    const words = upperTitle.split(' ');
    if (words.length === 1) return { line1: words[0], line2: '' };
    
    const mid = Math.ceil(words.length / 2);
    return {
      line1: words.slice(0, mid).join(' '),
      line2: words.slice(mid).join(' ')
    };
  }, [title]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const texts = svgRef.current?.querySelectorAll('.dept-title-text');
      
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
      tl.to('.dept-title-text', {
        strokeDashoffset: 0,
        duration: 2.5,
        stagger: 0.05,
        ease: 'power2.inOut'
      })
      // 3. Fill and remove stroke (Concurrent)
      .to('.dept-title-text', {
        fillOpacity: 1,
        strokeWidth: 0,
        filter: "none",
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.5');

    }, svgRef);

    return () => ctx.revert();
  }, [line1, line2]); // Re-run if title changes

  // Dynamic font size calculation based on length
  const getFontSize = (text: string) => {
    if (text.length > 20) return 45;
    if (text.length > 15) return 60;
    if (text.length > 10) return 75;
    return 90;
  };

  // Use the longer line to determine font size for both lines to keep them consistent
  const fontSize1 = getFontSize(line1.length > line2.length ? line1 : line2);
  const fontSize2 = fontSize1;

  return (
    <div className="w-full relative">
      <svg
        ref={svgRef}
        viewBox="0 0 900 400"
        className="w-full h-auto overflow-visible"
        style={{ filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))' }}
      >
        <defs>
          {/* Gradient 0: Red to Navy (Top Line) */}
          <linearGradient id="deptGradient0" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D40000" />
            <stop offset="100%" stopColor="#000080" />
          </linearGradient>

          {/* Gradient 1: Dark Navy -> Mid Blue -> Light Navy (Bottom Line) */}
          <linearGradient id="deptGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#002255" />
            <stop offset="45%" stopColor="#0044AA" />
            <stop offset="100%" stopColor="#213F6B" />
          </linearGradient>
        </defs>

        {/* --- LINE 1 --- */}
        <g transform="translate(450, 160)">
          <text
            className="dept-title-text"
            textAnchor="middle"
            fontFamily="var(--font-orbitron), sans-serif"
            fontWeight="900"
            fontSize={fontSize1}
            fill="url(#deptGradient0)"
            stroke="url(#deptGradient0)"
            strokeWidth="1.5"
            style={{ letterSpacing: '0.05em' }}
          >
            {line1}
          </text>
        </g>

        {/* --- LINE 2 --- */}
        {line2 && (
          <g transform="translate(450, 240)">
            <text
              className="dept-title-text"
              textAnchor="middle"
              fontFamily="var(--font-orbitron), sans-serif"
              fontWeight="900"
              fontSize={fontSize2}
              fill="url(#deptGradient1)"
              stroke="url(#deptGradient1)"
              strokeWidth="1.5"
              style={{ letterSpacing: '0.05em' }}
            >
              {line2}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default DynamicDepartmentTitleSvg;
