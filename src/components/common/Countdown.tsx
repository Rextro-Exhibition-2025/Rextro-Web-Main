'use client';

import { useState, useEffect } from 'react';
import './Countdown.css';

const numbers = [
  0x7e, // 0
  0x30, // 1
  0x6d, // 2
  0x79, // 3
  0x33, // 4
  0x5b, // 5
  0x5f, // 6
  0x70, // 7
  0x7f, // 8
  0x7b, // 9
];

interface ColonProps {
  blink?: boolean;
}

const Colon = ({ blink }: ColonProps) => {
  return <div className={`Colon ${blink ? 'Colon--blink' : ''}`} />;
};

interface SegmentProps {
  position: string;
  on: boolean;
}

const Segment = ({ position, on }: SegmentProps) => {
  return (
    <div
      className={`Segment Segment-${position} ${on ? 'Segment--on' : ''}`}
    />
  );
};

interface DisplayProps {
  value: number;
}

const Display = ({ value }: DisplayProps) => {
  const segments = ['G', 'F', 'E', 'D', 'C', 'B', 'A'];
  const bit = numbers[value];

  return (
    <div className="Display">
      {segments.map((seg, i) => (
        <Segment key={seg} on={((bit >> i) & 1) === 1} position={seg} />
      ))}
    </div>
  );
};

interface CountdownProps {
  targetDate?: Date | string;
}

const Countdown = ({ targetDate = '2025-12-05T00:00:00' }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: [0, 0],
    hours: [0, 0],
    minutes: [0, 0],
    seconds: [0, 0],
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const daysStr = days.toString().padStart(2, '0').split('');
        const hoursStr = hours.toString().padStart(2, '0').split('');
        const minutesStr = minutes.toString().padStart(2, '0').split('');
        const secondsStr = seconds.toString().padStart(2, '0').split('');

        setTimeLeft({
          days: [parseInt(daysStr[0]), parseInt(daysStr[1])],
          hours: [parseInt(hoursStr[0]), parseInt(hoursStr[1])],
          minutes: [parseInt(minutesStr[0]), parseInt(minutesStr[1])],
          seconds: [parseInt(secondsStr[0]), parseInt(secondsStr[1])],
        });
      } else {
        setTimeLeft({
          days: [0, 0],
          hours: [0, 0],
          minutes: [0, 0],
          seconds: [0, 0],
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-container">
      <div className="countdown-wrapper">
        {/* Days */}
        <div className="countdown-group">
          <div className="countdown-label">DD</div>
          <div className="countdown-digits">
            <Display value={timeLeft.days[0]} />
            <Display value={timeLeft.days[1]} />
          </div>
        </div>

        <Colon />

        {/* Hours */}
        <div className="countdown-group">
          <div className="countdown-label">HH</div>
          <div className="countdown-digits">
            <Display value={timeLeft.hours[0]} />
            <Display value={timeLeft.hours[1]} />
          </div>
        </div>

        <Colon />

        {/* Minutes */}
        <div className="countdown-group">
          <div className="countdown-label">MM</div>
          <div className="countdown-digits">
            <Display value={timeLeft.minutes[0]} />
            <Display value={timeLeft.minutes[1]} />
          </div>
        </div>

        <Colon blink />

        {/* Seconds */}
        <div className="countdown-group">
          <div className="countdown-label">SS</div>
          <div className="countdown-digits">
            <Display value={timeLeft.seconds[0]} />
            <Display value={timeLeft.seconds[1]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
