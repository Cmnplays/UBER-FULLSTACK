import routeHandler from "../utils/routeHandler.js";
import { createUser } from "../services/user.service.js";
import ApiError from "../utils/apiErrorHandler.js";
import ApiResponse from "../utils/apiResponseHandler.js";
import { validationResult } from "express-validator";
import { genAccessRefreshTokens } from "../services/user.service.js";

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
    .cookie("accessTokens", accessToken, cookieOptions)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});
export { register };
