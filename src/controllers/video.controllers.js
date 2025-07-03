import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { apiResponse } from "../../utils/apiResponse.js"
import { apiError } from "../../utils/apiError.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination

    //create filters 
    const filters = {}

    if(query){
        filters.title = {$regex: query,$options: "i"}
    }

    if(userId){
        filters.owner = userId
    }

    //sorting options 
    const sortOptions = {}
    sortOptions[sortBy] = sortType === "asc"?1:-1


    //pagination
    const skip = (Number(page) - 1) * Number(limit)

    //fetch videos from db
    const videos = await Video.find(filters)
    .populate("owner" , "username avatar fullName")
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit))

    //  Count total for pagination
    const total = await Video.countDocuments(filters)

    return res.status(200).json(
        new apiResponse(200, {
            total,
            page: Number(page),
            limit: Number(page),
            videos
        },"Videos fetched Successfully")
    )

})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary , create video

    const videoLocalFilePath = req.file?.path

    if(!videoLocalFilePath){
        throw new apiError(400, "Missing video local file path")
    }

    //upload in cloudinary
    const uploadVideo = await uploadOnCloudinary(videoLocalFilePath)


    //video duration in seconds
    const durationInSeconds = uploadVideo.duration;

    //upload thumbnail optional
    const thumbnailLocalfilePath = req.file?.path
    if(!thumbnailLocalfilePath){
        throw new apiError(400,"Error while uploading thumbnail")
    }

    const uploadThumbnail = await uploadOnCloudinary(thumbnailLocalfilePath)

    if(!uploadVideo || !uploadVideo.url){
        throw new apiError(400, "Error while uploading the video")
    }

    // save video in db
    const saveVideo = await Video.create({
        title,
         description,
        videoFile : uploadVideo.url,
        thumbnail: uploadThumbnail.url,
        duration: durationInSeconds,
        owner : req.user?._id
    })

    return res.status(200).json(
        new apiResponse(
            200,
                saveVideo,
            "Video uploaded successfully"
        )
    )


    


  
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    if(!videoId.trim()){
        throw new apiError(400, "VidoeId is missing")
    }


    const video = await  Video.findbyId(videoId).populate({
        path: "owner",
        select : "username fullName avatar"
    })

    if(!video){
        throw new apiError(400 , "Vidoe not found")
    }

    return res.status(200).json(
        new apiResponse(200, video, "Video fetched successfully")
    )
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}