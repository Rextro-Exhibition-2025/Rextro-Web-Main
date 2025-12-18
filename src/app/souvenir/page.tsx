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

// Polyfill Promise.withResolvers for pdfjs-dist v4+ compatibility
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
const SouvenirPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState(1);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  
  // Dimensions
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 600 });
  
  // Use useRef instead of useState for the book instance to avoid re-render loops
  const bookRef = useRef<any>(null); 

  const PDF_URL = "/PRINT EXPORT 1.pdf";

  useEffect(() => {
    setIsMounted(true);
    
    // Responsive Resize Logic
    const handleResize = () => {
        if (containerRef.current) {
            const { clientWidth, clientHeight } = containerRef.current;
            // Calculate best fit dimensions for a SINGLE PAGE
            // Let's assume A4ish ratio (0.707) roughly
            const targetRatio = 0.707; 
            
            const isMobile = window.innerWidth < 768;
            
            let w, h;
            
            if (!isMobile) {
                // Desktop: We need room for TWO pages side by side
                const availablePageWidth = (clientWidth - 100) / 2;
                const availablePageHeight = clientHeight - 80;
                
                if (availablePageWidth / availablePageHeight > targetRatio) {
                    h = availablePageHeight;
                    w = h * targetRatio;
                } else {
                    w = availablePageWidth;
                    h = w / targetRatio;
                }
            } else {
                 // Mobile
                 const availablePageWidth = clientWidth - 40;
                 const availablePageHeight = clientHeight - 100;

                 if (availablePageWidth / availablePageHeight > targetRatio) {
                    h = availablePageHeight;
                    w = h * targetRatio;
                 } else {
                    w = availablePageWidth;
                    h = w / targetRatio;
                 }
            }

            setDimensions({ width: Math.floor(w), height: Math.floor(h) });
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial
    
    // Short delay to ensure container is ready
    setTimeout(handleResize, 100);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


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


  if (!isMounted) return <div className="min-h-screen bg-[#111113]" />;

  return (
    <div className="flex flex-col h-screen bg-[#222] text-slate-300 overflow-hidden font-sans select-none">
       
       {/* Navbar */}
       <nav className="h-16 border-b border-white/5 bg-black/40 flex items-center justify-between px-6 backdrop-blur-md z-[100] shrink-0">
          <div className="flex items-center gap-4">
             <span className="text-white font-bold tracking-tight">Souvenir</span>
             {numPages > 0 && <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                Page {currentPageIndex + 1} of {numPages}
             </span>}
          </div>
          <div className="flex items-center gap-3">
             <a href={PDF_URL} download className="text-slate-400 hover:text-white transition-colors"><Download size={20}/></a>
          </div>
       </nav>

       {/* Book Area */}
       <div className="flex-1 relative flex items-center justify-center bg-[#1a1a1e] overflow-hidden" ref={containerRef}>
            <Document
                file={PDF_URL}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="flex flex-col items-center gap-4 text-indigo-500">
                        <Loader2 className="animate-spin w-10 h-10" />
                        <span className="text-sm tracking-widest uppercase">Loading Book...</span>
                    </div>
                }
                className="flex items-center justify-center"
            >
                {numPages > 0 && dimensions.width > 0 && (
                    <HTMLFlipBook
                        width={dimensions.width}
                        height={dimensions.height}
                        size="fixed"
                        minWidth={200}
                        maxWidth={1400}
                        minHeight={300}
                        maxHeight={1800}
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
                        flippingTime={1000}
                        usePortrait={window.innerWidth < 768} 
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
                            />
                        ))}
                    </HTMLFlipBook>
                )}
            </Document>

            {/* Navigation Buttons (Absolute) */}
            <button 
                className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-50 shadow-xl"
                // @ts-ignore
                onClick={() => bookRef.current?.pageFlip().flipPrev()}
            >
                <ChevronLeft />
            </button>
            <button 
                className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-50 shadow-xl"
                // @ts-ignore
                onClick={() => bookRef.current?.pageFlip().flipNext()}
            >
                <ChevronRight />
            </button>
       </div>
    </div>
  );
};

export default SouvenirPage;
