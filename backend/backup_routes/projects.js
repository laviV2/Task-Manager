import express from 'express';
import { auth } from '../middleware/auth.js';
import Project from '../models/Project.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({
      'members.userId': req.user.id,
    }).populate('members.userId', 'name avatarInitials');

    const populatedProjects = projects.map((p) => ({
      _id: p._id,
      name: p.name,
      status: p.status,
      type: p.type,
      platform: p.platform,
      members: p.members,
      createdAt: p.createdAt,
      lead: p.members.find((m) => m.role === 'lead')?.userId?.name || '',
      reviewer: p.members.find((m) => m.role === 'reviewer')?.userId?.name || '',
    }));

    res.json(populatedProjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
