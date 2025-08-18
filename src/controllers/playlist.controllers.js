import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlists.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user?._id;

  //checking if name and description is present
  if (!name) {
    throw new apiError(400, "name is missing");
  }
  if (!description) {
    throw new apiError(400, "description is missing");
  }
  //creating playlists
  const playlists = await Playlist.create({
    name,
    description,
    owner: userId,
  });

  return res
    .status(201)
    .json(new apiResponse(201, playlists, "Playlist is created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const { page = 1, limit = 10 } = req.query;

  if (!userId) {
    throw new apiError(400, "User id is missing");
  }

  //skips the playlist
  const skip = (Number(page) - 1) * Number(limit);

  const totalPlaylists = await Playlist.countDocuments({ owner: userId });

  const savedPlaylists = await Playlist.find({
    owner: userId,
  })
    .populate("owner", "username avatar fullName")
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        playlists: savedPlaylists,
        totalPlaylists,
        page: Number(page),
        limit: Number(limit),
      },
      "Playlists fetched successfully"
    )
  );

  //TODO: get user playlists
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  //checking if id is missing or not in params
  if (!playlistId) {
    throw new apiError(400, "playlist id is missing");
  }
  //check if the playlistId is valid according to mongodb object id format
  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new apiError(400, "Invalid Playlist ID format");
  }
  //finding playlist
  const playlist = await Playlist.findById(playlistId).populate(
    "owner",
    "username  fullName avatar"
  );
  if (!playlist) {
    throw new apiError(404, "playlist not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, playlist, "Playlist fetched successfully"));
  //TODO: get playlist by id
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  const userId = req.user?._id;

  //checking for missind id
  if (!userId) {
    throw new apiError(400, "User id is missing");
  }
  if (!playlistId || !mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new apiError(400, " playlist id is missing or invalid ");
  }
  if (!videoId || !mongoose.Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "video id is inalid or  missing");
  }

  //finding the playlist to push the video
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new apiError(404, "Playlist not found");
  }

  //ownership of the user
  if (playlist.owner.toString() !== userId.toString()) {
    throw new apiError(403, "You are not allowed to modify the playlist");
  }

  // check if video is already present in the playlist
  if (playlist.videos.includes(videoId)) {
    throw new apiError(400, "video already exist in the playlist");
  }

  //add video to the playlist
  playlist.videos.push(videoId);
  await playlist.save();

  return res
    .status(200)
    .json(
      new apiResponse(200, playlist, "Video added successfully to the playlist")
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  // TODO: remove video from playlist
  const { playlistId, videoId } = req.params;
  const userId = req.user?._id;
  if (!playlistId) {
    throw new apiError(400, "missing playlistId");
  }

  if (!videoId) {
    throw new apiError(400, "missing videoId");
  }
  //playlist find
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new apiError(404, "Playlist not found");
  }
  //ownership of the playlist
  if (playlist.owner.toString() !== userId.toString()) {
    throw new apiError(403, "You are not allowed to change this playlist");
  }

  //check if video exits in the playlist or not
  if (!playlist.videos.includes(videoId)) {
    throw new apiError(400, "video is not present inside of the playlist");
  }

  playlist.videos = playlist.videos.filter(
    (id) => id.toString() !== videoId.toString()
  );
  await playlist.save();
  return res
    .status(200)
    .json(new apiResponse(200, playlist, "video is removed from the playlist"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const userId = req.user?._id;
  // TODO: delete playlist
  if (!playlistId) {
    throw new apiError(400, "missing playlist id");
  }

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new apiError(404, "playlist not found");
  }

  if (playlist.owner.toString() !== userId.toString()) {
    throw new apiError(403, "You are not allowed to delete this playlist");
  }

  const deletePlaylist = await Playlist.deleteOne({ _id: playlistId });

  return res
    .status(200)
    .json(
      new apiResponse(200, deletePlaylist, "playlist deleted successfully")
    );
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  const userId = req.user?._id;
  if (!userId) {
    throw new apiError(400, "user id is missing");
  }

  //check if id is present or missed
  if (!playlistId) {
    throw new apiError(400, "playlist id is missing");
  }
  if (!name) {
    throw new apiError(400, "name is missing");
  }
  if (!description) {
    throw new apiError(400, "description is missing");
  }

  //playlist validator
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new apiError(404, "playlist not found");
  }

  //checking for ownership
  if (playlist.owner.toString() !== userId.toString()) {
    throw new apiError(403, "You are not allowed to edit the playlist");
  }

  if (name) playlist.name = name;
  if (description) playlist.description = description;
  await playlist.save();

  return res
    .status(200)
    .json(new apiResponse(200, playlist, "playlist updated successfully"));

  //TODO: update playlist
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
