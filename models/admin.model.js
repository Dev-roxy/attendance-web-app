import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { SignJWT } from 'jose/jwt/sign';

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    adminId: {
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
    userType: {
      type: String,
      default: "admin",
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    institute: {
      type: String,
      default: null,
      required: true,
    },
  },
  { timestamps : {createdAt: 'registeredOn', updatedAt: 'updatedOn'} }
);

// Hash the password before saving the user model
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Generate a salt
  const salt = await bcrypt.genSalt(10);

  // Hash the password with bcrypt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.matchPassword = async function (password) {
  // Compare the provided password with the stored hash
  return await bcrypt.compare(password, this.password);
};


adminSchema.methods.generateAccessToken = async function () {
  const token = await new SignJWT({
    adminId: this.adminId,
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

adminSchema.methods.generateRefreshToken = async function () {
  const token = await new SignJWT({ adminId: this.adminId })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime(process.env.REFRESH_TOKEN_EXPIRE)
          .sign(new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET));
  

  return token;
};
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema) ;

export default Admin;