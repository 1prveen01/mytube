import mongoose from "mongoose";
import { Video } from "../models/videos.model.js";
import { Subscription } from "../models/subscriptions.model.js";
import { Like } from "../models/like.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
  const { channelId } = req.params;
  if (!channelId) {
    throw new apiError(400, "Channel id is missing");
  }

  //totalVideos on a channel
  const totalVideos = await Video.count({ owner: channelId });
  if (!totalVideos) {
    throw new apiError(404, "Video count not found");
  }

  //totalSubscribers
  const totalSubscribers = await Subscription.countDocuments({
    channel: channelId,
  });

  //totalLikes
  const totalLikes = await Like.countDocuments({ owner: channelId });

  //totalVideo Views
  const videos = await Video.find({ owner: channelId });
  const totalViews = videos.reduce((sum, video) => sum + (video.views || 0), 0);

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { totalLikes, totalSubscribers, totalVideos, totalViews },
        "Channel stats fetched successfully"
      )
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel
  const { channelId } = req.params;
  if (!channelId) {
    throw new apiError(400, "channel id is missing");
  }

  const videos = await Video.find({ owner: channelId })
    .populate("owner", "username avatar fullName")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, videos, "Channel videos fetched successfully"));
});

export { getChannelStats, getChannelVideos };
