import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/videos.model.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  

  if (!videoId) {
    throw new apiError(400, "Video id is missing");
  }

  //skips the comments
  const skip = (Number(page) - 1) * Number(limit);

  //get total count of comments from videoId
  const totalComment = await Comment.countDocuments({ video: videoId });

  //fetching comments
  const comments = await Comment.find({ video: videoId })
    .populate("owner", "username avatar fullName")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        totalComment,
        comments,
        page: Number(page),
        skip: Number(skip),
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
