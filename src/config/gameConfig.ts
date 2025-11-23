export interface Game {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  description: string;
  thumbnail: string;
  component: string; // Component name to render
  maxScore: number;
  estimatedTime: number; // in seconds
  color: string;
  gradient: string;
  maxAttempts: number; // Maximum attempts allowed per user
  timeLimit: number; // Time limit in seconds (0 = no limit)
  levels?: number; // Number of levels in the game
  levelScoring?: {
    [key: number]: number; // Score per level
  };
}

export const games: Game[] = [
  {
    id: 'game-1',
    name: 'Puzzle Master',
    difficulty: 'medium',
    description: 'Solve the puzzle by arranging tiles in the correct order. Test your spatial reasoning and problem-solving skills!',
    thumbnail: '/zones/thumbnails/game.png',
    component: 'PuzzleGame',
    maxScore: 1000,
    estimatedTime: 120, // 2 minutes
    color: '#5CE3FF',
    gradient: 'from-cyan-500 to-blue-600',
    maxAttempts: 5,
    timeLimit: 0, // No time limit
  },
  {
    id: 'game-2',
    name: 'Memory Challenge',
    difficulty: 'hard',
    description: 'Match pairs of cards by remembering their positions. Sharpen your memory and concentration!',
    thumbnail: '/zones/thumbnails/game.png',
    component: 'MemoryGame',
    maxScore: 1500,
    estimatedTime: 180, // 3 minutes
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-pink-600',
    maxAttempts: 3,
    timeLimit: 0, // No time limit
  },
  {
    id: 'game-3',
    name: 'Cyber Breach',
    difficulty: 'expert',
    description: 'Infiltrate the secure mainframe. Decode ciphers, bypass binary locks, and navigate the file system to capture the flag.',
    thumbnail: '/zones/thumbnails/game.png',
    component: 'CTFGame',
    maxScore: 2000,
    estimatedTime: 300, // 5 minutes
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-600',
    maxAttempts: 2,
    timeLimit: 0, // No time limit
  },
  {
    id: 'game-4',
    name: 'Crack The Circuit',
    difficulty: 'hard',
    description: 'Build and complete electronic circuits by connecting components. Solve increasingly complex circuit puzzles to power up all bulbs!',
    thumbnail: '/zones/thumbnails/game.png',
    component: 'CrackTheCircuitGame',
    maxScore: 1800,
    estimatedTime: 360, // 6 minutes
    color: '#0663ae',
    gradient: 'from-blue-600 to-cyan-500',
    maxAttempts: 3, // User can play 3 times
    timeLimit: 30, // 30 seconds time limit
    levels: 5, // 5 levels in the game
    levelScoring: {
      1: 100,  // Level 1: 100 points
      2: 200,  // Level 2: 200 points
      3: 300,  // Level 3: 300 points
      4: 500,  // Level 4: 500 points
      5: 700,  // Level 5: 700 points
    },
  },
];

export const getDifficultyColor = (difficulty: Game['difficulty']): string => {
  switch (difficulty) {
    case 'easy':
      return 'text-green-400';
    case 'medium':
      return 'text-yellow-400';
    case 'hard':
      return 'text-orange-400';
    case 'expert':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

export const getDifficultyBg = (difficulty: Game['difficulty']): string => {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-500/20 border-green-500/30';
    case 'medium':
      return 'bg-yellow-500/20 border-yellow-500/30';
    case 'hard':
      return 'bg-orange-500/20 border-orange-500/30';
    case 'expert':
      return 'bg-red-500/20 border-red-500/30';
    default:
      return 'bg-gray-500/20 border-gray-500/30';
  }
};
