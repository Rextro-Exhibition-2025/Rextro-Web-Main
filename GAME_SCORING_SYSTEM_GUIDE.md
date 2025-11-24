# Game Scoring & Attempts System - Complete Implementation Guide

## Overview
This system implements:
- ✅ Game attempt tracking (limited plays per user)
- ✅ 30-second timer for Crack The Circuit
- ✅ Level-based scoring system
- ✅ Google Sheets integration for data export
- ✅ MongoDB storage for all game records

## System Architecture

```
User → Game Page → Check Attempts → Start Game → Play → Complete → Sync to Sheets
```

## Files Created/Modified

### 1. MongoDB Models
- **File**: `src/models/GameAttempt.ts`
- **Purpose**: Stores all game attempt data
- **Fields**:
  - userId, userName, userPhone
  - gameId, gameName
  - attemptNumber (which attempt this is)
  - score, timeSpent, levelsCompleted
  - levelScores (array of level-by-level scores)
  - startTime, endTime
  - completed, syncedToSheets

### 2. Game Configuration
- **File**: `src/config/gameConfig.ts`
- **New Fields Added**:
  - `maxAttempts`: Maximum plays allowed (Crack The Circuit = 3)
  - `timeLimit`: Time limit in seconds (30s for Crack The Circuit)
  - `levels`: Number of levels in game (5 levels)
  - `levelScoring`: Points per level completion

**Crack The Circuit Configuration**:
```typescript
{
  maxAttempts: 3,
  timeLimit: 30,
  levels: 5,
  levelScoring: {
    1: 100,  // Level 1: 100 points
    2: 200,  // Level 2: 200 points
    3: 300,  // Level 3: 300 points
    4: 500,  // Level 4: 500 points
    5: 700,  // Level 5: 700 points
  }
}
```

### 3. API Routes

#### `/api/game/attempts` (GET & POST)
- **GET**: Check how many attempts user has left
  - Query param: `gameId`
  - Returns: `{ canPlay, attemptCount, attemptsLeft, maxAttempts }`
  
- **POST**: Start a new game attempt
  - Body: `{ gameId }`
  - Returns: `{ attemptId, attemptNumber }`
  - Creates attempt record in MongoDB

#### `/api/game/complete` (PUT)
- **Purpose**: Save game results when completed
- **Body**: `{ attemptId, score, timeSpent, levelsCompleted, levelScores }`
- **Returns**: Updated attempt with scores

#### `/api/game/sync-sheets` (POST & GET)
- **POST**: Sync single attempt to Google Sheets
  - Body: `{ attemptId }`
  
- **GET**: Bulk sync all unsynced attempts

### 4. Updated Components

#### `CrackTheCircuitGame.tsx`
**New Features**:
- ⏱️ 30-second countdown timer (visual display)
- 📊 Real-time level and score display
- 🎯 Level-by-level score tracking
- ⏰ "Time's Up" overlay when timer expires
- 🎨 Color-coded timer (green → orange → red)

**New Props**:
```typescript
interface CrackTheCircuitGameProps {
  onGameEnd: (levelScores: LevelScore[], totalScore: number, timeSpent: number) => void;
  timeLimit?: number; // Default 30 seconds
}
```

## Google Sheets Setup

### Step 1: Create Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Create a new project: "Rextro Game Data Sync"
3. Paste the following script:

```javascript
// ============================================
// REXTRO GAME DATA SYNC - GOOGLE APPS SCRIPT
// ============================================

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const gameName = data.gameName || 'Unknown Game';
    
    // Get or create sheet for this game
    const sheet = getOrCreateSheet(gameName);
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Date',
        'User Name',
        'Phone Number',
        'Attempt Number',
        'Score',
        'Time Spent (seconds)',
        'Levels Completed',
        'Level Scores',
        'Start Time',
        'End Time'
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 11);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
    }
    
    // Append the data
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.date || new Date().toLocaleDateString(),
      data.userName || '',
      data.userPhone || '',
      data.attemptNumber || 1,
      data.score || 0,
      data.timeSpent || 0,
      data.levelsCompleted || 0,
      data.levelScores || '',
      data.startTime || '',
      data.endTime || ''
    ]);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 11);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data added to ' + gameName
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(gameName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(gameName);
  
  if (!sheet) {
    sheet = ss.insertSheet(gameName);
  }
  
  return sheet;
}

// Test function - run this to verify setup
function testSetup() {
  const testData = {
    gameName: 'Test Game',
    userName: 'Test User',
    userPhone: '1234567890',
    attemptNumber: 1,
    score: 500,
    timeSpent: 25,
    levelsCompleted: 3,
    levelScores: '[{"level":1,"score":100},{"level":2,"score":200},{"level":3,"score":200}]',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    date: new Date().toLocaleDateString(),
    timestamp: new Date().toLocaleString()
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(e);
  Logger.log(result.getContent());
}
```

### Step 2: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Select type: **Web app**
3. Settings:
   - Description: "Rextro Game Data Receiver"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/ABC.../exec`)
6. Authorize the script when prompted

### Step 3: Configure Environment Variables

Add to your `.env.local`:

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### Step 4: Create Spreadsheet

1. Create a new Google Sheet: "Rextro Game Records"
2. The script will automatically create sheets for each game:
   - `Crack The Circuit`
   - `Puzzle Master`
   - `Memory Challenge`
   - `Cyber Breach`

## Database Setup

### MongoDB Schema

The system will automatically create the following indexes:
- `userId + gameId` (compound index for fast lookup)
- `gameId` (single index for game-specific queries)

### Required Environment Variables

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT Authentication
JWT_SECRET=your_jwt_secret

# Google Sheets Integration
GOOGLE_SHEETS_WEBHOOK_URL=your_google_apps_script_web_app_url
```

## Usage Flow

### For Users

1. **Navigate to Game**
   - User clicks on "Crack The Circuit"
   - System checks authentication

2. **Check Attempts**
   - API checks how many times user has played
   - Shows: "Attempts Left: 2/3"

3. **Start Game**
   - Click "Start Mission"
   - System creates attempt record in MongoDB
   - Timer starts counting down from 30 seconds

4. **Play Game**
   - User completes levels
   - Each level completion adds points:
     - Level 1: 100 points
     - Level 2: 200 points
     - Level 3: 300 points
     - Level 4: 500 points
     - Level 5: 700 points
   - Timer shows in top center (color changes as time runs low)

5. **Game Ends**
   - Either: Time runs out OR User completes all levels
   - Shows summary screen:
     - Total score
     - Time spent
     - Levels completed
     - Level-by-level breakdown

6. **Save & Sync**
   - Results saved to MongoDB
   - Automatically synced to Google Sheets
   - User can play again (if attempts remaining)

### For Administrators

#### View All Game Records
```bash
# Access MongoDB to query attempts
db.gameattempts.find({ gameId: "game-4" }).sort({ score: -1 })
```

#### Manually Sync to Google Sheets
```bash
curl -X GET http://localhost:3000/api/game/sync-sheets
```

#### Check User's Remaining Attempts
```bash
curl -X GET "http://localhost:3000/api/game/attempts?gameId=game-4" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Testing Checklist

### Test Attempt Limits
- [ ] User can play game when attempts available
- [ ] User sees "attempts remaining" counter
- [ ] User blocked after max attempts reached
- [ ] Error message shown when no attempts left

### Test Timer Functionality
- [ ] Timer counts down from 30 seconds
- [ ] Timer color changes: green → orange (10s) → red (5s)
- [ ] Timer shows pulse animation when under 5s
- [ ] Game ends automatically when timer hits 0
- [ ] "Time's Up" overlay appears

### Test Scoring System
- [ ] Level 1 completion = 100 points
- [ ] Level 2 completion = 200 points
- [ ] Level 3 completion = 300 points
- [ ] Level 4 completion = 500 points
- [ ] Level 5 completion = 700 points
- [ ] Total score calculated correctly
- [ ] Partial completion recorded (if time runs out)

### Test Data Storage
- [ ] Attempt starts → Record created in MongoDB
- [ ] Game completes → Record updated with scores
- [ ] Level scores array populated correctly
- [ ] Start and end times recorded
- [ ] User info (name, phone) saved

### Test Google Sheets Sync
- [ ] Completed game syncs to correct sheet
- [ ] Sheet named after game (e.g., "Crack The Circuit")
- [ ] All columns populated correctly
- [ ] Timestamp and date formatted properly
- [ ] Level scores JSON parseable
- [ ] Multiple games create multiple sheets

## Extending to Other Games

To add the same system to other games:

### 1. Update Game Config
```typescript
{
  id: 'game-X',
  maxAttempts: 5,  // Set attempt limit
  timeLimit: 60,   // Set time limit (0 = no limit)
  levels: 3,       // Number of levels
  levelScoring: {
    1: 50,
    2: 100,
    3: 150,
  }
}
```

### 2. Update Game Component
```typescript
<YourGame
  onGameEnd={(levelScores, totalScore, timeSpent) => {
    // Handle game end
  }}
  timeLimit={game.timeLimit}
/>
```

### 3. Track Level Completions
Emit events from your game when levels complete:
```javascript
window.parent.postMessage({
  type: 'LEVEL_WIN',
  gameData: {
    currentLevel: 2,
    // ... other data
  }
}, '*');
```

## Troubleshooting

### Google Sheets Not Receiving Data
1. Check webhook URL in `.env.local`
2. Verify Google Apps Script is deployed
3. Check script execution logs in Apps Script editor
4. Ensure script has correct permissions

### Attempts Not Counting
1. Verify MongoDB connection
2. Check JWT token is valid
3. Ensure GameAttempt model is imported
4. Check API route responses in Network tab

### Timer Not Working
1. Verify `timeLimit` prop passed to component
2. Check browser console for errors
3. Ensure `useEffect` for timer is running
4. Verify state updates not blocked

### Scores Not Saving
1. Check `attemptId` is set when game starts
2. Verify `/api/game/complete` endpoint called
3. Check MongoDB for attempt record
4. Ensure JWT authentication working

## API Reference

### Check Attempts
```http
GET /api/game/attempts?gameId=game-4
Authorization: Bearer <token>

Response:
{
  "canPlay": true,
  "attemptCount": 1,
  "attemptsLeft": 2,
  "maxAttempts": 3,
  "gameId": "game-4",
  "gameName": "Crack The Circuit"
}
```

### Start Attempt
```http
POST /api/game/attempts
Authorization: Bearer <token>
Content-Type: application/json

{
  "gameId": "game-4"
}

Response:
{
  "success": true,
  "attemptId": "507f1f77bcf86cd799439011",
  "attemptNumber": 2
}
```

### Complete Attempt
```http
PUT /api/game/complete
Authorization: Bearer <token>
Content-Type: application/json

{
  "attemptId": "507f1f77bcf86cd799439011",
  "score": 800,
  "timeSpent": 28,
  "levelsCompleted": 4,
  "levelScores": [
    { "level": 1, "score": 100, "timeSpent": 5 },
    { "level": 2, "score": 200, "timeSpent": 7 },
    { "level": 3, "score": 300, "timeSpent": 8 },
    { "level": 4, "score": 200, "timeSpent": 8 }
  ]
}

Response:
{
  "success": true,
  "attempt": {
    "id": "507f1f77bcf86cd799439011",
    "score": 800,
    "timeSpent": 28,
    "levelsCompleted": 4,
    "attemptNumber": 2
  }
}
```

### Sync to Google Sheets
```http
POST /api/game/sync-sheets
Content-Type: application/json

{
  "attemptId": "507f1f77bcf86cd799439011"
}

Response:
{
  "success": true,
  "message": "Synced to Google Sheets",
  "sheetData": { ... }
}
```

## Security Considerations

1. **JWT Authentication**: All API routes require valid JWT token
2. **User Validation**: Attempts tied to authenticated user ID
3. **Attempt Limits**: Enforced at API level (cannot bypass client-side)
4. **Data Integrity**: MongoDB schemas enforce required fields
5. **Google Sheets**: Webhook URL kept secret in environment variables

## Future Enhancements

1. **Admin Dashboard**: View all game statistics
2. **Leaderboards**: Real-time rankings per game
3. **Achievements**: Badges for high scores
4. **Replay System**: Watch game replays
5. **Social Sharing**: Share scores on social media
6. **Analytics**: Track completion rates, average scores
7. **Email Notifications**: Send score summaries
8. **Data Export**: CSV/Excel export of all game data

## Support

For issues or questions:
1. Check MongoDB connection logs
2. Verify Google Sheets script logs
3. Check browser console for errors
4. Review API responses in Network tab
5. Check `.env.local` configuration

---

**Implementation Complete!** ✅

The system is now ready to track game attempts, enforce time limits, calculate scores, and sync data to Google Sheets automatically.
