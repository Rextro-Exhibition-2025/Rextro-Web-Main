"use client";

import React, { useState, useEffect, useRef } from 'react';

interface CrackTheCircuitGameProps {
  onGameEnd: (levelScores: LevelScore[], totalScore: number, timeSpent: number) => void;
  timeLimit?: number; // Time limit in seconds
}

interface GameProgressData {
  currentLevel: number;
  totalLevels: number;
  levelsBeaten: number;
  hintsUsed: number;
  elapsedTime: number;
}

interface LevelScore {
  level: number;
  score: number;
  timeSpent: number;
}

const CrackTheCircuitGame: React.FC<CrackTheCircuitGameProps> = ({ 
  onGameEnd, 
  timeLimit = 30 // Default 30 seconds
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasEndedRef = useRef(false); // Prevent multiple game end calls
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levelScores, setLevelScores] = useState<LevelScore[]>([]);
  const [gameStartTime, setGameStartTime] = useState<number>(Date.now());
  const [levelStartTime, setLevelStartTime] = useState<number>(Date.now());

  // Timer countdown
  useEffect(() => {
    if (isLoading || isTimeUp) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading, isTimeUp]);

  // Handle time up - called via useEffect to avoid render cycle issues
  useEffect(() => {
    if (isTimeUp && !hasEndedRef.current) {
      hasEndedRef.current = true;
      const totalTimeSpent = Math.floor((Date.now() - gameStartTime) / 1000);
      const totalScore = levelScores.reduce((sum, ls) => sum + ls.score, 0);
      
      // Delay to ensure state is fully updated
      setTimeout(() => {
        onGameEnd(levelScores, totalScore, totalTimeSpent);
      }, 100);
    }
  }, [isTimeUp, levelScores, gameStartTime, onGameEnd]);

  // Load level scoring from config
  const getLevelScore = (level: number): number => {
    const levelScoring: { [key: number]: number } = {
      1: 100,
      2: 200,
      3: 300,
      4: 500,
      5: 700,
    };
    return levelScoring[level] || 100;
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security check - only accept messages from our own origin
      if (event.origin !== globalThis.location.origin) return;

      if (event.data.type === 'GAME_COMPLETE') {
        if (hasEndedRef.current) return; // Already ended
        hasEndedRef.current = true;
        
        const gameData: GameProgressData = event.data.gameData;
        
        // Calculate total time spent
        const totalTimeSpent = Math.floor((Date.now() - gameStartTime) / 1000);
        
        // Use functional update to get latest levelScores
        setLevelScores(currentScores => {
          const totalScore = currentScores.reduce((sum, ls) => sum + ls.score, 0);
          
          setTimeout(() => {
            onGameEnd(currentScores, totalScore, totalTimeSpent);
          }, 0);
          
          return currentScores;
        });
      } else if (event.data.type === 'LEVEL_WIN') {
        // Track level-by-level progress
        const gameData: GameProgressData = event.data.gameData;
        const levelTime = Math.floor((Date.now() - levelStartTime) / 1000);
        const levelScore = getLevelScore(gameData.currentLevel);
        
        setLevelScores(prev => [...prev, {
          level: gameData.currentLevel,
          score: levelScore,
          timeSpent: levelTime,
        }]);
        
        setCurrentLevel(gameData.currentLevel + 1);
        setLevelStartTime(Date.now());
        
        console.log(`Level ${gameData.currentLevel} completed! Score: ${levelScore}`);
      } else if (event.data.type === 'GAME_READY') {
        setIsLoading(false);
        setGameStartTime(Date.now());
        setLevelStartTime(Date.now());
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onGameEnd, levelScores, gameStartTime, levelStartTime]);

  // Handle iframe load
  const handleIframeLoad = () => {
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#122024] rounded-xl overflow-hidden border border-cyan-500/20">
      {/* Timer Display */}
      {!isLoading && !isTimeUp && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className={`px-6 py-3 rounded-lg backdrop-blur-md border-2 ${
            timeRemaining <= 5 
              ? 'bg-red-500/20 border-red-500 animate-pulse' 
              : timeRemaining <= 10 
              ? 'bg-orange-500/20 border-orange-500' 
              : 'bg-cyan-500/20 border-cyan-500'
          }`}>
            <div className="flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={timeRemaining <= 5 ? 'text-red-400' : 'text-cyan-400'}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  timeRemaining <= 5 ? 'text-red-400' : 'text-cyan-400'
                }`}>
                  {timeRemaining}s
                </div>
                <div className="text-xs text-gray-400">Time Left</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Level and Score Display */}
      {!isLoading && !isTimeUp && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-cyan-500/20 backdrop-blur-md border-2 border-cyan-500 rounded-lg px-4 py-2">
            <div className="text-cyan-400 text-sm font-bold">Level {currentLevel}</div>
            <div className="text-xs text-gray-400">
              Score: {levelScores.reduce((sum, ls) => sum + ls.score, 0)}
            </div>
          </div>
        </div>
      )}

      {/* Time Up Overlay */}
      {isTimeUp && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-30">
          <div className="text-6xl mb-4">⏰</div>
          <h2 className="text-4xl font-bold text-red-400 mb-2">Time's Up!</h2>
          <p className="text-gray-400 text-lg">Your game has ended</p>
          <div className="mt-6 text-cyan-400 text-xl">
            Final Score: {levelScores.reduce((sum, ls) => sum + ls.score, 0)}
          </div>
          <div className="text-gray-400 text-sm mt-2">
            Levels Completed: {levelScores.length}
          </div>
        </div>
      )}

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
