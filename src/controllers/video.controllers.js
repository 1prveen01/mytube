import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/videos.model.js";
import { User } from "../models/users.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getPublicIdFromUrl } from "../../utils/getPublicIdFromUrl.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination

  //create filters
  const filters = {};

  if (query) {
    filters.title = { $regex: query, $options: "i" };
  }

  if (userId) {
    filters.owner = userId;
  }

  //sorting options
  const sortOptions = {};
  sortOptions[sortBy] = sortType === "asc" ? 1 : -1;

  //pagination
  const skip = (Number(page) - 1) * Number(limit);

  //fetch videos from db
  const videos = await Video.find(filters)
    .populate("owner", "username avatar fullName")
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit));

  //  Count total for pagination
  const total = await Video.countDocuments(filters);

  return res.status(200).json(
    new apiResponse(
      200,
      {
        total,
        page: Number(page),
        limit: Number(page),
        videos,
      },
      "Videos fetched Successfully"
    )
  );
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary , create video

  const videoLocalFilePath = req.file?.path;

  if (!videoLocalFilePath) {
    throw new apiError(400, "Missing video local file path");
  }

  //upload in cloudinary
  const uploadVideo = await uploadOnCloudinary(videoLocalFilePath);

  //video duration in seconds
  const durationInSeconds = uploadVideo.duration;
  if (!uploadVideo || !uploadVideo.url) {
    throw new apiError(400, "Error while uploading the video");
  }

  // save video in db
  const saveVideo = await Video.create({
    title,
    description,
    videoFile: uploadVideo.url,
    duration: durationInSeconds,
    owner: req.user?._id,
  });

  return res
    .status(200)
    .json(new apiResponse(200, saveVideo, "Video uploaded successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
  if (!videoId.trim()) {
    throw new apiError(400, "VidoeId is missing");
  }
  const video = await Video.findById(videoId).populate({
    path: "owner",
    select: "username fullName avatar",
  });
  if (!video) {
    throw new apiError(400, "Vidoe not found");
  }
  return res
    .status(200)
    .json(new apiResponse(200, video, "Video fetced successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail

  const { title, description } = req.body;
  const thumbnailLocalFilePath = req.file?.path;
  if (!thumbnailLocalFilePath) {
    throw new apiError(400, "Error while uploading thumbnail");
  }

  if (!videoId.trim()) {
    throw new apiError(400, "videoId is missing");
  }

  //finding the videoId
  const video = await Video.findById(videoId).populate({
    path: "owner",
    select: "title description thumbnail",
  });

  if (!video) {
    throw new apiError(400, "Video not found");
  }

  //uploading thumbnail if provided
  if (thumbnailLocalFilePath) {
    const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalFilePath);
    if (uploadedThumbnail?.url) {
      video.thumbnail = uploadedThumbnail.url;
    }
  }

  if (title) {
    video.title = title;
  }

  if (description) {
    video.description = description;
  }

  //save the updated details
  const updatedVideo = await video.save();
  return res
    .status(200)
    .json(new apiResponse(200, updateVideo, "Video details updated successfully "));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
  if (!videoId) {
    throw new apiError(400, "Vidoe Id is missing");
  }

  //find if the video exists
  const existingVideo = await Video.findById(videoId);
  if (!existingVideo) {
    throw new apiError(404, "Video not found");
  }

  //finding the public id using existing video
  const publicId = getPublicIdFromUrl(existingVideo.thumbnail);

  // Delete thumbnail from Cloudinary if it exists
  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }

  // Delete the video document from MongoDB
  await existingVideo.deleteOne();
  return res
    .status(200)
    .json(new apiResponse(200, {}, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if(!videoId){
    throw new apiError(400 , "Video id is missing")
  }

  //Find the video
  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(404, "Video not found");
  }

   // Toggle the publish status
  video.isPublished = !video.isPublished;

   // Save the updated video
  await video.save();

  return res.status(200).json(
    new apiResponse(
      200,
      { isPublished: video.isPublished },
      `Video has been ${video.isPublished ? "published" : "unpublished"} successfully`
    )
  );


});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
