// Local storage key
const STORAGE_KEY = 'gamezone_data';

// Data structure
export interface GameScore {
  playerName: string;
  score: number;
  attempts: number;
  duration: number; // in seconds
  playedAt: number; // timestamp
}

export interface GameData {
  [gameId: string]: GameScore[];
}

// Get all game data from storage
export const getGameData = (): GameData => {
  if (typeof window === 'undefined') return {};
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error reading game data:', error);
    return {};
  }
};

// Save game data to storage
const saveGameData = (data: GameData): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving game data:', error);
  }
};

// Save a new score
export const saveScore = (
  gameId: string,
  playerName: string,
  attempts: number,
  duration: number,
  baseScore: number
): void => {
  const data = getGameData();
  
  // Calculate final score (base score - penalties)
  const attemptPenalty = Math.max(0, (attempts - 1) * 10); // -10 points per extra attempt
  const timePenalty = Math.floor(duration / 10); // -1 point per 10 seconds
  const finalScore = Math.max(0, baseScore - attemptPenalty - timePenalty);
  
  const newScore: GameScore = {
    playerName,
    score: finalScore,
    attempts,
    duration,
    playedAt: Date.now(),
  };
  
  if (!data[gameId]) {
    data[gameId] = [];
  }
  
  data[gameId].push(newScore);
  saveGameData(data);
};

// Get leaderboard for a specific game (top 50)
export const getLeaderboard = (gameId: string, limit: number = 50): GameScore[] => {
  const data = getGameData();
  const scores = data[gameId] || [];
  
  return scores
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, limit);
};

// Get global leaderboard (all games combined)
export const getGlobalLeaderboard = (limit: number = 50): (GameScore & { gameId: string })[] => {
  const data = getGameData();
  const allScores: (GameScore & { gameId: string })[] = [];
  
  Object.entries(data).forEach(([gameId, scores]) => {
    scores.forEach(score => {
      allScores.push({ ...score, gameId });
    });
  });
  
  return allScores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

// Clear all data (for testing)
export const clearAllData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};
