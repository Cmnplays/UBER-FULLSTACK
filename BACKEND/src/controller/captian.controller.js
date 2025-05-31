import ApiError from "../utils/apiErrorHandler.js";
import routeHandler from "../utils/routeHandler.js";
import ApiResponse from "../utils/apiResponseHandler.js";
import { validationResult } from "express-validator";
import { statusCodes } from "../constants/statusCodes.js";
import {
  createCaptain,
  genAccessAndRefreshToken
} from "../services/captian.service.js";
import { captainModel } from "../models/captain.model.js";
import { refreshTokenModel } from "../models/refreshToken.model.js";
import jwt from "jsonwebtoken";

const register = routeHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(
      statusCodes.BAD_REQUEST,
      "Data validation failed",
      errors.array()
    );
  }

  const { firstName, lastName, email, password, vehicle } = req.body;

  const captain = await createCaptain({
    firstName,
    lastName,
    email,
    password,
    vehicle
  });
  captain.password = undefined;
  const { accessToken, refreshToken } = await genAccessAndRefreshToken(
    captain._id
  );
  const cookieOptions = {
    secure: true,
    httpOnly: true
  };
  return res
    .status(statusCodes.CREATED)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(
        statusCodes.CREATED,
        captain,
        "Captian created successfully"
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

  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    throw new ApiError(statusCodes.NOT_FOUND, "Email or password is wrong");
  }

  const result = await captain.comparePassword(password);
  if (!result) {
    throw new ApiError(statusCodes.UNAUTHORIZED, "Email or password is wrong");
  }
  captain.password = undefined;
  const { accessToken, refreshToken } = await genAccessAndRefreshToken(
    captain._id
  );

  const cookieOptions = {
    secure: true,
    httpOnly: true
  };

  return res
    .status(statusCodes.OK)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(statusCodes.OK, captain, "Successfully logged in"));
});

const getCaptainProfile = routeHandler(async (req, res) => {
  return res
    .status(statusCodes.OK)
    .json(
      new ApiResponse(
        statusCodes.OK,
        req.captain,
        "Successfully send user profile details"
      )
    );
});

const logout = routeHandler(async (req, res) => {
  await refreshTokenModel.deleteOne({ userId: req.captain._id });
  const cookieOptions = {
    secure: true,
    httpOnly: true
  };
  return res
    .status(statusCodes.OK)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(statusCodes.OK, null, "Successfully logged out"));
});

const refreshAccessToken = routeHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    throw new ApiError(statusCodes.BAD_REQUEST, "Refresh token missing");
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(statusCodes.UNAUTHORIZED, err.message);
  }
  const refreshTokenInstance = await refreshTokenModel.findOne({
    refreshToken: token
  });
  if (!refreshTokenInstance) {
    throw new ApiError(statusCodes.UNAUTHORIZED, "Invalid refresh token");
  }
  const { accessToken, refreshToken } = await genAccessAndRefreshToken(
    decoded._id
  );
  refreshTokenInstance.refreshToken = refreshToken;
  await refreshTokenInstance.save();

  const cookieOptions = {
    secure: true,
    httpOnly: true
  };

  return res
    .status(statusCodes.OK)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(
        statusCodes.OK,
        null,
        "Successfully refreshed access and refresh tokens"
      )
    );
});
export { login, register, getCaptainProfile, logout, refreshAccessToken };
