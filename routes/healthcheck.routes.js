import { Router } from "express";
import { verifyJWT } from "../src/middlewares/auth.middleware.js";
import { healthcheck } from "../src/controllers/healthcheck.controllers.js";

const router = Router()

router.route("/health-check").get(verifyJWT,healthcheck)


export default router;