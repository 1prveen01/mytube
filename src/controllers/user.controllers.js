import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiError } from "../../utils/apiError.js";
import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { response } from "express";
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      "Something went wrong while generating Refresh and Access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get user detail from frontend
  const { fullName, username, email, password } = req.body;
  console.log("req.body is : ", req.body.email);

  //check for empty string
  if (
    [username, email, password, fullName].some((field) => field?.trim() === " ")
  ) {
    throw new apiError(400, "All fields are required");
  }

  //validation for existing user
  const exitedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (exitedUser) {
    throw new apiError(409, "User with username or email already exits ");
  }

  //check for avatar
  console.log("req files is: ", req.files.avatar);
  const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    console.log(avatarLocalPath)
    

  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar file is required ");
  }

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  console.log(coverImageLocalPath)

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
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //check user is created successfully
  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User Created Successfully "));
});

const loginUser = asyncHandler(async (req, res) => {
  //req body from data
  //username or email
  //find the user
  //password check
  //access and refresh token
  //cookies

  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new apiError(400, "Username or email is required");
  }

  //find user and email whichever find first
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  //if user not find
  if (!user) {
    throw new apiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new apiError(401, "Invalid login credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //cookiesOptions
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(200,
      {
        user: loggedInUser,
        refreshToken,
        accessToken,
      },
      "User Logged In Successfully"
    ))
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findOneAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new apiResponse(200 , { } , "User logged Out"
  ))
});

const refreshAccessToken = asyncHandler( async (req , res ) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

  if(!incomingRefreshToken){
    throw new apiError(401,"Unauthorized Request")
  }

 try {
   const decodedRefreshToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
 
   const user = await User.findById(decodedRefreshToken?._id)
 
   if(!user){
     throw new apiError(401, "Invalid Refresh Token")
   }
 
   if(incomingRefreshToken !== user?.refreshToken){
     throw new apiError(401, "Refresh Token is expired or used")
   }
 
   const options = {
     httpOnly : true,
     secure : true
   }
 
    const {accessToken , newRefreshToken } = await generateAccessAndRefreshToken(user?._id)
 
   return res
   .status(200).cookie("accessToken",accessToken ,options)
   .cookie("refreshToken", newRefreshToken , options)
   .json(
     new apiResponse(
       200,
       {
         accessToken , refreshToken : newRefreshToken
       },
       "Access Token Refreshed Successfully"
     )
   )
 } catch (error) {

  throw new apiError(
    401, error?.message || "Invalid Refresh Token"
  )
  
 }



}) 

export { registerUser, loginUser, logoutUser, refreshAccessToken };
