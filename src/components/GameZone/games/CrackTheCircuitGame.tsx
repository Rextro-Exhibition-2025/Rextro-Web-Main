"use client";

import React, { useState, useEffect, useRef } from 'react';

interface CrackTheCircuitGameProps {
  onGameEnd: (attempts: number, duration: number, baseScore: number) => void;
}

interface GameProgressData {
  currentLevel: number;
  totalLevels: number;
  levelsBeaten: number;
  hintsUsed: number;
  elapsedTime: number;
}

const CrackTheCircuitGame: React.FC<CrackTheCircuitGameProps> = ({ onGameEnd }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security check - only accept messages from our own origin
      if (event.origin !== globalThis.location.origin) return;

      if (event.data.type === 'GAME_COMPLETE') {
        const gameData: GameProgressData = event.data.gameData;
        
        // Calculate final score
        const baseScore = 1800;
        const hintPenalty = gameData.hintsUsed * 50;
        const timePenalty = Math.floor(gameData.elapsedTime / 1000 / 10);
        const finalScore = Math.max(0, baseScore - hintPenalty - timePenalty);
        
        // Duration in seconds
        const duration = Math.floor(gameData.elapsedTime / 1000);
        
        // Attempts = levels beaten (represents game progress)
        const attempts = gameData.levelsBeaten;
        
        onGameEnd(attempts, duration, finalScore);
      } else if (event.data.type === 'LEVEL_WIN') {
        // Optional: Track level-by-level progress
        const gameData: GameProgressData = event.data.gameData;
        console.log(`Level ${gameData.currentLevel} completed!`);
      } else if (event.data.type === 'GAME_READY') {
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onGameEnd]);

  // Handle iframe load
  const handleIframeLoad = () => {
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#122024] rounded-xl overflow-hidden border border-cyan-500/20">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#122024] flex flex-col items-center justify-center z-10">
          <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4" />
          <p className="text-cyan-400 text-lg font-semibold animate-pulse">Initializing Circuit Board...</p>
        </div>
      )}

      {/* Game iframe */}
      <iframe
        ref={iframeRef}
        src="/games/crack-the-circuit/index.html"
        className="w-full h-full border-0"
        title="Crack The Circuit Game"
        onLoad={handleIframeLoad}
        allow="autoplay"
      />

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 pointer-events-none" />
    </div>
  );
};

export default CrackTheCircuitGame;
