import { userModel } from "../models/user.model.js";
import ApiError from "../utils/apiErrorHandler.js";
import jwt from "jsonwebtoken";
import { statusCodes } from "../constants/statusCodes.js";
import { captainModel } from "../models/captain.model.js";

const userAuth = async (req, _, next) => {
  const token =
    req.cookies.accessToken ||
    req.headers?.cookie ||
    req.headers.authorization?.split(" ")[1];

  if (!token)
    throw new ApiError(statusCodes.UNAUTHORIZED, "Access token missing");

  let decodedInfo;
  try {
    decodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch {
    throw new ApiError(statusCodes.UNAUTHORIZED, "Invalid access token");
  }

  const user = await userModel.findById(decodedInfo._id);
  if (!user) throw new ApiError(statusCodes.UNAUTHORIZED, "User not found");

  req.user = user;
  return next();
};

const captainAuth = async (req, _, next) => {
  const accessToken =
    req.cookies.accessToken ||
    req.headers.authorization?.split(" ")[0] ||
    req.headers.cookie;
  if (!accessToken) {
    throw new ApiError(statusCodes.UNAUTHORIZED, "Access token missing");
  }
  let decodedInfo;
  try {
    decodedInfo = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(statusCodes.UNAUTHORIZED, "Invalid access token");
  }
  const captain = await captainModel.findById(decodedInfo._id);

  if (!captain) {
    throw new ApiError(statusCodes.UNAUTHORIZED, "Captian not found");
  }
  req.captain = captain;
  return next();
};
export { userAuth, captainAuth };
