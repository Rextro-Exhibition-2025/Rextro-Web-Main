"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();

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
      label: "Registrations",
      href: "/registrations",
    },
    {
      label: "Zones",
      href: "/zones",
      hasDropdown: false,
    },
    // {
    //   label: "Map",
    //   href: "/map",
    // },
    {
      label: "Contact",
      href: "/contact",
    },
    
  ];

  return (
    <>
      {/* Static Navbar - Fades out as one unit */}
      <nav className={`w-full flex flex-col fixed top-0 left-0 right-0 z-40 transition-opacity duration-300 ease-in-out ${
        isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        {/* Top announcement bar */}
        {pathname === "/" && (
          <div className="w-full h-auto min-h-10 px-4 sm:px-8 py-2 sm:py-1 bg-neutral-900 flex flex-wrap justify-center items-center gap-2 sm:gap-4">
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
        )}

        {/* Main navbar - Static version */}
        <div className="w-full px-4 sm:px-8 lg:px-20 py-3 sm:py-4 bg-white border-b border-black/10">
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

              {pathname === '/gamezone' && (
                <>
                  {isAuthenticated && user ? (
                    <div className="flex items-center gap-2 ml-2 px-3 py-1.5 bg-purple-50 rounded-md border border-purple-200">
                      <span className="text-xs text-purple-900 font-medium">
                        {user.name}
                      </span>
                      <button
                        onClick={logout}
                        className="text-xs text-purple-600 hover:text-purple-800 font-medium underline"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined' && (window as any).openGameZoneAuth) {
                          (window as any).openGameZoneAuth();
                        }
                      }}
                      className="flex items-center gap-2 ml-2 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-md shadow-lg transition-all cursor-pointer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M3 12h12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-white text-xs font-bold">
                        Login to Play
                      </span>
                    </button>
                  )}
                </>
              )}

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
                stroke="#1a1a1a"
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

              {isAuthenticated && user && (
                <div className="mt-2 p-3 bg-purple-50 rounded-md border border-purple-200 flex items-center justify-between">
                  <span className="text-sm text-purple-900 font-medium">
                    {user.name}
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-sm text-purple-600 hover:text-purple-800 font-medium underline"
                  >
                    Logout
                  </button>
                </div>
              )}

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

      {/* Floating Navbar - Fades in as one unit */}
      <nav className={`w-full fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 lg:px-20 py-2 sm:py-3 lg:py-4 flex justify-center transition-opacity duration-300 ease-in-out ${
        isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="p-2 pl-3 sm:pl-0 sm:p-3 lg:p-4 bg-white/90 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.10)] border border-black/10 backdrop-blur-[6px] max-w-7xl w-full">
          <div className="w-full flex justify-between items-center">
            {/* Logo */}
            <Link
              href="/"
              className="relative w-20 sm:w-20 lg:w-48 h-5 sm:h-6 lg:h-8 flex-shrink-0"
            >
              <Image
                src="/Hero/logo2.png"
                alt="Faculty of Engineering Logo"
                fill
                className="object-contain object-left"
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

              {pathname === '/gamezone' && (
                <>
                  {isAuthenticated && user ? (
                    <div className="flex items-center gap-2 ml-2 px-3 py-1.5 bg-purple-50 rounded-md border border-purple-200">
                      <span className="text-xs text-purple-900 font-medium">
                        {user.name}
                      </span>
                      <button
                        onClick={logout}
                        className="text-xs text-purple-600 hover:text-purple-800 font-medium underline"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined' && (window as any).openGameZoneAuth) {
                          (window as any).openGameZoneAuth();
                        }
                      }}
                      className="flex items-center gap-2 ml-2 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-md shadow-lg transition-all cursor-pointer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M3 12h12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-white text-xs font-bold">
                        Login to Play
                      </span>
                    </button>
                  )}
                </>
              )}

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
                stroke="#1a1a1a"
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

              {isAuthenticated && user && (
                <div className="mt-2 p-3 bg-purple-50 rounded-md border border-purple-200 flex items-center justify-between">
                  <span className="text-sm text-purple-900 font-medium">
                    {user.name}
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-sm text-purple-600 hover:text-purple-800 font-medium underline"
                  >
                    Logout
                  </button>
                </div>
              )}

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
      </nav>
    </>
  );
};

export default Navbar;
