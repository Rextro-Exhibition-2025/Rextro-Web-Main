"use client";

import React, { useEffect, useRef } from "react";
import { DotLottiePlayer, type DotLottieCommonPlayer } from '@dotlottie/react-player';

interface ScrollTriggeredLottieProps {
    src: string;
    threshold?: number;
    className?: string;
    style?: React.CSSProperties;
}

const ScrollTriggeredLottie = ({ src, threshold = 0.2, className, style }: ScrollTriggeredLottieProps) => {
  const lottieRef = useRef<DotLottieCommonPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold } 
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    if (isLoaded && isVisible) {
        lottieRef.current?.seek(0);
        lottieRef.current?.play();
    } else {
        lottieRef.current?.stop();
    }
  }, [isLoaded, isVisible]);

  return (
    <div ref={containerRef} className={className} style={style}>
      <DotLottiePlayer
        src={src}
        autoplay={false}
        loop={false}
        ref={lottieRef}
        style={{ width: '100%', height: '100%' }}
        onEvent={(event) => {
            if ((event as any) === 'load' || (event as any) === 'ready') {
                setIsLoaded(true);
            }
        }}
        rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice',
        }}
      />
    </div>
  );
};

export default ScrollTriggeredLottie;
