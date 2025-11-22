"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLoading } from "@/contexts/LoadingContext";

const Preloader = () => {
  const { isHeroLoaded, setShouldRevealContent, setPreloaderFinished } = useLoading();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const progressRef = useRef<HTMLDivElement>(null); // Ref for direct DOM manipulation

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Set initial states for optimization
      gsap.set(containerRef.current, { autoAlpha: 1 });
      
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

      // 1. Draw the Logo (Blueprint Phase)
      tl.to(".logo-path", {
        strokeDashoffset: 0,
        duration: 2,
        stagger: 0.1,
        ease: "power2.inOut",
      })
      .to(".logo-path", {
        fillOpacity: 1,
        strokeWidth: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.4");

      // 2. Progress Simulation (Direct DOM manipulation for performance)
      const progressObj = { value: 0 };
      tl.to(progressObj, {
        value: 100,
        duration: 3,
        ease: "none",
        onUpdate: () => {
            if (progressRef.current) {
                progressRef.current.innerText = `SYSTEM INITIALIZING... ${Math.round(progressObj.value)}%`;
            }
        },
        onComplete: () => {
             if (progressRef.current) {
                progressRef.current.innerText = "READY";
            }
            checkCompletion();
        }
      }, 0);

      // Idle "Breathing" Animation (Optimized - No Filters)
      // Using opacity and scale is much cheaper than drop-shadow
      gsap.to(svgRef.current, {
        opacity: 0.8,
        scale: 1.02,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

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

  // Effect to trigger exit when both progress is done (implied by this effect running after mount) and hero is loaded
  // We need a way to know if progress is done. 
  // Let's use a ref to track animation completion to avoid re-renders.
  const animationDoneRef = useRef(false);

  const runExitSequence = () => {
      if (!containerRef.current) return;
      
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onStart: () => setShouldRevealContent(true),
          onComplete: () => setPreloaderFinished(true),
        });

        // 3. Exit Sequence: Reverse the drawing (Optimized)
        
        // Remove fill
        tl.to(".logo-path", {
            fillOpacity: 0,
            strokeWidth: 1.5,
            duration: 0.4,
            ease: "power2.in",
        });

        // "Undraw" - Reverse direction
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
        });

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
      // We can't easily know if the GSAP timeline is finished without state.
      // However, we can check if the progress text says "READY" or use a state just for "animationFinished".
      // To keep it optimized, let's just use a simple timeout or assume the 3s duration.
      // Better yet, let's use a state for 'animationComplete' but ensure it only triggers once.
      
      const timer = setTimeout(() => {
          animationDoneRef.current = true;
          if (isHeroLoaded) {
              runExitSequence();
          }
      }, 3000); // Matches the 3s duration of the progress animation

      return () => clearTimeout(timer);
  }, [isHeroLoaded]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden will-change-opacity"
    >
        {/* Grid Background (Static, no animation) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ 
                 backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
             }}>
        </div>

      <div className="relative flex flex-col items-center justify-center w-full max-w-5xl px-4">
        
        {/* Logo SVG - Removed the bottom text path */}
        <svg 
            ref={svgRef}
            width="100%" 
            height="auto" 
            viewBox="0 0 696 220" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full md:w-[800px] mb-8 overflow-visible will-change-transform"
        >
            <defs>
                <linearGradient id="mono-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#e5e5e5" />
                </linearGradient>
            </defs>
            
            {/* Only the main REXTRO text path remains */}
            <path className="logo-path" d="M275.741 0.618001L202.209 0.618811L254.349 82.1688L197.881 161.865H257.783L295.436 108.596V161.865H369.603L316.54 78.7411L371.882 0.617798H311.985L275.741 51.9058V0.618001Z" fill="url(#mono-gradient)"/>
            <path className="logo-path" d="M366.822 35.0534L350.924 57.4908H388.773V131.329H411.211V57.4908H446.321V35.0534H366.822ZM636.593 35.715C625.821 35.7485 614.991 36.2133 604.116 37.0108C590.393 38.017 580.605 47.3034 579.268 59.9534C578.292 75.8302 577.762 91.6388 579.268 106.349C580.605 118.999 590.393 128.286 604.116 129.292C614.991 130.089 625.821 130.554 636.593 130.588C647.365 130.621 658.08 130.223 668.721 129.292C682.426 128.093 692.029 118.979 693.569 106.349C695.122 90.4673 695.327 74.7126 693.569 59.9534C692.029 47.3231 682.426 38.2094 668.721 37.0108C658.08 36.08 647.365 35.6817 636.593 35.715ZM75.7969 36.7967C74.0988 36.7866 72.6298 36.8185 71.4867 36.8185H1.1875V131.669H23.7183L23.773 105.915V58.6766H25.0085L74.7729 58.6794C74.8515 58.6794 74.9199 58.6864 74.998 58.688H75.6103C76.4988 58.688 77.3645 58.7771 78.2018 58.946C78.2284 58.9518 78.2555 58.9572 78.282 58.9625C80.9771 59.4359 82.8794 60.4936 84.2146 61.9658C86.8728 64.3327 88.5523 67.7737 88.5523 71.6293C88.5523 76.6398 85.7297 80.958 81.5848 83.1102C81.3569 83.2335 81.1156 83.3427 80.8736 83.4506C80.7753 83.4942 80.6792 83.5415 80.5798 83.5824C80.4561 83.6334 80.3254 83.6755 80.1984 83.7223C78.7719 84.261 77.2308 84.5706 75.6111 84.5706H39.491C39.3423 84.5706 33.4809 84.5537 33.3332 84.5489H31.7492L45.3879 105.916H71.3091L85.8127 131.532L114.759 131.669L94.897 101.638C104.179 96.6394 111.162 88.8989 110.99 68.4147C110.742 38.9784 87.6838 36.865 75.7969 36.7967ZM532.814 36.7967C531.116 36.7866 529.648 36.8185 528.504 36.8185H458.205V131.669H480.736L480.791 105.915V58.6766H482.026L531.79 58.6794C531.869 58.6794 531.938 58.6864 532.016 58.688H532.628C533.516 58.688 534.382 58.7771 535.219 58.946C535.246 58.9518 535.272 58.9572 535.299 58.9625C537.995 59.4359 539.897 60.4936 541.232 61.9658C543.89 64.3327 545.57 67.7737 545.57 71.6293C545.57 76.6398 542.747 80.958 538.602 83.1102C538.374 83.2335 538.133 83.3427 537.891 83.4506C537.793 83.4942 537.697 83.5414 537.597 83.5824C537.474 83.6334 537.343 83.6755 537.216 83.7223C535.789 84.2611 534.248 84.5706 532.628 84.5706H496.508C496.359 84.5706 490.498 84.5537 490.351 84.5489H488.766L502.405 105.916H528.326L542.83 131.532L571.776 131.669L551.914 101.638C561.197 96.6394 568.179 88.8989 568.007 68.4147C567.759 38.9784 544.701 36.865 532.814 36.7967ZM122.162 37.1508V59.5882V131.669H144.6H195.512L211.41 109.232H144.6V59.5882H209.126V37.1508H144.6H122.162ZM637.114 55.1381C643.751 55.204 650.154 55.5628 656.483 56.0193C664.253 56.5799 669.489 61.8808 670.552 69.0102C671.713 78.5967 671.74 89.1331 670.552 97.2924C669.489 104.422 664.253 109.723 656.483 110.283C643.826 111.196 630.865 111.724 616.354 110.283C608.604 109.514 603.667 104.375 602.285 97.2924C601.202 87.7207 600.641 77.7075 602.285 69.0102C603.667 61.9275 608.604 56.7887 616.354 56.0193C623.61 55.299 630.478 55.0721 637.114 55.1381ZM156.073 75.2338V92.4496H199.509V75.2338H156.073Z" fill="url(#mono-gradient)"/>

        </svg>

        {/* Loading Text */}
        <div ref={progressRef} className="mt-8 text-sm font-[var(--font-instrument-sans)] text-white/50 tracking-[0.5em] uppercase animate-pulse">
            SYSTEM INITIALIZING... 0%
        </div>

      </div>
    </div>
  );
};

export default Preloader;
