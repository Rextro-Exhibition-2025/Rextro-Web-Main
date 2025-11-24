"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLoading } from "@/contexts/LoadingContext";

const Preloader = () => {
  const { isHeroLoaded, setShouldRevealContent, setPreloaderFinished } = useLoading();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Set initial states for optimization
      gsap.set(containerRef.current, { autoAlpha: 1 });
      gsap.set(svgRef.current, { scale: 1.3 }); // Start scaled up
      
      const paths = document.querySelectorAll(".logo-path");
      paths.forEach((path) => {
        if (path instanceof SVGPathElement) {
            const length = path.getTotalLength();
            gsap.set(path, { 
                strokeDasharray: length, 
                strokeDashoffset: length,
                fillOpacity: 0,
                stroke: "#ffffff", 
                strokeWidth: 1.5,
                autoAlpha: 1
            });
        }
      });

      // Animate gradient orbs
      gsap.to(".gradient-orb-1", {
        x: "30vw",
        y: "40vh",
        scale: 1.3,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".gradient-orb-2", {
        x: "-25vw",
        y: "-30vh",
        scale: 1.2,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".gradient-orb-3", {
        x: "20vw",
        y: "-35vh",
        scale: 1.4,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Particle animation moved to separate useEffect


      // 1. Draw the Logo (Blueprint Phase) - at base scale
      // Animate scale down from 1.3 to 1 concurrently with drawing
      tl.to(svgRef.current, {
        scale: 1,
        duration: 2.5,
        ease: "power2.out",
      }, 0);

      tl.to(".logo-path", {
        strokeDashoffset: 0,
        duration: 2,
        stagger: 0.1,
        ease: "power2.inOut",
      }, 0) // Sync with scale animation
      .to(".logo-path", {
        fillOpacity: 1,
        strokeWidth: 1.5, // Keep stroke visible for glow effect
        stroke: "rgba(255,255,255,0.8)", // Ensure stroke is white/visible
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.4")
      
      // 1.5 Color Transition Phase
      // 1.5 Color Transition Phase - Smoothly reveal colors after a brief hold
      .to(".grad-1-stop-0", { stopColor: "#D40000", duration: 0.5 }, "+=0.01")
      .to(".grad-1-stop-1", { stopColor: "#000080", duration: 0.5 }, "<")
      .to(".grad-2-stop-0", { stopColor: "#002255", duration: 0.5 }, "<")
      .to(".grad-2-stop-1", { stopColor: "#0044AA", duration: 0.5 }, "<")
      .to(".grad-2-stop-2", { stopColor: "#213F6B", duration: 0.5 }, "<")
      
      // Glow up the outer lines (stroke)
      .to(svgRef.current, {
        filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.8)) drop-shadow(0 0 15px rgba(139,92,246,0.6))',
        duration: 0.5
      }, "<");

      // 2. Progress Simulation (Direct DOM manipulation for performance)
      const progressObj = { value: 0 };
      tl.to(progressObj, {
        value: 100,
        duration: 4.5,
        ease: "none",
        onUpdate: () => {
            if (progressRef.current) {
                progressRef.current.innerText = `${Math.round(progressObj.value)}%`;
            }
        },
        onComplete: () => {
            checkCompletion();
        }
      }, 0);

    }, containerRef);

    // Separate check function to handle the dependency on isHeroLoaded
    const checkCompletion = () => {
        if (isHeroLoaded) {
             runExitSequence();
        } else {
            // If hero isn't loaded yet, wait for it.
            // The useEffect below will trigger runExitSequence when isHeroLoaded becomes true
        }
    };

    return () => ctx.revert();
  }, []); // Empty dependency array for setup

  const animationDoneRef = useRef(false);

  const runExitSequence = () => {
      if (!containerRef.current) return;
      
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onStart: () => setShouldRevealContent(true),
          onComplete: () => setPreloaderFinished(true),
        });

        // 3. Exit Sequence: Scale up while reversing the drawing
        
        // Remove fill
        tl.to(".logo-path", {
            fillOpacity: 0,
            strokeWidth: 1.5,
            duration: 0.5,
            ease: "power2.in",
        }, 0);

        // Scale up logo as it undraws (starts concurrently)
        tl.to(svgRef.current, {
          scale: 1.2,
          duration: 1.3,
          ease: "power1.inOut",
        }, 0);

        // "Undraw" - Reverse direction (starts concurrently)
        tl.to(".logo-path", {
            strokeDashoffset: function(i, target) {
                return (target as SVGPathElement).getTotalLength();
            },
            duration: 1.2,
            stagger: {
                each: 0.05,
                from: "end" 
            },
            ease: "power2.inOut",
        }, 0);

        // Fade out container
        tl.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut"
        }, "-=0.4");

      }, containerRef);
  };

  // Watch for hero loaded state
  useEffect(() => {
      const timer = setTimeout(() => {
          animationDoneRef.current = true;
          if (isHeroLoaded) {
              runExitSequence();
          }
      }, 4500); // Matches the 4.5s duration of the progress animation

      return () => clearTimeout(timer);
  }, [isHeroLoaded]);

  // Generate particles - spread across entire screen
  // Generate particles - spread across entire screen
  const [particles, setParticles] = React.useState<{ left: string; top: string }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticles(newParticles);
  }, []);

  // Animate particles once they are rendered
  useEffect(() => {
    if (particles.length === 0) return;

    const ctx = gsap.context(() => {
      const particleElements = document.querySelectorAll(".particle");
      particleElements.forEach((particle) => {
        gsap.to(particle, {
          y: `${gsap.utils.random(-200, -400)}px`,
          x: `${gsap.utils.random(-100, 100)}px`,
          opacity: 0,
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          ease: "none"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [particles]);

  const particleElements = particles.map((pos, i) => (
    <div
      key={i}
      className="particle absolute w-1 h-1 bg-white rounded-full opacity-60"
      style={{
        left: pos.left,
        top: pos.top,
      }}
    />
  ));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden will-change-opacity"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000000 100%)'
      }}
    >
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="gradient-orb-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)'
            }}
          />
          <div 
            className="gradient-orb-2 absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full blur-[130px] opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)'
            }}
          />
          <div 
            className="gradient-orb-3 absolute bottom-1/4 left-1/2 w-[550px] h-[550px] rounded-full blur-[140px] opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)'
            }}
          />
        </div>

        {/* Radial Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none" 
          style={{ 
            backgroundImage: `
              radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.5) 100%),
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `, 
            backgroundSize: 'cover, 50px 50px, 50px 50px',
            backgroundPosition: 'center, 0 0, 0 0'
          }}
        />

        {/* Scanline Effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            animation: 'scanline 8s linear infinite'
          }}
        />

        {/* Particles */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
          {particleElements}
        </div>

      <div className="relative flex flex-col items-center justify-center w-full max-w-5xl px-4 z-10">
        
        {/* Logo Container with Glow */}
        <div className="relative w-[85%] md:w-[800px] mb-12">
          
          {/* Logo SVG */}
          <svg 
              ref={svgRef}
              width="100%" 
              height="auto" 
              viewBox="0 0 696 220" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto overflow-visible will-change-transform"
              style={{
                filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.3)) drop-shadow(0 0 50px rgba(139,92,246,0.2))'
              }}
          >
              <defs>
                  <linearGradient id="preloader-grad-1" x1="140.04" y1="89.5103" x2="756.601" y2="89.4854" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ffffff" className="grad-1-stop-0" />
                      <stop offset="100%" stopColor="#ffffff" className="grad-1-stop-1" />
                  </linearGradient>
                  <linearGradient id="preloader-grad-2" x1="1.1875" y1="83.3614" x2="694.812" y2="83.3614" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ffffff" className="grad-2-stop-0" />
                      <stop offset="45%" stopColor="#ffffff" className="grad-2-stop-1" />
                      <stop offset="100%" stopColor="#ffffff" className="grad-2-stop-2" />
                  </linearGradient>
              </defs>
              
              {/* Only the main REXTRO text path remains */}
              <path className="logo-path" d="M275.741 0.618001L202.209 0.618811L254.349 82.1688L197.881 161.865H257.783L295.436 108.596V161.865H369.603L316.54 78.7411L371.882 0.617798H311.985L275.741 51.9058V0.618001Z" fill="url(#preloader-grad-1)"/>
              <path className="logo-path" d="M366.822 35.0534L350.924 57.4908H388.773V131.329H411.211V57.4908H446.321V35.0534H366.822ZM636.593 35.715C625.821 35.7485 614.991 36.2133 604.116 37.0108C590.393 38.017 580.605 47.3034 579.268 59.9534C578.292 75.8302 577.762 91.6388 579.268 106.349C580.605 118.999 590.393 128.286 604.116 129.292C614.991 130.089 625.821 130.554 636.593 130.588C647.365 130.621 658.08 130.223 668.721 129.292C682.426 128.093 692.029 118.979 693.569 106.349C695.122 90.4673 695.327 74.7126 693.569 59.9534C692.029 47.3231 682.426 38.2094 668.721 37.0108C658.08 36.08 647.365 35.6817 636.593 35.715ZM75.7969 36.7967C74.0988 36.7866 72.6298 36.8185 71.4867 36.8185H1.1875V131.669H23.7183L23.773 105.915V58.6766H25.0085L74.7729 58.6794C74.8515 58.6794 74.9199 58.6864 74.998 58.688H75.6103C76.4988 58.688 77.3645 58.7771 78.2018 58.946C78.2284 58.9518 78.2555 58.9572 78.282 58.9625C80.9771 59.4359 82.8794 60.4936 84.2146 61.9658C86.8728 64.3327 88.5523 67.7737 88.5523 71.6293C88.5523 76.6398 85.7297 80.958 81.5848 83.1102C81.3569 83.2335 81.1156 83.3427 80.8736 83.4506C80.7753 83.4942 80.6792 83.5415 80.5798 83.5824C80.4561 83.6334 80.3254 83.6755 80.1984 83.7223C78.7719 84.261 77.2308 84.5706 75.6111 84.5706H39.491C39.3423 84.5706 33.4809 84.5537 33.3332 84.5489H31.7492L45.3879 105.916H71.3091L85.8127 131.532L114.759 131.669L94.897 101.638C104.179 96.6394 111.162 88.8989 110.99 68.4147C110.742 38.9784 87.6838 36.865 75.7969 36.7967ZM532.814 36.7967C531.116 36.7866 529.648 36.8185 528.504 36.8185H458.205V131.669H480.736L480.791 105.915V58.6766H482.026L531.79 58.6794C531.869 58.6794 531.938 58.6864 532.016 58.688H532.628C533.516 58.688 534.382 58.7771 535.219 58.946C535.246 58.9518 535.272 58.9572 535.299 58.9625C537.995 59.4359 539.897 60.4936 541.232 61.9658C543.89 64.3327 545.57 67.7737 545.57 71.6293C545.57 76.6398 542.747 80.958 538.602 83.1102C538.374 83.2335 538.133 83.3427 537.891 83.4506C537.793 83.4942 537.697 83.5414 537.597 83.5824C537.474 83.6334 537.343 83.6755 537.216 83.7223C535.789 84.2611 534.248 84.5706 532.628 84.5706H496.508C496.359 84.5706 490.498 84.5537 490.351 84.5489H488.766L502.405 105.916H528.326L542.83 131.532L571.776 131.669L551.914 101.638C561.197 96.6394 568.179 88.8989 568.007 68.4147C567.759 38.9784 544.701 36.865 532.814 36.7967ZM122.162 37.1508V59.5882V131.669H144.6H195.512L211.41 109.232H144.6V59.5882H209.126V37.1508H144.6H122.162ZM637.114 55.1381C643.751 55.204 650.154 55.5628 656.483 56.0193C664.253 56.5799 669.489 61.8808 670.552 69.0102C671.713 78.5967 671.74 89.1331 670.552 97.2924C669.489 104.422 664.253 109.723 656.483 110.283C643.826 111.196 630.865 111.724 616.354 110.283C608.604 109.514 603.667 104.375 602.285 97.2924C601.202 87.7207 600.641 77.7075 602.285 69.0102C603.667 61.9275 608.604 56.7887 616.354 56.0193C623.61 55.299 630.478 55.0721 637.114 55.1381ZM156.073 75.2338V92.4496H199.509V75.2338H156.073Z" fill="url(#preloader-grad-2)"/>
          </svg>
        </div>

        {/* Creative Bottom Section - Minimal Loading Indicator */}
        <div className="relative mt-16">
          {/* Animated rotating dots circle */}
          <div className="relative flex items-center justify-center h-16">
            <div className="absolute w-16 h-16">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 45}deg) translateY(-32px)`,
                    animation: `pulse-dot ${1.5 + i * 0.1}s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Loading label */}
          <div 
            className="mt-4 text-sm font-[var(--font-instrument-sans)] text-white tracking-[0.4em] uppercase text-center"
            style={{
              marginRight: '-0.4em' // Compensate for letter-spacing
            }}
          >
            LOADING
          </div>
          
          {/* Hidden ref for progress updates */}
          <div ref={progressRef} className="hidden"></div>
        </div>

      </div>

      <style jsx>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes pulse-dot {
          0%, 100% { 
            opacity: 0.2;
            transform: rotate(var(--rotation)) translateY(-32px) scale(0.8);
          }
          50% { 
            opacity: 1;
            transform: rotate(var(--rotation)) translateY(-32px) scale(1.2);
          }
        }
      `}</style>
      <style jsx>{`
        ${[...Array(8)].map((_, i) => `
          .absolute:nth-child(${i + 1}) {
            --rotation: ${i * 45}deg;
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default Preloader;
