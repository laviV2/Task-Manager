# TaskFlow - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Backend Setup (Terminal 1)

```bash
cd backend
npm install
node seed.js
npm run dev
```

Backend runs on `http://localhost:3000`

### Step 2: Frontend Setup (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### Step 3: Login

Open `http://localhost:5173` and login with:

- Email: `admin@taskflow.com`
- Password: `admin123`

## 📋 What's Included

✅ Complete backend API with all endpoints
✅ React frontend with all pages
✅ Dark theme UI with Tailwind CSS
✅ Authentication (JWT + bcrypt)
✅ Database models (Mongoose)
✅ Seed script with sample data
✅ CSV export functionality
✅ Real-time punch timer
✅ Task management system
✅ Attendance tracking
✅ Leave management
✅ Role-based access control

## 🔧 Development

### Backend Dependencies

- Express.js - Web framework
- Mongoose - MongoDB ODM
- JWT - Authentication
- bcryptjs - Password hashing
- CORS - Cross-origin requests

### Frontend Dependencies

- React 18 - UI library
- Vite - Build tool
- React Router - Navigation
- Tailwind CSS - Styling

## 📝 Key Features to Test

1. **Punch In/Out** → Dashboard page
2. **Start a Task** → My Tasks page
3. **View All Tasks** → All Tasks page (with filters)
4. **Attendance Records** → Attendance page
5. **Apply Leave** → Leave page
6. **Admin Approval** → Login as admin, approve leaves

## 🛠️ Useful Commands

```bash
# Backend
cd backend
npm run dev          # Development with nodemon
npm start           # Production mode
node seed.js        # Reset database with sample data

# Frontend
cd frontend
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build

# Root
npm run build       # Build frontend and prepare for deployment
npm start           # Start backend server
```

## 📚 API Documentation

All API endpoints require authentication except `/api/auth/*`

Example request with token:

```bash
curl -H "Authorization: Bearer <TOKEN>" \
     http://localhost:3000/api/tasks
```

## 🚀 Deployment Checklist

- [ ] Create MongoDB Atlas account (free tier)
- [ ] Get connection string from Atlas
- [ ] Create Railway account
- [ ] Push code to GitHub
- [ ] Connect GitHub repo to Railway
- [ ] Set MONGO_URI and JWT_SECRET in Railway
- [ ] Deploy
- [ ] Update demo credentials in README

## 💡 Tips

- **Hot Reload:** Both frontend and backend support hot reload during development
- **Database:** Uses local MongoDB for development (install MongoDB Community Server)
- **CORS:** Configured to work with localhost:5173
- **Time Zones:** All times stored in local timezone
- **CSV Export:** Available on All Tasks and Attendance pages

## ❓ Troubleshooting

### MongoDB Connection Error

- Install MongoDB Community Server locally, OR
- Create MongoDB Atlas account and update MONGO_URI in .env

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### CORS Issues

- Make sure backend is running on 3000
- Frontend dev server configured with proxy in vite.config.js

### Tasks Not Loading

- Make sure you're punched in on Dashboard
- Check browser console for API errors

## 📞 Support

Check README.md for more information and feature details.
