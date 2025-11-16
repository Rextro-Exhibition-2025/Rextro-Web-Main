"use client";

import React, { useEffect, useRef, useImperativeHandle } from 'react';

interface MeteorPath {
  width: number;
  height: number;
  path: string;
  repeat: number;
  delay: number;
}

interface MeteorAnimationProps {
  meteors: MeteorPath[];
  style?: React.CSSProperties;
  className?: string;
  skip?: number;
  segments?: number;
  minSize?: number;
  maxSize?: number;
  gap?: number;
  stops?: 'light' | 'dark' | [string, number][];
  wait?: boolean;
  speed?: number;
}

interface MeteorAnimationRef {
  start: () => void;
}

const DEFAULT_STOPS = {
  light: [
    ['rgb(93 227 255 / 0)', 0],
    ['rgb(93 227 255)', 0.5],
    ['rgb(108 71 255)', 1],
  ] as [string, number][],
  dark: [
    ['rgb(108 71 255 / 0)', 0],
    ['rgb(108 71 255)', 0.5],
    ['rgb(93 227 255)', 1],
  ] as [string, number][],
};

export const HERO_METEORS: MeteorPath[] = [
  {
    width: 403,
    height: 363,
    path: 'M296 224V187.314C296 185.192 296.843 183.157 298.343 181.657L352.657 127.343C354.157 125.843 356.192 125 358.314 125H383',
    repeat: 2000,
    delay: 0,
  },
  {
    width: 403,
    height: 363,
    path: 'M294 226H209.314C207.192 226 205.157 226.843 203.657 228.343L86.8431 345.157C85.3428 346.657 83.308 347.5 81.1863 347.5H20',
    repeat: 1500,
    delay: 400,
  },
  {
    width: 403,
    height: 363,
    path: 'M54 290V133.657C54 132.596 54.4214 131.579 55.1716 130.828L89.8284 96.1716C90.5786 95.4214 91 94.404 91 93.3431V16',
    repeat: 2300,
    delay: 500,
  },
  {
    width: 403,
    height: 363,
    path: 'M287 89V70.5L314.157 43.3431C315.657 41.8429 316.5 39.808 316.5 37.6863V21',
    repeat: 1700,
    delay: 600,
  },
];

// Alternative meteor paths (mirrored version)
export const HERO_METEORS_ALT: MeteorPath[] = [
  {
    width: 403,
    height: 363,
    path: 'M296 224V187.314C296 185.192 296.843 183.157 298.343 181.657L352.657 127.343C354.157 125.843 356.192 125 358.314 125H383',
    repeat: 1500,
    delay: 250,
  },
  {
    width: 403,
    height: 363,
    path: 'M294 226H209.314C207.192 226 205.157 226.843 203.657 228.343L86.8431 345.157C85.3428 346.657 83.308 347.5 81.1863 347.5H20',
    repeat: 1200,
    delay: 300,
  },
  {
    width: 403,
    height: 363,
    path: 'M54 290V133.657C54 132.596 54.4214 131.579 55.1716 130.828L89.8284 96.1716C90.5786 95.4214 91 94.404 91 93.3431V16',
    repeat: 1000,
    delay: 4000,
  },
  {
    width: 403,
    height: 363,
    path: 'M287 89V70.5L314.157 43.3431C315.657 41.8429 316.5 39.808 316.5 37.6863V21',
    repeat: 2000,
    delay: 500,
  },
];

function calculateTotalLength(
  segments: number,
  minSize: number,
  maxSize: number,
  gap: number,
  count?: number
): number {
  let total = 0;
  const segmentCount = count ?? segments;
  
  for (let i = 0; i < segmentCount; i++) {
    const size = minSize + (i / (segments - 1)) * (maxSize - minSize);
    total += size;
  }
  
  return total + gap * (segmentCount - 1);
}

function createGradientColorInterpolator(stops: [string, number][]): (t: number) => string {
  const interpolators = stops.slice(0, -1).map((stop, i) => {
    const nextStop = stops[i + 1];
    return {
      interpolate: simpleColorInterpolate(stop[0], nextStop[0]),
      start: stop[1],
      end: nextStop[1],
    };
  });

  return (t: number) => {
    for (const { interpolate, start, end } of interpolators) {
      if (t >= start && t <= end) {
        return interpolate((t - start) / (end - start));
      }
    }
    return stops[stops.length - 1][0];
  };
}

function simpleColorInterpolate(color1: string, color2: string): (t: number) => string {
  return (t: number) => {
    const rgb1 = parseRgb(color1);
    const rgb2 = parseRgb(color2);
    
    if (!rgb1 || !rgb2) return color2;
    
    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * t);
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * t);
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * t);
    const a = rgb1.a + (rgb2.a - rgb1.a) * t;
    
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };
}

function parseRgb(color: string): { r: number; g: number; b: number; a: number } | null {
  const match = color.match(/rgba?\((\d+)\s+(\d+)\s+(\d+)(?:\s*\/\s*([\d.]+))?\)/);
  if (!match) return null;
  
  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3]),
    a: match[4] ? parseFloat(match[4]) : 1,
  };
}

const MeteorAnimation = React.forwardRef<MeteorAnimationRef, MeteorAnimationProps>(
  (
    {
      meteors,
      style,
      className,
      skip = 0,
      segments = 20,
      minSize = 1.25,
      maxSize = 1.25,
      gap = 2.5,
      stops = 'light',
      wait = false,
      speed = 0.3,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pathRefs = useRef<SVGPathElement[]>([]);
    const startTimeRef = useRef<number | null>(null);
    const lastFrameTimeRef = useRef<number | null>(null);
    const currentTimeRef = useRef<number>(0);
    const meteorStatesRef = useRef<any[]>([]);
    const waitingRef = useRef(wait);
    
    const gradientStops = typeof stops === 'string' ? DEFAULT_STOPS[stops] : stops;
    const colorInterpolator = createGradientColorInterpolator(gradientStops);

    useImperativeHandle(ref, () => ({
      start: () => {
        startTimeRef.current = null;
        for (const state of meteorStatesRef.current) {
          state.d = 0;
        }
        waitingRef.current = false;
      },
    }));

    useEffect(() => {
      let animationFrameId: number;
      const dpr = Math.max(1, Math.min(window.devicePixelRatio, 2));
      const canvas = canvasRef.current;
      
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Setup canvas
      const canvasWidth = canvas.offsetWidth * dpr;
      const canvasHeight = canvas.offsetHeight * dpr;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.scale(dpr, dpr);

      // Initialize meteor states
      const states = meteorStatesRef.current;
      if (states.length === 0) {
        for (let i = 0; i < meteors.length; i++) {
          const meteor = meteors[i];
          const meteorLength = calculateTotalLength(segments, minSize, maxSize, gap);
          const initialOffset = -meteorLength * (canvas.offsetWidth / meteor.width / dpr);
          
          let pathLength = pathRefs.current[i]?.getTotalLength() || 0;
          pathLength = pathLength * (canvas.offsetWidth / meteor.width) / dpr;
          
          // Scale the path for the canvas
          const scaledPath = new Path2D(
            meteor.path
              .replace(/H\s*([\d.]+)/g, (_, x) => `H${parseFloat(x) * (canvasWidth / meteor.width) / dpr}`)
              .replace(/V\s*([\d.]+)/g, (_, y) => `V${parseFloat(y) * (canvasHeight / meteor.height) / dpr}`)
              .replace(/(M|L)\s*([\d.]+)\s+([\d.]+)/g, (_, cmd, x, y) => 
                `${cmd}${parseFloat(x) * (canvasWidth / meteor.width) / dpr} ${parseFloat(y) * (canvasHeight / meteor.height) / dpr}`
              )
              .replace(/C\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/g, 
                (_, x1, y1, x2, y2, x3, y3) =>
                  `C${parseFloat(x1) * (canvasWidth / meteor.width) / dpr} ${parseFloat(y1) * (canvasHeight / meteor.height) / dpr} ` +
                  `${parseFloat(x2) * (canvasWidth / meteor.width) / dpr} ${parseFloat(y2) * (canvasHeight / meteor.height) / dpr} ` +
                  `${parseFloat(x3) * (canvasWidth / meteor.width) / dpr} ${parseFloat(y3) * (canvasHeight / meteor.height) / dpr}`
              )
          );
          
          states[i] = {
            path: scaledPath,
            meteorLength,
            d: initialOffset,
            totalLength: pathLength,
            w: canvasWidth,
            h: canvasHeight,
            playing: false,
          };
        }
      }

      // Create gradient circle image
      const gradientImage = new Image();
      
      const animate = () => {
        if (waitingRef.current) {
          animationFrameId = window.requestAnimationFrame(animate);
          return;
        }
        
        if (!canvas || !ctx) return;
        
        const now = performance.now();
        if (startTimeRef.current === null) {
          startTimeRef.current = now;
        }
        
        currentTimeRef.current = now - startTimeRef.current;
        
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // Draw each meteor
        for (let i = 0; i < states.length; i++) {
          if (!pathRefs.current[i]) continue;
          
          const { delay = 0, repeat, width } = meteors[i];
          const { w, h, path } = states[i];
          const meteorLength = calculateTotalLength(segments, minSize, maxSize, gap);
          
          let elapsedTime = typeof repeat === 'number' 
            ? (currentTimeRef.current - delay) % repeat 
            : currentTimeRef.current - delay;
          
          elapsedTime = Math.max(0, elapsedTime);
          
          if (elapsedTime <= 0) continue;
          
          const skipOffset = skip * (canvas.offsetWidth / width) / dpr;
          states[i].d = skipOffset + (-meteorLength + elapsedTime * speed * (canvas.offsetWidth / width) / dpr);
          
          if (states[i].d > states[i].totalLength) {
            states[i].playing = false;
            continue;
          }
          
          if (!states[i].playing) {
            states[i].playing = true;
          }
          
          // Draw gradient circles
          ctx.beginPath();
          ctx.globalAlpha = 1;
          
          for (let j = 0; j < segments; j++) {
            const segmentOffset = calculateTotalLength(segments, minSize, maxSize, gap, j + 1) + states[i].d;
            
            if (segmentOffset < 0 || segmentOffset > states[i].totalLength) continue;
            
            const size = minSize + (j / (segments - 1)) * (maxSize - minSize);
            const point = pathRefs.current[i].getPointAtLength(segmentOffset + size / 2);
            const diameter = size * 2;
            
            ctx.drawImage(
              gradientImage,
              point.x - diameter / 2,
              point.y - diameter / 2,
              diameter,
              diameter
            );
          }
          
          ctx.globalAlpha = 1;
          
          // Create gradient
          const startPoint = pathRefs.current[i].getPointAtLength(states[i].d);
          const endPoint = pathRefs.current[i].getPointAtLength(states[i].d + meteorLength);
          
          const minX = Math.min(startPoint.x, endPoint.x);
          const maxX = Math.max(startPoint.x, endPoint.x);
          const minY = Math.min(startPoint.y, endPoint.y);
          const maxY = Math.max(startPoint.y, endPoint.y);
          
          ctx.rect(minX - 16, minY - 16, maxX - minX + 32, maxY - minY + 32);
          
          const gradient = ctx.createLinearGradient(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
          for (const [color, offset] of gradientStops) {
            gradient.addColorStop(offset, color);
          }
          
          ctx.globalCompositeOperation = 'source-atop';
          ctx.fillStyle = gradient;
          ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
          
          // Draw strokes
          for (let j = 0; j < segments; j++) {
            const segmentOffset = calculateTotalLength(segments, minSize, maxSize, gap, j + 1) + states[i].d;
            
            if (segmentOffset < 0 || segmentOffset > states[i].totalLength) continue;
            
            const size = minSize + (j / (segments - 1)) * (maxSize - minSize);
            ctx.lineWidth = size * (canvas.offsetWidth / width) / dpr;
            ctx.strokeStyle = colorInterpolator((j + 1) / segments);
            ctx.setLineDash([0, segmentOffset, size, 999999]);
            ctx.stroke(path);
          }
        }
        
        lastFrameTimeRef.current = now;
        animationFrameId = window.requestAnimationFrame(animate);
      };
      
      gradientImage.onload = () => {
        animationFrameId = window.requestAnimationFrame(animate);
      };
      
      // Simple gradient circle (white to transparent)
      gradientImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAAXNSR0IArs4c6QAAAEhQTFRFAAAA////AP//AAD/AP//gID/AP//AKr/AL//ANX/AKr/ALb/AN//AL//AMb/AMbjAMz/ANH/ALnoANj/AMj/AMjtANX/AMn/G8447gAAABh0Uk5TAAEBAQICAwMEBgYHCAgJCQoLCw0ODhITA3IuUQAAAEdJREFUeNoNycENwzAMBMFdkgmQ/qs1IPHi+Q4qIioMnfXQNdPfD5KJ/op+cgrHeg8rRONSI3vI7t321i7Pngh21blEDCDwB0UUHis/7NTIAAAAAElFTkSuQmCC';
      
      return () => {
        gradientImage.onload = null;
        window.cancelAnimationFrame(animationFrameId);
      };
    }, [meteors, segments, minSize, maxSize, gap, gradientStops, colorInterpolator, skip, speed]);

    return (
      <>
        <canvas
          ref={canvasRef}
          className={className || 'absolute inset-0 h-full w-full'}
          style={style}
          aria-hidden="true"
        />
        {meteors.map((meteor, index) => (
          <svg key={index} width="0" height="0" aria-hidden="true">
            <path
              d={meteor.path}
              ref={(el) => {
                if (el) pathRefs.current[index] = el;
              }}
            />
          </svg>
        ))}
      </>
    );
  }
);

MeteorAnimation.displayName = 'MeteorAnimation';

export default MeteorAnimation;
