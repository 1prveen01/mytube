import { Router } from "express";
import { loginUser, logoutUser, registerUser , refreshAccessToken, changeCurrentUserPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannelProfile, getWatchHistory, deleteUserAccount } from "../src/controllers/user.controllers.js";
import { upload } from "../src/middlewares/multer.middleware.js";
import { verifyJWT } from "../src/middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)
    
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post( verifyJWT ,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT , changeCurrentUserPassword)
router.route("/current-user").get(verifyJWT , getCurrentUser)
router.route("/update-account-details").patch(verifyJWT , updateAccountDetails)
router.route("/avatar").patch(verifyJWT , upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT , upload.single("coverImage"), updateUserCoverImage)
//from url
router.route("/c/:username").get(verifyJWT , getUserChannelProfile)
router.route("/watch-history").get(verifyJWT , getWatchHistory)
router.route("/delete-user-account").delete(verifyJWT , deleteUserAccount)

export default router;