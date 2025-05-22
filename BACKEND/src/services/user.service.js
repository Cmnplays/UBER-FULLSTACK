import { userModel } from "../models/user.model.js";
import ApiError from "../utils/apiErrorHandler.js";
import { refreshTokenModel } from "../models/refreshToken.model.js";
import { statusCodes } from "../constants/statusCodes.js";

const createUser = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !lastName || !email || !password) {
    throw new ApiError(statusCodes.BAD_REQUEST, "All fields are required");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new ApiError(statusCodes.CONFLICT, "User already exists");
  }

  const user = await userModel.create({
    fullName: {
      firstName,
      lastName
    },
    email,
    password
  });
  user.password = undefined;
  return user;
};

const genAccessRefreshTokens = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) {
    throw new ApiError(statusCodes.NOT_FOUND, "No user found");
  }

  const accessToken = user.genAccessToken();
  const refreshToken = user.genRefreshToken();

  if (!refreshToken || !accessToken) {
    throw new ApiError(
      statusCodes.INTERNAL_SERVER_ERROR,
      "There was a problem while generating tokens"
    );
  }

  await refreshTokenModel.create({
    userId: user._id,
    refreshToken
  });

  return { accessToken, refreshToken };
};

export { createUser, genAccessRefreshTokens };
