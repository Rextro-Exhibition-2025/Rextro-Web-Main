"use client";

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Zone interface matching the API response
interface Zone {
  zone_id: string;
  zone_name: string;
  description: string;
  longitude: number;
  latitude: number;
  tags_array: string[];
  margin: number[][];
  marker_color: string;
  boundary_color: string;
  fill_color: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    sessions: number;
    projects: number;
  };
}

interface InteractiveMapCanvasProps {
  initialScale?: number;
  minScale?: number;
  maxScale?: number;
}

// Dynamically import the map component to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);
const Polygon = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polygon),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import('react-leaflet').then((mod) => mod.CircleMarker),
  { ssr: false }
);

const InteractiveMapCanvas: React.FC<InteractiveMapCanvasProps> = () => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [mapReady, setMapReady] = useState(false);

  // Fetch zones data from API
  useEffect(() => {
    const fetchZones = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://rextro-prod-api.internalbuildtools.online/zones?page=1&limit=60&sortBy=createdAt&sortOrder=desc'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch zones');
        }
        const data = await response.json();
        setZones(data.zones || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchZones();
  }, []);

  // Load Leaflet CSS on client side
  useEffect(() => {
    // Import Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    setMapReady(true);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Calculate map center from zones
  const mapCenter = useMemo(() => {
    if (zones.length === 0) {
      return [6.0794, 80.1920] as [number, number]; // Default starting point
    }

    const avgLat = zones.reduce((sum, z) => sum + z.latitude, 0) / zones.length;
    const avgLng = zones.reduce((sum, z) => sum + z.longitude, 0) / zones.length;
    return [avgLat, avgLng] as [number, number];
  }, [zones]);

  // Calculate appropriate zoom level based on zone spread
  const zoomLevel = useMemo(() => {
    if (zones.length === 0) return 56;

    const lats = zones.map(z => z.latitude);
    const lngs = zones.map(z => z.longitude);
    const latSpread = Math.max(...lats) - Math.min(...lats);
    const lngSpread = Math.max(...lngs) - Math.min(...lngs);
    const maxSpread = Math.max(latSpread, lngSpread);

    if (maxSpread > 1) return 12;
    if (maxSpread > 0.5) return 13;
    if (maxSpread > 0.1) return 15;
    if (maxSpread > 0.05) return 16;
    return 17;
  }, [zones]);

  // Convert margin array to Leaflet polygon format [lat, lng]
  const getPolygonPositions = (margin: number[][]): [number, number][] => {
    return margin.map(point => [point[1], point[0]] as [number, number]);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl group">
      {/* Loading State */}
      {(loading || !mapReady) && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 z-[1000]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-white text-sm">Loading map data...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 z-[1000]">
          <div className="flex flex-col items-center gap-4 text-center px-4">
            <svg className="w-12 h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-white text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Leaflet Map */}
      {mapReady && !error && (
        <MapContainer
          center={mapCenter}
          zoom={zoomLevel}
          className="w-full h-full z-0"
          style={{ background: '#1a1a1a' }}
          scrollWheelZoom={true}
          zoomControl={true}
        >
          {/* Dark theme map tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {/* Render zone polygons */}
          {zones.map(zone => (
            zone.margin && zone.margin.length > 2 && (
              <Polygon
                key={`polygon-${zone.zone_id}`}
                positions={getPolygonPositions(zone.margin)}
                pathOptions={{
                  color: zone.boundary_color,
                  fillColor: zone.fill_color.replace('rgba', '').replace(')', '').split(',').slice(0, 3).join(',') + ')',
                  fillOpacity: 0.4,
                  weight: 2,
                }}
                eventHandlers={{
                  click: () => setSelectedZone(zone),
                }}
              />
            )
          ))}

          {/* Render zone markers */}
          {zones.map(zone => (
            <CircleMarker
              key={`marker-${zone.zone_id}`}
              center={[zone.latitude, zone.longitude]}
              radius={10}
              pathOptions={{
                color: '#ffffff',
                fillColor: zone.marker_color,
                fillOpacity: 1,
                weight: 2,
              }}
              eventHandlers={{
                click: () => setSelectedZone(zone),
              }}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-bold text-sm mb-1">{zone.zone_name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{zone.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {zone.tags_array.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 bg-gray-200 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>{zone._count.sessions} Sessions</span>
                    <span>{zone._count.projects} Projects</span>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      )}

      {/* Selected Zone Info Panel */}
      {selectedZone && (
        <div className="absolute bottom-6 left-6 max-w-xs bg-black/80 backdrop-blur-md border border-white/20 rounded-xl p-4 z-[1000] animate-[fadeIn_0.2s_ease-out]">
          <button
            onClick={() => setSelectedZone(null)}
            className="absolute top-2 right-2 text-white/60 hover:text-white"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: selectedZone.marker_color }}
            />
            <h3 className="text-white font-semibold text-sm truncate pr-4">
              {selectedZone.zone_name}
            </h3>
          </div>
          <p className="text-zinc-400 text-xs mb-3 line-clamp-2">
            {selectedZone.description}
          </p>
          <div className="flex flex-wrap gap-1 mb-3">
            {selectedZone.tags_array.map((tag, idx) => (
              <span 
                key={idx}
                className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-zinc-500">
            <span>{selectedZone._count.sessions} Sessions</span>
            <span>{selectedZone._count.projects} Projects</span>
          </div>
        </div>
      )}

      {/* Zone Legend */}
      <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/10 z-[1000] hidden lg:block">
        <h4 className="text-white text-xs font-semibold mb-2">Zones ({zones.length})</h4>
        <div className="space-y-1">
          {zones.slice(0, 10).map(zone => (
            <button
              key={zone.zone_id}
              onClick={() => setSelectedZone(zone)}
              className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded transition-colors ${
                selectedZone?.zone_id === zone.zone_id 
                  ? 'bg-white/20' 
                  : 'hover:bg-white/10'
              }`}
            >
              <div 
                className="w-2 h-2 rounded-full shrink-0" 
                style={{ backgroundColor: zone.marker_color }}
              />
              <span className="text-white/80 text-xs truncate">
                {zone.zone_name}
              </span>
            </button>
          ))}
          {zones.length > 10 && (
            <p className="text-zinc-500 text-xs px-2">+{zones.length - 10} more</p>
          )}
        </div>
      </div>

      {/* Instructions Overlay */}
      <div className="absolute top-6 left-6 pointer-events-none opacity-70 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10 z-[1000]">
        <p className="text-xs text-white font-medium">
          Scroll to Zoom • Drag to Pan • Click markers for details
        </p>
      </div>
    </div>
  );
};

export default InteractiveMapCanvas;
