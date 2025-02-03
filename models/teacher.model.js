import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { SignJWT } from 'jose/jwt/sign';

const teacherSchema = new mongoose.Schema(
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
    },
    userType: {
      type: String,
      default: "teacher",
    },
    refreshToken: {
      type: String,
    },
    approvedOn : {
      type: Date,
      required :true
    },
    approved: {
      type: Boolean,
      default: false,
    },
    approvalRequestedOn : {
      type: Date,
      required :true
    },

  },
  { timestamps : {createdAt: "registeredOn", updatedAt: "updatedOn"} }
);


teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Generate a salt
  const salt = await bcrypt.genSalt(10);

  // Hash the password with bcrypt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

teacherSchema.methods.matchPassword = async function (password) {
  // Compare the provided password with the stored hash
  return await bcrypt.compare(password, this.password);
};


teacherSchema.methods.generateAccessToken = async function () {
  const token = await new SignJWT({
    teacherId: this.teacherId,
    email: this.email,
    phone: this.phone,
    name: this.name,
    userType: this.userType,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.ACCESS_TOKEN_EXPIRE)
    .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));

  return token;
};

teacherSchema.methods.generateRefreshToken = async function () {
  const token = await new SignJWT({ teacherId: this.teacherId })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime(process.env.REFRESH_TOKEN_EXPIRE)
          .sign(new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET));
  

  return token;
};

const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;
