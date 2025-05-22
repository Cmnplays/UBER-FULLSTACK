import { Router } from "express";
const captianRouter = Router();
import { body } from "express-validator";
import {
  login,
  register,
  getCaptainProfile,
  logout,
  refreshAccessToken
} from "../controller/captian.controller.js";
import { captainAuth } from "../middlewares/auth.middleware.js";

captianRouter
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
        .withMessage("First name must be at least 2 characters long"),

      body("email").isEmail().toLowerCase().withMessage("Invalid Email"),

      body("password").trim().isLength({ min: 2 }).toLowerCase(),

      body("vehicle.color")
        .isLength({ min: 3 })
        .withMessage("Color must be at least 3 characters long"),

      body("vehicle.plate")
        .isLength({ min: 3 })
        .withMessage("Plate must be at least 3 characters long"),

      body("vehicle.capacity")
        .isInt({ min: 1 })
        .withMessage("Capacity must be at least 1"),
      body("vehicle.vehicleType")
        .isIn(["car", "motorcycle", "auto"])
        .withMessage("Capacity must be at least 1")
    ],
    register
  )
  .post(
    "/login",
    [
      body("email").isEmail().toLowerCase().withMessage("Invalid Email"),
      body("password").trim().isLength({ min: 2 }).toLowerCase()
    ],
    login
  )
  .get("/profile", captainAuth, getCaptainProfile)
  .get("/refreshTokens", refreshAccessToken)
  .get("/logout", captainAuth, logout);

export default captianRouter;
