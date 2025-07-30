import { Router } from "express";
import { verifyJWT } from "../src/middlewares/auth.middleware.js";
import { upload } from "../src/middlewares/multer.middleware.js";
import { deleteVideo, getAllVideos, getVideoById, publishAVideo, togglePublishStatus, updateVideo } from "../src/controllers/video.controllers.js";

const router = Router()
router.route("/all-videos").get(verifyJWT , getAllVideos)
router.route("/publish-video").post(verifyJWT,upload.fields([
    {name : "videoFile", maxCount: 1},
    {name : "thumbnail" , maxCount: 1}
]), publishAVideo)
router.route("/get-video-by-id/:video-id").get(verifyJWT, getVideoById)
router.route("/update-video/:videoId").patch(verifyJWT , updateVideo)
router.route("/delete-video/:videoId").delete(verifyJWT , deleteVideo)
router.route("/video-published/:videoId").patch(verifyJWT , togglePublishStatus)


export default router;