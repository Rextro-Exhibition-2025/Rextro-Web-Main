"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ZoneCard from './ZoneCard';

interface Zone {
  id: string;
  name: string;
  type: 'exhibition' | 'competition' | 'lab' | 'stage' | 'facility';
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface InteractiveMapProps {
  selectedZone: string | null;
  onZoneSelect: (zoneId: string | null) => void;
  activeFilter: string;
}

const zones: Zone[] = [
  // Exhibition Zones
  { id: 'e1', name: 'AI & Computer Vision', type: 'exhibition', description: 'Explore cutting-edge AI and computer vision projects', x: 100, y: 80, width: 180, height: 120, color: '#5CE3FF' },
  { id: 'e2', name: 'Robotics Hub', type: 'exhibition', description: 'Interactive robotics demonstrations', x: 320, y: 80, width: 180, height: 120, color: '#5CE3FF' },
  { id: 'e3', name: 'AR & VR Zone', type: 'exhibition', description: 'Immersive augmented and virtual reality experiences', x: 540, y: 80, width: 180, height: 120, color: '#5CE3FF' },
  { id: 'e4', name: 'IoT Innovation', type: 'exhibition', description: 'Internet of Things projects and smart devices', x: 100, y: 240, width: 180, height: 120, color: '#5CE3FF' },
  { id: 'e5', name: 'Renewable Energy', type: 'exhibition', description: 'Sustainable energy solutions', x: 320, y: 240, width: 180, height: 120, color: '#5CE3FF' },
  { id: 'e6', name: 'Biomedical Tech', type: 'exhibition', description: 'Healthcare and biomedical innovations', x: 540, y: 240, width: 180, height: 120, color: '#5CE3FF' },

  // Competition Areas
  { id: 'c1', name: 'MathQuest Arena', type: 'competition', description: 'Mathematical problem-solving competition', x: 100, y: 400, width: 140, height: 100, color: '#6C47FF' },
  { id: 'c2', name: 'Pitch Arena', type: 'competition', description: 'Startup pitching competition', x: 280, y: 400, width: 140, height: 100, color: '#6C47FF' },
  { id: 'c3', name: 'Code Battle', type: 'competition', description: 'Programming competition arena', x: 460, y: 400, width: 140, height: 100, color: '#6C47FF' },

  // Innovation Labs
  { id: 'l1', name: 'Fabrication Lab', type: 'lab', description: '3D printing and fabrication facilities', x: 640, y: 400, width: 120, height: 100, color: '#FF6B35' },
  { id: 'l2', name: 'Electronics Lab', type: 'lab', description: 'PCB design and electronics workspace', x: 100, y: 540, width: 120, height: 80, color: '#FF6B35' },

  // Main Stages
  { id: 's1', name: 'Main Stage', type: 'stage', description: 'Primary presentation and performance stage', x: 280, y: 540, width: 200, height: 80, color: '#10B981' },
  { id: 's2', name: 'Demo Stage', type: 'stage', description: 'Live demonstrations and showcases', x: 520, y: 540, width: 160, height: 80, color: '#10B981' },

  // Facilities
  { id: 'f1', name: 'Food Court', type: 'facility', description: 'Refreshments and dining area', x: 700, y: 540, width: 100, height: 80, color: '#94A3B8' },
  { id: 'f2', name: 'Registration', type: 'facility', description: 'Visitor registration and information', x: 40, y: 80, width: 50, height: 60, color: '#94A3B8' },
  { id: 'f3', name: 'Info Desk', type: 'facility', description: 'General information and help desk', x: 40, y: 240, width: 50, height: 60, color: '#94A3B8' },
];

const InteractiveMap: React.FC<InteractiveMapProps> = ({ selectedZone, onZoneSelect, activeFilter }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  const filteredZones = zones.filter(zone =>
    activeFilter === 'all' || zone.type === activeFilter
  );

  useEffect(() => {
    // Animate zones on mount
    filteredZones.forEach((zone, idx) => {
      gsap.fromTo(
        `#zone-${zone.id}`,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: idx * 0.05,
          ease: 'back.out(1.7)'
        }
      );
    });
  }, [activeFilter]);

  const handleZoneClick = (zoneId: string) => {
    onZoneSelect(zoneId === selectedZone ? null : zoneId);

    // Pulse animation on click
    gsap.fromTo(
      `#zone-${zoneId}`,
      { scale: 1 },
      { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 }
    );
  };

  const handleZoneHover = (zoneId: string | null) => {
    setHoveredZone(zoneId);

    if (zoneId) {
      gsap.to(`#zone-${zoneId}`, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleZoneLeave = (zoneId: string) => {
    if (zoneId !== selectedZone) {
      gsap.to(`#zone-${zoneId}`, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(0.5, scale + delta), 3);
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const selectedZoneData = zones.find(z => z.id === selectedZone);

  return (
    <div className="relative">
      {/* Map Container */}
      <div
        className="relative w-full h-[600px] lg:h-[700px] rounded-2xl overflow-hidden bg-[#0A0A0C] border border-white/10"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
      >
        {/* SVG Map */}
        <svg
          ref={svgRef}
          viewBox="0 0 840 660"
          className="w-full h-full"
          style={{
            transform: `scale(${scale}) translate(${pan.x / scale}px, ${pan.y / scale}px)`,
            transformOrigin: 'center center',
            transition: isPanning ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {/* Grid Background */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>

            {/* Glowing filters for zones */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <rect width="840" height="660" fill="url(#grid)" />

          {/* Pathways */}
          <g opacity="0.3">
            <line x1="100" y1="200" x2="720" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="100" y1="360" x2="720" y2="360" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="290" y1="80" x2="290" y2="620" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="510" y1="80" x2="510" y2="620" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5" />
          </g>

          {/* Zone Rectangles */}
          {filteredZones.map((zone) => {
            const isSelected = zone.id === selectedZone;
            const isHovered = zone.id === hoveredZone;

            return (
              <g
                key={zone.id}
                id={`zone-${zone.id}`}
                onClick={() => handleZoneClick(zone.id)}
                onMouseEnter={() => handleZoneHover(zone.id)}
                onMouseLeave={() => handleZoneLeave(zone.id)}
                style={{ cursor: 'pointer', transformOrigin: `${zone.x + zone.width / 2}px ${zone.y + zone.height / 2}px` }}
              >
                {/* Zone Rectangle */}
                <rect
                  x={zone.x}
                  y={zone.y}
                  width={zone.width}
                  height={zone.height}
                  rx="8"
                  fill={isSelected || isHovered ? zone.color : `${zone.color}30`}
                  stroke={zone.color}
                  strokeWidth={isSelected ? "3" : "2"}
                  filter={isSelected || isHovered ? "url(#glow)" : "none"}
                  className="transition-all duration-300"
                />

                {/* Zone Label */}
                <text
                  x={zone.x + zone.width / 2}
                  y={zone.y + zone.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="600"
                  className="pointer-events-none select-none"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                >
                  {zone.name}
                </text>

                {/* Pulse animation for selected zone */}
                {isSelected && (
                  <rect
                    x={zone.x - 5}
                    y={zone.y - 5}
                    width={zone.width + 10}
                    height={zone.height + 10}
                    rx="8"
                    fill="none"
                    stroke={zone.color}
                    strokeWidth="2"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="stroke-width"
                      values="2;4;2"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.5;0.2;0.5"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </rect>
                )}
              </g>
            );
          })}
        </svg>

        {/* Controls Overlay */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => setScale(Math.min(scale + 0.2, 3))}
            className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Zoom in"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={() => setScale(Math.max(scale - 0.2, 0.5))}
            className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Zoom out"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={() => { setScale(1); setPan({ x: 0, y: 0 }); }}
            className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Reset view"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10C16 13.3137 13.3137 16 10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 16L4 16L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Instructions */}
        <div className="absolute top-4 left-4 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-zinc-400 text-sm">
          Click zones for details • Scroll to zoom • Drag to pan
        </div>
      </div>

      {/* Zone Detail Card */}
      {selectedZoneData && (
        <div className="mt-6">
          <ZoneCard
            zone={selectedZoneData}
            onClose={() => onZoneSelect(null)}
          />
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
