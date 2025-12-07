"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { departments } from '@/lib/zonesData';
import AnimatedBackground from '@/components/common/AnimatedBackground';

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
      className="w-full h-full object-cover"
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

  const [svgPath, setSvgPath] = React.useState('');
  const [glowPoints, setGlowPoints] = React.useState<{x: number, y: number}[]>([]);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Initial check
    checkMobile();
    
    const calculatePath = () => {
      if (!timelineRef.current) return;
      
      const items = document.querySelectorAll('.timeline-item');
      const containerRect = timelineRef.current.getBoundingClientRect();
      const points: {x: number, y: number}[] = [];
      
      // Start point (Top Center)
      points.push({ x: containerRect.width / 2, y: 0 });

      items.forEach((item, index) => {
        const textElement = item.querySelector('.timeline-text');
        if (textElement) {
          const textRect = textElement.getBoundingClientRect();
          
          // Calculate relative position
          const relativeY = textRect.top - containerRect.top + (textRect.height / 2);
          
          // For even items (index 0, 2...), text is on Right (but visually it's reversed flex)
          // Let's rely on the visual position.
          // Index 0 (Even): Text is Right. Center of text box.
          // Index 1 (Odd): Text is Left. Center of text box.
          
          // Adjust X to be closer to the inner edge of the text block for a nicer look
          let relativeX = textRect.left - containerRect.left + (textRect.width / 2);
          
          // Fine tune X to connect to the "edge" facing the center
          if (index % 2 === 0) { // Text Right
             relativeX = textRect.left - containerRect.left + 40; // Connect to left side of text
          } else { // Text Left
             relativeX = textRect.right - containerRect.left - 40; // Connect to right side of text
          }

          points.push({ x: relativeX, y: relativeY });
        }
      });

      // End point (Bottom Center - extended)
      const lastItem = items[items.length - 1];
      if (lastItem) {
         const lastRect = lastItem.getBoundingClientRect();
         const lastY = lastRect.bottom - containerRect.top + 100;
         points.push({ x: containerRect.width / 2, y: lastY });
      }

      // Generate Smooth Path (Catmull-Rom or simple Bezier)
      // Simple approach: Line to first point, then curves
      let d = `M ${points[0].x} ${points[0].y}`;
      
      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        
        // Control points for smooth curve (vertical flow)
        const cp1x = p0.x;
        const cp1y = p0.y + (p1.y - p0.y) * 0.5;
        const cp2x = p1.x;
        const cp2y = p0.y + (p1.y - p0.y) * 0.5;
        
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
      }

      setSvgPath(d);
      setGlowPoints(points.slice(1, points.length - 1)); // Exclude start/end for glows, keep only text points
    };

    // Initial calculation
    // Delay slightly to ensure layout is settled
    const timer = setTimeout(calculatePath, 500);
    
    const handleResize = () => {
      checkMobile();
      calculatePath();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

      // Animate the Curved Path
      if (svgPath) {
        const path = document.querySelector('.timeline-path') as SVGPathElement;
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: 1,
            }
          });
        }
      }

      // Animate Glow Dots
      const dots = document.querySelectorAll('.timeline-dot');
      dots.forEach((dot) => {
        gsap.fromTo(dot, 
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 70%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      });

      // Animate items
      const items = document.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        const text = item.querySelector('.timeline-text');
        const video = item.querySelector('.timeline-video');
        
        const videoDirection = index % 2 === 0 ? -100 : 100;
        const textDirection = index % 2 === 0 ? 100 : -100; 
        
        if (video) {
          gsap.fromTo(video,
            { opacity: 0, x: videoDirection },
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
        }

        if (text) {
          gsap.fromTo(text,
            { opacity: 0, x: textDirection },
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
        }
      });


    }, sectionRef);

    return () => ctx.revert();
  }, [svgPath]); // Re-run animation when path changes

  return (
    <section ref={sectionRef} className="relative w-full bg-black overflow-hidden py-20">
      {/* Animated Background */}
      <AnimatedBackground />

      <div ref={timelineRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Curved Path SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D40000" stopOpacity="0" />
              <stop offset="5%" stopColor="#D40000" stopOpacity="1" />
              <stop offset="35%" stopColor="#000080" stopOpacity="1" />
              <stop offset="95%" stopColor="#000080" stopOpacity="1" />
              <stop offset="100%" stopColor="#000080" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d={svgPath}
            className="timeline-path"
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow)"
          />
        </svg>

        {/* Glow Dots */}
        {glowPoints.map((point, i) => (
          <div
            key={i}
            className="timeline-dot absolute w-4 h-4 rounded-full bg-white z-10 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            style={{ 
              left: point.x, 
              top: point.y,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}

        <div className="space-y-24 relative z-10">
          {departments.map((dept, index) => (
            <div 
              key={dept.id}
              className={`timeline-item relative flex flex-col sm:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'sm:flex-row-reverse' : ''
              }`}
            >
              {/* Content Side */}
              <div className="timeline-text w-full sm:w-1/2 flex flex-col items-start sm:items-end text-left sm:text-right px-4" style={{ perspective: '1200px' }}>
                  {index % 2 !== 0 && (
                    <div 
                      className="w-full flex flex-col items-start text-left"
                      style={isMobile ? {} : {
                        transform: `rotateY(20deg) rotateX(10deg) rotateZ(-2deg)`, // Opposite of video (Video Odd: Y=-20, Z=2)
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      <span className="text-sm font-mono text-cyan-400 mb-2">0{index + 1}</span>
                      <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">{dept.name}</h3>
                      <p className="text-zinc-400 mb-6 max-w-md">{dept.description}</p>
                      {/* <Link 
                        href={`/zones/${dept.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all group"
                      >
                        <span className="text-sm font-medium text-white">Explore Zones</span>
                        <svg className="w-4 h-4 text-cyan-400 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link> */}
                    </div>
                  )}
                  {index % 2 === 0 && (
                    <div 
                      className="w-full flex flex-col items-start sm:items-end text-left sm:text-right"
                      style={isMobile ? {} : {
                        transform: `rotateY(-20deg) rotateX(10deg) rotateZ(2deg)`, // Opposite of video (Video Even: Y=20, Z=-2)
                        transformStyle: 'preserve-3d'
                      }}
                    >
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

              {/* Video Side */}
              <div className="timeline-video w-full sm:w-1/2 px-4 mt-8 sm:mt-0" style={{ perspective: '1200px' }}>
                <div 
                  className="video-3d-container relative aspect-video rounded-xl transition-all duration-700 ease-out group-hover:scale-105"
                  style={{
                    transform: `rotateY(${index % 2 === 0 ? '20deg' : '-20deg'}) rotateX(10deg) rotateZ(${index % 2 === 0 ? '-2deg' : '2deg'})`,
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {/* Front Face (Video) */}
                  <div 
                    className="absolute inset-0 rounded-xl overflow-hidden border border-white/10 bg-zinc-900" 
                    style={{ 
                      transform: 'translateZ(10px)',
                      boxShadow: `0 0 30px ${dept.color}40, inset 0 0 20px ${dept.color}20`,
                      borderColor: `${dept.color}60`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-20 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <VideoPlayer src={dept.videoSrc} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Text Section - Integrated for seamless background */}
      <div className="relative z-10 pt-32 pb-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Beyond the Departments
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto font-light">
            Our zones are more than just physical spaces—they are vibrant ecosystems where creativity meets technology. 
            From student-led research to industry collaborations, innovation happens everywhere.
          </p>
        </div>
        
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      </div>
    </section>
  );
};

export default DepartmentTimeline;
