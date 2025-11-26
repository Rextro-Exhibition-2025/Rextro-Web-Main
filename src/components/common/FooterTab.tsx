import React from 'react';

const FooterTab = () => {
  return (
    <div className="relative w-full bg-black overflow-hidden">
      <div className="mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
        <div className="relative -mx-2.5 flex -bottom-1">
          <svg viewBox="0 0 64 48" className="w-16 flex-none fill-white" aria-hidden="true">
            <path d="M51.657 2.343 12.343 41.657A8 8 0 0 1 6.686 44H0v4h64V0h-6.686a8 8 0 0 0-5.657 2.343Z"></path>
          </svg>
          <div className="-mx-px flex-auto bg-white"></div>
          <svg viewBox="0 0 64 48" className="w-16 flex-none fill-white" aria-hidden="true">
            <path d="m12.343 2.343 39.314 39.314A8 8 0 0 0 57.314 44H64v4H0V0h6.686a8 8 0 0 1 5.657 2.343Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FooterTab;
