import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    student: {
      firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
      enrollment_no: {
        type: String,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      }
    },
    attendedOn: { type: Date, default: Date.now },
    
  }
);
//{ timestamps : {createdAt: attendedOn, updatedAt: false}} Removed for to add manually 
const Attendance = mongoose.models.Attendance ||  mongoose.model("Attendance", attendanceSchema);

export default Attendance;
