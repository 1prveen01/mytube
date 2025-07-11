
import { asyncHandler } from "../utils/asyncHandler.js";

const healthcheck = asyncHandler(async (req, res) => {
  
  return res.stautus(200).json({
    message: "API is up and running ",
    success: true
  })
});

export { healthcheck };
