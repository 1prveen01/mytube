import {Router} from "express"
import { verifyJWT } from "../src/middlewares/auth.middleware";
import { addVideoToPlaylist, createPlaylist, deletePlaylist, getPlaylistById, getUserPlaylists, removeVideoFromPlaylist, updatePlaylist } from "../src/controllers/playlist.controllers";

const router = Router();

router.route("/create-playlist").post(verifyJWT,createPlaylist);
router.route("/get-user-playlist").get(verifyJWT , getUserPlaylists);
router.route("/get-playlist-by-id/:playlistId").get(verifyJWT , getPlaylistById);
router.route("/add-video-to-playlist/:playlistId/:videoId").patch(verifyJWT, addVideoToPlaylist);
router.route("/remove-video-from-playlist/:playlistId/:videoId").patch(verifyJWT , removeVideoFromPlaylist);
router.route("/delete-playlist/:playlistId").delete(verifyJWT,deletePlaylist);
router.route("/update-playlist/:playlistId").patch(verifyJWT,updatePlaylist);


export default router;