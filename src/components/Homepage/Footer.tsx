"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, Twitter, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { 
      icon: Facebook, 
      href: "https://facebook.com/rextro25", 
      label: "Facebook",
      handle: "@rextro25"
    },
    { 
      icon: Instagram, 
      href: "https://instagram.com/rextro_2025", 
      label: "Instagram",
      handle: "@rextro_2025"
    },
    { 
      icon: Linkedin, 
      href: "https://linkedin.com/company/rextro2025", 
      label: "LinkedIn",
      handle: "rextro2025"
    },
    { 
      icon: Youtube, 
      href: "https://youtube.com/@ReXtro-UniversityofRuhuna", 
      label: "YouTube",
      handle: "@ReXtro"
    },
    { 
      icon: Twitter, 
      href: "https://x.com/ReXtro2025", 
      label: "Twitter/X",
      handle: "@ReXtro2025"
    },
    { 
      icon: MessageCircle, 
      href: "https://whatsapp.com/channel/0029VbBDlYZIHphGG82ZWq3W", 
      label: "WhatsApp",
      handle: "Channel"
    },
  ];

  return (
    <footer className="relative w-full bg-white text-gray-900 overflow-hidden">
      {/* Background Gradient/Watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <h1 className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 text-[15vw] font-bold text-black/[0.03] whitespace-nowrap select-none font-[var(--font-instrument)]">
          REXTR0 2025
        </h1>
      </div>

      <div className="relative z-10 w-full p-6 md:p-16 bg-white border-t border-black/10 backdrop-blur-[6px] flex flex-col justify-start items-center lg:items-start gap-8">
        {/* Top Section - Logos */}
        <div className="w-full backdrop-blur-[6px] flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-5">
            <Image
              src="/navbar/nav-icon.png"
              width={200}
              height={50}
              alt="ReXtro Logo"
              // className="w-72 h-11 object-contain"
            />
            <Image
              src="/Logo Image.png"
              width={43}
              height={60}
              alt="Logo"
              className="w-11 h-14 object-contain"
            />
            <Image
              src="/ruhuna_eng_logo 1.png"
              width={43}
              height={57}
              alt="University of Ruhuna Engineering Faculty"
              className="w-11 h-14 object-contain"
            />
          </div>
          <Image
            src="/Hero/logo2.png"
            width={234}
            height={56}
            alt="ReXtro 2025"
            className="w-60 h-14 object-contain"
          />
        </div>

        {/* Middle Section - Description & Social Links */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="flex-1 max-w-[500px] flex justify-center items-center gap-2">
            <p className="flex-1 text-center lg:text-left text-gray-600 text-base font-normal font-[var(--font-instrument)] leading-6">
              The largest engineering exhibition in Sri Lanka, organized by the Faculty of Engineering, University of Ruhuna.
            </p>
          </div>
          <div className="w-full lg:w-auto flex flex-col justify-start items-center lg:items-end gap-4">
            <div className="flex justify-center sm:justify-start items-center gap-4 flex-wrap">
              {socialLinks.slice(0, 3).map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-1 rounded outline outline-1 outline-offset-[-1px] outline-black/10 flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600 text-base font-normal font-[var(--font-instrument)] leading-6">
                        {social.label}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
            <div className="flex justify-center sm:justify-start items-center gap-4 flex-wrap">
              {socialLinks.slice(3, 6).map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-1 rounded outline outline-1 outline-offset-[-1px] outline-black/10 flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600 text-base font-normal font-[var(--font-instrument)] leading-6">
                        {social.label}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright & Links */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex justify-center items-center gap-2">
            <p className="text-gray-600 text-base font-normal font-[var(--font-instrument)] leading-6">
              © 2025 ReXtro. All rights reserved.
            </p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Link href="#" className="text-gray-600 text-base font-normal font-[var(--font-instrument)] underline leading-6 hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-600 text-base font-normal font-[var(--font-instrument)] underline leading-6 hover:text-black transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
