import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    // console.log("File has been uploaded successfully :", response);
    // return response;
    fs.unlink(localFilePath, () => {});
    return response;
  } catch (error) {
    fs.unlink(localFilePath, () => {}); // remove the locally saved temporary file as the upload operation got failed
    console.log(error);
    return null;
  }
};

// Optimize delivery by resizing and applying auto-format and auto-quality
const getOptimizedUrl = (publicId) => {
  return cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto",
  });
};

// Transform the image: auto-crop to square aspect_ratio
const getAutoCropUrl = (publicId, width = 500, height = 500) => {
  return cloudinary.url(publicId, {
    crop: "auto",
    gravity: "auto",
    width,
    height,
  });
};

export { uploadOnCloudinary, getOptimizedUrl, getAutoCropUrl };
