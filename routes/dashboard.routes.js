import { Router } from "express";
import { verifyJWT } from "../src/middlewares/auth.middleware";
import { getChannelStats, getChannelVideos } from "../src/controllers/dashboard.controllers";

const router = Router()

router.route("/get-channel-stat/:channelId").get(verifyJWT , getChannelStats);
router.route("/get-channel-videos/:channelId").get(verifyJWT , getChannelVideos);


export default router