'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      prevent: (node) => {
        // Prevent Lenis from handling scroll on modal or any overflow-auto element
        return node.closest('[data-lenis-prevent]') !== null || 
               node.closest('.overflow-y-auto') !== null ||
               node.closest('.overflow-auto') !== null;
      },
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Stop Lenis when modal is open
    const observer = new MutationObserver(() => {
      if (document.documentElement.classList.contains('lenis-stopped')) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  return null;
}
