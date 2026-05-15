import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Task from './models/Task.js';
import Attendance from './models/Attendance.js';
import Leave from './models/Leave.js';
import Notification from './models/Notification.js';

dotenv.config();

const clearData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taskflow');

    await Promise.all([
      Project.deleteMany({}),
      Task.deleteMany({}),
      Attendance.deleteMany({}),
      Leave.deleteMany({}),
      Notification.deleteMany({}),
    ]);

    console.log('All project/task/attendance/leave/notification data cleared.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to clear data:', error.message);
    process.exit(1);
  }
};

clearData();
