import { Router } from "express";
import { verifyJWT } from "../src/middlewares/auth.middleware.js";
import {
  getLikedVideos,
  toggleCommentDislike,
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoDislike,
  toggleVideoLike,
  getVideoLikeStatus
} from "../src/controllers/like.controllers.js";

const router = Router();
//video like or dislike route
router.route("/toggle-video-like/:videoId").post(verifyJWT, toggleVideoLike);
router.route("/toggle-video-dislike/:videoId").post(verifyJWT , toggleVideoDislike)
router.route("/get-video-like-status/:videoId").get(verifyJWT , getVideoLikeStatus)
//comment like or dislike route
router.route("/toggle-comment-like/:commentId").post(verifyJWT, toggleCommentLike);
router.route("/toggle-comment-dislike/:commentId").post(verifyJWT , toggleCommentDislike);
//tweet like route
router.route("/toggle-tweet-like/:tweetId").post(verifyJWT, toggleTweetLike);

// Get all liked videos (with pagination support)
router.route("/liked-videos").get(verifyJWT, getLikedVideos);

export default router;
