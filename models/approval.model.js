import mongoose from "mongoose";

const approvalSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      enrollment_no: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
      },
      email: {
        type: String,
        unique: true,
        default: null,
      },
      phone: {
        type: String,
        unique: true,
        default: null,
      },
      password: {
        type: String,
        required: true,
        unique: true,
      },
      userType: {
        type: String,
        default: "teacher",
      },
      approved: {
        type: Boolean,
        default: false,
      },
      rejected: {
        type: Boolean,
      },
      timesRejected: {
        type: Number,
      },
    },
    { timestamps : {createdAt: "approvalRequestedOn", updatedAt: false}}
  );

const Approval = mongoose.models.Approval || mongoose.model("Approval", approvalSchema);

export default Approval;