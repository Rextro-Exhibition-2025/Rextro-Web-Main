"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  CheckCircle,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import {
  getCategoryIcon,
  getCategoryLabel,
  type EventData,
} from "@/lib/eventData";

interface EventModalProps {
  event: EventData;
  onClose: () => void;
}

const EventsModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const html = document.documentElement;
    html.classList.add("lenis-stopped");

    const tl = gsap.timeline();
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    ).fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.95, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power4.out" },
      "-=0.2"
    );

    return () => {
      document.body.style.overflow = "";
      html.classList.remove("lenis-stopped");
    };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 40,
      duration: 0.3,
      ease: "power2.in",
    }).to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  };

  const dayLabels = {
    1: "Dec 05",
    2: "Dec 06",
    3: "Dec 07",
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-hidden"
      data-lenis-prevent
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[90vh] rounded-[2rem] bg-[#050505] border border-white/10 shadow-2xl overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20"
        style={{
          boxShadow: `0 0 0 1px rgba(255, 255, 255, 0.03), 0 40px 80px -20px rgba(0, 0, 0, 0.8)`
        }}
      >
        {/* Ambient Glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 opacity-20 pointer-events-none blur-[100px]"
          style={{ background: `radial-gradient(circle at 50% 0%, ${event.color}, transparent 70%)` }} 
        />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="sticky top-6 right-6 ml-auto z-50 w-10 h-10 rounded-full bg-black/50 hover:bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 hover:rotate-90"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-6 sm:px-12 pb-12 -mt-10">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center space-y-8 pt-12">
            
            {/* Hero Icon/Image */}
            <div className="relative group">
              <div 
                className="absolute inset-0 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                style={{ backgroundColor: event.color }}
              />
              {event.image ? (
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden p-4 backdrop-blur-sm shadow-2xl">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={140}
                    height={140}
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                <div
                  className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-black/40 border border-white/10 flex items-center justify-center text-5xl sm:text-6xl backdrop-blur-sm shadow-2xl"
                  style={{ color: event.color }}
                >
                  {getCategoryIcon(event.category)}
                </div>
              )}
            </div>

            {/* Title & Badges */}
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap justify-center gap-2">
                <span
                  className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border bg-white/5 backdrop-blur-sm"
                  style={{ borderColor: `${event.color}40`, color: event.color }}
                >
                  {getCategoryLabel(event.category)}
                </span>
                <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-zinc-300">
                  Day {event.day}
                </span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                {event.title}
              </h2>
            </div>

            {/* Info Strip */}
            <div className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm sm:text-base text-zinc-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-zinc-500" />
                <span>{dayLabels[event.day]}</span>
              </div>
              <div className="w-px h-4 bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-zinc-500" />
                <span>{event.startTime} - {event.endTime}</span>
              </div>
              <div className="w-px h-4 bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span>{event.venue}</span>
              </div>
              {event.capacity && event.category !== "zone-session" && (
                <>
                  <div className="w-px h-4 bg-white/10 hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-zinc-500" />
                    <span>{event.capacity} Seats</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-12 space-y-12">
            
            {/* Description */}
            <div className="text-center sm:text-left">
              <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-light">
                {event.description}
              </p>
            </div>

            {/* Highlights */}
            {event.highlights.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 text-center sm:text-left flex items-center gap-4">
                  <Sparkles className="w-4 h-4" /> Highlights
                  <div className="h-px flex-1 bg-white/10" />
                </h3>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  {event.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" style={{ color: event.color }} />
                      <span className="text-zinc-300 text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Speaker Section */}
            {event.speaker && (
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-zinc-400">
                    <User className="w-8 h-8" />
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">Presented By</div>
                    <h3 className="text-xl font-bold text-white">{event.speaker.name}</h3>
                    <p className="text-zinc-400">{event.speaker.title}</p>
                    <p className="text-sm text-zinc-500 mt-1">{event.speaker.organization}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Registration */}
            {event.category === "zone-session" && (event.registrationLink || event.form) && (
              <div className="space-y-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Registration</h3>
                  <a 
                    href={event.registrationLink || event.form} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    Open in new tab <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                
                <div className="w-full h-[600px] rounded-2xl overflow-hidden bg-white border border-white/10 shadow-lg relative">
                  <iframe
                    src={event.registrationLink || event.form}
                    className="w-full h-full"
                    title="Registration Form"
                    frameBorder="0"
                  />
                  <div className="absolute inset-0 -z-10 flex items-center justify-center bg-zinc-100 text-zinc-400">
                    Loading Form...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsModal;
