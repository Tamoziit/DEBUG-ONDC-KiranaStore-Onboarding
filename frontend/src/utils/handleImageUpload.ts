import imageCompression from "browser-image-compression"; // Import the compression library
import toast from "react-hot-toast";

const handleImageUpload = async (file: File) => {
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL;

    try {
        const compressedFile = await imageCompression(file, {
            maxSizeMB: 10,
            maxWidthOrHeight: 800,
            useWebWorker: true,
        });

        const formData = new FormData();
        formData.append("file", compressedFile);
        formData.append("upload_preset", uploadPreset);

        const response = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.log("Error uploading image:", error);
        toast.error("Failed to upload image.");
        return "";
    }
}

export default handleImageUpload;