import mongoose from 'mongoose';
import { User } from './user.model.js';

const studentSchema = mongoose.Schema(
  {
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    studentId : {
      type: string,
      required: true,
    },
    rollNo: {
      type: Number,
      required: true,
    },
    currentYear: {
      type: String,
      required: true,
      enum: ['1st', '2nd', '3rd', '4th'],
    },
    semister:{
        type: String,
        required: true,
        enum: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
    },
    gender: {
      type: String,
      default:null
    },
    studentBranch: {
      type: String,
      required: true,
    },
    studentSection: {
      type: String,
      required: true,
    },
    studentBatch: {
      type: String,
      required: true,
    },
    attendanceRecords: [
      {
        dateOfAttendance: {
          type: Date,
          required: true,
        },
        attendanceStatus : {
          type: String,
          required: true,
          enum: ['present', 'absent'],
        },
        course: {
          type: String,
          required: true,
        },
        faculty: {
          type: mongoose.Schema.Types.ObjectId,
          ref: User,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Student = mongoose.model('Student', studentSchema);
