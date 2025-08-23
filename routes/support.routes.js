import express from "express";
import { submitSupportMessage } from "../src/controllers/support.controllers.js";
import { verifyJWT } from "../src/middlewares/auth.middleware.js";

const router = express.Router();

router.route("/contact").post(verifyJWT , submitSupportMessage)

export default router;
