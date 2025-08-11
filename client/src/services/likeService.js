import axios from "axios";
import axiosInstance from "../utils/axios";

export const getLikedComment = async(commentId) => {
    const res = await axiosInstance.post(`/likes/toggle-comment-like/${commentId}`)
    return res.data.data;
}

export const getDislikedComment = async(commentId) =>{
    const res = await axiosInstance.post(`/likes/toggle-comment-dislike/${commentId}`)
    return res.data.data;
}

export const postLikeInVideo  = async(videoId) =>{
    const res = await axiosInstance.post(`/likes/toggle-video-like/${videoId}`)
    return res.data.data;
}

export const postDislikeInVideo = async(videoId) => {
    const res = await axiosInstance.post(`/likes/toggle-video-dislike/${videoId}`)
    return res.data.data;
}

export const getLikeStatus = async(videoId) =>{
    const res = await axiosInstance.get(`/likes/get-video-like-status/${videoId}`)
    return res.data.data;
} 