import React, { useState, useEffect } from "react";

import { getSubscriptionStatus, togglesubscribeChannel } from "../services/subscribeService.js";
import axiosInstance from "../utils/axios.js";


const SubscribeButton = ({ channelId }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch subscription status on mount
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await getSubscriptionStatus(channelId);
        setIsSubscribed(res.isSubscribed);
        setSubscriberCount(res.subscribersCount);
      } catch (err) {
        console.error("Error fetching subscription status:", err);
      }
    };
    fetchStatus();
  }, [channelId]);

  const handleSubscribe = async () => {
    if (loading) return; // prevent spam clicks
    setLoading(true);
    try {
      const { isSubscribed, subscribersCount } = await togglesubscribeChannel(channelId);
      setIsSubscribed(isSubscribed);
      setSubscriberCount(subscribersCount);
    } catch (err) {
      console.error("Error toggling subscription:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className={`flex flex-row font-semibold justify-center items-center px-4 rounded-3xl py-2 transition ${
        isSubscribed
          ? "bg-gray-300 text-black hover:bg-gray-300"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {loading
        ? "Loading..."
        : isSubscribed
        ? `Subscribed (${subscriberCount})`
        : `Subscribe (${subscriberCount})`}
    </button>
  );
};

export default SubscribeButton;
