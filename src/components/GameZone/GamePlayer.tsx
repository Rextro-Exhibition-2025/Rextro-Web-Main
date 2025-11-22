"use client";

import React, { useState, useEffect } from 'react';
import { Game } from '@/config/gameConfig';
import { saveScore } from '@/utils/gameStorage';
import PuzzleGame from './games/PuzzleGame';
import MemoryGame from './games/MemoryGame';
import CTFGame from './games/CTFGame';



interface GamePlayerProps {
  game: Game;
  onClose: () => void;
  onScoreSaved: () => void;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ game, onClose, onScoreSaved }) => {
  const [gameState, setGameState] = useState<'playing' | 'nameEntry' | 'complete'>('nameEntry');
  const [playerName, setPlayerName] = useState('');
  const [gameData, setGameData] = useState<{ attempts: number; duration: number; baseScore: number } | null>(null);
  const [finalScore, setFinalScore] = useState(0);

  const handleStartGame = () => {
    if (playerName.trim()) {
      setGameState('playing');
    }
  };

  const handleGameEnd = (attempts: number, duration: number, baseScore: number) => {
    // Calculate final score
    const attemptPenalty = Math.max(0, (attempts - 1) * 10);
    const timePenalty = Math.floor(duration / 10);
    const final = Math.max(0, baseScore - attemptPenalty - timePenalty);
    
    setGameData({ attempts, duration, baseScore });
    setFinalScore(final);
    setGameState('complete');
    
    // Save score
    saveScore(game.id, playerName, attempts, duration, baseScore);
    onScoreSaved();
  };

  const renderGame = () => {
    switch (game.component) {
      case 'PuzzleGame':
        return <PuzzleGame onGameEnd={handleGameEnd} />;
      case 'MemoryGame':
        return <MemoryGame onGameEnd={handleGameEnd} />;
      case 'CTFGame':
        return <CTFGame onGameEnd={handleGameEnd} />;
      default:
        return <div>Game not found</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl bg-gradient-to-br from-[#0A0A0C] to-zinc-900 rounded-2xl border border-white/10 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition-all duration-300"
        >
          ×
        </button>

        {/* Name Entry State */}
        {gameState === 'nameEntry' && (
          <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center">
            <div className={`text-6xl mb-6 bg-gradient-to-r ${game.gradient} bg-clip-text text-transparent`}>
              {game.name}
            </div>
            <p className="text-zinc-400 mb-8 max-w-md">
              {game.description}
            </p>
            
            <div className="w-full max-w-md">
              <label className="block text-white text-sm font-medium mb-2">Enter Your Name</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleStartGame()}
                placeholder="Your name..."
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors"
                autoFocus
              />
              
              <button
                onClick={handleStartGame}
                disabled={!playerName.trim()}
                className={`w-full mt-4 px-6 py-3 rounded-lg font-bold transition-all duration-300 ${ playerName.trim()
                    ? `bg-gradient-to-r ${game.gradient} text-white hover:shadow-lg hover:shadow-cyan-500/50`
                    : 'bg-white/10 text-zinc-500 cursor-not-allowed'
                }`}
              >
                Start Game
              </button>
            </div>
          </div>
        )}

        {/* Playing State */}
        {gameState === 'playing' && (
          <div className="min-h-[600px]">
            {renderGame()}
          </div>
        )}

        {/* Complete State */}
        {gameState === 'complete' && gameData && (
          <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-2">Game Complete!</h2>
            <p className="text-cyan-400 text-xl mb-8">Well done, {playerName}!</p>
            
            <div className="w-full max-w-md bg-white/5 rounded-xl p-6 border border-white/10 mb-8">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">{finalScore}</div>
                  <div className="text-sm text-zinc-400">Final Score</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">{gameData.attempts}</div>
                  <div className="text-sm text-zinc-400">Attempts</div>
                </div>
                <div className="col-span-2">
                  <div className="text-3xl font-bold text-white mb-1">{gameData.duration}s</div>
                  <div className="text-sm text-zinc-400">Time Taken</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setGameState('playing');
                  setGameData(null);
                }}
                className={`px-6 py-3 rounded-lg bg-gradient-to-r ${game.gradient} text-white font-bold hover:shadow-lg transition-all duration-300`}
              >
                Play Again
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition-all duration-300"
              >
                Back to Games
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePlayer;
