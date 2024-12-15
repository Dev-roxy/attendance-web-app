import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userId: {
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
      default: null,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
    },
    attendanceRecords: [
      {
        date: {
          type: Date,
          required: true,
        },
        studentsRecord: [
          {
            studentId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Student",
              required: true,
            },
            attendanceStatus: {
              type: String,
              required: true,
              enum: ["present", "absent"],
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const token = jwt.sign(
    {
      userId: this.userId,
      email: this.email,
      phone: this.phone,
      name: this.name,
      password: this.password,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );

  return token;
};

userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign(
    {
      userId: this.userId,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    }
  );

  return token;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User };