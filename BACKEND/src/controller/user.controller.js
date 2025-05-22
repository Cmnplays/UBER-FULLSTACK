import routeHandler from "../utils/routeHandler.js";
import { createUser } from "../services/user.service.js";
import ApiError from "../utils/apiErrorHandler.js";
import ApiResponse from "../utils/apiResponseHandler.js";
import { validationResult } from "express-validator";
import { genAccessRefreshTokens } from "../services/user.service.js";
import { userModel } from "../models/user.model.js";
import { refreshTokenModel } from "../models/refreshToken.model.js";
import jwt from "jsonwebtoken";
import { statusCodes } from "../constants/statusCodes.js";

const register = routeHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(
      statusCodes.BAD_REQUEST,
      "Data validation failed",
      errors.array()
    );
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
    .status(statusCodes.CREATED)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(
        statusCodes.CREATED,
        createdUser,
        "User registered successfully"
      )
    );
});

const login = routeHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(
      statusCodes.BAD_REQUEST,
      "Data validation failed",
      errors.array()
    );
  }
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(statusCodes.NOT_FOUND, "User not found");
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
    .status(statusCodes.OK)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(statusCodes.OK, user, "User logged in successfully"));
});

const getUserProfile = routeHandler(async (req, res) => {
  return res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(
        statusCodes.OK,
        req.user,
        "Successfully sent user profile"
      )
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
    .status(statusCodes.OK)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(statusCodes.OK, null, "Successfully logged out"));
});

const refreshTokens = routeHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken; //we can also add logic for accepting refresh token through authorization (bearer) header but best practise is to only accept refresh token through secure httponly cookies as refreshtoken is very important.
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (errors) {
    throw new ApiError(statusCodes.UNAUTHORIZED, "Unauthorized token");
  }

  const refreshTokenInstance = await refreshTokenModel.findOne({
    refreshToken
  });

  if (!refreshTokenInstance) {
    return new ApiError(statusCodes.UNAUTHORIZED, "Unauthorized");
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
    .status(statusCodes.OK)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(
        statusCodes.OK,
        null,
        "Successfully refreshed both tokens"
      )
    );
});
export { register, login, getUserProfile, logout, refreshTokens };
