import mongoose from 'mongoose';
import { Student } from './student.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema(
  {
    name: {
      first: {
        type: String,
        required: true,
      },
      last: {
        type: String,
        required: true,
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
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
              ref: 'Student',
              required: true,
            },
            attendanceStatus: {
              type: String,
              required: true,
              enum: ['present', 'absent'],
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const token = jwt.sign(
    {
      username: this.username,
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
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    }
  );

  return token;
};

export const User = mongoose.model('User', userSchema);
