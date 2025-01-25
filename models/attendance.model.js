import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    studentId: { type: String, required: true },
  },
  { timestamps : {createdAt: attendedOn, updatedAt: false} }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
