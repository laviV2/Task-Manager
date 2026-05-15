import express from 'express';
import Attendance from '../models/Attendance.js';
import Notification from '../models/Notification.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

// Get attendance for current user
router.get('/', async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user.userId };
    const records = await Attendance.find(query).populate('userId', 'name avatarInitials role').sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance' });
  }
});

// Punch In
router.post('/punch-in', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    let record = await Attendance.findOne({ userId: req.user.userId, date: today });

    if (record) {
      return res.status(400).json({ message: 'Already punched in today' });
    }

    record = new Attendance({
      userId: req.user.userId,
      date: today,
      punchIn: new Date().toLocaleTimeString(),
    });

    await record.save();
    
    // Create notification
    const notification = new Notification({
      userId: req.user.userId,
      title: 'Attendance',
      message: `You punched in at ${record.punchIn}`,
    });
    await notification.save();

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error punching in' });
  }
});

// Punch Out
router.post('/punch-out', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const record = await Attendance.findOne({ userId: req.user.userId, date: today });

    if (!record) {
      return res.status(400).json({ message: 'No punch-in found for today' });
    }

    if (record.punchOut) {
      return res.status(400).json({ message: 'Already punched out today' });
    }

    record.punchOut = new Date().toLocaleTimeString();
    
    // Basic hours calculation (very simplified)
    const inTime = new Date(`${today} ${record.punchIn}`);
    const outTime = new Date(`${today} ${record.punchOut}`);
    record.hoursWorked = Math.abs(outTime - inTime) / 36e5; // Convert ms to hours

    await record.save();

    const notification = new Notification({
      userId: req.user.userId,
      title: 'Attendance',
      message: `You punched out at ${record.punchOut}. Total hours: ${record.hoursWorked.toFixed(2)}`,
    });
    await notification.save();

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error punching out' });
  }
});

export default router;