import { Router } from "express";
import { verifyJWT } from "../src/middlewares/auth.middleware.js";
import { getSubscribedChannels, getUserChannelSubscribers, toggleSubscription } from "../src/controllers/subscription.controllers.js";

const router = Router();

router.route("/toggle-subscription/:channelId").post(verifyJWT ,toggleSubscription)
router.route("/get-user-channel-subscribers/:channelId").get(verifyJWT , getUserChannelSubscribers)
router.route("/get-subscribed-channels/:subscriberId").get(verifyJWT , getSubscribedChannels)

export default router;  