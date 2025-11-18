'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

const sponsors = [
  { id: 1, name: 'Sponsor 1', logo: '/sponsors/sponsor1.png' },
  { id: 2, name: 'Sponsor 2', logo: '/sponsors/sponsor2.png' },
  { id: 3, name: 'Sponsor 3', logo: '/sponsors/sponsor3.png' },
  { id: 4, name: 'Sponsor 4', logo: '/sponsors/sponsor4.png' },
  { id: 5, name: 'Sponsor 5', logo: '/sponsors/sponsor5.png' },
  { id: 6, name: 'Sponsor 6', logo: '/sponsors/sponsor6.png' },
  { id: 7, name: 'Sponsor 7', logo: '/sponsors/sponsor7.png' },
  { id: 8, name: 'Sponsor 8', logo: '/sponsors/sponsor8.png' },
];

const Sponsors = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout;
    let animationFrame: number;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    // Start scrolling after a short delay
    scrollInterval = setTimeout(() => {
      animationFrame = requestAnimationFrame(scroll);
    }, 100);

    return () => {
      clearTimeout(scrollInterval);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="w-full py-20 sm:py-10 bg-white flex flex-col justify-start items-start gap-2 overflow-hidden">
      <div className="w-full px-4 sm:px-8 lg:px-20 bg-white border-t border-b border-neutral-900/5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-0 py-6 lg:py-0">
        {/* Title Section */}
        <div className="w-full lg:w-auto lg:flex-1 lg:max-w-xs flex justify-start items-center">
          <h2 className="text-neutral-900 text-sm sm:text-base font-semibold font-[var(--font-instrument)] leading-normal">
            The official sponsors and collaborators of ReXtro 2025.
          </h2>
        </div>

        {/* Scrolling Logos Section */}
        <div className="w-full lg:flex-1 border-t lg:border-t-0 lg:border-l border-neutral-900/5 flex justify-start items-center overflow-hidden pt-6 lg:pt-0">
          <div
            ref={scrollRef}
            className="flex justify-start items-center gap-0 overflow-x-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {/* Duplicate sponsors array for infinite scroll effect */}
            {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
              <div
                key={`${sponsor.id}-${index}`}
                className="min-w-[180px] sm:min-w-[224px] h-24 sm:h-32 relative border-r border-neutral-900/5 flex items-center justify-center p-4 sm:p-6"
              >
                {/* Gradient overlay for visual effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/5 to-black/0 pointer-events-none" />

                {/* Logo placeholder - replace with actual logos */}
                <div className="relative w-28 sm:w-36 h-12 sm:h-16 flex items-center justify-center">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      // Fallback to a placeholder if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-neutral-100 rounded-lg">
                          <span class="text-neutral-400 text-xs font-medium">${sponsor.name}</span>
                        </div>`;
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
