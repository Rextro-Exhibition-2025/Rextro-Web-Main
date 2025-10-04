"use client";

import Image from "next/image";
import Countdown from "@/components/common/Countdown";

const About = () => {

  return (
    <section className="w-full flex flex-col">
      <div
        className="relative w-full py-8 sm:py-10 lg:py-12 bg-neutral-900 flex flex-col gap-6 sm:gap-8 lg:gap-10 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(80, 80, 80, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(80, 80, 80, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      >
        {/* Grid fade overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at center, transparent 40%, rgba(23, 23, 23, 0.8) 70%, rgba(23, 23, 23, 1) 100%)
            `
          }}
        />

        {/* Content Section */}
        <div className="relative w-full px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-8 lg:gap-16">
          {/* About Text */}
          <div className="flex-1 min-w-0 px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-center items-start gap-6 sm:gap-8">
            <h2 className="text-white text-2xl sm:text-3xl font-semibold font-[var(--font-instrument)] leading-tight">
              About ReXtro: The Silver Jubilee Celebration
            </h2>
            <div className="w-full max-w-[570px] text-white text-sm sm:text-base font-normal font-[var(--font-instrument)] leading-relaxed">
              The{" "}
              <span className="font-bold">
                Faculty of Engineering, University of Ruhuna
              </span>
              , proudly presents its{" "}
              <span className="font-bold">Silver Jubilee Exhibition</span>. Step
              into the Engineering Village, a three-day showcase featuring over
              a hundred pioneering student projects, interactive zones, and
              industry collaborations. This is where innovation, inspiration,
              and impact converge.
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex-1 w-full lg:w-auto px-4 sm:px-6 pb-6 flex justify-center lg:justify-end items-center">
            <Countdown targetDate="2025-12-05T00:00:00" />
          </div>
        </div>

        {/* Event Details Section */}
        <div className="relative w-full px-4 sm:px-8 lg:px-20 py-6 sm:py-8 lg:py-10 flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-20">
          {/* Event Date Card */}
          <div className="flex-1 min-w-0 lg:min-w-[460px] p-4 sm:p-6 bg-neutral-800 rounded-2xl border border-white/5 flex flex-col gap-4 overflow-hidden">
            <div className="w-full flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 sm:gap-6">
              <h3 className="text-white text-xl sm:text-2xl font-bold font-[var(--font-instrument)] uppercase tracking-tight">
                December
              </h3>
              <div className="flex-1 h-px border-t border-white/20" />
              <div className="flex justify-start items-center gap-3 sm:gap-6">
                {["05", "06", "07"].map((day) => (
                  <div
                    key={day}
                    className="p-2 bg-neutral-900 rounded-md shadow-lg border border-white/5 flex items-center justify-center"
                  >
                    <span className="text-white text-2xl sm:text-3xl font-bold font-[var(--font-instrument)] uppercase tracking-tight">
                      {day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-start items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="flex-shrink-0"
              >
                <path
                  d="M10 10C11.3807 10 12.5 8.88071 12.5 7.5C12.5 6.11929 11.3807 5 10 5C8.61929 5 7.5 6.11929 7.5 7.5C7.5 8.88071 8.61929 10 10 10Z"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path
                  d="M10 17.5C10 17.5 15 13 15 8.75C15 6.125 12.7614 4 10 4C7.23858 4 5 6.125 5 8.75C5 13 10 17.5 10 17.5Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-neutral-400 text-sm sm:text-base font-semibold font-[var(--font-instrument)]">
                at Faculty of Engineering, University of Ruhuna
              </p>
            </div>

            <p className="text-zinc-400 text-sm sm:text-base font-normal font-[var(--font-instrument)] leading-normal">
              The Three Days That Will Shape the Future.
            </p>
          </div>

          {/* Right Text */}
          <div className="flex-1 lg:pl-12 xl:pl-24 py-4 flex flex-col justify-start items-start lg:items-end">
            <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold font-[var(--font-instrument)] leading-tight text-left lg:text-right">
              Mark Your Calendar for the Silver Jubilee Exhibition.
            </h3>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Elements */}

      <div className="w-full bg-neutral-100 border-t border-neutral-900 flex justify-between items-start">
        <div className="relative w-24 sm:w-32 md:w-40 lg:w-[166px] h-8 sm:h-10 md:h-11 lg:h-[45px] scale-y-[-1]">
          <Image
            src="/Hero/Union.svg"
            alt=""
            fill
            className="object-contain object-left-top"
          />
        </div>
        <div className="relative w-24 sm:w-32 md:w-40 lg:w-[166px] h-8 sm:h-10 md:h-11 lg:h-[45px] scale-x-[-1] scale-y-[-1]">
          <Image
            src="/Hero/Union.svg"
            alt=""
            fill
            className="object-contain object-right-top brightness-0"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
