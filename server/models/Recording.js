import mongoose from 'mongoose';

const recordingSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    path: { type: String, required: true },
    duration: Number,
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export default mongoose.model('Recording', recordingSchema);
