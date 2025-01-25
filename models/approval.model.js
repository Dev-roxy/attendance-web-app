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
      teacherId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
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
        required: true
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
    },
    { timestamps: true }
  );

const Approval = mongoose.models.Approval || mongoose.model("Approval", approvalSchema);

export default Approval;