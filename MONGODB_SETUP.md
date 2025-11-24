# MongoDB Setup Guide for Rextro Web Authentication

## Overview
This guide will help you set up MongoDB for the user authentication system. You have two options: **Local MongoDB** or **MongoDB Atlas (Cloud)**.

---

## Option 1: Local MongoDB Installation (Recommended for Development)

### Step 1: Install MongoDB Community Edition

#### For Windows:
1. Download MongoDB from: https://www.mongodb.com/try/download/community
2. Choose "Windows" and download the MSI installer
3. Run the installer with default settings
4. MongoDB will be installed at: `C:\Program Files\MongoDB\Server\7.0\`

#### Verify Installation:
```powershell
# Check if MongoDB is running
mongod --version
```

### Step 2: Start MongoDB Service

```powershell
# Start MongoDB as a Windows service (automatically starts on boot)
net start MongoDB

# Or manually start MongoDB (if not installed as service)
mongod --dbpath "C:\data\db"
```

### Step 3: Update Environment Variables

Open your `.env.local` file and set:
```env
MONGODB_URI=mongodb://localhost:27017/rextro-web
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-change-this-in-production
```

### Step 4: Test Connection

```powershell
# Connect to MongoDB shell
mongosh

# List databases
show dbs

# Exit
exit
```

---

## Option 2: MongoDB Atlas (Cloud - Recommended for Production)

### Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account (M0 tier - forever free)

### Step 2: Create a Cluster
1. After login, click "Build a Database"
2. Choose the **FREE** tier (M0)
3. Select a cloud provider and region closest to you
4. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Set Up Database Access
1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password (save these!)
5. Set role to "Read and write to any database"
6. Click "Add User"

### Step 4: Set Up Network Access
1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
   - For production, restrict to your server's IP
4. Click "Confirm"

### Step 5: Get Connection String
1. Go back to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Environment Variables

Open your `.env.local` file and update:
```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/rextro-web?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-change-this-in-production
```

**Important:** Replace:
- `YOUR_USERNAME` with your database username
- `YOUR_PASSWORD` with your database password
- Add `/rextro-web` before the `?` to specify the database name

---

## Generate Secure Secret Keys

For production, generate secure random keys:

```powershell
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy these values and update your `.env.local` file.

---

## Testing the Setup

1. Start your Next.js development server:
```powershell
npm run dev
```

2. Open browser to: http://localhost:3000/gamezone

3. You should see the authentication modal

4. Try signing up with:
   - Name: Test User
   - Phone: 1234567890
   - Password: test123

5. Check MongoDB:
   - **Local:** Use MongoDB Compass (https://www.mongodb.com/products/compass)
   - **Atlas:** View in Atlas dashboard under "Browse Collections"

---

## Troubleshooting

### Connection Error: "ECONNREFUSED"
- **Local:** Make sure MongoDB service is running
  ```powershell
  net start MongoDB
  ```
- **Atlas:** Check network access settings allow your IP

### Authentication Failed
- **Atlas:** Double-check username and password in connection string
- Make sure special characters in password are URL-encoded
  - Example: `@` becomes `%40`, `#` becomes `%23`

### Module Not Found Errors
```powershell
# Reinstall dependencies
npm install mongoose bcryptjs jsonwebtoken next-auth @types/jsonwebtoken
```

---

## Database Structure

The authentication system creates the following collection:

**Collection: users**
```javascript
{
  _id: ObjectId,
  name: String,
  phone: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

---

## Security Best Practices

1. **Never commit `.env.local`** - Already in .gitignore
2. **Use strong JWT secrets** - At least 64 characters
3. **For production:**
   - Use MongoDB Atlas or managed MongoDB
   - Restrict IP addresses in Network Access
   - Enable MongoDB authentication
   - Use environment variables on hosting platform
   - Set `NODE_ENV=production`

---

## Next Steps

1. Set up MongoDB (choose Local or Atlas)
2. Update `.env.local` with connection string
3. Generate secure secret keys
4. Test authentication on gamezone page
5. Customize AuthModal styling if needed
6. Add additional user fields (email, etc.) if required

---

## Support

If you encounter issues:
1. Check MongoDB connection string format
2. Verify MongoDB service is running (local) or cluster is active (Atlas)
3. Check console for error messages
4. Ensure all environment variables are set correctly
