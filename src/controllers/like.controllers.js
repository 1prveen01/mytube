import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { Tweet } from "../models/tweets.model.js";
import { Comment } from "../models/comments.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { Video } from "../models/videos.model.js";
import { User } from "../models/users.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user?._id;

  //TODO: toggle like on video
  if (!videoId) {
    throw new apiError(400, "Video id is missing");
  }

  //find the video
  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(404, "Video not found");
  }

  //check for existing like
  const alreadyLiked = await Like.findOne({
    video: videoId,
    likedBy: userId,
  });
  if (alreadyLiked) {
    await alreadyLiked.deleteOne();
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { isLiked: false },
          `Video has been unliked successfully`
        )
      );
  } else {
    await Like.create({ video: videoId, likedBy: userId });
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { isLiked: true },
          `Video has been liked successfully`
        )
      );
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user?._id;
  if (!commentId) {
    throw new apiError(400, "comment Id is missing");
  }
  //finding comment through comment id
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new apiError(404, "Comment not found");
  }

  const alreadyLiked = await Like.findOne({
    comment: commentId,
    likedBy: userId,
  });

  if (alreadyLiked) {
    await alreadyLiked.deleteOne();
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { isLiked: false },
          "comment disliked successfully"
        )
      );
  } else {
    await Like.create({ comment: commentId, likedBy: userId });
    return res
      .status(200)
      .json(
        new apiResponse(200, { isLiked: true }, "Comment is liked successfully")
      );
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const userId = req.user?._id;
  //TODO: toggle like on tweet
  if (!tweetId) {
    throw new apiError(400, "Tweet Id is missing");
  }

  //finding the tweet by tweetId
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new apiError(404, "Tweet not found");
  }

  //if already liked tweet
  const alreadyLiked = await Like.findOne({ tweet: tweetId, likedBy: userId });
  if (alreadyLiked) {
    await alreadyLiked.deleteOne();
    return res
      .status(200)
      .json(
        new apiResponse(200, { isLiked: false }, "Tweet disliked Successfully")
      );
  } else {
    await Like.create({ tweet: tweetId, likedBy: userId });
    return res
      .status(200)
      .json(
        new apiResponse(200, { isLiked: true }, "Tweet Liked Successfully")
      );
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //get user from userId

  const userId = req.user?._id;
  if (!userId) {
    throw new apiError(400, "User id is missing");
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const user = await User.findById(userId);
  if (!user) {
    throw new apiError(404, "user not found");
  }

  const likedvideos = await Like.aggregate([
    {
      $match: {
        likedBy: userId,
        video: { $ne: null },
      },
    },
    {
      $sort: { createdAt: -1 }, // Sort by most recent like
    },
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "video",
      },
    },
    {
      $unwind: "$video",
    },
    {
      $lookup: {
        from: "users",
        localField: "video.owner",
        foreignField: "_id",
        as: "video.owner",
      },
    },
    {
      $addFields: {
        "video.owner": { $first: "$video.owner" },
      },
    },
    {
      $replaceRoot: { newRoot: "$video" },
    },
  ]);

  return res
    .status(200)
    .json(
      new apiResponse(200, likedvideos, "Liked videos fetched successfully")
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
