"use client";

import React from 'react';
import { Game, getDifficultyColor, getDifficultyBg } from '@/config/gameConfig';

import Link from 'next/link';

interface GameSelectionGridProps {
  games: Game[];
}

const GameSelectionGrid: React.FC<GameSelectionGridProps> = ({ games }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <Link
          key={game.id}
          href={`/gamezone/${game.id}`}
          className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden text-left block"
        >
          {/* Hover Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Thumbnail */}
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-zinc-900">
              <img
                src={game.thumbnail}
                alt={game.name}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              />
              {/* Difficulty Badge */}
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-md border ${getDifficultyBg(game.difficulty)}`}>
                <span className={getDifficultyColor(game.difficulty)}>{game.difficulty}</span>
              </div>
            </div>

            {/* Game Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                {game.name}
              </h3>
              <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                {game.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <div className="flex items-center gap-1">
                  <span>🎯</span>
                  <span>Max: {game.maxScore}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>⏱️</span>
                  <span>{Math.floor(game.estimatedTime / 60)} min</span>
                </div>
              </div>
            </div>

            {/* Play Button */}
            <div className="mt-4 flex items-center justify-between">
              <div className={`px-4 py-2 rounded-lg bg-gradient-to-r ${game.gradient} text-white font-bold text-sm group-hover:shadow-lg transition-all duration-300`}>
                Play Now →
              </div>
            </div>
          </div>

          {/* Animated Border Glow */}
          <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r ${game.gradient}`} style={{ zIndex: -1 }} />
        </Link>
      ))}
    </div>
  );
};

export default GameSelectionGrid;
