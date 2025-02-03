import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import { SignJWT } from 'jose/jwt/sign';

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
    enrollment_no : {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },email: {
      type: String,
      unique: true,
      default: null,
    },
    phone: {
      type: String,
      unique: true,
      required: true
    },
    userType: {
      type: String,
      default: "student",
    },
    rollNo: {
      type: Number,
      default: null,
    },
    acadmicYear: {
      type: String,
      default: null,
      enum: ['1st', '2nd', '3rd', '4th'],
    },
    semister:{
        type: String,
        default:null,
        enum: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
    },
    gender: {
      type: String,
      default:null,
      enum : ["male","female","other"]
    },
    branch: {
      type: String,
      default:null
    },
    section: {
      type: String,
      default:null
    },
    batch: {
      type: String,
      default:null
    },
    password: {
      type: String,
      required: true,
    },
    
  },
  { timestamps : {createdAt: "registeredOn", updatedAt: "updatedOn"} }
);
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Generate a salt
  const salt = await bcrypt.genSalt(10);

  // Hash the password with bcrypt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

studentSchema.methods.matchPassword = async function (password) {
  // Compare the provided password with the stored hash
  return await bcrypt.compare(password, this.password);
};


studentSchema.methods.generateAccessToken = async function () {
  const token = await new SignJWT({
    studentId: this.studentId,
    email: this.email,
    phone: this.phone,
    userType: this.userType,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.ACCESS_TOKEN_EXPIRE)
    .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));

  return token;
};

studentSchema.methods.generateRefreshToken = async function () {
  const token = await new SignJWT({ studentId: this.studentId })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime(process.env.REFRESH_TOKEN_EXPIRE)
          .sign(new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET));
  

  return token;
};
 const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;