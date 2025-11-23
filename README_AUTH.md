# Rextro Web - GameZone Authentication System

## Quick Start Guide

### 1. Install Dependencies (Already Done)
The following packages have been installed:
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `next-auth` - Next.js authentication
- `@types/jsonwebtoken` - TypeScript types

### 2. Set Up MongoDB

**Choose ONE option:**

#### Option A: MongoDB Atlas (Cloud - Recommended)
1. Create account at: https://www.mongodb.com/cloud/atlas
2. Create a free M0 cluster
3. Get connection string
4. Update `.env.local` with your connection string

#### Option B: Local MongoDB
1. Download from: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Use default connection: `mongodb://localhost:27017/rextro-web`

**See `MONGODB_SETUP.md` for detailed instructions**

### 3. Configure Environment Variables

Edit `.env.local` file:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/rextro-web
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/rextro-web

# Generate secure keys (run in terminal):
# node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your-generated-secret-key-here
NEXTAUTH_SECRET=your-generated-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### 4. Generate Secure Keys

Run these commands in PowerShell to generate secure keys:

```powershell
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the generated keys to `.env.local`

### 5. Start Development Server

```powershell
npm run dev
```

### 6. Test Authentication

1. Navigate to: http://localhost:3000/gamezone
2. You should see a login/signup modal
3. Create a new account:
   - Name: John Doe
   - Phone: 1234567890
   - Password: test123
4. After signup, you'll be logged in automatically
5. Your user info and logout button appears in the navbar

## Features Implemented

✅ **User Registration**
- Name, phone number, and password required
- Phone numbers are unique
- Passwords hashed with bcrypt
- Minimum 6 characters for passwords

✅ **User Login**
- Login with phone and password
- JWT tokens with 7-day expiration
- Automatic token verification

✅ **Protected Routes**
- GameZone page requires authentication
- Auto-redirect to login modal if not authenticated
- Loading state while checking authentication

✅ **User Session Management**
- Token stored in localStorage
- Persists across page refreshes
- Logout functionality in navbar
- User name displayed when logged in

✅ **MongoDB Integration**
- User data stored securely
- Password hashing before storage
- Efficient connection pooling

## File Structure

```
src/
├── app/
│   ├── api/auth/
│   │   ├── signup/route.ts      # User registration endpoint
│   │   ├── login/route.ts       # User login endpoint
│   │   └── verify/route.ts      # Token verification endpoint
│   ├── layout.tsx               # Added AuthProvider
│   └── gamezone/page.tsx        # Protected with authentication
├── components/
│   ├── common/
│   │   └── Navbar.tsx           # Added user menu & logout
│   └── GameZone/
│       └── AuthModal.tsx        # Login/Signup modal
├── contexts/
│   └── AuthContext.tsx          # Auth state management
├── lib/
│   └── mongodb.ts               # MongoDB connection
├── models/
│   └── User.ts                  # User database schema
└── types/
    └── mongoose.d.ts            # TypeScript definitions
```

## API Endpoints

### POST /api/auth/signup
Register a new user
```json
{
  "name": "John Doe",
  "phone": "1234567890",
  "password": "securepass123"
}
```

### POST /api/auth/login
Login existing user
```json
{
  "phone": "1234567890",
  "password": "securepass123"
}
```

### GET /api/auth/verify
Verify JWT token
```
Headers: Authorization: Bearer <token>
```

## Using Authentication in Components

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }
  
  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Common Issues & Solutions

**Issue:** Can't connect to MongoDB
- **Solution:** Check MongoDB is running (local) or connection string is correct (Atlas)

**Issue:** "Module not found" errors
- **Solution:** Run `npm install` to install all dependencies

**Issue:** Environment variables not loading
- **Solution:** Restart development server after editing `.env.local`

**Issue:** User already exists error
- **Solution:** Use a different phone number or login with existing credentials

## Security Notes

🔒 **Passwords are hashed** - Never stored in plain text
🔒 **JWT tokens** - Secure authentication with expiration
🔒 **Environment variables** - Sensitive data in `.env.local` (not committed to git)
🔒 **HTTPS in production** - Always use HTTPS for production deployments

## Next Steps

- [ ] Set up MongoDB (local or Atlas)
- [ ] Configure `.env.local` with connection string and secrets
- [ ] Test signup and login functionality
- [ ] Customize AuthModal styling if needed
- [ ] Deploy to production with proper MongoDB setup

## Documentation

- **Full Setup Guide:** `MONGODB_SETUP.md`
- **Implementation Details:** `AUTHENTICATION_IMPLEMENTATION.md`
- **This Quick Start:** `README_AUTH.md`

## Support

For issues or questions:
1. Check `MONGODB_SETUP.md` for MongoDB setup help
2. Check `AUTHENTICATION_IMPLEMENTATION.md` for implementation details
3. Review console errors in browser dev tools
4. Verify all environment variables are set correctly
