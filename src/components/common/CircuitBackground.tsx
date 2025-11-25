import React from 'react';
import MeteorAnimation, { HERO_METEORS, HERO_METEORS_ALT } from '@/components/Homepage/MeteorAnimation';

interface CircuitBackgroundProps {
  className?: string;
  showMeteors?: boolean;
}

const CircuitBackground: React.FC<CircuitBackgroundProps> = ({ 
  className = '', 
  showMeteors = true 
}) => {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      {/* Left Circuit Board */}
      <div className="absolute top-1/2 -translate-y-1/2 right-1/2 aspect-[969/887] w-[969px]">
        <picture>
          <source srcSet="/circuit-lines@2xl.webp" type="image/webp" />
          <img
            alt=""
            className="absolute inset-0 h-full w-full"
            style={{ color: 'transparent' }}
            src="/circuit-lines@2xl.webp"
          />
        </picture>
        {showMeteors && (
          <div className="absolute inset-0">
            <MeteorAnimation meteors={HERO_METEORS} stops="light" speed={0.4} />
          </div>
        )}
      </div>

      {/* Right Circuit Board (Mirrored) */}
      <div className="absolute top-1/2 -translate-y-1/2 right-1/2 origin-right -scale-x-100 aspect-[969/887] w-[969px]">
        <picture>
          <source srcSet="/circuit-lines@2xl.webp" type="image/webp" />
          <img
            alt=""
            className="absolute inset-0 h-full w-full"
            style={{ color: 'transparent' }}
            src="/circuit-lines@2xl.webp"
          />
        </picture>
        {showMeteors && (
          <div className="absolute inset-0">
            <MeteorAnimation meteors={HERO_METEORS_ALT} stops="light" speed={0.4} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CircuitBackground;
