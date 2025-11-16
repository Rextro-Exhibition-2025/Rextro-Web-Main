"use client";

import Image from "next/image";

const zones = [
  {
    title: "AI and Computer Vision Zone",
    description:
      "Discover applications of Artificial Intelligence, Machine Learning, and Computer Vision that are transforming industries and societies.",
    height: "h-64",
  },
  {
    title: "Robotics and Intelligent Automation Zone",
    description:
      "See robots designed for industrial automation, healthcare, and service sectors in live demonstrations.",
    height: "h-[528px]",
  },
  {
    title: "Space Exploration Zone",
    description:
      "Dedicated to astronomy and aerospace technology, this zone highlights the latest developments in space research, satellites, and mission planning.",
    height: "h-64",
  },
  {
    title: "Sustainable & Renewable Energy Technologies Zone",
    description:
      "Explore next-generation clean energy solutions, focusing on solar, wind, and hydro technologies that promote sustainability.",
    height: "h-[528px]",
  },
  {
    title: "AR and VR Zone",
    description:
      "Step into the immersive world of Augmented and Virtual Reality applications for gaming, education, and industrial design.",
    height: "h-64",
  },
  {
    title: "Game Zone",
    description:
      "An interactive space featuring both entertainment and educational games. Dive into demonstrations of game design, simulation, and software development.",
    height: "h-64",
  },
  {
    title: "AI and Automotive Engineering & Mobility Solutions Zone",
    description:
      "Discover applications of Artificial Intelligence, Machine Learning, and Computer Vision that are transforming industries and societies.",
    height: "h-64",
  },
  {
    title: "Marine & Naval Engineering Zone",
    description:
      "Explore next-generation clean energy solutions, focusing on solar, wind, and hydro technologies that promote sustainability.",
    height: "h-[528px]",
  },
  {
    title: "Drone & UAV Technologies Zone",
    description:
      "Discover applications of Artificial Intelligence, Machine Learning, and Computer Vision that are transforming industries and societies.",
    height: "h-64",
  },
];

const ExploreZones = () => {
  return (
    <section className="w-full flex flex-col">
      {/* Top Decorative Border */}
      <div className="w-full bg-neutral-100 border-b border-neutral-900 flex justify-between items-end leading-[0]">
        <div className="relative w-24 sm:w-32 md:w-40 lg:w-[166px] h-8 sm:h-10 md:h-11 lg:h-[45px] leading-[0] top-2">
          <Image
            src="/Hero/Union.svg"
            alt=""
            fill
            className="object-contain object-left-bottom"
          />
        </div>
        <div className="relative w-48 sm:w-64 md:w-72 lg:w-80 h-8 sm:h-10 md:h-11 lg:h-[45px] leading-[0] top-2">
          <Image
            src="/Hero/Union2.svg"
            alt=""
            fill
            className="object-contain object-center-bottom"
          />
        </div>
        <div className="relative w-24 sm:w-32 md:w-40 lg:w-[166px] h-8 sm:h-10 md:h-11 lg:h-[45px] scale-x-[-1] leading-[0] top-2">
          <Image
            src="/Hero/Union.svg"
            alt=""
            fill
            className="object-contain object-right-bottom brightness-0"
          />
        </div>
      </div>

      {/* Main Content with Background */}
      <div
        className="relative w-full py-12 sm:py-16 bg-neutral-900 flex flex-col gap-4 overflow-hidden"
        style={{
          backgroundImage: "url(/zones/zones-background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900/50 pointer-events-none" />

        {/* Content */}
        <div className="relative w-full px-4 sm:px-8 lg:px-20 flex flex-col gap-8 lg:gap-10">
          {/* Header */}
          <div className="w-full flex flex-col items-center gap-4">
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold font-[var(--font-instrument)] text-center">
              Explore the Zones: Where Innovation Comes to Life
            </h2>
            <p className="w-full max-w-[570px] text-center text-zinc-400 text-sm sm:text-base font-normal font-[var(--font-instrument)] leading-normal">
              The exhibition will feature an unparalleled display of modern
              engineering solutions across 25 thematic zones. Here's a sneak
              peek at what you can experience:
            </p>
          </div>

          {/* Zones Grid */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2">
            {/* Column 1 */}
            <div className="flex flex-col gap-2">
              {/* AI and Computer Vision */}
              <div
                className={`${zones[0].height} p-6 bg-neutral-800/80 backdrop-blur-[1.5px] rounded-2xl border border-white/5 flex flex-col justify-end gap-6 overflow-hidden`}
              >
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-20 h-24 bg-gradient-to-br from-white/10 to-white/0 rounded-lg border border-white/10" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-sm font-medium font-[var(--font-instrument)] leading-tight">
                    {zones[0].title}
                  </h3>
                  <p className="text-zinc-400 text-sm font-normal font-[var(--font-instrument)] leading-normal">
                    {zones[0].description}
                  </p>
                </div>
              </div>

              {/* Robotics */}
              <div
                className={`${zones[1].height} p-6 bg-neutral-800/80 backdrop-blur-[1.5px] rounded-2xl border border-white/5 flex flex-col gap-6 overflow-hidden`}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-sm font-medium font-[var(--font-instrument)] leading-tight">
                    {zones[1].title}
                  </h3>
                  <p className="text-zinc-400 text-sm font-normal font-[var(--font-instrument)] leading-normal">
                    {zones[1].description}
                  </p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-white/5 to-white/0 rounded-lg border border-white/10" />
              </div>

              {/* Space Exploration */}
              <div
                className={`${zones[2].height} p-6 bg-neutral-800/80 backdrop-blur-[1.5px] rounded-2xl border border-white/5 flex flex-col justify-end gap-6 overflow-hidden`}
              >
                <div className="flex-1 relative rounded-lg overflow-hidden">
                  {/* Space radar visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-white/10" />
                    <div className="absolute w-24 h-24 rounded-full border border-white/20" />
                    <div className="absolute w-16 h-16 rounded-full border border-white/30" />
                    <div className="absolute w-8 h-8 rounded-full bg-cyan-500/30" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-sm font-medium font-[var(--font-instrument)] leading-tight">
                    {zones[2].title}
                  </h3>
                  <p className="text-zinc-400 text-sm font-normal font-[var(--font-instrument)] leading-normal">
                    {zones[2].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-2">
              {/* Sustainable Energy */}
              <div
                className={`${zones[3].height} p-6 bg-neutral-800/80 backdrop-blur-[1.5px] rounded-2xl border border-white/5 flex flex-col gap-6 overflow-hidden`}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-sm font-medium font-[var(--font-instrument)] leading-tight">
                    {zones[3].title}
                  </h3>
                  <p className="text-zinc-400 text-sm font-normal font-[var(--font-instrument)] leading-normal">
                    {zones[3].description}
                  </p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-white/5 to-white/0 rounded-lg border border-white/10" />
              </div>

              {/* AR and VR */}
              <div
                className={`${zones[4].height} p-6 bg-neutral-800/80 backdrop-blur-[1.5px] rounded-2xl border border-white/5 flex flex-col justify-end gap-6 overflow-hidden`}
              >
                <div className="flex-1 flex items-center justify-center gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-10 bg-neutral-900 rounded-md shadow-lg"
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-sm font-medium font-[var(--font-instrument)] leading-tight">
                    {zones[4].title}
                  </h3>
                  <p className="text-zinc-400 text-sm font-normal font-[var(--font-instrument)] leading-normal">
                    {zones[4].description}
                  </p>
                </div>
              </div>

              {/* Game Zone */}
              <div
                className={`${zones[5].height} p-6 bg-neutral-800/80 backdrop-blur-[1.5px] rounded-2xl border border-white/5 flex flex-col justify-end gap-6 overflow-hidden`}
              >
                <div className="flex-1 relative rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-white/10" />
                    <div className="absolute w-24 h-24 rounded-full border border-white/20" />
                    <div className="absolute w-16 h-16 rounded-full border border-white/30" />
                    <div className="absolute w-8 h-8 rounded-full bg-cyan-500/30" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-sm font-medium font-[var(--font-instrument)] leading-tight">
                    {zones[5].title}
                  </h3>
                  <p className="text-zinc-400 text-sm font-normal font-[var(--font-instrument)] leading-normal">
                    {zones[5].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-2">
              {/* Automotive */}
              <div
                className={`${zones[6].height} p-6 bg-neutral-800/80 backdrop-blur-[1.5px] rounded-2xl border border-white/5 flex flex-col justify-end gap-6 overflow-hidden`}
              >
                <div className="flex-1 flex items-center justify-center gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-10 bg-neutral-900 rounded-md shadow-lg"
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-sm font-medium font-[var(--font-instrument)] leading-tight">
                    {zones[6].title}
                  </h3>
                  <p className="text-zinc-400 text-sm font-normal font-[var(--font-instrument)] leading-normal">
                    {zones[6].description}
                  </p>
                </div>
              </div>

              {/* Marine Engineering */}
              <div
                className={`${zones[7].height} p-6 bg-neutral-800/80 backdrop-blur-[1.5px] rounded-2xl border border-white/5 flex flex-col gap-6 overflow-hidden`}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-sm font-medium font-[var(--font-instrument)] leading-tight">
                    {zones[7].title}
                  </h3>
                  <p className="text-zinc-400 text-sm font-normal font-[var(--font-instrument)] leading-normal">
                    {zones[7].description}
                  </p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-white/5 to-white/0 rounded-lg border border-white/10" />
              </div>

              {/* Drone */}
              <div
                className={`${zones[8].height} p-6 bg-neutral-800/80 backdrop-blur-[1.5px] rounded-2xl border border-white/5 flex flex-col justify-end gap-6 overflow-hidden`}
              >
                <div className="flex-1 flex items-center justify-center gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-10 bg-neutral-900 rounded-md shadow-lg"
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-sm font-medium font-[var(--font-instrument)] leading-tight">
                    {zones[8].title}
                  </h3>
                  <p className="text-zinc-400 text-sm font-normal font-[var(--font-instrument)] leading-normal">
                    {zones[8].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative w-full py-12 sm:py-16 bg-neutral-900 flex flex-col items-center gap-2 overflow-hidden">
        {/* Floating Stars Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px) translateX(0px);
                opacity: 0.3;
              }
              25% {
                transform: translateY(-20px) translateX(10px);
                opacity: 0.8;
              }
              50% {
                transform: translateY(-10px) translateX(-10px);
                opacity: 1;
              }
              75% {
                transform: translateY(-30px) translateX(5px);
                opacity: 0.6;
              }
            }
            @keyframes twinkle {
              0%,
              100% {
                opacity: 0.2;
              }
              50% {
                opacity: 1;
              }
            }
          `}</style>
          {[...Array(60)].map((_, i) => {
            const size = Math.random() * 2 + 1;
            const duration = Math.random() * 4 + 3;
            const delay = Math.random() * 5;
            return (
              <div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${duration}s ease-in-out ${delay}s infinite, twinkle ${
                    duration * 0.7
                  }s ease-in-out ${delay}s infinite`,
                }}
              />
            );
          })}
        </div>

        <div className="relative w-full max-w-7xl px-4 sm:px-8 lg:px-20 py-6 sm:py-10 flex flex-col justify-center items-center gap-2">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-instrument)] uppercase text-center bg-gradient-to-r from-neutral-600 via-neutral-500 to-neutral-600 bg-clip-text text-transparent">
            Be a Part of the Future.
          </h2>
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-instrument)] uppercase text-center bg-gradient-to-r from-neutral-300 via-white to-neutral-300 bg-clip-text text-transparent">
            Join Us at ReXtro 2025.
          </h3>
        </div>
      </div>

      {/* Bottom Decorative Border */}
      <div className="relative">
        <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
          <div className="relative -mx-2.5 flex -bottom-1 -mt-12">
            <svg viewBox="0 0 64 48" className="w-16 flex-none fill-white" aria-hidden="true">
              <path d="M51.657 2.343 12.343 41.657A8 8 0 0 1 6.686 44H0v4h64V0h-6.686a8 8 0 0 0-5.657 2.343Z"></path>
              </svg><div className="-mx-px flex-auto bg-white"></div>
              <svg viewBox="0 0 64 48" className="w-16 flex-none fill-white" aria-hidden="true">
                <path d="m12.343 2.343 39.314 39.314A8 8 0 0 0 57.314 44H64v4H0V0h6.686a8 8 0 0 1 5.657 2.343Z"></path>
                </svg>
              </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreZones;
