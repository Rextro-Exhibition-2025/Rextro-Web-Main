"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const PostponeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("hasSeenPostponeModal");
    if (!hasSeenModal) {
      setIsOpen(true);
      sessionStorage.setItem("hasSeenPostponeModal", "true");
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
            className="relative w-full max-w-lg bg-[#050505] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10 backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="relative w-full aspect-[4/5] sm:aspect-square">
              <Image
                src="/rextroMobileApp.png"
                alt="Rextro Mobile App"
                fill
                className="object-cover"
                priority
              />
              
              {/* Download Buttons Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col items-center gap-3">
                <div className="text-white text-sm font-medium mb-1">Download Now</div>
                <div className="flex gap-3">
                  <a 
                    href="https://apps.apple.com/lk/app/rextro/id6755657827"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-32 h-10 hover:scale-105 transition-transform"
                  >
                    <Image
                      src="/livetype.svg"
                      alt="Download on App Store"
                      fill
                      className="object-contain"
                    />
                  </a>
                  <a 
                    href="https://drive.google.com/file/d/1spcLz2L6FJdYIUPDv1M_GNgVPDZdejSU/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-32 h-10 hover:scale-105 transition-transform"
                  >
                    <Image
                      src="/GetItOnGooglePlay_Badge_Web_color_English-01 1.svg"
                      alt="Get it on Google Play"
                      fill
                      className="object-contain"
                    />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PostponeModal;
