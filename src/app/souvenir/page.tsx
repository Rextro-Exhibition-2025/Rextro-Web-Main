'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const SouvenirBook = dynamic(
  () => import('@/components/Souvenir/SouvenirBook'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#111113] flex items-center justify-center">
         <div className="flex flex-col items-center gap-4 text-indigo-500">
             <Loader2 className="animate-spin w-8 h-8" />
             <span className="text-sm tracking-widest uppercase">Loading Souvenir...</span>
         </div>
      </div>
    )
  }
);

export default function Page() {
  return <SouvenirBook />;
}
