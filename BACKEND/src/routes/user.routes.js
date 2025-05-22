import express from "express";
const userRouter = express.Router();
import { body } from "express-validator";
import { userAuth } from "../middlewares/auth.middleware.js";
import {
  register,
  login,
  getUserProfile,
  logout,
  refreshTokens
} from "../controller/user.controller.js";

userRouter
  .post(
    "/register",
    [
      body("firstName")
        .isLength({ min: 2 })
        .trim()
        .toLowerCase()
        .withMessage("First name must be at least 2 characters long"),

      body("lastName")
        .isLength({ min: 2 })
        .trim()
        .toLowerCase()
        .withMessage("Last name must be at least 2 characters long"),

      body("email").isEmail().trim().toLowerCase().withMessage("Invalid email"),

      body("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long")
    ],
    register
  )
  .post(
    "/login",
    [
      body("email").isEmail().trim().toLowerCase().withMessage("Invalid email"),

      body("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long")
    ],
    login
  )
  .get("/profile", userAuth, getUserProfile)
  .post("/refreshToken", refreshTokens)
  .get("/logout", userAuth, logout);
export default userRouter;
