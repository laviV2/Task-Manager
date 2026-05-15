import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// Models
import User from './models/User.js';
import Project from './models/Project.js';

// Routes
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import attendanceRoutes from './routes/attendance.js';
import notificationRoutes from './routes/notifications.js';
import dashboardRoutes from './routes/dashboard.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const ensureMinimumData = async () => {
  const [adminCount, memberCount, projectCount] = await Promise.all([
    User.countDocuments({ role: 'admin' }),
    User.countDocuments({ role: 'member' }),
    Project.countDocuments({}),
  ]);

  let adminUser = await User.findOne({ role: 'admin' });
  if (!adminUser) {
    adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@taskflow.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
      avatarInitials: 'AU',
    });
  }

  let memberUser = await User.findOne({ role: 'member' });
  if (!memberUser) {
    memberUser = await User.create({
      name: 'Member User',
      email: 'member@taskflow.com',
      password: await bcrypt.hash('member123', 10),
      role: 'member',
      avatarInitials: 'MU',
    });
  }

  if (projectCount === 0) {
    await Project.create({
      name: 'Project 1',
      type: 'internal',
      platform: 'Web',
      description: 'Default project created automatically after database reset.',
      members: [
        { userId: adminUser._id, role: 'lead' },
        { userId: memberUser._id, role: 'member' },
      ],
    });
  }

  if (adminCount === 0 || memberCount === 0 || projectCount === 0) {
    console.log('Default admin/member/project data ensured');
  }
};

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taskflow')
  .then(async () => {
    console.log('MongoDB connected');
    await ensureMinimumData();
  })
  .catch((err) => console.log('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);

// Serve frontend static files
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// SPA fallback
app.get('*', (req, res) => {
  const indexPath = path.join(frontendPath, 'index.html');
  // Check if file exists to avoid the ENOENT error loop in console during dev
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).send("Frontend build not found. Run 'npm run build' in frontend folder.");
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
