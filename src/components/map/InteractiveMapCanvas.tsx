"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface InteractiveMapCanvasProps {
  imageSrc: string;
  altText?: string;
  initialScale?: number;
  minScale?: number;
  maxScale?: number;
}

const InteractiveMapCanvas: React.FC<InteractiveMapCanvasProps> = ({
  imageSrc,
  altText = "Map",
  initialScale = 1,
  minScale = 0.5,
  maxScale = 4,
}) => {
  const [scale, setScale] = useState(initialScale);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle Zoom with Wheel - Non-passive listener to prevent scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation(); // Stop event from bubbling up
      
      const scaleAdjustment = -e.deltaY * 0.001;
      
      setScale(prevScale => {
        const newScale = Math.min(Math.max(prevScale + scaleAdjustment, minScale), maxScale);
        return newScale;
      });
    };

    // Attach to the outer container to catch all events
    container.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', onWheel);
    };
  }, [minScale, maxScale]);

  // Handle Pan Start
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  // Handle Pan Move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setPosition({ x: newX, y: newY });
  };

  // Handle Pan End
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle Zoom Buttons
  const handleZoomIn = () => setScale(Math.min(scale + 0.2, maxScale));
  const handleZoomOut = () => setScale(Math.max(scale - 0.2, minScale));
  const handleReset = () => {
    setScale(initialScale);
    setPosition({ x: 0, y: 0 });
  };

  // Global Mouse Up to stop dragging even if cursor leaves container
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl group"
      ref={containerRef}
    >
      {/* Canvas Area */}
      <div
        ref={wrapperRef}
        className={`w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing ${isDragging ? 'cursor-grabbing' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Image Container - constrained to ensure it doesn't overflow uncontrollably */}
          <div className="relative w-full h-full max-w-[1920px] max-h-[1080px] pointer-events-none select-none">
             <Image
              src={imageSrc}
              alt={altText}
              fill
              className="object-contain"
              draggable={false}
              priority
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95"
          title="Zoom In"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95"
          title="Zoom Out"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button
          onClick={handleReset}
          className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95"
          title="Reset View"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Instructions Overlay (fades out) */}
      <div className="absolute top-6 left-6 pointer-events-none opacity-70 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
        <p className="text-xs text-white font-medium">
          Scroll to Zoom • Drag to Pan
        </p>
      </div>
    </div>
  );
};

export default InteractiveMapCanvas;
