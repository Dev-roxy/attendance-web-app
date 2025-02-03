import mongoose from 'mongoose';
import { generateSessionId } from '@/utils/functions';

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true, 
  },
  sessionCode: {
    type: String,
    required: true,
    maxlength: 5,
    minlength: 5,
  },
  teacher: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    enrollment_no: {
      type: String,
      required: true,
    }
  },
  isActive: {
    type: Boolean,
    default: true, // Indicates if the session is still open
  },
}, { timestamps: {createdAt:"startedAt",updatedAt:"endedAt"} }); // Adds createdAt and updatedAt fields automatically


const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);

export default Session;
