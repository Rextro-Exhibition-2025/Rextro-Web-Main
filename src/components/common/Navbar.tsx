"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Map", href: "/map" },
    {
      label: "Departments",
      href: "/departments",
      hasDropdown: true,
    },
    {
      label: "Events",
      href: "/events",
      hasDropdown: true,
    },
    {
      label: "Contact",
      href: "/contact",
      hasDropdown: true,
    },
  ];

  return (
    <nav className="w-full flex flex-col">
      {/* Top announcement bar */}
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

      {/* Main navbar */}
      <div className="w-full px-4 sm:px-8 lg:px-20 py-3 sm:py-4 bg-white border-b border-black/10 backdrop-blur-md">
        <div className="w-full flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="relative w-32 sm:w-40 lg:w-48 h-6 sm:h-7 lg:h-8 flex-shrink-0"
          >
            <Image
              src="/navbar/nav-icon.png"
              alt="Faculty of Engineering Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-start items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                <Link
                  href={item.href}
                  className="h-8 px-3 py-1.5 flex justify-start items-center gap-2 hover:bg-black/5 rounded transition-colors"
                >
                  <span className="text-neutral-900 text-sm font-medium font-[var(--font-instrument)] leading-normal">
                    {item.label}
                  </span>
                  {item.hasDropdown && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M1.75 3.75L5 7L8.25 3.75"
                        stroke="#71717a"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Link>
              </div>
            ))}

            <Link
              href="/tickets"
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
            className="lg:hidden p-2 hover:bg-black/5 rounded transition-colors"
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
            {navItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="flex-1 px-3 py-2 text-neutral-900 text-sm font-medium font-[var(--font-instrument)] hover:bg-black/5 rounded transition-colors"
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
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        className={`transform transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M1.75 3.75L5 7L8.25 3.75"
                          stroke="#71717a"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {item.hasDropdown && openDropdown === item.label && (
                  <div className="ml-4 mt-1 pl-3 border-l border-black/10 flex flex-col gap-1">
                    <Link
                      href={`${item.href}/submenu1`}
                      className="px-3 py-2 text-neutral-700 text-sm font-[var(--font-instrument)] hover:bg-black/5 rounded transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Submenu Item 1
                    </Link>
                    <Link
                      href={`${item.href}/submenu2`}
                      className="px-3 py-2 text-neutral-700 text-sm font-[var(--font-instrument)] hover:bg-black/5 rounded transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Submenu Item 2
                    </Link>
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/tickets"
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
  );
};

export default Navbar;
