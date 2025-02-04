import mongoose from "mongoose";

const deleteApprovalSchema = new mongoose.Schema(
    {
        enrollment_no: {
            type: String,
            required: true
        },
        requestedOn: {
            type: Date,
            required: true,
            default: Date.now()
        },
        approved: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            default: "pending",
            enum : ["pending", "approved", "rejected"]
        },
    },
    { timestamps: { createdAt: "approvalRequestedOn", updatedAt: false } }
);

const deleteApproval = mongoose.models.deleteApproval || mongoose.model("deleteApproval", approvalSchema);

export default deleteApproval;