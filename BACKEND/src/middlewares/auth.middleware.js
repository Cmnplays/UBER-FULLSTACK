import { userModel } from "../models/user.model.js";
import { refreshTokenModel } from "../models/refreshToken.model.js";
import ApiError from "../utils/apiErrorHandler.js";
import jwt from "jsonwebtoken";

const verifyToken = async (req, _, next) => {
  const token =
    req.cookies.accessToken ||
    req.headers?.cookie ||
    req.headers.authorization?.split(" ")[1];

  if (!token) throw new ApiError(401, "Token missing");

  let decodedInfo;
  try {
    decodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch {
    throw new ApiError(401, "Invalid token");
  }

  const user = await userModel.findById(decodedInfo._id);
  if (!user) throw new ApiError(401, "User not found");

  req.user = user;
  return next();
};

export default verifyToken;
