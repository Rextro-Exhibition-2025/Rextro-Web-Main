"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full bg-neutral-100 flex flex-col overflow-hidden">
      {/* Background Circuit Pattern */}
      <div className="absolute inset-0 flex justify-center items-center overflow-hidden opacity-50">
        <div className="relative w-full h-full max-w-[1800px]">
          {/* Left circuit pattern */}
          <div className="absolute left-0 top-0 w-1/2 h-full">
            <Image
              src="/Hero/circuit-components1.webp"
              alt=""
              fill
              className="object-cover"
              priority
            />
            <Image
              src="/Hero/circuit-lines@2xl.ee1ad3dd.webp"
              alt=""
              fill
              className="object-cover mix-blend-multiply"
              priority
            />
          </div>

          {/* Right circuit pattern (mirrored) */}
          <div className="absolute right-0 top-0 w-1/2 h-full scale-x-[-1]">
            <Image
              src="/Hero/circuit-components1.webp"
              alt=""
              fill
              className="object-cover"
              priority
            />
            <Image
              src="/Hero/circuit-lines@2xl.ee1ad3dd.webp"
              alt=""
              fill
              className="object-cover mix-blend-multiply"
              priority
            />
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative h-[80vh] w-full px-4 sm:px-8 lg:px-20 py-12 sm:py-16 lg:py-24 flex flex-col justify-start items-center gap-4 sm:gap-6 lg:gap-8">
        <div className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center gap-8 sm:gap-10 lg:gap-12">
          {/* Logo and Tagline Container */}
          <div className="w-full max-w-[900px] flex flex-col justify-start items-center gap-12 sm:gap-16 lg:gap-20">
            {/* Logo */}
            <div className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[696px] h-32 sm:h-40 md:h-48 lg:h-60">
              <Image
                src="/Hero/logo.svg"
                alt="Faculty of Engineering Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Tagline */}
            <div className="w-full flex justify-center items-center">
              <h1 className="text-center text-black text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-[var(--font-instrument)] tracking-tight leading-tight px-4">
                THE FUTURE IS ENGINEERED HERE.
              </h1>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="w-full sm:w-auto p-3 sm:p-4 bg-white/0 rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] border border-neutral-400 backdrop-blur-sm flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            {/* Explore Button */}
            <Link
              href="/explore"
              className="w-full sm:w-auto h-10 sm:h-8 px-6 sm:px-4 pt-2 sm:pt-1.5 pb-2.5 sm:pb-2 bg-gradient-to-b from-blue-900 to-sky-950 rounded-md shadow-[0px_1px_3px_0px_rgba(33,33,38,0.20),0px_0px_0px_1px_rgba(73,120,190,1.00),0px_4px_12px_0px_rgba(0,0,0,0.35)] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.07)] hover:from-blue-800 hover:to-sky-900 transition-all flex justify-center items-center"
            >
              <span className="text-white text-sm font-medium font-[var(--font-instrument)]">
                Explore more
              </span>
            </Link>

            {/* Watch Video Button */}
            <Link
              href="/video"
              className="w-full sm:w-auto p-1 sm:p-0.5 rounded-3xl flex justify-center sm:justify-start items-center gap-3 hover:bg-black/5 transition-colors"
            >
              <div className="relative w-6 h-6 flex-shrink-0">
                {/* Play button circle */}
                <div className="absolute inset-0 bg-gradient-to-b from-black to-black/0 rounded-full" />
                <div className="absolute inset-[2px] bg-white rounded-full" />
                {/* Play icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    className="ml-0.5"
                  >
                    <path
                      d="M1.5 1L6.5 4L1.5 7V1Z"
                      fill="#171717"
                      stroke="#171717"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2">
                <span className="text-black text-sm font-medium font-[var(--font-instrument)]">
                  Watch
                </span>
                <span className="text-gray-600 text-xs font-medium font-[var(--font-instrument)]">
                  3 min
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="w-full border-b border-neutral-900 flex justify-between items-end">
        <div className="relative w-24 sm:w-32 md:w-40 lg:w-[166px] h-8 sm:h-10 md:h-11 lg:h-[45px]">
          <Image
            src="/Hero/Union.svg"
            alt=""
            fill
            className="object-contain object-left-bottom brightness-0"
          />
        </div>
        <div className="relative w-24 sm:w-32 md:w-40 lg:w-[166px] h-8 sm:h-10 md:h-11 lg:h-[45px] scale-x-[-1]">
          <Image
            src="/Hero/Union.svg"
            alt=""
            fill
            className="object-contain object-right-bottom brightness-0"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
