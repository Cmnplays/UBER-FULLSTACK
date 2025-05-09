import { userModel } from "../models/user.model.js";
import ApiError from "../utils/apiErrorHandler.js";
const createUser = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !lastName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await userModel.create({
    fullName: {
      firstName,
      lastName
    },
    email,
    password
  });

  return user;
};
const genAccessRefreshTokens = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) {
    throw new ApiError(500, "No user found");
  }
  const accessToken = user.genAccessToken();
  const refreshToken = user.genRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();
  if (!refreshToken || !accessToken) {
    throw new ApiError(500, "There was a problem while generating tokens");
  }
  return { accessToken, refreshToken };
};

export { createUser, genAccessRefreshTokens };
