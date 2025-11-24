"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { games } from '@/config/gameConfig';
import PuzzleGame from '@/components/GameZone/games/PuzzleGame';
import MemoryGame from '@/components/GameZone/games/MemoryGame';
import CTFGame from '@/components/GameZone/games/CTFGame';
import CrackTheCircuitGame from '@/components/GameZone/games/CrackTheCircuitGame';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

interface LevelScore {
  level: number;
  score: number;
  timeSpent: number;
}

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params?.gameId as string;
  const { isAuthenticated, loading, user } = useAuth();
  
  const game = games.find(g => g.id === gameId);
  
  const [gameState, setGameState] = useState<'checking' | 'ready' | 'playing' | 'complete' | 'noAttempts'>('checking');
  const [playerName, setPlayerName] = useState('');
  const [gameResult, setGameResult] = useState<{
    levelScores?: LevelScore[];
    totalScore: number;
    timeSpent: number;
    levelsCompleted: number;
  } | null>(null);
  const [attemptInfo, setAttemptInfo] = useState<{
    canPlay: boolean;
    attemptCount: number;
    attemptsLeft: number;
    maxAttempts: number;
  } | null>(null);
  const [currentAttemptId, setCurrentAttemptId] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [checkingAttempts, setCheckingAttempts] = useState(true);

  // Authentication check - redirect to gamezone if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/gamezone');
    }
  }, [loading, isAuthenticated, router]);

  // Set player name from authenticated user
  useEffect(() => {
    if (user) {
      setPlayerName(user.name);
    }
  }, [user]);

  // Check attempts when component loads
  useEffect(() => {
    const checkAttempts = async () => {
      if (!isAuthenticated || !user) return;
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/game/attempts?gameId=${gameId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAttemptInfo(data);
          
          if (data.canPlay) {
            setGameState('ready');
          } else {
            setGameState('noAttempts');
          }
        } else {
          console.error('Failed to check attempts');
          setGameState('ready'); // Allow play if check fails
        }
      } catch (error) {
        console.error('Error checking attempts:', error);
        setGameState('ready'); // Allow play if check fails
      } finally {
        setCheckingAttempts(false);
      }
    };

    if (isAuthenticated && user && game) {
      checkAttempts();
    }
  }, [isAuthenticated, user, gameId, game]);

  // Start a new game attempt
  const handleStartGame = async () => {
    if (!isAuthenticated || !user) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/game/attempts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentAttemptId(data.attemptId);
        setGameState('playing');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to start game');
      }
    } catch (error) {
      console.error('Error starting game:', error);
      alert('Failed to start game. Please try again.');
    }
  };

  // Handle game completion for old-style games (Puzzle, Memory, CTF)
  const handleOldGameEnd = async (attempts: number, duration: number, baseScore: number) => {
    const result = {
      totalScore: baseScore,
      timeSpent: duration,
      levelsCompleted: attempts,
      levelScores: undefined,
    };
    
    await saveGameResult(result);
  };

  // Handle game completion for new-style games (Crack The Circuit)
  const handleNewGameEnd = async (levelScores: LevelScore[], totalScore: number, timeSpent: number) => {
    const result = {
      totalScore,
      timeSpent,
      levelsCompleted: levelScores.length,
      levelScores,
    };
    
    await saveGameResult(result);
  };

  // Save game result to backend
  const saveGameResult = async (result: {
    totalScore: number;
    timeSpent: number;
    levelsCompleted: number;
    levelScores?: LevelScore[];
  }) => {
    setGameResult(result);
    setGameState('complete');

    if (!currentAttemptId) {
      console.error('No attempt ID found');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      // Save to MongoDB
      const completeResponse = await fetch('/api/game/complete', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attemptId: currentAttemptId,
          score: result.totalScore,
          timeSpent: result.timeSpent,
          levelsCompleted: result.levelsCompleted,
          levelScores: result.levelScores || [],
        }),
      });

      if (completeResponse.ok) {
        console.log('Game result saved successfully');
        
        // Sync to Google Sheets
        syncToSheets(currentAttemptId);
      } else {
        console.error('Failed to save game result');
      }
    } catch (error) {
      console.error('Error saving game result:', error);
    }
  };

  // Sync to Google Sheets
  const syncToSheets = async (attemptId: string) => {
    setSyncing(true);
    try {
      const response = await fetch('/api/game/sync-sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attemptId }),
      });

      if (response.ok) {
        console.log('Synced to Google Sheets successfully');
      } else {
        console.error('Failed to sync to Google Sheets');
      }
    } catch (error) {
      console.error('Error syncing to sheets:', error);
    } finally {
      setSyncing(false);
    }
  };

  // Render the appropriate game component
  const renderGame = () => {
    if (!game) return null;

    switch (game.component) {
      case 'PuzzleGame':
        return <PuzzleGame onGameEnd={handleOldGameEnd} />;
      case 'MemoryGame':
        return <MemoryGame onGameEnd={handleOldGameEnd} />;
      case 'CTFGame':
        return <CTFGame onGameEnd={handleOldGameEnd} />;
      case 'CrackTheCircuitGame':
        return (
          <CrackTheCircuitGame 
            onGameEnd={handleNewGameEnd}
            timeLimit={game.timeLimit}
          />
        );
      default:
        return <div className="text-white">Game component not found</div>;
    }
  };

  // Show loading state while checking authentication
  if (loading || checkingAttempts) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">
            {loading ? 'Loading...' : 'Checking attempts...'}
          </p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  // If game not found
  if (!game) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Game Not Found</h1>
        <Link href="/gamezone" className="text-cyan-400 hover:underline">Back to Game Zone</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C]">
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
          {/* Show attempts remaining */}
          {attemptInfo && gameState !== 'playing' && (
            <div className="text-sm">
              <span className="text-zinc-400">Attempts: </span>
              <span className={`font-bold ${attemptInfo.attemptsLeft > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {attemptInfo.attemptsLeft}/{attemptInfo.maxAttempts}
              </span>
            </div>
          )}
          {/* Show player name when playing */}
          {gameState === 'playing' && (
            <span className="text-zinc-400 text-sm">
              Player: <span className="text-white">{playerName}</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 min-h-screen flex items-center justify-center p-4">
        
        {/* Ready to Start State */}
        {gameState === 'ready' && (
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

            {/* Game Info */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-md mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-left">
                  <div className="text-zinc-400 mb-1">Difficulty</div>
                  <div className="text-white font-bold capitalize">{game.difficulty}</div>
                </div>
                <div className="text-left">
                  <div className="text-zinc-400 mb-1">Max Score</div>
                  <div className="text-white font-bold">{game.maxScore}</div>
                </div>
                {game.timeLimit > 0 && (
                  <>
                    <div className="text-left">
                      <div className="text-zinc-400 mb-1">Time Limit</div>
                      <div className="text-white font-bold">{game.timeLimit}s</div>
                    </div>
                    <div className="text-left">
                      <div className="text-zinc-400 mb-1">Levels</div>
                      <div className="text-white font-bold">{game.levels || 'N/A'}</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Player Info and Start Button */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="block text-left text-white text-sm font-medium mb-2">Playing as</div>
              <div className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white mb-4 flex items-center justify-between">
                <span className="font-bold text-cyan-400">{playerName}</span>
                <span className="text-xs text-zinc-500">✓ Authenticated</span>
              </div>
              
              {attemptInfo && (
                <div className="mb-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <div className="text-cyan-400 text-sm font-bold">
                    {attemptInfo.attemptsLeft} attempt{attemptInfo.attemptsLeft !== 1 ? 's' : ''} remaining
                  </div>
                </div>
              )}

              <button
                onClick={handleStartGame}
                className={`w-full px-6 py-3 rounded-lg font-bold transition-all duration-300 bg-gradient-to-r ${game.gradient} text-white hover:shadow-lg hover:shadow-cyan-500/50`}
                autoFocus
              >
                Start Mission
              </button>
            </div>
          </div>
        )}

        {/* No Attempts Left State */}
        {gameState === 'noAttempts' && attemptInfo && (
          <div className="w-full max-w-md text-center">
            <div className="text-6xl mb-6">🚫</div>
            <h2 className="text-4xl font-bold text-white mb-4">No Attempts Left</h2>
            <p className="text-zinc-400 text-lg mb-8">
              You've used all {attemptInfo.maxAttempts} attempts for this game.
            </p>

            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-8 backdrop-blur-md">
              <div className="text-red-400 font-bold mb-2">Attempts Used</div>
              <div className="text-5xl font-bold text-white">
                {attemptInfo.attemptCount}/{attemptInfo.maxAttempts}
              </div>
            </div>

            <Link
              href="/gamezone"
              className="inline-block px-8 py-3 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition-all duration-300"
            >
              Try Another Game
            </Link>
          </div>
        )}

        {/* Playing State */}
        {gameState === 'playing' && (
          <div className="w-full max-w-6xl h-[80vh]">
            {renderGame()}
          </div>
        )}

        {/* Complete State */}
        {gameState === 'complete' && gameResult && (
          <div className="w-full max-w-xl text-center">
             <div className="text-6xl mb-6 animate-bounce">🎉</div>
             <h2 className="text-4xl font-bold text-white mb-2">Mission Accomplished!</h2>
             <p className="text-cyan-400 text-xl mb-8">Excellent work, {playerName}.</p>

             <div className="bg-white/5 rounded-2xl p-8 border border-white/10 mb-8 backdrop-blur-md">
               <div className="mb-6">
                 <div className="text-6xl font-bold text-white mb-2">{gameResult.totalScore}</div>
                 <div className="text-sm text-zinc-400 uppercase tracking-wider">Final Score</div>
               </div>

               <div className="grid grid-cols-2 gap-4 text-sm">
                 <div className="bg-black/30 p-3 rounded-lg">
                   <div className="text-zinc-400 mb-1">Time Spent</div>
                   <div className="text-white font-bold text-lg">{gameResult.timeSpent}s</div>
                 </div>
                 <div className="bg-black/30 p-3 rounded-lg">
                   <div className="text-zinc-400 mb-1">Levels</div>
                   <div className="text-white font-bold text-lg">{gameResult.levelsCompleted}</div>
                 </div>
               </div>

               {/* Level Scores Breakdown */}
               {gameResult.levelScores && gameResult.levelScores.length > 0 && (
                 <div className="mt-6 pt-6 border-t border-white/10">
                   <div className="text-zinc-400 text-sm mb-3">Level Breakdown</div>
                   <div className="space-y-2">
                     {gameResult.levelScores.map((ls) => (
                       <div key={ls.level} className="flex justify-between items-center bg-black/20 p-2 rounded">
                         <span className="text-white text-sm">Level {ls.level}</span>
                         <div className="flex gap-4 text-xs">
                           <span className="text-cyan-400">{ls.score} pts</span>
                           <span className="text-zinc-500">{ls.timeSpent}s</span>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               )}

               {syncing && (
                 <div className="mt-4 text-sm text-cyan-400">
                   ✓ Syncing to Google Sheets...
                 </div>
               )}
             </div>

             {/* Attempts Info */}
             {attemptInfo && (
               <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                 <div className="text-cyan-400 text-sm">
                   {attemptInfo.attemptsLeft > 0 ? (
                     <>You have <span className="font-bold">{attemptInfo.attemptsLeft}</span> attempt{attemptInfo.attemptsLeft !== 1 ? 's' : ''} remaining</>
                   ) : (
                     <>This was your final attempt for this game</>
                   )}
                 </div>
               </div>
             )}

             <div className="flex gap-4 justify-center">
               {attemptInfo && attemptInfo.attemptsLeft > 0 && (
                 <button
                   onClick={() => {
                     setGameState('ready');
                     setGameResult(null);
                     setCurrentAttemptId(null);
                     // Refresh attempt info
                     window.location.reload();
                   }}
                   className={`px-8 py-3 rounded-lg bg-gradient-to-r ${game.gradient} text-white font-bold hover:shadow-lg transition-all duration-300`}
                 >
                   Play Again
                 </button>
               )}
               <Link
                 href="/gamezone"
                 className="px-8 py-3 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition-all duration-300"
               >
                 Back to Game Zone
               </Link>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
