"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, Twitter, MessageCircle } from "lucide-react";

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
    <footer className="w-full px-4 sm:px-8 lg:px-16 py-6 sm:py-8 bg-white border-t border-black/10 backdrop-blur-[6px] flex flex-col justify-start items-start gap-4">
      {/* Top Section - Logos */}
      <div className="w-full backdrop-blur-[6px] flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
        {/* Left Section - Logo Group */}
        <div className="inline-flex justify-start items-center gap-5">
          <Image
            src={"/navbar/nav-icon.png"}
            height={200}
            width={200}
            alt="ReXtro Logo"
            className="object-contain"
          />
          <Image
            src={"/Logo Image.png"}
            height={200}
            width={32}
            alt="Logo"
            className="object-contain"
          />
          <Image
            src={"/ruhuna_eng_logo 1.png"}
            height={200}
            width={32}
            alt="University of Ruhuna Engineering Faculty"
            className="object-contain"
          />
        </div>

        {/* Right Section - ReXtro 2025 Logo */}
        <div className="relative w-full sm:w-60 h-12 sm:h-14 flex items-center justify-center">
          <Image
            src="/Hero/logo2.png"
            alt="ReXtro 2025"
            height={200}
            width={200}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Bottom Section - Social Media Links */}
      <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors group"
              aria-label={social.label}
            >
              <Icon className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
              <span className="text-gray-600 text-sm font-normal font-[var(--font-instrument)] leading-6 group-hover:text-gray-900 transition-colors">
                {social.handle}
              </span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
