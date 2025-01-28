import { NextResponse } from "next/server";
import Approval from "@/models/approval.model";

export async function GET(request) {
  try {
    const approvals = await Approval.find({
      $or: [
        { rejected: { $exists: false } }, // Documents where the field doesn't exist
        { rejected: { $ne: true } }
      ],
      approved: false,
    })
    if (!approvals) {
      return NextResponse.json({
        message: "No approvals found",
        status: 404,
      });
    }
    return NextResponse.json({ approvals }, { status: 200 });
  } catch (error) {
    console.error("Error fetching approvals:", error.message);
    return NextResponse.error({
      message: error.message,
    }, {
      status: 200
    });
  }
}
