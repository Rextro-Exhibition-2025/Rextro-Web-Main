import React from 'react';

const LiveBanner = () => {
  return (
    <div className="w-full bg-red-600/90 backdrop-blur-sm text-white px-4 py-1 flex justify-center items-center gap-2 shadow-lg animate-slideDown z-[60] relative">
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <span className="font-bold tracking-wider text-xs sm:text-sm">LIVE NOW</span>
      </div>
      <span className="hidden sm:inline w-px h-3 bg-white/40 mx-1.5"></span>
      <p className="text-xs sm:text-sm font-medium truncate max-w-[200px] sm:max-w-none">
        ReXtro Silver Jubilee Exhibition
      </p>
    </div>
  );
};

export default LiveBanner;
