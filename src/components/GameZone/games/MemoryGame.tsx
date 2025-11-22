"use client";

import React, { useState, useEffect } from 'react';

interface MemoryGameProps {
  onGameEnd: (attempts: number, duration: number, baseScore: number) => void;
}

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onGameEnd }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [startTime] = useState(Date.now());
  const [matchedPairs, setMatchedPairs] = useState(0);

  const emojis = ['🚀', '🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎺'];
  const totalPairs = 8;

  useEffect(() => {
    // Create pairs
    const cardValues = [...emojis, ...emojis];
    const shuffled = cardValues
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
  }, []);

  useEffect(() => {
    if (matchedPairs === totalPairs) {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      const baseScore = 1500;
      onGameEnd(attempts, duration, baseScore);
    }
  }, [matchedPairs, attempts, startTime, onGameEnd]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      
      if (cards[first].value === cards[second].value) {
        // Match found
        setCards(prev =>
          prev.map((card, index) =>
            index === first || index === second
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setCards(prev =>
            prev.map((card, index) =>
              index === first || index === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
      
      setAttempts(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    setCards(prev =>
      prev.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards(prev => [...prev, index]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
      <div className="text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Memory Challenge</h3>
        <p className="text-zinc-400">Match all pairs of cards</p>
        <div className="mt-4 flex gap-8 justify-center">
          <div className="text-purple-400">
            Attempts: <span className="font-bold">{attempts}</span>
          </div>
          <div className="text-cyan-400">
            Pairs: <span className="font-bold">{matchedPairs}/{totalPairs}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 p-6 bg-white/5 rounded-xl backdrop-blur-md border border-white/10">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            disabled={card.isFlipped || card.isMatched}
            className={`
              w-16 h-16 rounded-lg text-3xl font-bold transition-all duration-300 transform
              ${
                card.isFlipped || card.isMatched
                  ? 'bg-gradient-to-br from-purple-500 to-pink-600 rotate-0'
                  : 'bg-gradient-to-br from-zinc-700 to-zinc-800 hover:scale-105'
              }
              ${card.isMatched && 'opacity-50 scale-95'}
            `}
          >
            {(card.isFlipped || card.isMatched) && card.value}
          </button>
        ))}
      </div>

      {matchedPairs === totalPairs && (
        <div className="text-center text-green-400 text-xl font-bold animate-bounce">
          🎉 All Pairs Matched!
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
