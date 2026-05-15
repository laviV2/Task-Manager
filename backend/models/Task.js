import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assigneeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  taskIdLabel: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active',
  },
  durationMinutes: {
    type: Number,
    default: 0,
  },
  report: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: Date,
});

taskSchema.index({ projectId: 1, assigneeId: 1, taskIdLabel: 1 }, { unique: true });

export default mongoose.model('Task', taskSchema);