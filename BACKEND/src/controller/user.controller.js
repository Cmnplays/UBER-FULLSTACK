import routeHandler from "../utils/routeHandler.js";
import { createUser } from "../services/user.service.js";
import ApiError from "../utils/apiErrorHandler.js";
import ApiResponse from "../utils/apiResponseHandler.js";
import { validationResult } from "express-validator";
import { genAccessRefreshTokens } from "../services/user.service.js";
import { userModel } from "../models/user.model.js";
import { refreshTokenModel } from "../models/refreshToken.model.js";
import jwt from "jsonwebtoken";

const register = routeHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, "Data validation failed", errors.array());
  }
  const { firstName, lastName, email, password } = req.body;

  const createdUser = await createUser({
    firstName,
    lastName,
    email,
    password
  });

  const { refreshToken, accessToken } = await genAccessRefreshTokens(
    createdUser._id
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true
  };
  return res
    .status(201)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const login = routeHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, "Data validation failed", errors.array());
  }
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  const comparedResult = await user.comparePassword(password);
  if (!comparedResult) {
    throw new ApiError(400, "Password is incorrect");
  }
  user.password = undefined;
  const { refreshToken, accessToken } = await genAccessRefreshTokens(user._id);

  const cookieOptions = {
    httpOnly: true,
    secure: true
  };
  return res
    .status(201)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(200, user, "User logged in successfully"));
});

const getUserProfile = routeHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: req.user }, "Successfully sent user profile")
    );
});

const logout = routeHandler(async (req, res) => {
  await refreshTokenModel.deleteOne({
    userId: req.user._id
  });

  const cookieOptions = {
    httpOnly: true,
    secure: true
  };
  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, null, "Successfully logged out"));
});

const refreshAccessToken = routeHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken; //we can also add logic for accepting refresh token through authorization (bearer) header but best practise is to only accept refresh token through secure httponly cookies as refreshtoken is very important.
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (errors) {
    throw new ApiError(401, "Unauthorized token");
  }

  const refreshTokenInstance = await refreshTokenModel.findOne({
    refreshToken
  });

  if (!refreshTokenInstance) {
    return new ApiError(403, "Unauthorized");
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await genAccessRefreshTokens(decoded._id);

  refreshTokenInstance.refreshToken = newRefreshToken;

  await refreshTokenInstance.save();
  const cookieOptions = {
    httpOnly: true,
    secure: true
  };
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(200, null, "Successfully refreshed both tokens"));
});
export { register, login, getUserProfile, logout, refreshAccessToken };
