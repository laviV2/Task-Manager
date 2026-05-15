# TaskFlow - Railway Deployment Guide

## 🚀 Deploying to Railway

Railway is a modern infrastructure platform that makes deployment simple. This guide walks you through deploying TaskFlow.

## Prerequisites

- [Railway Account](https://railway.app) (free tier available)
- [GitHub Account](https://github.com)
- This repository pushed to GitHub

## Step 1: Prepare Your Repository

1. Ensure your code is in a GitHub repository
2. Verify your project structure matches:

```
taskflow/
├── backend/
├── frontend/
├── package.json (root)
└── README.md
```

3. Commit and push all changes:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

## Step 2: Create MongoDB Atlas Database

MongoDB Atlas provides free database hosting.

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Wait for cluster to deploy
5. Click "Connect" button
6. Choose "Connect your application"
7. Copy the connection string
8. Replace `<password>` with your database password
9. Keep this connection string safe (you'll need it soon)

Example format:

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskflow?retryWrites=true&w=majority
```

## Step 3: Set Up Railway Project

1. Log in to [Railway](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub account
5. Select the `taskflow` repository
6. Click "Deploy"

Railway will start building automatically.

## Step 4: Configure Environment Variables

While deployment is building, set environment variables:

1. In Railway dashboard, go to your project
2. Click on the "Variables" tab
3. Add the following variables:

```
MONGO_URI = <your MongoDB connection string>
JWT_SECRET = <generate a random secure string, min 32 chars>
NODE_ENV = production
PORT = 3000
```

**To generate JWT_SECRET:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use a random string generator online.

## Step 5: Configure Build Settings

1. In Railway dashboard, go to "Settings"
2. Under "Build", set:
   - Build command: `npm run build`
   - Start command: `npm start`

3. Railway should auto-detect these from package.json, but verify they're correct

## Step 6: Wait for Deployment

The deployment process:

1. ✅ Railway pulls your code
2. ✅ Installs root dependencies
3. ✅ Runs `npm run build` (builds frontend)
4. ✅ Starts server with `npm start`
5. ✅ App is live!

Check the build logs for any errors.

## Step 7: Test Your Deployment

Once deployed:

1. Railway provides you a public URL (e.g., `https://taskflow-prod.railway.app`)
2. Visit that URL
3. Log in with demo credentials:
   - Email: `admin@taskflow.com`
   - Password: `admin123`

## 🔧 Environment Variables Reference

| Variable     | Required | Description                                |
| ------------ | -------- | ------------------------------------------ |
| `MONGO_URI`  | Yes      | MongoDB Atlas connection string            |
| `JWT_SECRET` | Yes      | Secret for JWT signing (keep confidential) |
| `NODE_ENV`   | No       | Set to `production`                        |
| `PORT`       | No       | Railway sets automatically, default 3000   |

## 📊 Project Structure for Railway

Railway automatically:

- Detects Node.js project
- Installs dependencies from package.json
- Runs build command (npm run build)
- Starts with start command (npm start)

Your root `package.json` scripts:

```json
{
  "scripts": {
    "build": "cd frontend && npm install && npm run build",
    "start": "node backend/server.js"
  }
}
```

## ✅ Deployment Checklist

- [x] API URL configured for production (Relative paths)
- [ ] MongoDB Atlas account created
- [ ] MongoDB connection string obtained
- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] MONGO_URI environment variable set
- [ ] JWT_SECRET environment variable set
- [ ] Build command: `npm run build` (Railway default)
- [ ] Start command: `npm start` (Railway default)
- [ ] Deployment successful
- [ ] Can login at Railway URL
- [ ] Tasks can be created and managed
- [ ] Punch in/out works
- [ ] Attendance records visible

## 🐛 Troubleshooting

### Deployment Failed

1. Check build logs in Railway dashboard
2. Verify package.json files exist in backend and frontend
3. Ensure all dependencies are listed in package.json

### App Crashes on Startup

1. Check environment variables are set
2. Verify MONGO_URI is correct
3. Check server logs for error messages

### Cannot Connect to Database

1. Verify MongoDB connection string
2. Check MongoDB Atlas IP whitelist (should be 0.0.0.0 or Railway IP)
3. Ensure database user credentials are correct

### Frontend Not Loading

1. Check that frontend build completed successfully
2. Verify frontend/dist folder exists in build
3. Check that Express is serving static files correctly

### Login Not Working

1. Check MONGO_URI is correct
2. Seed database hasn't been run on Railway
   - Run: `node backend/seed.js` locally once, data syncs to MongoDB
3. Verify JWT_SECRET is set

## 📈 Monitoring

In Railway dashboard:

1. **Metrics** → View CPU, memory, network usage
2. **Logs** → View application logs
3. **Network** → Check incoming requests
4. **Settings** → Modify environment variables

## 💰 Railway Pricing

- **Free Tier**: $5/month credit (usually sufficient)
- **Pay as you go**: After free credits
- **Estimated Cost**: $0-5/month for small app

## 🔒 Security Tips

1. **JWT_SECRET**: Keep it secret, use strong random string
2. **MONGO_URI**: Don't commit to Git, use environment variables
3. **Database**: Enable MongoDB IP whitelist
4. **HTTPS**: Railway provides free SSL/TLS

## 📚 Useful Links

- [Railway Docs](https://docs.railway.app)
- [Railway CLI](https://docs.railway.app/reference/cli)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/nodejs-performance-get-simple-http-benchmark-results-easily/)

## 🚀 Next Steps

After successful deployment:

1. Update README.md with your Railway URL
2. Share the link with your team
3. Set up custom domain (optional)
4. Configure auto-redeploy on git push
5. Monitor logs regularly

---

Happy deploying! 🎉
