import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import Project from '../models/Project.js';
import Task from '../models/Task.js';
import Attendance from '../models/Attendance.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const isAdmin = req.user.role === 'admin';
    const projectQuery = isAdmin ? {} : { 'members.userId': req.user.userId };
    const taskQuery = isAdmin ? {} : { assigneeId: req.user.userId };
    const attendanceQuery = isAdmin ? {} : { userId: req.user.userId };

    const projects = await Project.find(projectQuery);
    const tasks = await Task.find(taskQuery);
    const attendance = await Attendance.find(attendanceQuery).limit(5).sort({ date: -1 }).populate('userId', 'name avatarInitials role');

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const activeTasks = tasks.filter(t => t.status === 'active').length;

    res.json({
      projectsCount: projects.length,
      totalTasks,
      completedTasks,
      activeTasks,
      recentAttendance: attendance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
