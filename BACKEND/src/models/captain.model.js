import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: [2, "First name is required and must be at least 2 characters"]
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: [2, "Last name is required and must be at least 2 characters"]
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
    select: false,
    trim: true,
    minLength: [5, "Password must be at least 4 characters"]
  },
  socketId: {
    type: String
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 characters long"]
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least 3 characters long"]
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"]
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"]
    },
    location: {
      lat: {
        type: Number
      },
      lng: {
        type: Number
      }
    }
  }
});

captainSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

captainSchema.methods.genAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  });
};

captainSchema.methods.genRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  });
};

captainSchema.methods.comparePassword = async function (password) {
  const response = await bcrypt.compare(password, this.password);
  return response;
};
export const captainModel = model("captain", captainSchema);
