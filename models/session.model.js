import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true, // Ensure session ID is unique
    maxlength: 5,
    minlength: 5,
  },
  teacherId: {
    type: String,
    required: true,
    index: true, // Helps with faster queries by teacher ID
  },
  teacherLocation: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true, // Indicates if the session is still open
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);

export default Session;
