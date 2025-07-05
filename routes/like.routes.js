import { Router } from "express";
import { verifyJWT } from "../src/middlewares/auth.middleware.js";
import {
  getLikedVideos,
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
} from "../src/controllers/like.controllers.js";

const router = Router();

router.route("/toggle-video-like/:videoId").post(verifyJWT, toggleVideoLike);
router
  .route("/toggle-comment-like/:commentId")
  .post(verifyJWT, toggleCommentLike);
router.route("/toggle-tweet-like/:tweetId").post(verifyJWT, toggleTweetLike);

// Get all liked videos (with pagination support)
router.route("/liked-videos").get(verifyJWT, getLikedVideos);

export default router;
