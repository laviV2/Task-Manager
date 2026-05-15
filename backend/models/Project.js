import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['live', 'archived'],
    default: 'live',
  },
  type: {
    type: String,
    enum: ['internal', 'client', 'experimental'],
    default: 'internal',
  },
  platform: {
    type: String,
    default: 'Web',
  },
  progressStatus: {
    type: String,
    enum: ['pending', 'in_progress', 'done', 'blocked'],
    default: 'pending',
  },
  report: {
    type: String,
    default: '',
  },
  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        enum: ['lead', 'reviewer', 'member'],
      },
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Project', projectSchema);
