'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import Footer from '@/components/Homepage/Footer';
import SouvenirHero from '@/components/Souvenir/SouvenirHero';
import AnimatedBackground from '@/components/common/AnimatedBackground';
import FooterTab from '@/components/common/FooterTab';

const SouvenirBook = dynamic(
  () => import('@/components/Souvenir/SouvenirBook'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
         <div className="flex flex-col items-center gap-4 text-indigo-500">
             <Loader2 className="animate-spin w-8 h-8" />
             <span className="text-sm tracking-widest uppercase">Loading Souvenir...</span>
         </div>
      </div>
    )
  }
);


export default function SouvenirPage() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-[family-name:var(--font-instrument-sans)] bg-black min-h-screen flex flex-col">
      
      {/* Hero Section */}
      <div className={`transition-all duration-1000 ${
        isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <SouvenirHero />
      </div>

      {/* Book Interactive Section */}
      <section className="relative w-full px-4 sm:px-8 lg:px-20 -mt-20 z-10 pb-20">
        {/* Animated Background for the dark section */}
        <AnimatedBackground className="top-20" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Main Book Container - Aspect Ratio matching a typical screen or book spread comfortably */}
          {/* Using a looser aspect ratio or a min-height to ensure it fits well on big screens */}
          <div className="relative w-full h-[80vh] md:h-[85vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900/50 backdrop-blur-sm opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
            <SouvenirBook />
            
            {/* Download/Action Overlay (Optional corner actions) */}
            <div className="absolute top-4 right-4 z-20">
                 <a 
                    href="/PRINT EXPORT 1 new.pdf" 
                    download 
                    className="flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-white/70 hover:text-white transition-colors"
                 >
                    <span>Download PDF</span>
                 </a>
            </div>
            
          </div>
          
          <div className="text-center mt-6 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
             <p className="text-white/40 text-sm">Use arrow keys or click edges to flip pages</p>
          </div>

        </div>
      </section>
     
      {/* Footer Decoration */}
      <FooterTab />

      {/* Footer */}
      <Footer />
    </div>
  );
}
