'use client';

import React, { useState, useEffect, useRef, forwardRef, useCallback } from 'react';
import { Document, Page as PdfPage, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import { 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  Download
} from 'lucide-react';

// Polyfill Promise.withResolvers
if (typeof Promise.withResolvers === "undefined") {
  // @ts-ignore
  Promise.withResolvers = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// ---------------------------------------------------------------------------
// PAGE COMPONENT (Required forwardRef for react-pageflip)
// ---------------------------------------------------------------------------
const Page = forwardRef<HTMLDivElement, { pageNumber: number; width: number; height: number; scale: number; totalPages: number }>((props, ref) => {
  const isCover = props.pageNumber === 1 || props.pageNumber === props.totalPages;
  const isEven = props.pageNumber % 2 === 0; 
  
  return (
    <div className={`page bg-[#fdfbf7] overflow-hidden ${isCover ? 'hard-cover' : ''}`} ref={ref} data-density={isCover ? 'hard' : 'soft'}>
        <div className="relative w-full h-full">
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none mix-blend-multiply z-10" 
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />

            <PdfPage 
                pageNumber={props.pageNumber} 
                width={props.width}
                scale={props.scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="pointer-events-none select-none !w-full !h-full object-contain relative z-0"
                loading={
                    <div className="flex items-center justify-center w-full h-full bg-slate-50 text-slate-400">
                        <Loader2 className="animate-spin w-8 h-8 opacity-20" />
                    </div>
                }
            />
            
            {/* Spine Shadow (Gutter) */}
            {/* Even (Left Page): Shadow on Right Edge */}
            {isEven && !isCover && (
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/20 via-black/5 to-transparent pointer-events-none z-20 mix-blend-multiply" />
            )}
            {/* Odd (Right Page): Shadow on Left Edge */}
            {!isEven && !isCover && (
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none z-20 mix-blend-multiply" />
            )}
            
            {/* Subtle Edge Highlight for depth */}
            <div className="absolute inset-0 border border-black/5 pointer-events-none z-30" />
        </div>
    </div>
  );
});

Page.displayName = 'Page';

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
const SouvenirBook = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState(1);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  
  // Dimensions state
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 }); // 0 init to wait for calc
  const [pdfSize, setPdfSize] = useState<{ width: number; height: number; ratio: number } | null>(null);
  const bookRef = useRef<any>(null); 

  const PDF_URL = "/PRINT EXPORT 1.pdf";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. Capture PDF Dimensions from the first page
  const onPageLoadSuccess = (page: any) => {
      if (!pdfSize) {
          const { originalWidth, originalHeight } = page;
          setPdfSize({
              width: originalWidth,
              height: originalHeight,
              ratio: originalWidth / originalHeight
          });
      }
  };

  // 2. Calculate Responsive Dimensions
  const calculateDimensions = useCallback(() => {
    if (!containerRef.current || !pdfSize) return;

    const { clientWidth, clientHeight } = containerRef.current;
    
    // Safety padding
    // Smaller padding on mobile to maximize view
    const paddingX = window.innerWidth < 768 ? 10 : 40; 
    const paddingY = 20; 
    
    const availW = clientWidth - paddingX;
    const availH = clientHeight - paddingY;

    // Target: Fit the PAGE (or SPREAD) into this box
    const isMobile = window.innerWidth < 1000;
    const isPortrait = isMobile;

    let pageW, pageH;

    if (isPortrait) {
        // Single Page View
        // Try fitting by height first
        pageH = availH;
        pageW = pageH * pdfSize.ratio;

        // If too wide, fit by width
        if (pageW > availW) {
            pageW = availW;
            pageH = pageW / pdfSize.ratio;
        }
    } else {
        // Spread View (Two Pages)
        // Total width needed = 2 * PageWidth
        // Try fitting by height first
        pageH = availH;
        pageW = pageH * pdfSize.ratio;

        // If spread (2*W) is too wide, fit by width
        if (pageW * 2 > availW) {
             pageW = availW / 2;
             pageH = pageW / pdfSize.ratio;
        }
    }

    setDimensions({ width: Math.floor(pageW), height: Math.floor(pageH) });
  }, [pdfSize]);

  useEffect(() => {
      if (!isMounted) return;
      calculateDimensions();
      window.addEventListener('resize', calculateDimensions);
      return () => window.removeEventListener('resize', calculateDimensions);
  }, [calculateDimensions, isMounted]);


  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // @ts-ignore
      if (e.key === 'ArrowRight' && bookRef.current) bookRef.current.pageFlip().flipNext();
      // @ts-ignore
      if (e.key === 'ArrowLeft' && bookRef.current) bookRef.current.pageFlip().flipPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isMounted) return <div className="w-full h-full flex items-center justify-center"><Loader2 className="animate-spin text-white/20"/></div>;

  return (
    <div className="w-full h-full relative overflow-hidden font-sans select-none">
       {/* Book Area */}
       <div className="relative w-full h-full flex items-center justify-center" ref={containerRef}>
            <Document
                file={PDF_URL}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="flex flex-col items-center gap-4 text-white/50">
                        <Loader2 className="animate-spin w-8 h-8" />
                        <span className="text-xs tracking-widest uppercase">Loading Book...</span>
                    </div>
                }
                className="flex items-center justify-center w-full h-full"
            >
                {/* 1. OFF-SCREEN MEASURING PAGE */}
                {!pdfSize && (
                    <div className="absolute inset-0 invisible pointer-events-none">
                        <PdfPage 
                            pageNumber={1} 
                            onLoadSuccess={onPageLoadSuccess}
                            className="invisible"
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </div>
                )}

                {/* 2. ACTUAL BOOK (Rendered only when we know the size) */}
                {numPages > 0 && pdfSize && dimensions.width > 0 && (() => {
                        const isPortrait = window.innerWidth < 1000;
                        const bookWidth = isPortrait ? dimensions.width : dimensions.width * 2;
                        const bookHeight = dimensions.height;

                        return (
                            <div 
                                className="relative z-10 group" 
                                style={{ width: bookWidth, height: bookHeight }}
                            >
                                {/* --- 3D BOOK STRUCTURE LAYERS --- */}
                                
                                {/* 1. Back Cover (The Hard Board) - Extends outwards */}
                                <div className="absolute -left-[14px] -right-[14px] -top-[12px] -bottom-[16px] bg-[#2a2a2a] rounded-[4px] shadow-2xl border border-white/10 z-0">
                                     {/* Subtle Texture */}
                                     <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] mix-blend-overlay rounded-[4px]" />
                                     {/* Cover Thickness Side (Bottom) */}
                                     <div className="absolute bottom-[-4px] left-[4px] right-[4px] h-[4px] bg-[#1a1a1a] rounded-b-[4px]" />
                                </div>

                                {/* 2. Page Stack (The Thickness) - Visible at bottom and sides */}
                                <div className="absolute top-[4px] bottom-[2px] left-[2px] right-[2px] z-10">
                                     {/* Left Block Stack - Hidden on Cover */}
                                     <div 
                                        className={`absolute top-0 bottom-0 left-0 w-[49.5%] bg-[#fff] ml-[1px] rounded-l-sm border-l border-b border-[#ddd] shadow-inner transition-opacity duration-500 ${currentPageIndex === 0 ? 'opacity-0' : 'opacity-100'}`} 
                                        style={{ transform: 'translateY(4px)' }}
                                     >
                                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,#000000_1px,#000000_2px)] opacity-[0.03]" /> 
                                        {/* Bottom stack gradient */}
                                        <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-gradient-to-t from-gray-200 to-transparent" />
                                     </div>
                                     
                                     {/* Right Block Stack */}
                                     <div className="absolute top-0 bottom-0 right-0 w-[49.5%] bg-[#fff] mr-[1px] rounded-r-sm border-r border-b border-[#ddd] shadow-inner" style={{ transform: 'translateY(4px)' }}>
                                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,#000000_1px,#000000_2px)] opacity-[0.03]" />
                                        <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-gradient-to-t from-gray-200 to-transparent" />
                                     </div>
                                </div>

                                {/* 3. Central Spine (The Binding) - Visible at top/bottom center */}
                                {!isPortrait && (
                                    <div className="absolute top-[-14px] bottom-[-18px] left-1/2 -translate-x-1/2 w-[40px] bg-gradient-to-r from-[#1a1a1a] via-[#333] to-[#1a1a1a] rounded-sm z-10 shadow-[inner_0_0_10px_rgba(0,0,0,0.8)] border-x border-white/5" />
                                )}

                                {/* --- ACTUAL FLIPBOOK --- */}
                                <div className="relative z-20">
                                    <HTMLFlipBook
                                        width={dimensions.width}
                                        height={dimensions.height}
                                        size="fixed"
                                        minWidth={100}
                                        maxWidth={2500}
                                        minHeight={100}
                                        maxHeight={2500}
                                        maxShadowOpacity={0.8}
                                        showCover={true}
                                        mobileScrollSupport={true}
                                        onFlip={(e) => setCurrentPageIndex(e.data)}
                                        // @ts-ignore
                                        ref={bookRef}
                                        className=""
                                        style={{ margin: '0 auto' }}
                                        startPage={0}
                                        drawShadow={true}
                                        flippingTime={1000}
                                        usePortrait={isPortrait}
                                        startZIndex={0}
                                        autoSize={true}
                                        clickEventForward={true}
                                        useMouseEvents={true}
                                        swipeDistance={30}
                                        showPageCorners={true}
                                        disableFlipByClick={false}
                                    >
                                        {/* Generate Pages */}
                                        {Array.from(new Array(numPages), (_, index) => (
                                            <Page 
                                                key={index} 
                                                pageNumber={index + 1} 
                                                width={dimensions.width}
                                                height={dimensions.height}
                                                scale={scale}
                                                totalPages={numPages}
                                            />
                                        ))}
                                    </HTMLFlipBook>
                                </div>
                            </div>
                        );
                     })()}
            </Document>

            {/* Navigation Buttons (Subtle Overlay) */}
            <button 
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[50]"
                // @ts-ignore
                onClick={() => bookRef.current?.pageFlip().flipPrev()}
            >
                <ChevronLeft size={40} className="drop-shadow-lg" />
            </button>
            <button 
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[50]"
                // @ts-ignore
                onClick={() => bookRef.current?.pageFlip().flipNext()}
            >
                <ChevronRight size={40} className="drop-shadow-lg" />
            </button>

            {/* Bottom Page Indicator */}
            {numPages > 0 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-white/30 tracking-widest font-mono z-20">
                    {currentPageIndex + 1} / {numPages}
                </div>
            )}
       </div>
    </div>
  );
};

export default SouvenirBook;
