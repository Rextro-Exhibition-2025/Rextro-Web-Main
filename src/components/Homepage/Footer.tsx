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
    <footer className="relative w-full bg-white text-gray-900 overflow-hidden pt-20 pb-10 border-t border-black/10">
      {/* Background Gradient/Watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-emerald-100/30 blur-[100px]" />
        <h1 className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 text-[15vw] font-bold text-black/[0.03] whitespace-nowrap select-none font-[var(--font-instrument)]">
          REXTR0 2025
        </h1>
      </div>

      <div className="relative z-10 mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Section - Logos */}
          <div className="flex flex-col items-center lg:items-start gap-8">
            <div className="flex items-center gap-6 p-4 rounded-2xl bg-gray-50 backdrop-blur-sm border border-black/5">
              <Image
                src={"/navbar/nav-icon.png"}
                height={60}
                width={60}
                alt="ReXtro Logo"
                className="object-contain"
              />
              <div className="w-px h-10 bg-black/10" />
              <Image
                src={"/Logo Image.png"}
                height={50}
                width={40}
                alt="Logo"
                className="object-contain"
              />
              <Image
                src={"/ruhuna_eng_logo 1.png"}
                height={50}
                width={40}
                alt="University of Ruhuna Engineering Faculty"
                className="object-contain"
              />
            </div>
            
            <div className="text-center lg:text-left max-w-md">
              <p className="text-gray-500 text-sm leading-relaxed">
                The largest techno-management exhibition in Southern Sri Lanka, organized by the Faculty of Engineering, University of Ruhuna.
              </p>
            </div>
          </div>

          {/* Right Section - ReXtro 2025 Logo & Socials */}
          <div className="flex flex-col items-center lg:items-end gap-8">
            <div className="relative w-64 h-16">
              <Image
                src="/Hero/logo2.png"
                alt="ReXtro 2025"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-50 border border-black/5 hover:border-black/10 transition-colors cursor-pointer"
                    >
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600 text-sm font-medium">
                        {social.label}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 ReXtro. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
