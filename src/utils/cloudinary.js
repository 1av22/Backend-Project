import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (uploadFilePath) => {
  try {
    if (!uploadFilePath) {
      return null;
    }
    console.log(`Upload file path : ${uploadFilePath}`);
    const response = await cloudinary.uploader.upload(uploadFilePath, {
      resource_type: "auto",
    });
    //   File has been uploaded successfully
    // console.log(`File is successfully uploaded on ${response.url}`);

    fs.unlinkSync(uploadFilePath);
    return response;
  } catch (err) {
    fs.unlinkSync(uploadFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
