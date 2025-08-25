import axiosInstance from "../utils/axios";

export const submitSupport = async(data) =>{
    const res = await axiosInstance.post(`/support/contact`,data)
    return res.data;
}