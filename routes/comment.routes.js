import { Router } from "express";
import { verifyJWT } from "../src/middlewares/auth.middleware.js";
import {
  addComment,
  deleteComment,
  getVideoComments,
  updateComment,
} from "../src/controllers/comment.controllers.js";

const router = Router();

router.route("/get-video-comments/:videoId").get(verifyJWT, getVideoComments);
router.route("/add-comment/:videoId").post(verifyJWT, addComment);
router.route("/update-comment/:commentId").patch(verifyJWT, updateComment);
router.route("/delete-comment/:commentId").delete(verifyJWT, deleteComment);

export default router;
