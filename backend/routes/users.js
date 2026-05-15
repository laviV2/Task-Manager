import express from 'express';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';
import roleGuard from '../middleware/roleGuard.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', roleGuard(['admin']), async (req, res) => {
  try {
    // Return only members for assignment lists
    const users = await User.find({ role: 'member' }).select('name email role avatarInitials createdAt').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;