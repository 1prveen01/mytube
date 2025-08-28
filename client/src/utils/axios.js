import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_URL || "https://mytube-1-17ai.onrender.com/api/v1",
    withCredentials: true
})

export default axiosInstance;