import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import roleGuard from '../middleware/roleGuard.js';
import Project from '../models/Project.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const query = req.user.role === 'admin' ? {} : { 'members.userId': userId };
    const projects = await Project.find(query).populate('members.userId', 'name avatarInitials role');

    const populatedProjects = projects.map((p) => ({
      _id: p._id,
      name: p.name,
      description: p.description,
      status: p.status,
      type: p.type,
      platform: p.platform,
      progressStatus: p.progressStatus,
      report: p.report,
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

router.post('/', authenticateToken, roleGuard(['admin']), async (req, res) => {
  try {
    const { name, type, platform, description, assignedMemberIds = [] } = req.body;
    const userId = req.user.userId;

    const project = new Project({
      name,
      type,
      platform,
      description,
      members: [
        { userId, role: 'lead' },
        ...[].concat(assignedMemberIds).filter(Boolean).map((memberId) => ({ userId: memberId, role: 'member' })),
      ],
    });

    await project.save();
    const populated = await project.populate('members.userId', 'name avatarInitials role');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single project by id
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('members.userId', 'name avatarInitials role');
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // authorization: admin or member of project
    const isAdmin = req.user.role === 'admin';
    const isMember = project.members.some((m) => String(m.userId) === String(req.user.userId));
    if (!isAdmin && !isMember) return res.status(403).json({ error: 'Forbidden' });

    const populated = {
      _id: project._id,
      name: project.name,
      description: project.description,
      status: project.status,
      type: project.type,
      platform: project.platform,
      progressStatus: project.progressStatus,
      report: project.report,
      members: project.members,
      createdAt: project.createdAt,
      lead: project.members.find((m) => m.role === 'lead')?.userId?.name || '',
      reviewer: project.members.find((m) => m.role === 'reviewer')?.userId?.name || '',
    };

    res.json(populated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project (assign members / edit fields) - admin only
router.patch('/:id', authenticateToken, roleGuard(['admin']), async (req, res) => {
  try {
    const { name, type, platform, description, assignedMemberIds = [] } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    project.name = name ?? project.name;
    project.type = type ?? project.type;
    project.platform = platform ?? project.platform;
    project.description = description ?? project.description;

    // Rebuild members: keep existing lead (first lead) or current user as lead
    const lead = project.members.find((m) => m.role === 'lead')?.userId || req.user.userId;
    const newMembers = [{ userId: lead, role: 'lead' }];
    // add assigned members as 'member'
    [].concat(assignedMemberIds).filter(Boolean).forEach((mid) => {
      if (String(mid) !== String(lead)) newMembers.push({ userId: mid, role: 'member' });
    });

    project.members = newMembers;
    project.updatedAt = new Date();
    await project.save();
    const populated = await project.populate('members.userId', 'name avatarInitials role');
    res.json(populated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id/report', authenticateToken, async (req, res) => {
  try {
    const { progressStatus, report } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const isAdmin = req.user.role === 'admin';
    const isMember = project.members.some((member) => String(member.userId) === String(req.user.userId));

    if (!isAdmin && !isMember) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    project.progressStatus = progressStatus || project.progressStatus;
    project.report = report ?? project.report;
    project.updatedAt = new Date();

    await project.save();
    const populated = await project.populate('members.userId', 'name avatarInitials role');
    res.json(populated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete project - admin only
router.delete('/:id', authenticateToken, roleGuard(['admin']), async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
