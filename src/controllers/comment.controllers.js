import mongoose from "mongoose";
import { Comment } from "../models/comments.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Video } from "../models/videos.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { Like } from "../models/like.model.js";


const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const userId = req.user?._id;

  if (!videoId) {
    throw new apiError(400, "Video id is missing");
  }

  const skip = (Number(page) - 1) * Number(limit);

  // Total comment count
  const totalComment = await Comment.countDocuments({ video: videoId });

  // Fetch paginated comments
  const comments = await Comment.find({ video: videoId })
    .populate("owner", "username avatar fullName")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const commentIds = comments.map((c) => c._id);

  // Fetch all reactions by the user in one query
  const userReactions = await Like.find({
    comment: { $in: commentIds },
    likedBy: userId,
  });

  // Map reactions for quick lookup
  const reactionMap = {};
  userReactions.forEach((reaction) => {
    const id = reaction.comment.toString();
    if (!reactionMap[id]) reactionMap[id] = {};
    if (reaction.type === "like") reactionMap[id].isLiked = true;
    if (reaction.type === "dislike") reactionMap[id].isDisliked = true;
  });

  // Get like/dislike counts using aggregation
  const likeStats = await Like.aggregate([
    { $match: { comment: { $in: commentIds } } },
    {
      $group: {
        _id: { comment: "$comment", type: "$type" },
        count: { $sum: 1 },
      },
    },
  ]);

  // Map counts by commentId
  const countsMap = {};
  likeStats.forEach((entry) => {
    const id = entry._id.comment.toString();
    const type = entry._id.type;
    if (!countsMap[id]) countsMap[id] = { likesCount: 0, dislikeCount: 0 };
    if (type === "like") countsMap[id].likesCount = entry.count;
    if (type === "dislike") countsMap[id].dislikeCount = entry.count;
  });

  // Final response construction
  const commentsWithLikeStatus = comments.map((comment) => {
    const id = comment._id.toString();
    return {
      _id: comment._id,
      content: comment.content,
      owner: comment.owner,
      createdAt: comment.createdAt,
      isLiked: reactionMap[id]?.isLiked || false,
      isDisliked: reactionMap[id]?.isDisliked || false,
      likesCount: countsMap[id]?.likesCount || 0,
      dislikeCount: countsMap[id]?.dislikeCount || 0,
    };
  });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        totalComment,
        comments: commentsWithLikeStatus,
        page: Number(page),
        skip: Number(skip),
        totalPages: Math.ceil(totalComment / limit),
      },
      "Comments fetched Successfully"
    )
  );
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { content } = req.body;
  const { videoId } = req.params;
  const userId = req.user?._id;

  //validating the input
  if (!content) {
    throw new apiError(400, "Comment not found");
  }
  if (!videoId) {
    throw new apiError(400, "video is missing");
  }

  //create the comment
  const postComment = await Comment.create({
    content: content,
    video: videoId,
    owner: userId,
  });

  return res
    .status(200)
    .json(new apiResponse(200, postComment, "Comment created Successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { content } = req.body;
  const { commentId } = req.params;
  const userId = req.user?._id;

  //validating content
  if (!content) {
    throw new apiError(400, "Content is missing");
  }
  if (!commentId) {
    throw new apiError(400, "commentId  is missing");
  }

  const existingComment = await Comment.findById(commentId);
  if (!existingComment) {
    throw new apiError(404, "Comment not found");
  }

  //checking ownership of the comment
  if (existingComment.owner.toString() !== userId.toString()) {
    throw new apiError(403, "You are not allowed to edit this comment");
  }

  //updating comment
  existingComment.content = content;
  await existingComment.save();

  return res
    .status(200)
    .json(
      new apiResponse(200, existingComment, "Comment updated successfully")
    );
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;
  const userId = req.user?._id;

  if (!commentId) {
    throw new apiError(400, "Commentid is missing");
  }

  if (!userId) {
    throw new apiError(400, "User id is missing");
  }

  //check ownership
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new apiError(404, "Comment not found");
  }

  if (comment.owner.toString() !== userId.toString()) {
    throw new apiError(403, "You are not authorized to delete this comment");
  }
  //delete comment
  await Comment.deleteOne({ _id: commentId });

  return res
    .status(200)
    .json(new apiResponse(200, null, "comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
