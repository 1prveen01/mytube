import axiosInstance from "../utils/axios"

//for toggle the subscribtion status
export const togglesubscribeChannel = async(channelId) =>{
    const res = await axiosInstance.post(`/subscriptions/toggle-subscription/${channelId}`);
    return res.data.data;
}

export const getSubscriptionStatus = async(channelId) =>{
    const res = await axiosInstance.get(`/subscriptions/get-subscription-status/${channelId}`);
    return res.data.data;
}

export const getUserChannelSubscribersList = async(channelId) =>{
    const res = await axiosInstance.get(`/subscriptions/get-user-channel-subscribers/${channelId}`)
    return res.data.data;
}

export const getSubscribedChannelsList = async(subscriberId) =>{
    const res = await axiosInstance.get(`/subscriptions/get-subscribed-channels/${subscriberId}`);
    return res.data.data;
}