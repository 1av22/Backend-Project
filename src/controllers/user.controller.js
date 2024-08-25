import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // Get user details from frontend, Get add data that are in user schema
  const { fullname, email, username, password } = req.body;

  // Validations - not empty
  if (
    [fullname, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exist -> username, email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email/username already exist");
  }

  // Check images, avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // console.log(avatarLocalPath);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverimage) &&
    req.files.coverimage.length > 0
  ) {
    coverImageLocalPath = req.files.coverimage[0].path;
  }

  // Upload them to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // Create a user object - create entry in db
  const user = await User.create({
    fullname: fullname,
    avatar: avatar.url,
    coverimage: coverImage?.url || "",
    email: email,
    username: username.toLowerCase(),
    password: password,
  });

  // Remove password and refresh token field from response
  const createduser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // Check for user creation
  if (!createduser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // return response
  return res
    .status(201)
    .json(new ApiResponse(200, createduser, "User registered successfully"));
});

export { registerUser };
