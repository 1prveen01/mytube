
import axiosInstance from "../utils/axios"


export const fetchAllVideos = async({page =1 , limit = 10  , query ="" , sortBy = "createdAt" , sortType = "desc" , userId = ""}) =>{
    const res = await axiosInstance.get("/videos/all-videos" , {
        params: {page , limit , query , sortBy , sortType , userId},

    });

    return res.data.data;
}

export const getVideoById = async(videoId) =>{
    const res = await axiosInstance.get(`/videos/get-video-by-id/${videoId}`);
    return res.data.data;
}
export const getPublishedVideos = async ({ page = 1, limit = 10 }) => {
    const res = await axiosInstance.get("/videos/get-published-videos", {
        params: { page, limit }
    });
    return res.data.data; // contains total, page, limit, videos
};


export const deleteVideobyId = async(videoId) => {
    const res = await axiosInstance.delete(`/videos/delete-video/${videoId}`)
    return res.data.data;
}

export const updateVideo = async(videoId) =>{
    const res = await axiosInstance.patch(`/videos/update-video/${videoId}`)
    return res.data.data
}

export const publishVideo = async ({ title, description, videoFile, thumbnail }) => {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);
  formData.append("videoFile", videoFile); // File object
  formData.append("thumbnail", thumbnail); // File object

  const res = await axiosInstance.post("/videos/publish-video", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data;
};