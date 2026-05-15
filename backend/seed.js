import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Project from './models/Project.js';
import Task from './models/Task.js';
import Attendance from './models/Attendance.js';
import Leave from './models/Leave.js';
import Notification from './models/Notification.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taskflow');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    await Attendance.deleteMany({});
    await Leave.deleteMany({});
    await Notification.deleteMany({});

    // Create users
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@taskflow.com',
      password: adminPassword,
      role: 'admin',
      avatarInitials: 'AU',
    });
    console.log('Users created:', [admin.email]);
    console.log('No sample projects or tasks were added.');
    console.log('\n✅ Database seeded successfully!');
    console.log('\nDemo Credentials:');
    console.log('  Admin: admin@taskflow.com / admin123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
