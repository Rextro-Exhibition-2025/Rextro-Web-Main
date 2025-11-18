"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled past hero section (adjust threshold as needed)
      const heroHeight = window.innerHeight; // Assuming hero is full viewport height
      setIsScrolled(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    /*
    { label: "Map", href: "/map" },
    {
      label: "Zones",
      href: "/zones",
      hasDropdown: true,
    }, 
    */
    {
      label: "Events",
      href: "/events",
      hasDropdown: true,
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  return (
    <nav className="w-full flex flex-col fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out">
      {/* Top announcement bar */}
      <div className="w-full h-auto min-h-10 px-4 sm:px-8 py-2 sm:py-1 bg-neutral-900 flex flex-wrap justify-center items-center gap-2 sm:gap-4 transition-all duration-500 ease-in-out">
        <div className="py-1 flex justify-center items-center gap-2 text-center">
          <p className="text-white text-xs font-medium font-[var(--font-instrument)] leading-tight sm:leading-none">
            Our 25th Anniversary: A Journey of Innovation
          </p>
        </div>
        <div className="hidden sm:block w-px h-4 bg-white/20" />
        <Link
          href="https://silver-jubilee.eng.ruh.ac.lk/"
          target="_blank"
          rel="noopener noreferrer"
          className="py-1 flex justify-center items-center gap-1.5 hover:opacity-80 transition-opacity"
        >
          <span className="text-white text-xs font-medium font-[var(--font-instrument)] leading-none">
            Learn more
          </span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="opacity-60"
          >
            <path
              d="M3.75 2.75L6.25 5.25L3.75 7.75"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {/* Main navbar */}
      <div
        className={`w-full transition-all duration-500 ease-in-out ${
          isScrolled
            ? "px-4 sm:px-8 lg:px-20 py-4 flex justify-center bg-transparent"
            : "px-4 sm:px-8 lg:px-20 py-3 sm:py-4 bg-white border-b border-black/10"
        }`}
      >
        <div
          className={`transition-all duration-500 ease-in-out ${
            isScrolled
              ? "p-4 bg-white/90 rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.10)] border border-black/10 backdrop-blur-[6px] max-w-7xl w-full"
              : "w-full bg-transparent"
          }`}
        >
          <div className="w-full flex justify-between items-center">
            {/* Logo */}
            <Link
              href="/"
              className="relative w-32 sm:w-40 lg:w-48 h-6 sm:h-7 lg:h-8 flex-shrink-0"
            >
              <Image
                src={isScrolled ? "/Hero/logo2.png" : "/navbar/nav-icon.png"}
                alt="Faculty of Engineering Logo"
                fill
                className="object-contain object-left transition-opacity duration-500"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex justify-start items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
              <div key={item.label} className="relative">
                <Link
                  href={item.href}
                  className="h-8 px-3 py-1.5 flex justify-start items-center gap-2 hover:bg-black/5 rounded transition-colors"
                >
                  <span className={`text-sm font-medium font-[var(--font-instrument)] leading-normal ${
                    isActive ? 'text-[#00388C] font-bold' : 'text-neutral-900'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              </div>
            );
            })}

              <Link
                href="https://tickets.rextro.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 px-4 pt-1.5 pb-2 ml-2 bg-gradient-to-b from-neutral-700 to-black rounded-md shadow-lg hover:from-neutral-600 hover:to-neutral-900 transition-all flex justify-center items-center"
              >
                <span className="text-white text-sm font-medium font-[var(--font-instrument)]">
                  Buy Tickets
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-1 hover:bg-black/5 rounded transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-black/10 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
              <div key={item.label}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className={`flex-1 px-3 py-2 text-sm font-medium font-[var(--font-instrument)] hover:bg-black/5 rounded transition-colors ${
                      isActive ? 'text-[#00388C] font-bold' : 'text-neutral-900'
                    }`}
                    onClick={() => !item.hasDropdown && setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && (
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="p-2 hover:bg-black/5 rounded transition-colors"
                      aria-label={`Toggle ${item.label} menu`}
                    >
                    </button>
                  )}
                </div>
              </div>
            );
            })}

              <Link
                href="https://tickets.rextro.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-4 py-2.5 bg-gradient-to-b from-neutral-700 to-black rounded-md shadow-lg hover:from-neutral-600 hover:to-neutral-900 transition-all text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-white text-sm font-medium font-[var(--font-instrument)]">
                  Buy Tickets
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
