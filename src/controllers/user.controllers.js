import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiError } from "../../utils/apiError.js";
import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { response } from "express";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "ok",
  });

  //get user detail from frontend
  const { fullName, username, email, password } = req.body;
  console.log("email is : ", email);

  //check for empty string
  if (
    [username, email, password, fullName].some((field) => field?.trim() === "")
  ) {
    throw new apiError(400, "All fields are required");
  }

  //validation for existing user
  const exitedUser = User.findOne({
    $or: [{ username }, { password }],
  });

  if (exitedUser) {
    throw new apiError(409, "User with username or email already exits ");
  }

  //check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar file is required ");
  }

  // upload on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  //check avatar is required
  if (!avatar) {
    throw new apiError(400, "Avatar is required field");
  }

  //create user in database
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });


    // removing password and refreshToken fields from response
    const createdUser = await user.findById(user._id).select(
        "-password -refreshToken"
    )

    //check user is created successfully
    if(!createdUser){
        throw new apiError(500 , "Something went wrong while registering the user")
    }

    return response.status(201).json(
        new apiResponse(200, createdUser , "User Created Successfully ")
    )
});

export { registerUser };
