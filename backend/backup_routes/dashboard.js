import express from 'express';
import { auth } from '../middleware/auth.js';
import Project from '../models/Project.js';

const router = express.Router();

const getTodayDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({
      'members.userId': req.user.id,
    }).populate('members.userId', 'name avatarInitials');

    const lead =
      projects.length > 0
        ? projects[0].members.find((m) => m.role === 'lead')?.userId?.name || ''
        : '';
    const reviewer =
      projects.length > 0
        ? projects[0].members.find((m) => m.role === 'reviewer')?.userId?.name ||
          ''
        : '';

    res.json({
      projectsCount: projects.length,
      projectLead: lead,
      qualityReviewer: reviewer,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
