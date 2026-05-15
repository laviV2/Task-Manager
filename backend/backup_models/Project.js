import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['live', 'archived'],
    default: 'live',
  },
  type: {
    type: String,
    enum: ['stem', 'non_stem'],
    default: 'non_stem',
  },
  platform: {
    type: String,
    default: 'Multimango',
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Project', projectSchema);
