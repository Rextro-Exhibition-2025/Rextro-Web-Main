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

// Parking interface matching the Parking Management API
interface Parking {
  _id: string;
  parkingName: string;
  totalSlots: number;
  availableSlots: number;
  isAvailable: boolean;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
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
  const [parkings, setParkings] = useState<Parking[]>([]);
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

  // Fetch parking data from API
  useEffect(() => {
    const fetchParkings = async () => {
      try {
        const response = await fetch(
          'https://crowd-handling-backend.vercel.app/api/parkings'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch parking data');
        }
        const data = await response.json();
        if (data.success && data.data) {
          setParkings(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch parking data:', err);
        // Don't set error state for parking - zones will still work
      }
    };

    fetchParkings();

    // Refresh parking data every 30 seconds
    const interval = setInterval(fetchParkings, 30000);
    return () => clearInterval(interval);
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

  // Helper function to find matching parking for a zone by name similarity
  const findMatchingParking = (zoneName: string): Parking | null => {
    if (!parkings.length) return null;
    
    const normalizedZoneName = zoneName.toLowerCase().trim();
    
    // First, try exact match
    const exactMatch = parkings.find(
      p => p.parkingName.toLowerCase().trim() === normalizedZoneName
    );
    if (exactMatch) return exactMatch;
    
    // Then, try if parking name contains zone name or vice versa
    const partialMatch = parkings.find(
      p => p.parkingName.toLowerCase().includes(normalizedZoneName) ||
           normalizedZoneName.includes(p.parkingName.toLowerCase())
    );
    if (partialMatch) return partialMatch;
    
    // Try matching by key words (split and match)
    const zoneWords = normalizedZoneName.split(/[\s\-_]+/).filter(w => w.length > 2);
    const wordMatch = parkings.find(p => {
      const parkingWords = p.parkingName.toLowerCase().split(/[\s\-_]+/);
      return zoneWords.some(zw => parkingWords.some(pw => pw.includes(zw) || zw.includes(pw)));
    });
    
    return wordMatch || null;
  };

  // Get parking availability color
  const getParkingColor = (parking: Parking): string => {
    const availabilityPercentage = parking.totalSlots > 0 
      ? (parking.availableSlots / parking.totalSlots) * 100 
      : 0;
    return parking.isAvailable 
      ? availabilityPercentage > 50 
        ? '#10B981' 
        : availabilityPercentage > 20 
          ? '#F59E0B' 
          : '#EF4444'
      : '#6B7280';
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
                  click: () => {
                    setSelectedZone(zone);
                  },
                }}
              />
            )
          ))}

          {/* Render zone markers */}
          {zones.map(zone => {
            const matchingParking = findMatchingParking(zone.zone_name);
            const hasParking = !!matchingParking;
            
            return (
              <CircleMarker
                key={`marker-${zone.zone_id}`}
                center={[zone.latitude, zone.longitude]}
                radius={hasParking ? 14 : 10}
                pathOptions={{
                  color: hasParking ? getParkingColor(matchingParking!) : '#ffffff',
                  fillColor: zone.marker_color,
                  fillOpacity: 1,
                  weight: hasParking ? 4 : 2,
                }}
                eventHandlers={{
                  click: () => {
                    setSelectedZone(zone);
                  },
                  mouseover: (e) => {
                    e.target.setStyle({ radius: hasParking ? 16 : 12 });
                  },
                  mouseout: (e) => {
                    e.target.setStyle({ radius: hasParking ? 14 : 10 });
                  },
                }}
              >
                <Popup maxWidth={280} className="custom-popup">
                  <div className="min-w-[260px]">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-base mb-0 pr-2">{zone.zone_name}</h3>
                      {matchingParking && (
                        <div className={`px-2 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap ${matchingParking.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {matchingParking.isAvailable ? '🅿️ Open' : '🅿️ Full'}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{zone.description}</p>
                    
                    {/* Parking Info if available */}
                    {matchingParking && (
                      <div className="mb-3 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-300 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-bold text-blue-900">{matchingParking.parkingName}</span>
                        </div>
                        
                        <div className="bg-white rounded-md p-2 mb-2">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs font-medium text-gray-700">Available Slots</span>
                            <span className="text-lg font-bold text-blue-900">
                              {matchingParking.availableSlots}
                              <span className="text-sm text-gray-500 font-normal">/{matchingParking.totalSlots}</span>
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div 
                              className="h-2.5 rounded-full transition-all duration-300 relative"
                              style={{ 
                                width: `${matchingParking.totalSlots > 0 ? (matchingParking.availableSlots / matchingParking.totalSlots) * 100 : 0}%`,
                                backgroundColor: getParkingColor(matchingParking)
                              }}
                            >
                              <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-1.5">
                            <span className="text-[11px] text-gray-600">
                              {matchingParking.totalSlots - matchingParking.availableSlots} occupied
                            </span>
                            <span className="text-[11px] font-semibold" style={{ color: getParkingColor(matchingParking) }}>
                              {matchingParking.totalSlots > 0 ? ((matchingParking.availableSlots / matchingParking.totalSlots) * 100).toFixed(0) : 0}% available
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Updates every 30 seconds</span>
                        </div>
                      </div>
                    )}
                    
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
            );
          })}
        </MapContainer>
      )}

      {/* Selected Zone Info Panel */}
      {selectedZone && (() => {
        const matchingParking = findMatchingParking(selectedZone.zone_name);
        return (
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
            
            {/* Parking Info Section */}
            {matchingParking && (
              <div className="mb-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-400 text-xs font-semibold">Parking: {matchingParking.parkingName}</span>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-400 text-xs">Available Slots</span>
                  <span className="text-white font-bold">
                    {matchingParking.availableSlots}
                    <span className="text-zinc-500 font-normal">/{matchingParking.totalSlots}</span>
                  </span>
                </div>
                
                <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden mb-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${matchingParking.totalSlots > 0 ? (matchingParking.availableSlots / matchingParking.totalSlots) * 100 : 0}%`,
                      backgroundColor: getParkingColor(matchingParking)
                    }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${matchingParking.isAvailable ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {matchingParking.isAvailable ? '● Available' : '● Full'}
                  </span>
                  <span className="text-zinc-500 text-xs">
                    {matchingParking.totalSlots > 0 ? ((matchingParking.availableSlots / matchingParking.totalSlots) * 100).toFixed(0) : 0}% free
                  </span>
                </div>
              </div>
            )}
            
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
        );
      })()}

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
