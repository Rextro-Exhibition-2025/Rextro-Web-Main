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
            autoAlpha: 1
          });
        });
      }

      // Hide extrusion initially
      gsap.set('.dept-title-extrusion', { autoAlpha: 0 });

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
        duration: 2.5,
        ease: 'power2.out'
      }, '<')
      // 4. Fade in Extrusion (Concurrent)
      .to('.dept-title-extrusion', {
        autoAlpha: 1,
        duration: 2.5,
        ease: 'power2.out'
      }, '<');

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
        style={{ filter: 'drop-shadow(0 10px 20px rgba(185, 28, 28, 0.4))' }}
      >
        <defs>
          {/* Top Text Gradient (White/Silver/Blue Tint) */}
          <linearGradient id="deptTopFaceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Bottom Text Gradient (Cyan/Blue) */}
          <linearGradient id="deptBottomFaceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>

          {/* 3D Extrusion Gradient (Dark Navy) */}
          <linearGradient id="deptExtrusionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>

        {/* --- LINE 1 --- */}
        <g transform="translate(450, 160)">
          <g transform="translate(0, 0)">
            {[...Array(12)].map((_, i) => (
              <text
                key={`top-ext-${i}`}
                className="dept-title-extrusion"
                textAnchor="middle"
                fontFamily="var(--font-orbitron), sans-serif"
                fontWeight="900"
                fontStyle="italic"
                fontSize={fontSize1}
                fill="url(#deptExtrusionGradient)"
                stroke="#1e3a8a"
                strokeWidth="2"
                transform={`translate(${i * -0.5}, ${i * 0.8})`}
                style={{ letterSpacing: '0.05em' }}
              >
                {line1}
              </text>
            ))}
          </g>
          <text
            className="dept-title-text"
            textAnchor="middle"
            fontFamily="var(--font-orbitron), sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize={fontSize1}
            fill="url(#deptTopFaceGradient)"
            stroke="#94a3b8"
            strokeWidth="1"
            style={{ letterSpacing: '0.05em' }}
          >
            {line1}
          </text>
        </g>

        {/* --- LINE 2 --- */}
        {line2 && (
          <g transform="translate(450, 240)">
            <g transform="translate(0, 0)">
              {[...Array(16)].map((_, i) => (
                <text
                  key={`bot-ext-${i}`}
                  className="dept-title-extrusion"
                  textAnchor="middle"
                  fontFamily="var(--font-orbitron), sans-serif"
                  fontWeight="900"
                  fontStyle="italic"
                  fontSize={fontSize2}
                  fill="url(#deptExtrusionGradient)"
                  stroke="#1e3a8a"
                  strokeWidth="2"
                  transform={`translate(${i * -0.5}, ${i * 0.8})`}
                  style={{ letterSpacing: '0.05em' }}
                >
                  {line2}
                </text>
              ))}
            </g>
            <text
              className="dept-title-text"
              textAnchor="middle"
              fontFamily="var(--font-orbitron), sans-serif"
              fontWeight="900"
              fontStyle="italic"
              fontSize={fontSize2}
              fill="url(#deptBottomFaceGradient)"
              stroke="#0284c7"
              strokeWidth="2"
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
