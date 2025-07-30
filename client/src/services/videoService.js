
import axiosInstance from "../utils/axios"


export const fetchAllVideos = async({page =1 , limit = 10  , query ="" , sortBy = "createdAt" , sortType = "desc" , userId = ""}) =>{
    const res = await axiosInstance.get("/videos/all-videos" , {
        params: {page , limit , query , sortBy , sortType , userId},

    });

    return res.data.data;
}