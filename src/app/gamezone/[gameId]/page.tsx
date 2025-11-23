"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { games } from '@/config/gameConfig';
import { saveScore } from '@/utils/gameStorage';
import PuzzleGame from '@/components/GameZone/games/PuzzleGame';
import MemoryGame from '@/components/GameZone/games/MemoryGame';
import CTFGame from '@/components/GameZone/games/CTFGame';
import CrackTheCircuitGame from '@/components/GameZone/games/CrackTheCircuitGame';
import Link from 'next/link';

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params?.gameId as string;
  
  const game = games.find(g => g.id === gameId);
  
  const [gameState, setGameState] = useState<'playing' | 'nameEntry' | 'complete'>('nameEntry');
  const [playerName, setPlayerName] = useState('');
  const [gameData, setGameData] = useState<{ attempts: number; duration: number; baseScore: number } | null>(null);
  const [finalScore, setFinalScore] = useState(0);

  // If game not found
  if (!game) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Game Not Found</h1>
        <Link href="/gamezone" className="text-cyan-400 hover:underline">Back to Game Zone</Link>
      </div>
    );
  }

  const handleStartGame = () => {
    if (playerName.trim()) {
      setGameState('playing');
    }
  };

  const handleGameEnd = (attempts: number, duration: number, baseScore: number) => {
    const attemptPenalty = Math.max(0, (attempts - 1) * 10);
    const timePenalty = Math.floor(duration / 10);
    const final = Math.max(0, baseScore - attemptPenalty - timePenalty);
    
    setGameData({ attempts, duration, baseScore });
    setFinalScore(final);
    setGameState('complete');
    
    saveScore(game.id, playerName, attempts, duration, baseScore);
  };

  const renderGame = () => {
    switch (game.component) {
      case 'PuzzleGame':
        return <PuzzleGame onGameEnd={handleGameEnd} />;
      case 'MemoryGame':
        return <MemoryGame onGameEnd={handleGameEnd} />;
      case 'CTFGame':
        return <CTFGame onGameEnd={handleGameEnd} />;
      case 'CrackTheCircuitGame':
        return <CrackTheCircuitGame onGameEnd={handleGameEnd} />;
      default:
        return <div>Game component not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] font-[family-name:var(--font-instrument-sans)]">
      {/* Header / Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link 
            href="/gamezone"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
          >
            ←
          </Link>
          <h1 className="text-xl font-bold text-white">{game.name}</h1>
        </div>
        <div className="flex items-center gap-4">
           {/* Optional: Show current player name if playing */}
           {gameState === 'playing' && (
             <span className="text-zinc-400 text-sm">Player: <span className="text-white">{playerName}</span></span>
           )}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 min-h-screen flex items-center justify-center p-4">
        
        {/* Name Entry State */}
        {gameState === 'nameEntry' && (
          <div className="w-full max-w-md text-center">
            <div className="mb-8 relative group">
               <div className={`absolute inset-0 bg-gradient-to-r ${game.gradient} blur-3xl opacity-20 group-hover:opacity-30 transition-opacity`} />
               <img 
                 src={game.thumbnail} 
                 alt={game.name}
                 className="relative w-full h-64 object-cover rounded-2xl border border-white/10 shadow-2xl"
               />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">{game.name}</h1>
            <p className="text-zinc-400 mb-8">{game.description}</p>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
              <label className="block text-left text-white text-sm font-medium mb-2">Enter Your Name to Start</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleStartGame()}
                placeholder="Your name..."
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors mb-4"
                autoFocus
              />
              <button
                onClick={handleStartGame}
                disabled={!playerName.trim()}
                className={`w-full px-6 py-3 rounded-lg font-bold transition-all duration-300 ${ playerName.trim()
                    ? `bg-gradient-to-r ${game.gradient} text-white hover:shadow-lg hover:shadow-cyan-500/50`
                    : 'bg-white/10 text-zinc-500 cursor-not-allowed'
                }`}
              >
                Start Mission
              </button>
            </div>
          </div>
        )}

        {/* Playing State */}
        {gameState === 'playing' && (
          <div className="w-full max-w-6xl h-[80vh]">
            {renderGame()}
          </div>
        )}

        {/* Complete State */}
        {gameState === 'complete' && gameData && (
          <div className="w-full max-w-xl text-center">
             <div className="text-6xl mb-6 animate-bounce">🎉</div>
             <h2 className="text-4xl font-bold text-white mb-2">Mission Accomplished!</h2>
             <p className="text-cyan-400 text-xl mb-8">Excellent work, {playerName}.</p>

             <div className="bg-white/5 rounded-2xl p-8 border border-white/10 mb-8 backdrop-blur-md">
               <div className="grid grid-cols-2 gap-8 text-center">
                 <div>
                   <div className="text-5xl font-bold text-white mb-2">{finalScore}</div>
                   <div className="text-sm text-zinc-400 uppercase tracking-wider">Final Score</div>
                 </div>
                 <div className="flex flex-col justify-center gap-2">
                   <div className="flex justify-between text-sm">
                     <span className="text-zinc-400">Attempts</span>
                     <span className="text-white font-bold">{gameData.attempts}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-zinc-400">Time</span>
                     <span className="text-white font-bold">{gameData.duration}s</span>
                   </div>
                 </div>
               </div>
             </div>

             <div className="flex gap-4 justify-center">
               <button
                 onClick={() => {
                   setGameState('playing');
                   setGameData(null);
                 }}
                 className={`px-8 py-3 rounded-lg bg-gradient-to-r ${game.gradient} text-white font-bold hover:shadow-lg transition-all duration-300`}
               >
                 Play Again
               </button>
               <Link
                 href="/gamezone"
                 className="px-8 py-3 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition-all duration-300"
               >
                 Back to Base
               </Link>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
