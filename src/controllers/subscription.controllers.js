import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/users.model.js";
import { Subscription } from "../models/subscriptions.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user?._id;
  if (!userId) {
    throw new apiError(400, "user id is missing");
  }
  //toggle subscription
  if (!channelId) {
    throw new apiError(400, "channel id is missing");
  }

  //for own channel
  if (channelId.toString() === userId.toString()) {
    throw new apiError(400, "You cannot subscribe to your own channel");
  }

  //check for another channel based on channelId and userId
  const existingSubscription = await Subscription.findOne({
    channel: channelId,
    subscriber: userId,
  });

  let isSubscribed;

  let message = "";
  if (existingSubscription) {
    await Subscription.deleteOne({ _id: existingSubscription._id });
    isSubscribed = false;
    message = "channel unsubscribed successfully";
  } else {
    await Subscription.create({ subscriber: userId, channel: channelId });
    isSubscribed = true;
    message = "channel subscribed successfully";
  }
  const subscribersCount = await Subscription.countDocuments({
    channel: channelId,
  });

  return res
    .status(200)
    .json(new apiResponse(200, { subscribersCount, isSubscribed }, message));
});

const getSubscriptionStatus = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user?._id;

  //for own channel
  if (userId && channelId.toString() === userId.toString()) {
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { subscribersCount: 0, isSubscribed: false },
          "Own channel"
        )
      );
  }

  const subscribersCount = await Subscription.countDocuments({
    channel: channelId,
  });

  // Check if the current user is subscribed
  let isSubscribed = false;
  if (userId) {
    const existingSubscription = await Subscription.findOne({
      channel: channelId,
      subscriber: userId,
    });
    isSubscribed = !!existingSubscription;
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { subscribersCount, isSubscribed },
        "Subscription status fetched successfully"
      )
    );
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  console.log("user id :", req.user);
  if (!channelId) {
    throw new apiError(400, "channel id is missing");
  }

  //list of subscribers
  const subscribers = await Subscription.find({ channel: channelId })
    .populate("subscriber", "username avatar fullName")
    .sort({ createdAt: -1 });

  const totalSubscribers = subscribers.length;
  //-----------------> Alternate method for totalSubscribers <-----------------------
  //   const totalSubscriber = await Subscription.count({ channel: channelId });
  //   if (!totalSubscriber) {
  //     throw new apiError(400, "unable to fetch totalsubscriber");
  //   }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { subscribers, totalSubscribers },
        "Subscribers fetched successfully"
      )
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
  if (!subscriberId || !mongoose.Types.ObjectId.isValid(subscriberId)) {
    throw new apiError(400, "Invalid or missing subscriber ID");
  }

  //list of subscribed channel
  const subscribedChannel = await Subscription.find({
    subscriber: subscriberId,
  })
    .populate("owner", "username avatar fullName")
    .sort({ createdAt: -1 });

  //total number of subscribed Channel
  const totalSubscribedChannel = subscribedChannel.length;

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { subscribedChannel, totalSubscribedChannel },
        "Subscribed Channel fetched Successfully"
      )
    );
});

export {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
  getSubscriptionStatus,
};
