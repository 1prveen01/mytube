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