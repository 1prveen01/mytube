import axiosInstance from "../utils/axios";

export const getLikedComment = async(commentId) => {
    const res = await axiosInstance.post(`/likes/toggle-comment-like/${commentId}`)
    return res.data.data;
}

export const getDislikedComment = async(commentId) =>{
    const res = await axiosInstance.post(`/likes/toggle-comment-dislike/${commentId}`)
    return res.data.data;
}