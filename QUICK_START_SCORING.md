# 🚀 Quick Start - Game Scoring System

## ✅ What's Been Implemented

### 1. Backend Infrastructure
- ✅ MongoDB schema for game attempts (`GameAttempt` model)
- ✅ API routes for attempt tracking (`/api/game/attempts`)
- ✅ API route for completing games (`/api/game/complete`)
- ✅ Google Sheets sync API (`/api/game/sync-sheets`)

### 2. Game Configuration
- ✅ Updated all games with `maxAttempts` and `timeLimit`
- ✅ Crack The Circuit configured:
  - 3 attempts max
  - 30-second time limit
  - 5 levels with scoring (100, 200, 300, 500, 700 points)

### 3. Game Component Updates
- ✅ Crack The Circuit game enhanced with:
  - Visual 30-second countdown timer
  - Real-time score display
  - Level progression tracking
  - "Time's Up" overlay
  - Level-by-level score recording

## ⚠️ What Needs To Be Done

### CRITICAL: Update Game Page
The `src/app/gamezone/[gameId]/page.tsx` needs to be completely rewritten to:

1. **Check attempts on load**:
```typescript
// Call API to check if user can play
const response = await fetch(`/api/game/attempts?gameId=${gameId}`, {
  headers: { 'Authorization': `Bearer ${token}` }
});
const { canPlay, attemptsLeft } = await response.json();
```

2. **Start attempt when game begins**:
```typescript
// Create attempt record
const response = await fetch('/api/game/attempts', {
  method: 'POST',
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ gameId })
});
const { attemptId } = await response.json();
```

3. **Handle game completion**:
```typescript
// Save scores when game ends
await fetch('/api/game/complete', {
  method: 'PUT',
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    attemptId,
    score,
    timeSpent,
    levelsCompleted,
    levelScores
  })
});

// Sync to Google Sheets
await fetch('/api/game/sync-sheets', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ attemptId })
});
```

4. **Show "No Attempts Left" message** when user has used all attempts

### Required: Google Sheets Setup

1. Go to https://script.google.com
2. Create new project
3. Copy script from `GAME_SCORING_SYSTEM_GUIDE.md` (Section: "Google Sheets Setup")
4. Deploy as web app
5. Copy the webhook URL
6. Add to `.env.local`:
   ```
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
   ```

## 📝 Immediate Next Steps

### Step 1: Complete Game Page Integration (30 minutes)
I need to rewrite the game page file because it has many compile errors. The current file structure is incompatible with the new system.

**Shall I proceed with rewriting the game page?** This will:
- Add attempt checking
- Integrate with the new APIs
- Handle the new game end signature for Crack The Circuit
- Add Google Sheets sync
- Show attempt counters

### Step 2: Test the Flow (15 minutes)
1. Run `npm run dev`
2. Navigate to Crack The Circuit game
3. Verify:
   - Attempt counter appears
   - Timer starts at 30 seconds
   - Levels award correct points
   - Game ends when time runs out
   - Results are saved to MongoDB

### Step 3: Setup Google Sheets (20 minutes)
1. Follow the guide in `GAME_SCORING_SYSTEM_GUIDE.md`
2. Deploy Google Apps Script
3. Update `.env.local` with webhook URL
4. Test sync by completing a game

## 🔧 Quick Test Commands

```bash
# Start development server
npm run dev

# Check MongoDB connection
# (View in MongoDB Compass or mongo shell)
db.gameattempts.find().pretty()

# Test attempt API
curl -X GET "http://localhost:3000/api/game/attempts?gameId=game-4" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Test sync to sheets
curl -X GET http://localhost:3000/api/game/sync-sheets
```

## ❓ Common Questions

**Q: Do I need to update other games?**
A: Not yet. Start with Crack The Circuit. Once working, extend to others using the same pattern.

**Q: What if Google Sheets sync fails?**
A: Data is still saved in MongoDB. You can manually sync later using the bulk sync API.

**Q: How do I reset a user's attempts for testing?**
A: Delete attempts from MongoDB:
```javascript
db.gameattempts.deleteMany({ userId: "USER_ID", gameId: "game-4" })
```

**Q: Can I change the time limit or scoring?**
A: Yes! Edit `src/config/gameConfig.ts` - changes take effect immediately.

## 📚 Full Documentation

See `GAME_SCORING_SYSTEM_GUIDE.md` for:
- Complete API reference
- Database schema details
- Google Apps Script code
- Troubleshooting guide
- Security considerations

---

## 🎯 Ready to Continue?

**Do you want me to:**
1. ✅ Rewrite the game page to integrate everything? (Recommended)
2. ⏸️ Pause here so you can test what's done?
3. 📋 Create additional helper utilities?

Let me know and I'll proceed!
