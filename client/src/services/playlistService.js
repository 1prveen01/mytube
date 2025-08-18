
import axiosInstance from "../utils/axios"


export const createPlaylist = async(playlistData) =>{
    const res= await axiosInstance.post(`/playlists/create-playlist`, playlistData);
    return res.data.data;
}

export const getUserPlaylists = async() =>{
    const res = await axiosInstance.get(`playlists/get-user-playlist`)
    return res.data.data;
}

export const updatePlaylist = async(playlistId , payload) =>{
    const res = await axiosInstance.patch(`playlists/update-playlist/${playlistId}`,payload)
    return res.data.data;
}

export const addVideoToPlaylist = async(playlistId , videoId) =>{
    const res = await axiosInstance.get(`/playlists/add-video-to-playlist/${playlistId}/${videoId}`);
    return res.data.data;
}

export const removeVideoFromPlaylist = async(playlistId , videoId) =>{
    const res = await axiosInstance.patch(`/playlists/remove-video-from-playlist/${playlistId}/${videoId}}`);
    return res.data.data;
}

export const removePlaylist = async(playlistId) =>{
    const res = await axiosInstance.delete(`/playlists/delete-playlist/${playlistId}`)
    return res.data.data;
}