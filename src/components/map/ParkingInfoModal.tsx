"use client";

import React, { useEffect, useState } from "react";
import { X, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const ParkingInfoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the modal has been seen in this session
    const hasSeenParkingModal = sessionStorage.getItem("hasSeenParkingInfoModal");
    if (!hasSeenParkingModal) {
      // Small delay to allow page transition to complete
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenParkingInfoModal", "true");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center space-y-6">
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <div className="w-8 h-8 flex items-center justify-center bg-purple-500 rounded-lg text-white font-bold text-lg shadow-lg shadow-purple-500/30">
                  P
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white font-[var(--font-instrument)]">
                  Parking Information
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Click on the <span className="text-purple-400 font-medium">purple parking dots</span> on the map to see real-time availability of parking slots.
                </p>
                <div className="w-full h-px bg-white/10 my-4" />
                <p className="text-zinc-400 text-sm leading-relaxed">
                  For navigation assistance to the venue, please use our mobile app.
                </p>
              </div>

              {/* Action Button */}
              <Link
                href="/mobile-app"
                target="_blank"
                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-medium shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Get Rextro Mobile App</span>
              </Link>
            </div>
            
            {/* Decorative background gradients */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ParkingInfoModal;
