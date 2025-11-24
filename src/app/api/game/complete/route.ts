import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import GameAttempt from '@/models/GameAttempt';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Complete a game attempt and save score
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    // Get token from Authorization header
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    // Get user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const { attemptId, score, timeSpent, levelsCompleted, levelScores } = await request.json();

    if (!attemptId) {
      return NextResponse.json(
        { error: 'Attempt ID is required' },
        { status: 400 }
      );
    }

    // Find and update the attempt
    const attempt = await GameAttempt.findOne({
      _id: attemptId,
      userId: decoded.userId,
    });

    if (!attempt) {
      return NextResponse.json(
        { error: 'Attempt not found' },
        { status: 404 }
      );
    }

    // Update attempt with final data
    attempt.score = score || 0;
    attempt.timeSpent = timeSpent || 0;
    attempt.levelsCompleted = levelsCompleted || 0;
    attempt.levelScores = levelScores || [];
    attempt.endTime = new Date();
    attempt.completed = true;

    await attempt.save();

    return NextResponse.json({
      success: true,
      attempt: {
        id: attempt._id,
        score: attempt.score,
        timeSpent: attempt.timeSpent,
        levelsCompleted: attempt.levelsCompleted,
        attemptNumber: attempt.attemptNumber,
      },
      message: 'Game attempt completed',
    });

  } catch (error: any) {
    console.error('Error completing attempt:', error);
    return NextResponse.json(
      { error: 'Failed to complete attempt', details: error.message },
      { status: 500 }
    );
  }
}
