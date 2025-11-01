'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Timer = () => {
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

  return (
    <div className="self-stretch px-6 pb-6 inline-flex justify-end items-center gap-6">
      {/* Days */}
      <div className="inline-flex flex-col justify-start items-center gap-2">
        <div className="self-stretch text-center justify-center text-white/50 text-4xl font-normal font-[family-name:var(--font-instrument-sans)]">DD</div>
        <div className="w-20 h-16 p-1 relative inline-flex justify-center items-center gap-2">
          <div className="left-[2px] top-[8px] absolute text-center justify-center text-white/10 text-5xl font-normal font-['Digital_Numbers']">88</div>
          <div className="text-center justify-center text-white text-5xl font-normal font-['Digital_Numbers'] [text-shadow:_0px_0px_7px_rgb(255_136_0_/_1.00),_0px_0px_14px_rgb(255_136_0_/_1.00),_0px_0px_48px_rgb(255_136_0_/_1.00),_0px_0px_97px_rgb(255_136_0_/_1.00),_0px_0px_166px_rgb(255_136_0_/_1.00),_0px_0px_290px_rgb(255_136_0_/_1.00)]">
            {formatNumber(timeLeft.days)}
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="w-2 h-28 py-3 inline-flex flex-col justify-end items-center gap-4">
        <div className="self-stretch h-2 opacity-50 bg-white rounded-full" />
        <div className="self-stretch h-2 opacity-50 bg-white rounded-full" />
      </div>

      {/* Hours */}
      <div className="inline-flex flex-col justify-start items-center gap-2">
        <div className="self-stretch text-center justify-center text-white/50 text-4xl font-normal font-[family-name:var(--font-instrument-sans)]">HH</div>
        <div className="w-20 h-16 p-1 relative inline-flex justify-center items-center gap-2">
          <div className="left-[2px] top-[8px] absolute text-center justify-center text-white/10 text-5xl font-normal font-['Digital_Numbers']">88</div>
            <div className="text-center justify-center text-white text-5xl font-normal font-['Digital_Numbers'] [text-shadow:_0px_0px_7px_rgb(255_136_0_/_1.00),_0px_0px_14px_rgb(255_136_0_/_1.00),_0px_0px_48px_rgb(255_136_0_/_1.00),_0px_0px_97px_rgb(255_136_0_/_1.00),_0px_0px_166px_rgb(255_136_0_/_1.00),_0px_0px_290px_rgb(255_136_0_/_1.00)]">
             {formatNumber(timeLeft.hours)}
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="w-2 h-28 py-3 inline-flex flex-col justify-end items-center gap-4">
        <div className="self-stretch h-2 opacity-50 bg-white rounded-full" />
        <div className="self-stretch h-2 opacity-50 bg-white rounded-full" />
      </div>

      {/* Minutes */}
      <div className="inline-flex flex-col justify-start items-center gap-2">
        <div className="self-stretch text-center justify-center text-white/50 text-4xl font-normal font-[family-name:var(--font-instrument-sans)]">MM</div>
        <div className="w-20 h-16 p-1 relative inline-flex justify-center items-center gap-2">
          <div className="left-[2px] top-[8px] absolute text-center justify-center text-white/10 text-5xl font-normal font-['Digital_Numbers']">88</div>
          <div className="text-center justify-center text-white text-5xl font-normal font-['Digital_Numbers'] [text-shadow:_0px_0px_7px_rgb(255_136_0_/_1.00),_0px_0px_14px_rgb(255_136_0_/_1.00),_0px_0px_48px_rgb(255_136_0_/_1.00),_0px_0px_97px_rgb(255_136_0_/_1.00),_0px_0px_166px_rgb(255_136_0_/_1.00),_0px_0px_290px_rgb(255_136_0_/_1.00)]">
            {formatNumber(timeLeft.minutes)}
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="w-2 h-28 py-3 inline-flex flex-col justify-end items-center gap-4">
        <div className="self-stretch h-2 opacity-50 bg-white rounded-full" />
        <div className="self-stretch h-2 opacity-50 bg-white rounded-full" />
      </div>

      {/* Seconds */}
      <div className="inline-flex flex-col justify-start items-center gap-2">
        <div className="self-stretch text-center justify-center text-white/50 text-4xl font-normal font-[family-name:var(--font-instrument-sans)]">SS</div>
        <div className="w-20 h-16 p-1 relative inline-flex justify-center items-center gap-2">
          <div className="left-[2px] top-[8px] absolute text-center justify-center text-white/10 text-5xl font-normal font-['Digital_Numbers']">88</div>
          <div className="text-center justify-center text-white text-5xl font-normal font-['Digital_Numbers'] [text-shadow:_0px_0px_7px_rgb(255_136_0_/_1.00),_0px_0px_14px_rgb(255_136_0_/_1.00),_0px_0px_48px_rgb(255_136_0_/_1.00),_0px_0px_97px_rgb(255_136_0_/_1.00),_0px_0px_166px_rgb(255_136_0_/_1.00),_0px_0px_290px_rgb(255_136_0_/_1.00)]">
            {formatNumber(timeLeft.seconds)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
