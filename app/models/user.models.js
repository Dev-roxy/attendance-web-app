import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

const studentSchema = mongoose.Schema(
  {
    name: {
      type: string,
      required: true,
    },
    rollNo: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
      enum: ["1st", "2nd", "3rd", "4th"],
    },
    gender:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true,
    },
    section:{
        type:String,
        required:true,
    }
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);