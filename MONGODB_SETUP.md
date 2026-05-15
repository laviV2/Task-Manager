# MongoDB Setup for TaskFlow

Your application servers are running, but we need to set up MongoDB for the database.

## 🚀 Quick Option 1: MongoDB Community Server (Local)

### Windows Setup

1. **Download MongoDB Community Server**
   - Go to: https://www.mongodb.com/try/download/community
   - Select "Windows" and download the .msi installer
   - Download version 7.0 or later

2. **Install MongoDB**
   - Run the .msi installer
   - Choose "Complete" installation
   - Check "Install MongoDB as a Service"
   - Click Install

3. **Verify Installation**
   ```powershell
   mongod --version
   ```

4. **Start MongoDB Service**
   - MongoDB should auto-start as a Windows Service
   - To verify it's running:
   ```powershell
   Get-Service MongoDB
   ```
   - If not running, start it:
   ```powershell
   Start-Service MongoDB
   ```

5. **Run Seed Script**
   ```powershell
   cd backend
   node seed.js
   ```

### Mac Setup

1. **Using Homebrew**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   ```

2. **Run Seed Script**
   ```bash
   cd backend
   node seed.js
   ```

### Linux Setup

```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# Start service
sudo service mongod start

# Run seed script
cd backend
node seed.js
```

---

## ☁️ Option 2: MongoDB Atlas (Cloud - Recommended for Production)

### Setup Steps

1. **Create Free MongoDB Atlas Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Click "Register" and create account
   - Email verification will be sent

2. **Create Free Cluster**
   - Click "Create" → "Database"
   - Select "Shared" (free tier)
   - Choose region closest to you
   - Click "Create Cluster"
   - Wait 5-10 minutes for deployment

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `taskflow`
   - Password: (generate secure password, save it!)
   - Click "Create Database User"

4. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Drivers" → "Node.js"
   - Copy connection string
   - It looks like: `mongodb+srv://taskflow:PASSWORD@cluster.mongodb.net/taskflow`
   - Replace PASSWORD with your actual password

5. **Update .env File**
   ```
   MONGO_URI=mongodb+srv://taskflow:YOUR_PASSWORD@cluster.mongodb.net/taskflow?retryWrites=true&w=majority
   ```

6. **Whitelist Your IP** (Important!)
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for development)
   - Click "Confirm"

7. **Restart Backend Server**
   - Kill the backend server (Ctrl+C in terminal)
   - Run `npm run dev` again

8. **Run Seed Script**
   ```powershell
   cd backend
   node seed.js
   ```

---

## ✅ Verify Setup

Once MongoDB is running, you should see:

```
✅ Database seeded successfully!

Demo Credentials:
  Admin: admin@taskflow.com / admin123
  Tasker: lavi@taskflow.com / lavi123
```

---

## 🔗 Access Your App

After successful seed:
- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:5174

Open browser to http://localhost:5174 and login with:
- Email: `admin@taskflow.com`
- Password: `admin123`

---

## 🐛 Troubleshooting

### "MongoDB connection refused"
- **Solution**: Start MongoDB service
- Windows: `Start-Service MongoDB`
- Mac: `brew services start mongodb-community`
- Linux: `sudo service mongod start`

### "cannot connect to MongoDB Atlas"
- **Check 1**: Verify connection string in .env
- **Check 2**: Confirm database user credentials
- **Check 3**: Whitelist your IP address in Network Access
- **Check 4**: Restart backend server after updating .env

### Seed script hangs
- Kill the script (Ctrl+C)
- Verify MongoDB is running
- Check connection string is correct
- Try again

### Still having issues?
- Check backend console logs
- Verify MongoDB is running: `mongosh` (Atlas) or `mongo` (local)
- Try connecting directly to test the connection

---

## 📝 Environment Variable Reference

Your `.env` file should look like:

```
# Local MongoDB
MONGO_URI=mongodb://localhost:27017/taskflow

# OR MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow?retryWrites=true&w=majority

# JWT Secret (keep secure!)
JWT_SECRET=taskflow-dev-secret-key-change-in-production

# Port
PORT=3000

# Environment
NODE_ENV=development
```

---

## ✨ Next Steps

1. ✅ Choose MongoDB option (Local or Atlas)
2. ✅ Follow setup instructions
3. ✅ Update .env file with connection string
4. ✅ Run `node seed.js`
5. ✅ Open http://localhost:5174
6. ✅ Login and start using TaskFlow!

Good luck! 🚀
