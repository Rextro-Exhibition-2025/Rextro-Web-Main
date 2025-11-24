import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import GameAttempt from '@/models/GameAttempt';

const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || '';

// Sync game attempt to Google Sheets
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { attemptId } = await request.json();

    if (!attemptId) {
      return NextResponse.json(
        { error: 'Attempt ID is required' },
        { status: 400 }
      );
    }

    // Find the attempt
    const attempt = await GameAttempt.findById(attemptId);

    if (!attempt) {
      return NextResponse.json(
        { error: 'Attempt not found' },
        { status: 404 }
      );
    }

    if (!attempt.completed) {
      return NextResponse.json(
        { error: 'Attempt not completed yet' },
        { status: 400 }
      );
    }

    if (attempt.syncedToSheets) {
      return NextResponse.json(
        { message: 'Already synced to sheets' },
        { status: 200 }
      );
    }

    // Prepare data for Google Sheets
    const sheetData = {
      gameName: attempt.gameName,
      userName: attempt.userName,
      userPhone: attempt.userPhone,
      attemptNumber: attempt.attemptNumber,
      score: attempt.score,
      timeSpent: attempt.timeSpent,
      levelsCompleted: attempt.levelsCompleted,
      levelScores: JSON.stringify(attempt.levelScores),
      startTime: attempt.startTime.toISOString(),
      endTime: attempt.endTime?.toISOString() || '',
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      timestamp: new Date().toLocaleString('en-US', { 
        dateStyle: 'short', 
        timeStyle: 'medium' 
      }),
    };

    // Send to Google Sheets via webhook
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetData),
      });

      if (!response.ok) {
        throw new Error('Failed to sync with Google Sheets');
      }

      // Mark as synced
      attempt.syncedToSheets = true;
      await attempt.save();

      return NextResponse.json({
        success: true,
        message: 'Synced to Google Sheets',
        sheetData,
      });
    } else {
      return NextResponse.json(
        { error: 'Google Sheets webhook URL not configured' },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Error syncing to sheets:', error);
    return NextResponse.json(
      { error: 'Failed to sync to sheets', details: error.message },
      { status: 500 }
    );
  }
}

// Sync all unsynced attempts
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Find all completed but unsynced attempts
    const unsyncedAttempts = await GameAttempt.find({
      completed: true,
      syncedToSheets: false,
    }).limit(100);

    let syncedCount = 0;
    const errors: any[] = [];

    for (const attempt of unsyncedAttempts) {
      try {
        const sheetData = {
          gameName: attempt.gameName,
          userName: attempt.userName,
          userPhone: attempt.userPhone,
          attemptNumber: attempt.attemptNumber,
          score: attempt.score,
          timeSpent: attempt.timeSpent,
          levelsCompleted: attempt.levelsCompleted,
          levelScores: JSON.stringify(attempt.levelScores),
          startTime: attempt.startTime.toISOString(),
          endTime: attempt.endTime?.toISOString() || '',
          date: new Date(attempt.startTime).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }),
          timestamp: new Date(attempt.startTime).toLocaleString('en-US', { 
            dateStyle: 'short', 
            timeStyle: 'medium' 
          }),
        };

        if (GOOGLE_SHEETS_WEBHOOK_URL) {
          const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sheetData),
          });

          if (response.ok) {
            attempt.syncedToSheets = true;
            await attempt.save();
            syncedCount++;
          } else {
            errors.push({ attemptId: attempt._id, error: 'Failed to sync' });
          }
        }
      } catch (err: any) {
        errors.push({ attemptId: attempt._id, error: err.message });
      }
    }

    return NextResponse.json({
      success: true,
      syncedCount,
      totalUnsynced: unsyncedAttempts.length,
      errors: errors.length > 0 ? errors : undefined,
    });

  } catch (error: any) {
    console.error('Error bulk syncing:', error);
    return NextResponse.json(
      { error: 'Failed to bulk sync', details: error.message },
      { status: 500 }
    );
  }
}
