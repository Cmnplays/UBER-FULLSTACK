import { statusCodes } from "../constants/statusCodes.js";
import { captainModel } from "../models/captain.model.js";
import ApiError from "../utils/apiErrorHandler.js";
import { refreshTokenModel } from "../models/refreshToken.model.js";

const createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  vehicle
}) => {
  const existingCaptain = await captainModel.findOne({
    email
  });
  if (existingCaptain) {
    throw new ApiError(statusCodes.CONFLICT, "User already exists");
  }
  const captain = await captainModel.create({
    fullName: {
      firstName,
      lastName
    },
    email,
    password,
    vehicle: {
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType
    }
  });
  console.log(captain);
  if (!captain) {
    throw new ApiError(statusCodes.INTERNAL_SERVER_ERROR);
  }
  return captain;
};

const genAccessAndRefreshToken = async (userId) => {
  const captain = await captainModel.findById(userId);
  if (!captain) {
    throw new ApiError(statusCodes.NOT_FOUND, "Captian not found");
  }
  const refreshToken = captain.genRefreshToken();
  const accessToken = captain.genAccessToken();

  if (!accessToken || !refreshToken) {
    throw new ApiError(
      statusCodes.INTERNAL_SERVER_ERROR,
      "There was a problem while generating access token"
    );
  }
  await refreshTokenModel.create({
    userId,
    refreshToken
  });

  return { accessToken, refreshToken };
};
export { createCaptain, genAccessAndRefreshToken };
