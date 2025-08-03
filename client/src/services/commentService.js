import axiosInstance from "../utils/axios";

export const getComment = async (videoId) => {
  const res = await axiosInstance.get(`/comments/${videoId}`);
  return res.data.data;
};

export const addComment = async(videoId) => {
    const res = await axiosInstance.post(`comments/`)
}