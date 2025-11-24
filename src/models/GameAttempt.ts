import mongoose, { Schema, Document } from 'mongoose';

export interface IGameAttempt extends Document {
  userId: mongoose.Types.ObjectId;
  userName: string;
  userPhone: string;
  gameId: string;
  gameName: string;
  attemptNumber: number;
  score: number;
  timeSpent: number; // in seconds
  levelsCompleted: number;
  levelScores: Array<{
    level: number;
    score: number;
    timeSpent: number;
  }>;
  startTime: Date;
  endTime: Date;
  completed: boolean;
  syncedToSheets: boolean;
  createdAt: Date;
}

const GameAttemptSchema = new Schema<IGameAttempt>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userPhone: {
    type: String,
    required: true,
  },
  gameId: {
    type: String,
    required: true,
    index: true,
  },
  gameName: {
    type: String,
    required: true,
  },
  attemptNumber: {
    type: Number,
    required: true,
    default: 1,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  timeSpent: {
    type: Number,
    required: true,
    default: 0,
  },
  levelsCompleted: {
    type: Number,
    default: 0,
  },
  levelScores: [{
    level: { type: Number, required: true },
    score: { type: Number, required: true },
    timeSpent: { type: Number, required: true },
  }],
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  syncedToSheets: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for user and game
GameAttemptSchema.index({ userId: 1, gameId: 1 });

export default mongoose.models.GameAttempt || mongoose.model<IGameAttempt>('GameAttempt', GameAttemptSchema);
