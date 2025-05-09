import express from "express";
const userRouter = express.Router();
import { body } from "express-validator";
import { register } from "../controller/user.controller.js";
userRouter.post(
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
);

export default userRouter;
