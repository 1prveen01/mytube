import axiosInstance from "../utils/axios";

export const getComment = async (videoId) => {
  const res = await axiosInstance.get(`/comments/get-video-comments/${videoId}`);
  return res.data.data;
};

export const addComment = async(videoId , content) => {
    const res = await axiosInstance.post(`comments/add-comment/${videoId}` , {
      content
    });
    return res.data.data;
}