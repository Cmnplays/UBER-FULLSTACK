import mongoose, { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: [
          2,
          "First name is required and must be at least 2 characters"
        ]
      },
      lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: [
          2,
          "Last name is required and must be at least 2 characters"
        ]
      }
    },
    email: {
      type: String,
      required: true,
      trim: true,
      index: true,
      unique: true,
      lowercase: true,
      minLength: [4, "Email is required and must be at least 4 characters"]
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
      minLength: [5, "Password must be at least 4 characters"]
    },
    refreshToken: {
      type: String,
      select: false
    },
    socketId: {
      //socket id will be used for live tracking feature
      type: String
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.genAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  });
};

userSchema.methods.genRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  });
};

userSchema.methods.comparePassword = async function (password) {
  const response = await bcrypt.compare(password, this.password);
  return response;
};

export const userModel = model("user", userSchema);
