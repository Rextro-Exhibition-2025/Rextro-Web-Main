"use client";

import React, { useState, useEffect } from 'react';
import { GameScore, getLeaderboard, getGlobalLeaderboard } from '@/utils/gameStorage';
import { games } from '@/config/gameConfig';

interface LeaderboardProps {
  selectedGameId?: string | null;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ selectedGameId }) => {
  const [scores, setScores] = useState<(GameScore & { gameId?: string })[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadScores();
  }, [filter, selectedGameId]);

  const loadScores = () => {
    if (selectedGameId && selectedGameId !== 'all') {
      setScores(getLeaderboard(selectedGameId, 50));
    } else if (filter === 'all') {
      setScores(getGlobalLeaderboard(50));
    } else {
      setScores(getLeaderboard(filter, 50));
    }
  };

  const getRankColor = (rank: number): string => {
    switch (rank) {
      case 1:
        return 'text-yellow-600'; // Gold
      case 2:
        return 'text-gray-500'; // Silver
      case 3:
        return 'text-orange-600'; // Bronze
      default:
        return 'text-gray-500';
    }
  };

  const getRankBg = (rank: number): string => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 border-yellow-200';
      case 2:
        return 'bg-gray-100 border-gray-200';
      case 3:
        return 'bg-orange-100 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };

  const getRankIcon = (rank: number): string => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getGameName = (gameId?: string): string => {
    if (!gameId) return '-';
    const game = games.find(g => g.id === gameId);
    return game ? game.name : gameId;
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      {!selectedGameId && (
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
              filter === 'all'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            All Games
          </button>
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setFilter(game.id)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                filter === game.id
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              {game.name}
            </button>
          ))}
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-white rounded-xl border border-black/5 overflow-hidden shadow-sm">
        {scores.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">🎮</div>
            <p>No scores yet. Be the first to play!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Rank</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Player</th>
                  {filter === 'all' && !selectedGameId && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Game</th>
                  )}
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Score</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Attempts</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Time</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => (
                  <tr
                    key={`${score.playerName}-${score.playedAt}-${index}`}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                      index < 3 ? 'font-medium' : ''
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getRankBg(index + 1)}`}>
                        <span className={`text-sm ${getRankColor(index + 1)}`}>
                          {getRankIcon(index + 1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-900">{score.playerName}</td>
                    {filter === 'all' && !selectedGameId && (
                      <td className="px-4 py-4 text-purple-600 text-sm">{getGameName(score.gameId)}</td>
                    )}
                    <td className="px-4 py-4 text-right">
                      <span className={`text-lg font-bold ${getRankColor(index + 1)}`}>
                        {score.score}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-gray-500">{score.attempts}</td>
                    <td className="px-4 py-4 text-right text-gray-500">{score.duration}s</td>
                    <td className="px-4 py-4 text-right text-gray-400 text-xs">{formatDate(score.playedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {scores.length > 0 && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Showing top {Math.min(scores.length, 50)} players
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
