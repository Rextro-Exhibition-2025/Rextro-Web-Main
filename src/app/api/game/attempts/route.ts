import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import GameAttempt from '@/models/GameAttempt';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Check if user can start a new game attempt
export async function GET(request: NextRequest) {
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

    // Get gameId from query params
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');

    if (!gameId) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      );
    }

    // Count attempts for this user and game
    const attemptCount = await GameAttempt.countDocuments({
      userId: decoded.userId,
      gameId: gameId,
    });

    // Get the game config to check max attempts
    const { games } = await import('@/config/gameConfig');
    const game = games.find(g => g.id === gameId);

    if (!game) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }

    const canPlay = attemptCount < game.maxAttempts;
    const attemptsLeft = Math.max(0, game.maxAttempts - attemptCount);

    return NextResponse.json({
      canPlay,
      attemptCount,
      attemptsLeft,
      maxAttempts: game.maxAttempts,
      gameId,
      gameName: game.name,
    });

  } catch (error: any) {
    console.error('Error checking attempts:', error);
    return NextResponse.json(
      { error: 'Failed to check attempts', details: error.message },
      { status: 500 }
    );
  }
}

// Start a new game attempt
export async function POST(request: NextRequest) {
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

    const { gameId } = await request.json();

    if (!gameId) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      );
    }

    // Get the game config
    const { games } = await import('@/config/gameConfig');
    const game = games.find(g => g.id === gameId);

    if (!game) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }

    // Count existing attempts
    const attemptCount = await GameAttempt.countDocuments({
      userId: decoded.userId,
      gameId: gameId,
    });

    // Check if user has attempts left
    if (attemptCount >= game.maxAttempts) {
      return NextResponse.json(
        { error: 'No attempts left', attemptCount, maxAttempts: game.maxAttempts },
        { status: 403 }
      );
    }

    // Create new attempt
    const newAttempt = await GameAttempt.create({
      userId: decoded.userId,
      userName: user.name,
      userPhone: user.phone,
      gameId: gameId,
      gameName: game.name,
      attemptNumber: attemptCount + 1,
      startTime: new Date(),
      score: 0,
      timeSpent: 0,
      completed: false,
      syncedToSheets: false,
    });

    return NextResponse.json({
      success: true,
      attemptId: newAttempt._id,
      attemptNumber: newAttempt.attemptNumber,
      message: 'Game attempt started',
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error starting attempt:', error);
    return NextResponse.json(
      { error: 'Failed to start attempt', details: error.message },
      { status: 500 }
    );
  }
}
