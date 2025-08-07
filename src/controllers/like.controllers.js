import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { Tweet } from "../models/tweets.model.js";
import { Comment } from "../models/comments.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
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
    type: "like",
  });
  if (alreadyLiked) {
    await alreadyLiked.deleteOne();
    const likesCount = await Like.countDocuments({
      video: videoId,
      type: "like",
    });
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { isLiked: false, likesCount },
          `Video has been unliked successfully`
        )
      );
  } else {
    //if disliked before liking the video
    await Like.deleteOne({
      video: videoId,
      likedBy: userId,
      type: "dislike",
    });

    await Like.create({ video: videoId, likedBy: userId, type: "like" });

    const likesCount = await Like.countDocuments({
      video: videoId,
      type: "like",
    });
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { isLiked: true, likesCount },
          `Video has been liked successfully`
        )
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
    const likesCount = await Like.countDocuments({ tweet: tweetId });
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { isLiked: false, likesCount },
          "Tweet disliked Successfully"
        )
      );
  } else {
    await Like.create({ tweet: tweetId, likedBy: userId });
    const likesCount = await Like.countDocuments({ tweet: tweetId });

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { isLiked: true, likesCount },
          "Tweet Liked Successfully"
        )
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

const toggleVideoDislike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user?._id;

  if (!videoId) {
    throw new apiError(400, "VideoId is missing");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new apiError(404, "video not found");
  }

  if (!userId) {
    throw new apiError(400, "user Id is missing");
  }

  const existingDislike = await Like.findOne({
    video: videoId,
    likedBy: userId,
    type: "dislike",
  });

  if (existingDislike) {
    await existingDislike.deleteOne();
    const dislikesCount = await Like.countDocuments({
      video: videoId,
      type: "dislike",
    });
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { isDisliked: false, dislikesCount },
          "remove the disliked successfully"
        )
      );
  } else {
    await Like.findOneAndDelete({
      video: videoId,
      type: "like",
      likedBy: userId,
    });

    await Like.create({ video: videoId, likedBy: userId, type: "dislike" });
    const dislikesCount = await Like.countDocuments({
      video: videoId,
      type: "dislike",
    });

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { isDisliked: true, dislikesCount },
          "video disliked successfully"
        )
      );
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user?._id;

  if (!commentId) throw new apiError(400, "Comment ID is missing");
  if (!userId) throw new apiError(401, "User not authenticated");

  const comment = await Comment.findById(commentId);
  if (!comment) throw new apiError(404, "Comment not found");

  const existingLike = await Like.findOne({
    comment: commentId,
    likedBy: userId,
    type: "like",
  });

  if (existingLike) {
    await existingLike.deleteOne();
  } else {
    // 🔥 Remove any existing dislike first
    await Like.deleteMany({
      comment: commentId,
      likedBy: userId,
      type: "dislike",
    });

    // 🔒 Try-catch in case of duplicate due to missing unique index
    try {
      await Like.create({
        comment: commentId,
        likedBy: userId,
        type: "like",
      });
    } catch (err) {
      console.error("Duplicate like prevented:", err.message);
    }
  }

  const likesCount = await Like.countDocuments({ comment: commentId, type: "like" });
  const dislikeCount = await Like.countDocuments({ comment: commentId, type: "dislike" });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        isLiked: !existingLike,
        likesCount,
        dislikeCount,
      },
      existingLike
        ? "Like removed"
        : "Comment liked"
    )
  );
});

const toggleCommentDislike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user?._id;

  if (!commentId) throw new apiError(400, "Comment ID is missing");
  if (!userId) throw new apiError(401, "User not authenticated");

  const comment = await Comment.findById(commentId);
  if (!comment) throw new apiError(404, "Comment not found");

  const existingDislike = await Like.findOne({
    comment: commentId,
    likedBy: userId,
    type: "dislike",
  });

  if (existingDislike) {
    await existingDislike.deleteOne();
  } else {
    // 🔥 Remove any existing like first
    await Like.deleteMany({
      comment: commentId,
      likedBy: userId,
      type: "like",
    });

    // 🔒 Try-catch in case of duplicate due to missing unique index
    try {
      await Like.create({
        comment: commentId,
        likedBy: userId,
        type: "dislike",
      });
    } catch (err) {
      console.error("Duplicate dislike prevented:", err.message);
    }
  }

  const likesCount = await Like.countDocuments({ comment: commentId, type: "like" });
  const dislikeCount = await Like.countDocuments({ comment: commentId, type: "dislike" });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        isDisliked: !existingDislike,
        likesCount,
        dislikeCount,
      },
      existingDislike
        ? "Dislike removed"
        : "Comment disliked"
    )
  );
});


export {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getLikedVideos,
  toggleVideoDislike,
  toggleCommentDislike,
};
