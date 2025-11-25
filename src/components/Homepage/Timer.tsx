'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimerProps {
  theme?: 'light' | 'dark';
}

const Timer: React.FC<TimerProps> = ({ theme = 'dark' }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set your target date here (e.g., event date)
    const targetDate = new Date('2025-12-05T09:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const textColor = theme === 'light' ? '!text-black drop-shadow-sm' : 'text-white';
  const labelColor = theme === 'light' ? 'text-gray-600' : 'text-white/50';
  const dimColor = theme === 'light' ? 'text-gray-200' : 'text-white/10';
  const separatorColor = theme === 'light' ? 'bg-black' : 'bg-white';
  const textShadow = theme === 'light' 
    ? '' 
    : '[text-shadow:_0px_0px_14px_rgb(255_136_0_/_1.00),_0px_0px_48px_rgb(255_136_0_/_1.00),_0px_0px_97px_rgb(255_136_0_/_1.00),_0px_0px_166px_rgb(255_136_0_/_1.00),_0px_0px_290px_rgb(255_136_0_/_1.00)]';

  return (
    <div className="self-stretch px-2 sm:px-1 pb-6 inline-flex justify-center sm:justify-end items-center gap-2 sm:gap-4 lg:gap-6 scale-90 sm:scale-100 lg:scale-100 origin-center sm:origin-right">
      {/* Days */}
      <div className="inline-flex flex-col justify-start items-center gap-1 sm:gap-2">
        <div className={`self-stretch text-center justify-center ${labelColor} text-2xl sm:text-3xl lg:text-4xl font-normal font-[family-name:var(--font-instrument-sans)]`}>DD</div>
        <div className="w-14 h-12 sm:w-16 sm:h-14 lg:w-20 lg:h-16 p-1 relative inline-flex justify-center items-center gap-2">
          <div className={`left-[2px] top-[6px] sm:top-[8px] absolute text-center justify-center ${dimColor} text-3xl sm:text-4xl lg:text-5xl font-normal font-['Digital_Numbers'] z-0`}>88</div>
          <div className={`relative z-10 text-center justify-center ${textColor} text-3xl sm:text-4xl lg:text-5xl font-normal font-['Digital_Numbers'] ${textShadow}`}>
            {formatNumber(timeLeft.days)}
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="w-1.5 sm:w-2 h-20 sm:h-24 lg:h-28 py-2 sm:py-3 inline-flex flex-col justify-end items-center gap-3 sm:gap-4">
        <div className={`self-stretch h-1.5 sm:h-2 opacity-50 ${separatorColor} rounded-full`} />
        <div className={`self-stretch h-1.5 sm:h-2 opacity-50 ${separatorColor} rounded-full`} />
      </div>

      {/* Hours */}
      <div className="inline-flex flex-col justify-start items-center gap-1 sm:gap-2">
        <div className={`self-stretch text-center justify-center ${labelColor} text-2xl sm:text-3xl lg:text-4xl font-normal font-[family-name:var(--font-instrument-sans)]`}>HH</div>
        <div className="w-14 h-12 sm:w-16 sm:h-14 lg:w-20 lg:h-16 p-1 relative inline-flex justify-center items-center gap-2">
          <div className={`left-[2px] top-[6px] sm:top-[8px] absolute text-center justify-center ${dimColor} text-3xl sm:text-4xl lg:text-5xl font-normal font-['Digital_Numbers'] z-0`}>88</div>
            <div className={`relative z-10 text-center justify-center ${textColor} text-3xl sm:text-4xl lg:text-5xl font-normal font-['Digital_Numbers'] ${textShadow}`}>
             {formatNumber(timeLeft.hours)}
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="w-1.5 sm:w-2 h-20 sm:h-24 lg:h-28 py-2 sm:py-3 inline-flex flex-col justify-end items-center gap-3 sm:gap-4">
        <div className={`self-stretch h-1.5 sm:h-2 opacity-50 ${separatorColor} rounded-full`} />
        <div className={`self-stretch h-1.5 sm:h-2 opacity-50 ${separatorColor} rounded-full`} />
      </div>

      {/* Minutes */}
      <div className="inline-flex flex-col justify-start items-center gap-1 sm:gap-2">
        <div className={`self-stretch text-center justify-center ${labelColor} text-2xl sm:text-3xl lg:text-4xl font-normal font-[family-name:var(--font-instrument-sans)]`}>MM</div>
        <div className="w-14 h-12 sm:w-16 sm:h-14 lg:w-20 lg:h-16 p-1 relative inline-flex justify-center items-center gap-2">
          <div className={`left-[2px] top-[6px] sm:top-[8px] absolute text-center justify-center ${dimColor} text-3xl sm:text-4xl lg:text-5xl font-normal font-['Digital_Numbers'] z-0`}>88</div>
          <div className={`relative z-10 text-center justify-center ${textColor} text-3xl sm:text-4xl lg:text-5xl font-normal font-['Digital_Numbers'] ${textShadow}`}>
            {formatNumber(timeLeft.minutes)}
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="w-1.5 sm:w-2 h-20 sm:h-24 lg:h-28 py-2 sm:py-3 inline-flex flex-col justify-end items-center gap-3 sm:gap-4">
        <div className={`self-stretch h-1.5 sm:h-2 opacity-50 ${separatorColor} rounded-full`} />
        <div className={`self-stretch h-1.5 sm:h-2 opacity-50 ${separatorColor} rounded-full`} />
      </div>

      {/* Seconds */}
      <div className="inline-flex flex-col justify-start items-center gap-1 sm:gap-2">
        <div className={`self-stretch text-center justify-center ${labelColor} text-2xl sm:text-3xl lg:text-4xl font-normal font-[family-name:var(--font-instrument-sans)]`}>SS</div>
        <div className="w-14 h-12 sm:w-16 sm:h-14 lg:w-20 lg:h-16 p-1 relative inline-flex justify-center items-center gap-2">
          <div className={`left-[2px] top-[6px] sm:top-[8px] absolute text-center justify-center ${dimColor} text-3xl sm:text-4xl lg:text-5xl font-normal font-['Digital_Numbers'] z-0`}>88</div>
          <div className={`relative z-10 text-center justify-center ${textColor} text-3xl sm:text-4xl lg:text-5xl font-normal font-['Digital_Numbers'] ${textShadow}`}>
            {formatNumber(timeLeft.seconds)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
