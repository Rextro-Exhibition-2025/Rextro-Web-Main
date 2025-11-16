"use client";

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full px-4 sm:px-8 lg:px-16 py-6 sm:py-8 bg-white backdrop-blur-[6px] flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
      {/* Left Section - Logo and Social Icons */}
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4 sm:gap-5">
        {/* Main ReXtro Logo with decorative elements */}
        <Image
          src={"/navbar/nav-icon.png"}
          height={200}
          width={200}
          alt="logo"
          className="object-contain"
        />
        <Image
          src={"/Logo Image.png"}
          height={200}
          width={32}
          alt="logo"
          className="object-contain"
        />
        <Image
          src={"/ruhuna_eng_logo 1.png"}
          height={200}
          width={32}
          alt="logo"
          className="object-contain"
        />
      </div>

      {/* Right Section - Logo/Banner */}
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
    </footer>
  );
};

export default Footer;
