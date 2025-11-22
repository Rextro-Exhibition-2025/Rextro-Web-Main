"use client";

import React, { useState, useEffect } from 'react';

interface PuzzleGameProps {
  onGameEnd: (attempts: number, duration: number, baseScore: number) => void;
}

const PuzzleGame: React.FC<PuzzleGameProps> = ({ onGameEnd }) => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTime] = useState(Date.now());
  const [isComplete, setIsComplete] = useState(false);

  // Initialize puzzle (3x3 grid)
  useEffect(() => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // 0 represents empty
    // Shuffle array
    const shuffled = numbers.sort(() => Math.random() - 0.5);
    setTiles(shuffled);
  }, []);

  const isSolved = (tiles: number[]) => {
    return tiles.every((tile, index) => tile === index + 1 || (tile === 0 && index === 8));
  };

  const handleTileClick = (index: number) => {
    if (isComplete) return;

    const emptyIndex = tiles.indexOf(0);
    const validMoves = [
      emptyIndex - 3, // above
      emptyIndex + 3, // below
      emptyIndex % 3 !== 0 ? emptyIndex - 1 : -1, // left
      emptyIndex % 3 !== 2 ? emptyIndex + 1 : -1, // right
    ];

    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      setMoves(moves + 1);

      if (isSolved(newTiles)) {
        setIsComplete(true);
        const duration = Math.floor((Date.now() - startTime) / 1000);
        const baseScore = 1000;
        onGameEnd(moves + 1, duration, baseScore);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
      <div className="text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Puzzle Master</h3>
        <p className="text-zinc-400">Arrange the tiles in order (1-8)</p>
        <div className="mt-4 text-cyan-400">
          Moves: <span className="font-bold">{moves}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 p-4 bg-white/5 rounded-xl backdrop-blur-md border border-white/10">
        {tiles.map((tile, index) => (
          <button
            key={index}
            onClick={() => handleTileClick(index)}
            disabled={tile === 0 || isComplete}
            className={`
              w-20 h-20 rounded-lg text-2xl font-bold transition-all duration-200
              ${tile === 0 
                ? 'bg-transparent cursor-default' 
                : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 cursor-pointer'
              }
              ${isComplete && 'animate-pulse'}
            `}
          >
            {tile !== 0 && tile}
          </button>
        ))}
      </div>

      {isComplete && (
        <div className="text-center text-green-400 text-xl font-bold animate-bounce">
          🎉 Puzzle Solved!
        </div>
      )}
    </div>
  );
};

export default PuzzleGame;
