import axiosInstance from "../utils/axios"


export const updateUserDetails = async(userData) =>{
    const res = await axiosInstance.patch("/users/update-account-details", userData);
    return res.data.data
}

export const deleteUserAccount = async() =>{
    const res = await axiosInstance.delete("/users/delete-user-account");
    return res.data;
}