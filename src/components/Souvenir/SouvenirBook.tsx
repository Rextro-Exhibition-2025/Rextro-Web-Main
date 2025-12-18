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
const Page = forwardRef<HTMLDivElement, { pageNumber: number; width: number; height: number; scale: number }>((props, ref) => {
  return (
    <div className="page bg-white shadow-sm overflow-hidden" ref={ref} data-density="soft">
        <div className="relative w-full h-full">
            <PdfPage 
                pageNumber={props.pageNumber} 
                width={props.width}
                scale={props.scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="pointer-events-none select-none !w-full !h-full object-contain"
                loading={
                    <div className="flex items-center justify-center w-full h-full bg-slate-50 text-slate-400">
                        <Loader2 className="animate-spin w-8 h-8 opacity-20" />
                    </div>
                }
            />
            {/* Inner Page Gradient for Curvature Depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
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
                {numPages > 0 && pdfSize && dimensions.width > 0 && (
                     <div className="relative z-10">
                        <HTMLFlipBook
                            width={dimensions.width}
                            height={dimensions.height}
                            size="fixed"
                            minWidth={100}
                            maxWidth={2500}
                            minHeight={100}
                            maxHeight={2500}
                            maxShadowOpacity={0.5}
                            showCover={true}
                            mobileScrollSupport={true}
                            onFlip={(e) => setCurrentPageIndex(e.data)}
                            // @ts-ignore
                            ref={bookRef}
                            className="shadow-2xl"
                            style={{ margin: '0 auto' }}
                            startPage={0}
                            drawShadow={true}
                            flippingTime={800}
                            usePortrait={window.innerWidth < 1000} 
                            startZIndex={0}
                            autoSize={true}
                            clickEventForward={true}
                            useMouseEvents={true}
                            swipeDistance={30}
                            showPageCorners={false}
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
                                />
                            ))}
                        </HTMLFlipBook>
                     </div>
                )}
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
