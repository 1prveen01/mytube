import { Router } from "express";
import { verifyJWT } from "../src/middlewares/auth.middleware.js";
import { createTweet, deleteTweet, getUserTweets, updateTweet } from "../src/controllers/tweet.controllers.js";

const router = Router();

router.route("/create-tweet").post(verifyJWT , createTweet)
router.route("/update-tweet/:tweetId").patch(verifyJWT, updateTweet)
router.route("/delete-tweet/:tweetId").delete(verifyJWT, deleteTweet)
router.route("/get-user-tweets").get(verifyJWT, getUserTweets)


export default router;