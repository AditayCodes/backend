import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload file on cloudinary
        const respone = await cloudinary.uploader.upload
            (localFilePath, {
            resource_type: "auto"
            })
        //file has been uploaded succesfully
        /*console.log("file has uploaded on cloudinary",
            respone.url);*/
        fs.unlinkSync(localFilePath)
        return respone;
    } catch (error) {
        fs.unlinkSync(localFilePath)    //remove the file locally
        return null
    }
}


const deleteOnCloudinary = async (public_id, resource_type = "image") => {
    try {
        if (!public_id) {
            console.warn("No public_id provided to deleteOnCloudinary");
            return null;
        }

        const result = await cloudinary.uploader.destroy(public_id, {
            resource_type
        });

        return result;
    } catch (error) {
        console.error("Cloudinary delete failed:", error);
        return null;
    }
};


export {uploadOnCloudinary, deleteOnCloudinary}